/* eslint-disable camelcase */
import React from 'react'
import { Divider } from 'antd'
/**
 * This component is reused to create and update the dashboards, to create you need to validate the schema "GeneralSchema",
 * this one excludes the array of user permissions of the view because permissions component is used in the update operation
 */
const GeneralData = props => {
  const { dashboard } = props
  const { data } = dashboard

  const initialState = {
    hasFeedback: false,
    form: {
      name_dashboard: data ? data.name_dashboard : '',
      description: data ? data.description : '',
      id_company: data ? data.id_company : undefined,
      url_dashboard: data ? data.url_dashboard : '',
      user_elastic: data ? data.user_elastic : '',
      password_elastic: data ? data.password_elastic : '',
      confirmPass_dashboard: data ? data.password_elastic : '',
      index: data ? data.index : '',
    },
    validate: {},
  }
  const state = initialState

  // function getCompanyName() {
  //   const { id_company } = state.form
  //   if (companies && companies.length > 0) {
  //     const company = companies.find(item => item.id_company === id_company)
  //     return company.name_company
  //   }
  //   return ''
  // }

  return (
    <>
      <h1>{state.form.name_dashboard}</h1>
      <p>{state.form.description}</p>
      <Divider />
    </>
  )
}

export default GeneralData
