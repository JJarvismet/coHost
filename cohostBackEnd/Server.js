const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');

const port = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database Connected');
});
app.use(express.urlencoded({ extended: true }));
app.use(jsonParser)

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000*60*60*24*7
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/trip', require('./routes/tripRoutes'));



if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../cohostFrontEnd/build')))
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, '../', 'cohostFrontEnd', 'build', 'index.html')))
}else{
    app.get('/', (req,res) => res.send('please set to production'))
}

app.use(errorHandler);

app.listen(port,()=>{
    console.log(`backend live on port ${port}`);
})