import Joi from '@hapi/joi'
import messagesValidations from 'src/globalConfig/messages/messagesValidations'

const groupSchema = Joi.object({
  name_group: Joi.string()
    .min(3)
    .max(50)
    .required()
    .warning('custom.x', { w: 'world' })
    .messages(messagesValidations),

  description: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages(messagesValidations),
  active: Joi.boolean(),
})
export default groupSchema
