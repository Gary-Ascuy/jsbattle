
const ranges = [{
  start: '2020-08-14T02:23:59.252Z', end: '2020-08-14T02:48:00.252Z'
}]

function isBetween(range, date) {
  return date > range.start && date < range.end;
}

module.exports = function() {
  this.logger.info('Starting scheduling loop at ' + this.settings.scheduleInterval + 'ms')
  this.loop = setInterval(async () => {
    const now = new Date().toISOString();

    if (ranges.some(range => isBetween(range, now))) {
      this.logger.info('Schedule Disabled');
      return;
    }

    try {
      await this.broker.call('leagueScheduler.scheduleBattle', {})
    } catch(err) {
      this.logger.warn(err)
    }
  }, this.settings.scheduleInterval)
}
