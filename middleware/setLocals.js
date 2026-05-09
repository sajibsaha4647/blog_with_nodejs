module.exports = (req, res, next) => {

    res.locals.isLogedin = req.session?.isLogedin || false;

    res.locals.user = req.user || null;

    next();
};