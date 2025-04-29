import * as winston from 'winston';

// Create a custom logger
const logger = winston.createLogger({
  level: 'info', // You can set the log level (info, debug, warn, error, etc.)
  format: winston.format.combine(
    winston.format.timestamp(), // Adds timestamp to logs
    winston.format.printf(
      ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: 'logs/app.log' }), // Optionally, you can save logs to a file
  ],
});

export default logger;
