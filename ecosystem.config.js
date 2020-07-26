module.exports = {
  apps : [{
    name: 'jsbattle',
    script: "/path/to/file/jsbattle/dist/jsbattle.js",
    cwd: __dirname,
    args: "start --config /path/to/file/jsbattle/config.json",
    instances: 1,
    autorestart: true,
    watch: false,
    wait_ready: true
  }]
};
