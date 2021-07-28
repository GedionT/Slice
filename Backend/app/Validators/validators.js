import Joi from '@hapi/joi';

export default {
    createAccount : Joi.object().keys({
        name: Joi.string().required(),
        number: Joi.number(),
        email: Joi.string().required(),
        githubUsername: Joi.string().required(),
        password: Joi.string().required()
    }),
    loginAccount : Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
    }),
}