const getProfile = async (req, h) => {
    const user = req.auth.user;
    return h.response(user).code(200);
  };
  
  module.exports = { getProfile };
  