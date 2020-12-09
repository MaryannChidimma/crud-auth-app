const bunyan = require('bunyan');
const path = require('path');
const seq = require('bunyan-seq');
const logPath = path.join(__dirname, "../../logs/logs" + Date.now() + ".json");
const fs = require('fs');
//Load package.json
const pjs = require('../../package.json');

//Get meta data info from package.json
const { name, version } = pjs;

//setup a logger instance
const getLogger = (serviceName, serviceVersion, level, env) => {
  if (env === 'development')
    return bunyan.createLogger({
      name: `${serviceName}:${serviceVersion}`,
      serializers: { err: bunyan.stdSerializers.err },
      streams: getLoggerStreams(env)
    });
};

const getLoggerStreams = (env) => {
  var streams = [
    seq.createStream({
      serverUrl: 'http://localhost:5341',
      level: 'error'
    })
  ];

  if (env === 'development') {
    return streams = [
      ...streams,
      {
        type: "file",
        path: logPath,
        level: 'error'
      },
      {
        stream: process.stdout,
        level: 'warn',
      },
      {
        stream: process.stdout,
        level: 'info',
      }
    ];
  }

  return streams;

};


//Configuration option for different environments
module.exports = {
  development: {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(name, version, 'debug', "development"),
  },
  production: {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(name, version, 'info', "production"),
  },
  test: {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(name, version, 'fatal', "test"),
  },
};

