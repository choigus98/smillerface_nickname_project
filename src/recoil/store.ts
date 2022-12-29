import { atom } from 'recoil'

// eslint-disable-next-line import/prefer-default-export
export const captureAtom = atom({
  key: 'captureToggleOn',
  default: false,
})
