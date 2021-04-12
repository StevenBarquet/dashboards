import Joi from '@hapi/joi'
import messagesValidations from 'src/globalConfig/messages/messagesValidations'

const generalDataSchema = Joi.object({
  name_dashboard: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages(messagesValidations),

  description: Joi.string()
    .min(3)
    .max(200)
    .required()
    .messages(messagesValidations),

  id_company: Joi.number()
    .messages(messagesValidations)
    .required(),

  user_elastic: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages(messagesValidations),

  password_elastic: Joi.string()
    .min(6)
    .max(30)
    .required()
    .messages(messagesValidations),

  confirmPass_dashboard: Joi.string()
    .required()
    .valid(Joi.ref('password_elastic'))
    .messages(messagesValidations),

  url_dashboard: Joi.string()
    .min(3)
    .max(300)
    .required()
    .messages(messagesValidations),

  index: Joi.string()
    .required()
    .messages(messagesValidations),
})
export default generalDataSchema
