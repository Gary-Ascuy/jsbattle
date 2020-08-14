const { ValidationError } = require("moleculer").Errors;

function isBetween(range, date) {
  return date > range.start && date < range.end;
}

module.exports = async function(ctx) {
  const userId = ctx.meta.user ? ctx.meta.user.id : null;
  if(!userId) {
    throw new ValidationError('Not Authorized!', 401);
  }

  const disabledJoinIntervals = this.settings.disabledJoinIntervals || []
  const now = new Date().toISOString();
  if (disabledJoinIntervals.some(range => isBetween(range, now))) {
    this.logger.info('Schedule Disabled');
    throw new ValidationError('Invalid Period Time', 404);
  }

  let submissions = await ctx.call('league.find', {
    query: {
      ownerId: userId
    }
  });

  let removals = submissions.map((submission) => ctx.call('league.remove', {
      id: submission.id
  }));

  for(let submission of submissions) {
    this.ranktable.remove(submission.id)
  }

  await Promise.all(removals);

  return ctx.call('league.getLeagueSummary', {});
}
