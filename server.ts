import http from 'http';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import config from './config/config';
import './config/passport';

const router = express();

/** Server Handling */
const httpServer = http.createServer(router);


router.use(session(config.session));
router.use(passport.initialize());
router.use(passport.session());
router.use(express.urlencoded({ extended: false })); 
router.use(express.json()); 


/** Passport & SAML Routes */
router.get('/login', passport.authenticate('config1', config.saml.options), (req, res, next) => {
    return res.redirect('/');
});

router.get('/forcelogin', passport.authenticate('config2', config.saml.options), (req, res, next) => {
    return res.redirect('/');
});

router.post('/login/callback', passport.authenticate('config1', config.saml.options), (req, res, next) => {
    return res.redirect('/');
});

router.get('/', (req, res)=>{
    return res.json("welcome, USER!!");
})

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});
console.log('Server is running');
httpServer.listen(1337);

