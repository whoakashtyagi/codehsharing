import fs from 'fs';
import passport from 'passport';
import { Strategy } from 'passport-saml';
import config from './config';
import logging from './logging';

const savedUsers: Express.User[] = [];

passport.serializeUser<Express.User>((expressUser, done) => {
    logging.info(expressUser, 'Serialize User');
    done(null, expressUser);
});

passport.deserializeUser<Express.User>((expressUser, done) => {
    logging.info(expressUser, 'Deserialize User');

    done(null, expressUser);
});

passport.use('config1',
    new Strategy(
        {
            issuer: config.saml.issuer,
            protocol: 'http://',
            path: '/login/callback',
            entryPoint: config.saml.entryPoint,
            cert: fs.readFileSync(config.saml.cert, 'utf-8'),
            
        },
        (expressUser: any, done: any) => {
            if (!savedUsers.includes(expressUser)) {
                savedUsers.push(expressUser);
            }

            return done(null, expressUser);
        }
    )
);

passport.use('config2',
    new Strategy(
        {
            issuer: config.saml.issuer,
            protocol: 'http://',
            path: '/login/callback',
            entryPoint: config.saml.entryPoint,
            cert: fs.readFileSync(config.saml.cert, 'utf-8'),
            forceAuthn: true
        },
        (expressUser: any, done: any) => {
            if (!savedUsers.includes(expressUser)) {
                savedUsers.push(expressUser);
            }

            return done(null, expressUser);
        }
    )
);
