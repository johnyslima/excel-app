import { defaultStyles, defaultTitle } from '../constants'
import { clone } from '../core/helpers'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {}, // {'0:1': 'qwerty"}
  stylesState: {}, // {'1': 'fontWeigt: 'bold', etc}
  currentText: '',
  currentStyles: defaultStyles,
  title: defaultTitle,
  openedDate: new Date().toJSON()
}

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState)
}
