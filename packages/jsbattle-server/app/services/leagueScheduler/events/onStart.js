function isBetween(range, date) {
  return date > range.start && date < range.end;
}

module.exports = function() {
  this.logger.info('Starting scheduling loop at ' + this.settings.scheduleInterval + 'ms')

  const disabledIntervals = this.settings.disabledIntervals || []
  this.loop = setInterval(async () => {
    const now = new Date().toISOString();

    if (disabledIntervals.some(range => isBetween(range, now))) {
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
