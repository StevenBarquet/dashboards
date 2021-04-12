import {
  ON_CHANGE,
  SET_VALIDATE,
  RESET_FORM,
  ASSING_DATA,
  ON_CHANGEDOS,
} from 'src/actions/actionTypes'

const genericFormReducer = (state, action) => {
  switch (action.type) {
    case ON_CHANGE: {
      const { name, value } = action.payload
      return {
        ...state,
        form: {
          ...state.form,
          [name]: value,
        },
      }
    }

    case ON_CHANGEDOS: {
      const { name, value } = action.payload
      return {
        ...state,
        formCompany: {
          ...state.formCompany,
          [name]: value,
        },
        formGroup: {
          ...state.formGroup,
          [name]: value,
        },
      }
    }

    case SET_VALIDATE: {
      return {
        ...state,
        validate: action.payload,
        hasFeedback: true,
      }
    }
    case RESET_FORM: {
      return {
        ...state,
        validate: action.payload.validate,
        hasFeedback: action.payload.hasFeedback,
        formCompany: action.payload.formCompany,
        formGroup: action.payload.formGroup,
      }
    }

    case ASSING_DATA: {
      const { form, validate, hasFeedback } = action.payload
      return {
        ...state,
        form,
        validate,
        hasFeedback,
      }
    }
    default:
      throw new Error()
  }
}
export default genericFormReducer
