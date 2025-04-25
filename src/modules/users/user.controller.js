const getMeHandler = async (request, h) => {
    return h.response({ user: request.auth.user });
  };
  
  module.exports = { getMeHandler };
  