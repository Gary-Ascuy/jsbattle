const validators = require("../../validators");

module.exports = (config) => ({
  name: "leagueScheduler",
  settings: {
    queueLimit: config.ubdPlayer.queueLimit,
    disabledIntervals: config.league.disabledIntervals || [],
    scheduleInterval: config.league.scheduleInterval,
    timeLimit: config.league.timeLimit,
    teamSize: config.league.teamSize,
    scheduleFolder: config.league.scheduleFolder,
    historyDuration: config.league.historyDuration,
  },
  actions: {
    scheduleBattle: require('./actions/scheduleBattle.js'),
    storeBattleResults: {
      params: {
        refData: validators.any(),
        ubd: validators.any(),
        teamList: validators.any(),
      },
      handler: require('./actions/storeBattleResults.js')
    }
  },
  started: require('./events/onStart.js'),
  stopped: require('./events/onStop.js'),
  events: {
    "ubdPlayer.battle.league": require('./events/onBattleCompleted.js')
  }
});
