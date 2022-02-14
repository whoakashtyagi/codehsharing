import fs from 'fs';
import passport from 'passport';
import { Strategy } from 'passport-saml';
import config from './config';


passport.use(
    new Strategy(
        {
            issuer: config.saml.issuer,
            protocol: 'http://',
            path: '/login/callback',
            entryPoint: config.saml.entryPoint,
            cert: fs.readFileSync(config.saml.cert, 'utf-8'),
            forceAuthn: true
        },
        function(_profile: any, done: (arg0: null, arg1: any) => any){ 
          return done(null, user);
    
  })
);

function user(arg0: null, user: any) {
  throw new Error('Function not implemented.');
}
