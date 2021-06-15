const Joi = require('joi');

module.exports = {
    //Validar el registro de un usuario
    registration: function(data) {
        const schema = Joi.object({
            nickname: Joi.string().required(),
            name: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
            address: Joi.object().optional(),
            phone: Joi.number().optional()
        });

        return schema.validate(data);
    },
    //Validar el crear un nuevo producto
    newProduct: function(data){
        const schema = Joi.object({
            sku: Joi.string().required(),
            name: Joi.string().required(),
            description: Joi.string().required(),
            stock: Joi.number().required(),
            price: Joi.number().required()
        });

        return schema.validate(data);
    },
    //Validar el Login
    login: function(data) {
        const schema = Joi.object({
            nickname: Joi.string().optional(),
            email: Joi.string().optional(),
            password: Joi.string().required(),
        });

        return schema.validate(data);
    }
};