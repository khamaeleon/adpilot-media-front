import {atom} from "jotai/index";

export const initialState = atom(null)
export const modalController = atom({
  isShow: false,
  modalComponent: null
})