const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const authRoute = require('./routes/authRoutes')
const validatorRoutes = require('./playground/validator')

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');


const middleware = [
  morgan('dev'),
  express.static('public'),
  express.urlencoded({ extended:true }),
  express.json()
]
app.use(middleware)

app.use((req, res, next) => {

  let isLogedin =
    req.get('Cookie')?.split('=')[1] === 'true'
      ? true
      : false;

  res.locals.isLogedin = isLogedin;

  next();
});

app.use('/auth',authRoute)
app.use('/validator',validatorRoutes)
app.get('/',(req,res)=>{
  res.render('pages/home/index', { title:"Exp Blog", isLogedin: res.locals.isLogedin })
})


const port = process.env.PORT || 8080;

mongoose.connect('mongodb://127.0.0.1:27017/blog-collection')
  .then(() => {
    console.log('✅ MongoDB connected locally');

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ FULL ERROR:', err.message);
  });
