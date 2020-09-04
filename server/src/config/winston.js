import appRoot from "app-root-path";
import winston from "winston";

const dateFormat = () => {
  return new Date(Date.now()).toUTCString();
};

const logger = winston.createLogger({
  transports: [
    // info console log
    new winston.transports.Console({
      level: "info",
      name: "info-console",
      colorize: true,
      timestamp: () => dateFormat(),
      formatter: options => `[${options.timestamp()}]: ${options.message || ""}`
    }),
    // info log file
    new winston.transports.File({
      level: "info",
      name: "info-file",
      filename: `${appRoot}/logs/info.log`,
      format: winston.format.printf(info => {
        let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${
          info.message
        }"
        `;
        return message;
      }),
      json: false
    }),
    // errors console log
    new winston.transports.Console({
      level: "error",
      name: "error-console",
      colorize: true,
      timestamp: () => dateFormat(),
      formatter: options => `[${options.timestamp()}]: ${options.message || ""}`
    }),
    // errors log file
    new winston.transports.File({
      level: "error",
      name: "error-file",
      filename: `${appRoot}/logs/error.log`,
      timestamp: () => dateFormat(),
      format: winston.format.printf(info => {
        let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${
          info.message
        }"
        `;
        return message;
      }),
      json: false
    })
  ]
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  }
};

export default logger;
