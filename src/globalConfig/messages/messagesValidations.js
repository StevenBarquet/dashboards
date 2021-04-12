const messagesValidations = {
  'string.base': `El campo debe ser un texto`,
  'string.empty': `El campo no puede estar vacío`,
  'string.min': `La logitud mínima del campo es de  {#limit}`,
  'string.max': `La longitud máxima del campo es de {#limit}`,
  'string.required': `Campo requerido`,
  'string.email':
    'El formato del correo es inválido, debe contener "@" & ".com',
  'any.only': 'El campo debe ser igual al password',
  'any.required': 'Seleccione una opción',
  'array.min': 'Debe seleccionar al menos una opción',
  'custom.queryFalse': 'El query no es válido',
}
export default messagesValidations
