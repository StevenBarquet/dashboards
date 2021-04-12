import Joi from '@hapi/joi'
import messagesValidations from 'src/globalConfig/messages/messagesValidations'

const userUpdateSchema = Joi.object({
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
    .message('El formato del correo es inválido, debe contener "@" & ".com"')
    .messages(messagesValidations),

  id_company: Joi.number()
    .messages(messagesValidations)
    .required(),

  id_group: Joi.number()
    .messages(messagesValidations)
    .required(),

  photo_base64: Joi.string(),

  active: Joi.boolean(),
})
export default userUpdateSchema
