
module.exports = async function(ctx) {
  try {
    let opponents = this.ranktable.getNextBattle();
    let opponent1 = await ctx.call('league.get', {id: opponents[0].id})
    let opponent2 = await ctx.call('league.get', {id: opponents[1].id})
    return [
      opponent1,
      opponent2
    ]
  } catch(error) {
    return null
  }
}
