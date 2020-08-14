const { ValidationError } = require("moleculer").Errors;
const stripComments = require('strip-comments');
const JavaScriptObfuscator = require('javascript-obfuscator');

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

  let script = await ctx.call('scriptStore.getUserScript', { id: ctx.params.scriptId });

  if(script.ownerId != userId) {
    throw new ValidationError('Not Authorized!', 401);
  }

  let currentSubmission = await ctx.call('league.getUserSubmission', {});
  let startingScore = 0;
  if(ctx.params.scriptId === currentSubmission.scriptId) {
    startingScore = 0; // currentSubmission.score;
  }

  await ctx.call('league.leaveLeague', {});

  let code = script.code;
  if(this.settings.obfuscate) {
    try {
      let prevSize = Math.round(code.length/1024);
      code = stripComments(code);
      code = code.replace(/importScripts\w*\([^)]*\)/g, '');
      code = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        controlFlowFlattening: false,
        deadCodeInjection: false,
        debugProtection: false,
        debugProtectionInterval: false,
        disableConsoleOutput: true,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        renameGlobals: false,
        rotateStringArray: true,
        selfDefending: true,
        shuffleStringArray: true,
        splitStrings: false,
        stringArray: true,
        stringArrayEncoding: false,
        stringArrayThreshold: 0.75,
        unicodeEscapeSequence: false
      }).getObfuscatedCode();
      let currentSize = Math.round(code.length/1024);
      this.logger.info(`Code obfuscated ${prevSize}K -> ${currentSize}K`);

    } catch (err) {
      this.logger.warn(err);
    }
  } else {
    this.logger.info(`Code obfuscation disabled`);
  }

  const entity = await ctx.call('league.create', {
    ownerId: script.ownerId,
    ownerName: script.ownerName,
    scriptId: script.id,
    scriptName: script.scriptName,
    code: code,
    hash: script.hash,
    score: startingScore
  });

  this.ranktable.add({
    id: entity.id,
    ownerId: entity.ownerId,
    ownerName: entity.ownerName,
    scriptId: entity.scriptId,
    scriptName: entity.scriptName,
    joinedAt: entity.joinedAt,
    fights_total: entity.fights_total,
    fights_win: entity.fights_win,
    fights_lose: entity.fights_lose,
    fights_error: entity.fights_error,
    score: entity.score
  });

  return ctx.call('league.getLeagueSummary', {});
}
