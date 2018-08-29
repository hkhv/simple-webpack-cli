# simple-webpack-cli

folder | usage
-------|-------
/dist | site output
/src | source code, use webpack to bundle to ``/dist``

## Run & Publish

### Develop mode

```
npm run dev
```

By running command of dev mode, it will use ``webpack-dev-server`` to serve an auto-refresh site at ``127.0.0.1:3001``.

### Production mode

```
npm run build
```

It will bundle ``/src`` to ``/dist``, the outputs are all minified and can be directly serve on the remote server.

What the remote server need is just a static web server, ``nginx`` is enough.
