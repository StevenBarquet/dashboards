import { useIntl } from 'react-intl'

const parseLabels = message => {
  const { formatMessage } = useIntl()
  return formatMessage({ id: message })
}

export default parseLabels
