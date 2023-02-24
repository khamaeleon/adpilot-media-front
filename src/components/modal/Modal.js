import styled from "styled-components";
import {useAtom} from "jotai";
import {modalController} from "../../store";
import {useCallback, useEffect, useState} from "react";

function Modal(props) {
  const [modalComponent] = useAtom(modalController)
  return (
    <>
      {props.isShow &&
        <Dim id={'modal'}>
          <ModalContainer style={{width: modalComponent.width? modalComponent.width: 500}}>
            {modalComponent.modalComponent()}
          </ModalContainer>
        </Dim>
      }
    </>
  )
}

export function ModalHeader (props) {
  const [,setModal] = useAtom(modalController)
  const modalClose = () => {
    setModal({
      isShow: false,
      modalComponent: null
    })
  }

  return(
    <ModalHeaderContainer>
      <LabelInline>
        <span>{props.title}</span>
        <Close onClick={modalClose}/>
      </LabelInline>
    </ModalHeaderContainer>
  )
}

export function ModalBody (props) {

  return(
    <ModalBodyContainer>
      {props.children}
    </ModalBodyContainer>
  )
}

export function ModalFooter(props) {
  return(
    <ModalFooterContainer style={props.style}>
      {props.children}
    </ModalFooterContainer>
  )
}
export default Modal

const ModalBodyContainer = styled.main`
  padding: 20px 25px;
`
const Dim = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,.5);
`

const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
`

const ModalHeaderContainer = styled.header`
  padding: 17px 25px;
  border-bottom: 1px solid #dadada;
  font-size: 18px;
  font-weight: 600;
`

const ModalFooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  padding: 20px;
  border-top: 1px solid #f2f2f2;
  button {
    width: 200px;
    height: 50px;
    margin: 0 5px;
    font-size: 15px;
  }
`
const LabelInline = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Close = styled.div`
  padding: 4px;
  width: 24px;
  height: 24px;
  background-image: url('/assets/images/common/btn_popup_close.png');
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`