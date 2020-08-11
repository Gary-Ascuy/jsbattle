module.exports = function() {
  const providerName = {
    github: "GitHub",
    facebook: "Facebook",
    google: "Google",
    mock: "Mock",
    keycloak: "Jala Account"
  }

  const authConfig = this.settings.auth;
  const webConfig = this.settings.web;
  if(!authConfig.enabled) {
    return {};
  }
  let result = {};
  for(let i=0; i < authConfig.providers.length; i++) {
    let provider = authConfig.providers[i]
    result[provider.name] = {
      name: providerName[provider.name] || provider.name,
      url: webConfig.baseUrl + '/auth/' + provider.name
    }
  }
  return result;
}
