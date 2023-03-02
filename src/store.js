import {atom} from "jotai/index";
import {findIdResult} from "./pages/login/entity";

/**
 *
 * @type global modal Controller
 */
export const modalController = atom({
  isShow: false,
  modalComponent: null,
  reRender: false
})
