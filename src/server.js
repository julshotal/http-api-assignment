const http = require('http');
const url = require('url');
const query = require('querystring');

const html = require('./htmlResponses.js');
const json = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);
  const params = query.parse(parsedURL.query);

  const acceptedTypes = request.headers.accept.split(',');

  switch (parsedURL.pathname) {
    case '/':
      html.getIndex(request, response, acceptedTypes[0]);
      break;
    case '/style.css':
      html.getCSS(request, response, acceptedTypes[0]);
      break;
    case '/success':
      json.success(request, response, acceptedTypes[0]);
      break;
    case '/badRequest':
      json.badRequest(request, response, params, acceptedTypes[0]);
      break;
    case '/unauthorized':
      json.unauthorized(request, response, params, acceptedTypes[0]);
      break;
    case '/forbidden':
      json.forbidden(request, response, acceptedTypes[0]);
      break;
    case '/internal':
      json.internal(request, response, acceptedTypes[0]);
      break;
    case '/notImplemented':
      json.notImplemented(request, response, acceptedTypes[0]);
      break;
    default:
      json.notFound(request, response, acceptedTypes[0]);
      break;
  }
};

http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);
