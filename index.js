const winston = require("winston");

const createLogger = (
  /** @type {{defaultMeta: {src: string, [metaKey: string]: string | number}, [error: string], [combined: string], [verbose: string]}}*/ opts
) => {
  const meta = opts.defaultMeta;

  const log = winston.createLogger({
    level: "info",
    defaultMeta: { ...meta },
  });

  log.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize({ all: true }),
        winston.format.simple()
      ),
    })
  );
  log.add(
    new winston.transports.File({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      filename: opts.error ?? "log/error.log",
      maxsize: 1024 * 1024,
      level: "error",
    })
  );

  log.add(
    new winston.transports.File({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      filename: opts.combined ?? `log/combined.log`,
      maxsize: 1024 * 1024,
    })
  );

  if (opts.verbose)
    log.add(
      new winston.transports.File({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
        filename: opts.verbose,
        maxsize: 1024 * 1024,
        level: "verbose",
      })
    );

  const trace =
    (string, method = "verbose") =>
    (value) => {
      log[method]("TRACE: " + string, { value });
      return value;
    };

  return { log, trace };
};

module.exports = createLogger;
