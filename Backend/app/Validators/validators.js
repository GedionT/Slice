import Joi from '@hapi/joi';
//Validation the login and signup data
export default {
    createAccount : Joi.object().keys({
        name: Joi.string().required(),
        number: Joi.string().allow(null,''),
        email: Joi.string().required(),
        githubUsername: Joi.string().required(),
        password: Joi.string().required()
    }),
    loginAccount : Joi.object().keys({
        githubUsername: Joi.string().required(),
        password: Joi.string().required(),
    }),
}