
module.exports = async function(ctx) {
  // pick random opponents
  let opponents = await ctx.call('league.pickRandomOpponents', {});

  if (!opponents) {
    this.logger.info('There are not more battles');
    return;
  }

  // build UBD
  let ubd = {
    version: 4,
    rngSeed: Math.random(),
    teamMode: true,
    timeLimit: this.settings.timeLimit,
    aiList: []
  };

  for(let opponent of opponents) {
    ubd.aiList.push({
      name: opponent.ownerName + '/' + opponent.scriptName,
      team: opponent.ownerName + '/' + opponent.scriptName,
      code: opponent.code,
      initData: null,
      useSandbox: true,
      executionLimit: 100,
      count: this.settings.teamSize
    });
  }

  try {
    let refData = {};
    refData[opponents[0].ownerName + '/' + opponents[0].scriptName] = opponents[0].id;
    refData[opponents[1].ownerName + '/' + opponents[1].scriptName] = opponents[1].id;
    let queueResult = await ctx.call('queue.write', {
      payload: {
        ubd: ubd,
        event: 'league',
        refData: refData
      },
      topic: 'ubdPlayer',
      limit: this.settings.queueLimit
    });
    if(queueResult.ok) {
      this.logger.info(`Scheduling battle ${opponents[0].scriptName} vs ${opponents[1].scriptName}`);
    } else {
      this.logger.info(`Error Scheduling battle ${opponents[0].scriptName} vs ${opponents[1].scriptName}`);
      this.logger.error('Unable to schedule battle: ' + queueResult.error);
      // Write a file with failing battles
      saveQueueError(opponents[0], opponents[1], this.settings.scheduleFolder, this.logger, queueResult.error)
    }
  } catch(err) {
    this.logger.error('Unable to schedule battle due to: ' + err.message)
  }

  function saveQueueError(playerA, playerB, folder, logger, err) {
    const fs = require('fs');
    let errorMessage =  (`Could not enqueue  battle ${playerA.scriptName} vs ${playerB.scriptName}\nerror: ${err}\n`);
    errorMessage += `playerA:\n${JSON.stringify(playerA)}\nplayerB:\n${JSON.stringify(playerB)}`

    try {
      const fileName = `${folder}/queueError-${playerA.scriptName}-vs-${playerB.scriptName}.${new Date().toISOString()}.log`  
      fs.writeFileSync(fileName, errorMessage)
    } catch (error) {
      logger.error('Cannot create log file for queue errors')
      logger.error(error)
    }

  }
}
