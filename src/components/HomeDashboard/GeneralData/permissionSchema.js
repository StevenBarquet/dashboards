import Joi from '@hapi/joi'
import messagesValidations from 'src/globalConfig/messages/messagesValidations'

const permissionSchema = Joi.object({
  id_users: Joi.array()
    .min(1)
    .messages(messagesValidations),
})
export default permissionSchema
