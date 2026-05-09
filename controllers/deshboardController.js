const deshboardGetRoute = (req, res,next) => {
    res.render('pages/home/index', {
        title: 'Dashboard'
    });
};

module.exports = {
    deshboardGetRoute
};