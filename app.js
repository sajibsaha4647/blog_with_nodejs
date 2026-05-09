const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const authRoute = require('./routes/authRoutes')
const validatorRoutes = require('./playground/validator')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const  { bindUserWithRequest } = require('./middleware/authMiddleware')
const setLocals = require('./middleware/setLocals');
const deshboardRoute = require('./routes/deshboardRoute');
const app = express();
const MongoDBUri = 'mongodb://127.0.0.1:27017/blog-collection';
app.set('view engine', 'ejs');
app.set('views', './views');


//express session store in mongoDB
var store = new MongoDBStore({
  uri: MongoDBUri,
  collection: 'mySessions'
});

// Catch errors
store.on('error', function(error) {
  console.log(error);
});



const middleware = [
  morgan('dev'),
  express.static('public'),
  express.urlencoded({ extended:true }),
  express.json(),
  session({
    secret: process.env.SESSION_SECRET || 'mysecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false , maxAge: 1000 * 60 * 60 * 24 },
    store: store,
  }),
  bindUserWithRequest(),
  setLocals
]
app.use(middleware)

// app.use((req, res, next) => {

//   let isLogedin =
//     req.get('Cookie')?.split('=')[1] === 'true'
//       ? true
//       : false;

//   res.locals.isLogedin = isLogedin;

//   next();
// });

app.use('/auth',authRoute)
app.use('/validator',validatorRoutes)
app.use('/dashboard',deshboardRoute)


app.get('/', (req, res) => {

    if (req.session.isLogedin) {
        return res.redirect('/dashboard');
    }

    res.redirect('/auth/signin');
});

app.use((req, res, next) => {

    res.status(404).render('pages/errors/404', {
        title: '404 Not Found'
    });

});





const port = process.env.PORT || 8080;

mongoose.connect(MongoDBUri)
  .then(() => {
    console.log('✅ MongoDB connected locally');

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ FULL ERROR:', err.message);
  });
