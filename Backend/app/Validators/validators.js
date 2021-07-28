import Joi from '@hapi/joi';

export default {
    createAccount : Joi.object().keys({
        name: Joi.string().required(),
        number: Joi.number().allow(null,''),
        email: Joi.string().required(),
        githubUsername: Joi.string().required(),
        password: Joi.string().required()
    }),
    loginAccount : Joi.object().keys({
        githubUsername: Joi.string().required(),
        password: Joi.string().required(),
    }),
}