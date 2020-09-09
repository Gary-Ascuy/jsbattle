const { ValidationError } = require("moleculer").Errors;

module.exports = async function(ctx) {
  let user = ctx.params.user;
  if(!user) {
    throw new ValidationError('user parameter is required', 400);
  }
  if(!user.extUserId) {
    throw new ValidationError('user.extUserId parameter is required', 400);
  }
  if(!user.username && !user.email && !user.displayName) {
    throw new ValidationError('user.usernamem, user.email or user.displayName parameter is required', 400);
  }
  if(!user.provider) {
    throw new ValidationError('user.provider parameter is required', 400);
  }

  // First User Creation, @ it is not required
  const jalaMail = /\@jalasoft.com$/ig
  user.username = user.username.replace(jalaMail, '')

  let response;
  response = await ctx.call('userStore.find', {query: {
    extUserId: user.extUserId
  }});

  if(response.length > 0) {
    return response[0];
  }
  let admins = this.settings.admins;

  let role = 'user';
  admins = admins.find((admin) => admin.provider == user.provider && admin.username == user.username);

  if(admins) {
    role = 'admin';
  }
  let userModel = {
    extUserId: user.extUserId,
    username: user.username,
    provider: user.provider,
    email: user.email,
    displayName: user.displayName || user.username,
    createdAt: new Date(),
    role: role,
    lastLoginAt: new Date()
  }
  response = await ctx.call('userStore.create', userModel);
  return response;
}
