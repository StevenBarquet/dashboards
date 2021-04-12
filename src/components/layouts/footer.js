import React from 'react'
import { Layout } from 'antd'
import { FormattedMessage } from 'react-intl'

const { Footer } = Layout

const FooterMain = () => {
  return (
    <Footer className="layout-footer">
      <FormattedMessage id="footer.content" />
    </Footer>
  )
}

export default FooterMain
