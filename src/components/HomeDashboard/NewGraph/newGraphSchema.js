import Joi from '@hapi/joi'
import messagesValidations from 'src/globalConfig/messages/messagesValidations'

const newGraphSchema = Joi.object({
  title: Joi.string()
    .max(48)
    .required()
    .messages(messagesValidations),

  description: Joi.string()
    .max(256)
    .required()
    .messages(messagesValidations),

  type: Joi.string()
    .max(256)
    .required()
    .messages(messagesValidations),

  cols: Joi.number()
    .required()
    .messages(messagesValidations),

  query: Joi.string()
    .required()
    .messages(messagesValidations),

  id_graph: Joi.number()
    .optional()
    .empty(),
})
export default newGraphSchema
