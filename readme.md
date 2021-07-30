## Drop-in-Winston

This package exists purely so I don't have to constantly add the exact same patterns for my projects.

Syntax to initialize Winston essentially comes out to requiring the package and then calling it with an object of metadata that includes a key named "src" and optionally paths for logging files. I use src as the file path the function is in but it can be anything at all and you can add as many keys as you like to that object. By default errors go to log/error.log and everything (including errors but excepting verbose) goes to log/combined.log by default.

```js
const { getLogger } = require("drop-in-winston");
const { log, trace } = getLogger({
  defaultMeta: { src: "index.js" },
  error: "log/error.log",
  combined: "log/combined",
  verbose: "",
});

log.info("oh look, a log message", {
  variables: [blah, blah2, blah3],
});
```

Trace is a useful function for functional programming patterns involving composition. It takes a string (and optionally a logging level, defaults to 'info') as a parameter and returns a function that logs whatever value is passed to it before returning that value.

```js
const { getLogger } = require("drop-in-winston");
const { log, trace } = getLogger({
  defaultMeta: { src: "index.js" },
  error: "log/error.log",
  combined: "log/combined",
  verbose: "",
});

pipe(someFn, trace("Look at this trace", "verbose"), someOtherFn);
```
