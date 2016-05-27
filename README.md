# sarif-web

An experimental web dashboard for [sarif](http://github.com/sarifsystems/sarif).
It is running entirely client-side in the browser and can connect to any Sarif
server over WebSocket, even locally. A continuous build of the master branch is
available [here on GitHub Pages](https://sarifsystems.github.io/sarif/sarif-web).

![Example Screenshot](https://raw.githubusercontent.com/sarifsystems/sarif-web/master/docs/demo.png)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm test
```

## Connecting to your local server

1. Make sure the `web` module is enabled in your `sarif/sarifd.json` configuration.
2. Choose or set an Auth Token in the configuration under `web.ApiKeys` and note
   the port of the web service.
3. In the web interface, enter the URL `ws://your-host:port/stream/sarif` and your
   auth token. Or `wss://` for WebSockets over TLS.
