import Joi from '@hapi/joi'
import messagesValidations from 'src/globalConfig/messages/messagesValidations'

const userSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .warning('custom.x', { w: 'world' })
    .messages(messagesValidations),

  surname_maternal: Joi.string()
    .min(3)
    .max(30)
    .required()
    .warning('custom.x', { w: 'world' })
    .messages(messagesValidations),

  surname_paternal: Joi.string()
    .min(3)
    .max(30)
    .required()
    .warning('custom.x', { w: 'world' })
    .messages(messagesValidations),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .messages(messagesValidations),

  password: Joi.string()
    .min(6)
    .max(20)
    .required()
    .messages(messagesValidations),

  confirmPassword: Joi.string()
    .min(6)
    .max(20)
    .required()
    .valid(Joi.ref('password'))
    .messages(messagesValidations),

  id_company: Joi.number()
    .required()
    .messages(messagesValidations),

  id_group: Joi.number()
    .messages(messagesValidations)
    .required(),

  photo_base64: Joi.string(),

  active: Joi.boolean(),
})
export default userSchema
