/* eslint-disable import/prefer-default-export */
/* eslint-disable no-use-before-define */
import { IS_LOADING, IS_LOADED } from './actionTypes'

export const loading = () => ({
  type: IS_LOADING,
})
export const loaded = () => ({
  type: IS_LOADED,
})
