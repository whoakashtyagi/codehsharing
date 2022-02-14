const config = {
    saml: {
        cert: './source/config/saml.pem',
        entryPoint: 'https://akash-dev.onelogin.com/trust/saml2/http-post/sso/23312094-037a-459f-a235-223ded17218a',
        issuer: 'http://localhost:1337',
        // forceAuthn: true,
        options: {
            failureRedirect: '/login',
            failureFlash: true,
            forceAuthn: true
        }
    },
    server: {
        port: 1337
    },
    session: {
        resave: true,
        secret: 'supersecretamazingpassword',
        saveUninitialized: true
    }
};

export default config;