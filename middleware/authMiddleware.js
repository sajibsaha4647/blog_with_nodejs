const User = require('../models/UserModel');

const bindUserWithRequest =  () => {
    return async (req, res, next) => {

        if (!req.session?.isLogedin) {
            return next();
        }

        try {
            const user = await User.findById(req.session.user.id);

            req.user = user;

            next();

        } catch (error) {
            console.log('Error in binding user with request', error);
            next(error);
        }
    }
}

const isAuthenticated = (req, res, next) => {
    if (req.session?.isLogedin) {
        return next();
    }
    res.status(401).render('pages/auth/signin', {
        title: 'Unauthorized',
        formData: req.body,
        errors: { authError: 'You must be logged in to access this page' }
    });
}

const isUnauthenticated = (req, res, next) => {

    if (req.session?.isLogedin) {
        return res.redirect('/dashboard');
    }

    next();
};

module.exports = {
    bindUserWithRequest,
    isAuthenticated,
    isUnauthenticated
}