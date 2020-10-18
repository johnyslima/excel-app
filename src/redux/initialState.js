import { defaultStyles, defaultTitle } from '../constants'
import { storage } from '../core/helpers'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {}, // {'0:1': 'qwerty"}
  stylesState: {}, // {'1': 'fontWeigt: 'bold', etc}
  currentText: '',
  currentStyles: defaultStyles,
  title: defaultTitle
}

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export const initialState = storage('excel-state')
  ? normalize(storage('excel-state'))
  : defaultState
