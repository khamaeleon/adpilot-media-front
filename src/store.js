import {atom, createStore} from "jotai";

/**
 *
 * @type global modal Controller
 */
export const modalController = atom({
  isShow: false,
  modalComponent: null,
  reRender: false
})

export const roleAtom = atom('')

const store = createStore()

export default store;