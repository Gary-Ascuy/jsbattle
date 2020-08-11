module.exports = (config) => ({
  type: "string",
  min: 3,
  max: 32,
  pattern: /^[A-Za-z0-9\- .]+$/,
  ...config
});
