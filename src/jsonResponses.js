const respond = (request, response, status, object, type) => {
  response.writeHead(status, { 'Content-Type': type });

  if (type === 'application/json') {
    response.write(JSON.stringify(object));
  } else {
    response.write(object);
  }

  response.end();
};


const success = (request, response, type) => {
  const responseJSON = {
    message: 'This was a success',
    id: 'success',
  };

  if (type === 'application/json') {
    respond(request, response, 200, responseJSON, 'application/json');
  }

  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
  responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
  responseXML = `${responseXML} </response>`;

  return respond(request, response, 200, responseXML, 'text/xml');
};

const badRequest = (request, response, params, type) => {
  const responseJSON = {
    message: 'Has required params',
    id: 'badRequest',
  };

  if (type === 'application/json') {
    if (!params.valid || params.valid !== 'true') {
      responseJSON.message = 'Missing valid parameter';
      responseJSON.id = 'badRequest';
      return respond(request, response, 400, responseJSON, 'application/json');
    }

    return respond(request, response, 200, responseJSON, 'application/json');
  }

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid parameter';
    responseJSON.id = 'badRequest';

    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 400, responseXML, 'text/xml');
  }

  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
  responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
  responseXML = `${responseXML} </response>`;

  return respond(request, response, 200, responseXML, 'text/xml');
};

const unauthorized = (request, response, params, type) => {
  const responseJSON = {
    message: 'Missing loggedIn query parameter set to yes, unauthorized',
    id: 'unauthorized',
  };

  if (type === 'application/json') {
    if (params.loggedIn !== 'yes') {
      responseJSON.id = 'unauthorized';
      return respond(request, response, 401, responseJSON, 'application/json');
    }

    responseJSON.message = 'loggedIn query parameter set to yes';
    return respond(request, response, 200, responseJSON, 'application/json');
  }

  if (params.loggedIn !== 'yes') {
    responseJSON.id = 'unauthorized';

    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 401, responseXML, 'text/xml');
  }

  responseJSON.message = 'loggedIn query parameter set to yes';

  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
  responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
  responseXML = `${responseXML} </response>`;


  return respond(request, response, 200, responseXML, 'text/xml');
};

const forbidden = (request, response, type) => {
  const responseJSON = {
    message: 'Request understood, access is forbidden',
    id: 'forbidden',
  };

  if (type === 'application/json') {
    return respond(request, response, 403, responseJSON, 'application/json');
  }

  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
  responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
  responseXML = `${responseXML} </response>`;

  return respond(request, response, 403, responseXML, 'text/xml');
};

const internal = (request, response, type) => {
  const responseJSON = {
    message: 'Internal server error',
    id: 'internalError',
  };

  if (type === 'application/json') {
    return respond(request, response, 500, responseJSON, 'application/json');
  }

  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
  responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
  responseXML = `${responseXML} </response>`;

  return respond(request, response, 500, responseXML, 'text/xml');
};

const notImplemented = (request, response, type) => {
  const responseJSON = {
    message: 'Not implemented',
    id: 'notImplemented',
  };

  if (type === 'application/json') {
    return respond(request, response, 501, responseJSON, 'application/json');
  }

  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
  responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
  responseXML = `${responseXML} </response>`;

  return respond(request, response, 501, responseXML, 'text/xml');
};

const notFound = (request, response, type) => {
  const responseJSON = {
    message: 'The page is not found',
    id: 'notFound',
  };

  if (type === 'application/json') {
    respond(request, response, 404, responseJSON, 'application/json');
  }

  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
  responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
  responseXML = `${responseXML} </response>`;

  return respond(request, response, 404, responseXML, 'text/xml');
};

module.exports = {
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
};
