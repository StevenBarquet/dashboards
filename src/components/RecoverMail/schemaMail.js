import Joi from '@hapi/joi'
import messagesValidations from 'src/globalConfig/messages/messagesValidations'

const schemaLogin = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .message('El formato del correo es inválido, debe contener "@" & ".com"')
    .messages(messagesValidations),
})
export default schemaLogin
