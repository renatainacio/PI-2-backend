import Joi from "joi"

const clientSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\d{10,11}$/).required()
})

export default clientSchema