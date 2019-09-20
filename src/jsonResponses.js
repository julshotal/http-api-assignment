const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respond = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(object);
  response.end();
};


const success = (request, response, type) => {
  const responseJSON = {
    message: 'This was a success',
    id: 'success',
  };

  if(type === 'application/json') {
    respondJSON(request, response, 200, responseJSON);
  } else if (type === 'text/xml') {
    
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;    

    return respond(request, response, 200, responseXML);
  }
 
};

const badRequest = (request, response, params, type) => {
  const responseJSON = {
    message: 'Has required params',
    id: 'badRequest',
  };

  if(type === 'application/json') {

    if (!params.valid || params.valid !== 'true') {
      responseJSON.message = 'Missing valid parameter';
      responseJSON.id = 'badRequest';
      return respondJSON(request, response, 400, responseJSON);
    }
  
    return respondJSON(request, response, 200, responseJSON);

  }  else if (type === 'text/xml') {

    if (!params.valid || params.valid !== 'true') {
      responseJSON.message = 'Missing valid parameter';
      responseJSON.id = 'badRequest';

      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;

      return respond(request, response, 400, responseXML);
    }
    
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;    

    return respond(request, response, 200, responseXML);
  }
};

const unauthorized = (request, response, params, type) => {
  const responseJSON = {
    message: 'Missing loggedIn query parameter set to yes, unauthorized',
    id: 'unauthorized',
  };

  if(type === 'application/json') {

    if (params.loggedIn !== 'yes') {
      responseJSON.id = 'unauthorized';
      return respondJSON(request, response, 401, responseJSON);
    }

    responseJSON.message = 'loggedIn query parameter set to yes';
    return respondJSON(request, response, 200, responseJSON);

  } else if (type === 'text/xml') {
    if (params.loggedIn !== 'yes') {

      responseJSON.id = 'unauthorized';

      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;    
  
      return respond(request, response, 401, responseXML);
    }

    responseJSON.message = 'loggedIn query parameter set to yes';

    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;    

    
    return respond(request, response, 200, responseXML);
  }
 
};

const forbidden = (request, response, type) => {
  const responseJSON = {
    message: 'Request understood, access is forbidden',
    id: 'forbidden',
  };

  if(type === 'application/json') {

    return respondJSON(request, response, 403, responseJSON);

  } else if (type === 'text/xml') {
    
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;    

    return respond(request, response, 403, responseXML);
  }
};

const internal = (request, response, type) => {
  const responseJSON = {
    message: 'Internal server error',
    id: 'internalError',
  };

  if(type === 'application/json') {
    return respondJSON(request, response, 500, responseJSON);
  } else if (type === 'text/xml') {
    
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;    

    return respond(request, response, 500, responseXML);
  }
 
};

const notImplemented = (request, response, type) => {
  const responseJSON = {
    message: 'Not implemented',
    id: 'notImplemented',
  };

  if(type === 'application/json') {

    return respondJSON(request, response, 501, responseJSON);

  } else if (type === 'text/xml') {
    
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;    

    return respond(request, response, 501, responseXML);
  }
 
};

const notFound = (request, response, type) => {
  const responseJSON = {
    message: 'The page is not found',
    id: 'notFound',
  };

  if(type === 'application/json') {

    respondJSON(request, response, 404, responseJSON);

  } else if (type === 'text/xml') {
    
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;    

    return respond(request, response, 404, responseXML);
  }

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
