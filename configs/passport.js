const {Strategy, ExtractJwt} = require('passport-jwt');
const config = require('./jwtConfig')
const secret = config.secret;

const { User } = require('../database')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}

module.exports = passport => {
    passport.use(
        new Strategy(opts, (payload, done) => {
            User.findOne({
                where: {
                    id: payload.id
                }
            })
                .then(user => {
                    if(user){
                        return done(null, {
                            id: user.id,
                            email: user.email,
                        });
                    }
                    return done(null, false);
                })
                .catch(err => console.error(err));
        })
    )
}