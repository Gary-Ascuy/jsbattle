const fs = require('fs');

class RankTable {

  constructor() {
    this.data = [];
  }

  init(data, battles, scheduleFolder) {
    if (battles) {
      const cache = {};
      [].concat(...battles).forEach(item => cache[`@${item.ownerName}/${item.scriptName}`] = true);
      this.data = data.filter(item => cache[`@${item.ownerName}/${item.scriptName}`]);
    } else {
      this.logger.info('No battles predefined')
      this.data = data.filter(item => item.ownerName !== 'jsbattle')
    }

    const count = this.data.length;
    for (let i=0; i < count; i++) {
      this.data[i].rank = i + 1;
    }

    this.schedule = this.getSchedule(battles);
    if (scheduleFolder) {
      this.saveBattleSchedule(this.schedule, scheduleFolder)
    }
    this.showBattles();
  }

  saveBattleSchedule(schedule, folder) {
    try {
      const fileName = `${folder}/battles-${new Date().toISOString()}.json`
      let log = (`Schedule Definition: ${this.schedule.length} scheduled battles\n`);    
      for (const battle of this.schedule) {
        const [a, b] = battle
        log += `@${a.ownerName}/${a.scriptName} Vs @${b.ownerName}/${b.scriptName}\n`
      }
      const data = JSON.stringify(schedule, null, 2)
      this.logger.info('Saving battle schedule')
      fs.writeFileSync(fileName, `${log}\n${data}`)
    } catch (err) {
      this.logger.error('Cannot save battle schedule')
      this.logger.error(err)
    }
  }

  showBattles() {
    this.logger.info(`Schedule Definition: ${this.schedule.length} scheduled battles`);    
    for (const battle of this.schedule) {
      const [a, b] = battle
      this.logger.info(`@${a.ownerName}/${a.scriptName} Vs @${b.ownerName}/${b.scriptName}`)
    }
  }

  add(entity) {
    let count = this.data.length;
    let shiftItem = null;
    let insertedIndex;
    let i;
    for(i=0; i < count+1; i++) {
      if(shiftItem) {
        let tmp = this.data[i];
        this.data[i] = shiftItem;
        this.data[i].rank = i+1;
        shiftItem = tmp;
      } else if(!this.data[i] || this.data[i].score < entity.score) {
        shiftItem = this.data[i];
        this.data[i] = entity;
        this.data[i].rank = i+1;
        insertedIndex = i;
      }
    }

    // remove duplicates
    count++;
    let removedCount = 0;
    for(i=0; i < count; i++) {
      if(this.data[i].id == entity.id && i != insertedIndex) {
        removedCount++;
      }
      this.data[i] = this.data[i+removedCount];
      if(this.data[i]) {
        this.data[i].rank = i+1;
      }
    }
    for(i=0; i < removedCount; i++) {
      this.data.pop();
    }
  }

  remove(id) {
    const count = this.data.length;
    let removedCount = 0;
    for(let i=0; i < count; i++) {
      if(this.data[i+removedCount] && this.data[i+removedCount].id == id) {
        removedCount++;
      }
      this.data[i] = this.data[i+removedCount];
      if(this.data[i]) {
        this.data[i].rank = i+1;
      }
    }


    for(let i=0; i < removedCount; i++) {
      this.data.pop();
    }

  }

  updateFail(id, fightsError) {
    let entity = this.data.find((e) => e.id == id);
    entity.fights_error = fightsError;
    try {
     this.logger.info(`Updating fail ${JSON.stringify(entity)} items`)
     }
     catch (err) {
       this.logger.error(err)
     }
  }

  updateScore(id, newScore, totalFigths, fightsWin, fightsLose) {
    const count = this.data.length;
    let newIndex = -1;
    let oldIndex = -1;
    let i;
    this.logger.info(`Updating score of ${count} items`)
    for(i=0; i < count; i++) {
      if(newIndex == -1 && this.data[i].score < newScore) {
        newIndex = i;
      }
      if(oldIndex == -1 && this.data[i].id == id) {
        oldIndex = i;
      }
    }
    if(newIndex == -1) {
      newIndex = count;
    }

    if(oldIndex == -1) {
      return;
    }

    let updatedEntity = this.data[oldIndex];
    updatedEntity.score = newScore;
    updatedEntity.fights_total = totalFigths;
    updatedEntity.fights_win = fightsWin;
    updatedEntity.fights_lose = fightsLose;

    if(newIndex < oldIndex) {
      for(i=oldIndex; i > newIndex; i--) {
        this.data[i] = this.data[i-1];
        this.data[i].rank = i+1;
      }
      this.data[newIndex] = updatedEntity;
      updatedEntity.rank = newIndex+1;
    } else if(newIndex > oldIndex) {
      for(i=oldIndex; i < newIndex-1; i++) {
        this.data[i] = this.data[i+1];
        this.data[i].rank = i+1;
      }
      this.data[newIndex-1] = updatedEntity;
      updatedEntity.rank = newIndex;
    }
  }

  slice(id, range) {
    const count = this.data.length;
    let rank = 1;
    for(let i=0; i < count; i++) {
      if(this.data[i].id == id) {
        rank = i + 1;
      }
    }

    let upperMargin = Math.ceil((range-1)/2);
    let lowerMargin = Math.floor((range-1)/2);

    let upperMarginLimit = rank - 1;
    let lowerMarginLimit = this.data.length - rank;

    if(upperMargin > upperMarginLimit) {
      lowerMargin = lowerMargin + (upperMargin - upperMarginLimit);
      upperMargin = upperMarginLimit;
    }
    if(lowerMargin > lowerMarginLimit) {
      upperMargin = upperMargin + (lowerMargin - lowerMarginLimit);
      lowerMargin = lowerMarginLimit;
    }
    upperMargin = Math.min(upperMargin, upperMarginLimit);
    lowerMargin = Math.min(lowerMargin, lowerMarginLimit);

    let result = [];

    for(let i=rank-upperMargin-1; i <= rank+lowerMargin-1; i++) {
      result.push(this.data[i])
    }

    return result;
  }

  getData() {
    return this.data;
  }

  getLength() {
    return this.data.length;
  }

  findScriptByQuery(query) {
    const { ownerName, scriptName } = query;
    return this.data.find(script => ownerName === script.ownerName && scriptName === script.scriptName)
  }

  getFullSchedule() {
    const length = this.data.length
    const results = [];
    for (let i = 0; i < length - 1; i++) {
      for (let j = i + 1; j < length; j++) {
        results.push([this.data[j], this.data[i]]);
      }
    }
    this.logger.info(`Full schedule has ${length} battles`)
    return results;
  }

  getScheduleFromConfig(battles) {
    return battles.map(battle => {
      const [a, b] = battle;
      return [this.findScriptByQuery(a), this.findScriptByQuery(b)];
    });
  }

  getSchedule(battles) {
    return battles ? this.getScheduleFromConfig(battles) : this.getFullSchedule();
  }

  getNextBattle() {
    let count = this.data.length;
    if(count <= 1) {
      throw new Error('no opponents found for the league match');
    }

    if (!this.schedule)
      throw new Error('There is not configured schedule of battles');

    this.logger.info(`Getting next battle Items: ${this.schedule.length}` )

    const battle = Math.random() > 0.5 ? this.schedule.shift() : this.schedule.pop();
    if (!battle) {
      throw new Error('There are not more battles');
    }

    this.logger.info(`New Item obtained Items: ${this.schedule.length}`)

    return battle;
  }

  pickRandom() {
    let count = this.data.length;
    if(count <= 1) {
      throw new Error('no opponents found for the league match')
    }
    let rand1 = Math.random();
    let rand2 = Math.random();
    let index1 = Math.floor(rand1*count);
    let index2 = Math.floor(rand2*(count-1));
    if(index2 >= index1) {
      index2++;
    }

    return [
      this.data[0],
      this.data[1]
    ]
  }
}

module.exports = RankTable;
