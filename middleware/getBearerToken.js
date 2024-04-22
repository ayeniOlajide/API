module.exports = (req, res, next) => {
  try {
    const authorization = req.get('authorization');

    if (!(authorization && authorization.toLowerCase().startsWith('bearer'))) {
      throw new Error();
    }

   
    const token = authorization.substring(7);

    req.token = token;

    next();
  } catch (err) {

    err.source = 'jwt middleware error';

    
    next(err);
  }
};
