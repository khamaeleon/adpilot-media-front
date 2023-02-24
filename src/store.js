import {atom, createStore} from "jotai/index";

export const initialState = atom({
  scrollValue:'',
})
export const modalController = atom({
  isShow: false,
  modalComponent: null,
  reRender: false
})

export const store = createStore()