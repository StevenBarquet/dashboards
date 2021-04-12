import Joi from '@hapi/joi'
import messagesValidations from 'src/globalConfig/messages/messagesValidations'

const companySchema = Joi.object({
  name_company: Joi.string()
    .min(3)
    .max(30)
    .required()
    .warning('custom.x', { w: 'world' })
    .messages(messagesValidations),

  description: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages(messagesValidations),
  active: Joi.boolean(),
})
export default companySchema
