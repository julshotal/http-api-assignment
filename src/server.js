const http = require('http');
const url = require('url');
const query = require('querystring');

const html = require('./htmlResponses.js');
const json = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);
  const params = query.parse(parsedURL.query);

  switch (parsedURL.pathname) {
    case '/':
      html.getIndex(request, response);
      break;
    case '/style.css':
      html.getCSS(request, response);
      break;
    case '/success':
      json.success(request, response);
      break;
    case '/badRequest':
      json.badRequest(request, response, params);
      break;
    case '/unauthorized':
      json.unauthorized(request, response, params);
      break;
    case '/forbidden':
      json.forbidden(request, response);
      break;
    case '/internal':
      json.success(request, response);
      break;
    case '/notImplemented':
      json.notImplemented(request, response);
      break;
    default:
      html.getIndex(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);
