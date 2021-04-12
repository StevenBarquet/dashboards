import Joi from '@hapi/joi'
import messagesValidations from 'src/globalConfig/messages/messagesValidations'

const schemaLogin = Joi.object({
  password: Joi.string()
    .min(6)
    .required()
    .messages(messagesValidations),

  confirm: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .messages(messagesValidations),
})
export default schemaLogin
