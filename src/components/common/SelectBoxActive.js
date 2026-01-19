import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {ModalBody, ModalFooter, ModalHeader} from "../modal/Modal";
import {CancelButton} from "../../assets/GlobalStyles";
import {useAtom} from "jotai";
import {modalController} from "../../store";

function SelectBoxActive(props){
  const {value, options, onSelect} = props
  const [select, setSelect] = useState()
  const [, setModal] = useAtom(modalController)
  const handleChange = (confirm, targetValue) => {
    if(confirm){
      onSelect(targetValue);
    }else{
      setSelect(value)
    }
    setModal({isShow:false});
  }

  useEffect(()=>{
    setSelect(value)
    const escKeyModalClose = (e) => {
      if(e.keyCode === 27) {
        setSelect(value)
      }
    }
    window.addEventListener('keydown', escKeyModalClose)
    return () => {
      setModal({isShow:false});
    }
  },[value])
  const showModal = (e) => {
    setSelect(e.target.value)
    setModal({
      isShow: true,
      width: 470,
      modalComponent: () => {
        return (
            <div>
              <ModalHeader title={'사용자 상태 변경'} closeBtn={false}/>
              <ModalBody>
                <ScriptSubject>
                  <p>관리자의 상태를 변경하시겠습니까?</p>
                  {e.target.value !== 'NORMAL' ? <p>비활성화 시 로그인이 불가합니다.</p>
                      : <p>활성화 시 사용자 계정을 사용할 수 있습니다.</p>}
                </ScriptSubject>
              </ModalBody>
              <ModalFooter>
                <CancelButton onClick={()=>handleChange(false, e.target.value)}>취소</CancelButton>
                <PreviewSubmit onClick={()=>handleChange(true, e.target.value)}>확인</PreviewSubmit>
              </ModalFooter>
            </div>
        )
      }
    })
  }

  const list = options.map((item, key) => {
    return(
      <option key={key} value={item.value}>{item.label}</option>
    )
  })
  return(
      <SelectContainer
          style={select !== "NORMAL" ? { backgroundColor: "#ccc" } : undefined}
                       value={select} multiple={false}
                       onChange={showModal}>{list}</SelectContainer>
  )
}

export default SelectBoxActive;

const SelectContainer = styled('select')`
  padding: 5px;
  height: 30px;
  outline: none;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  cursor: pointer;
`
const PreviewSubmit = styled.button`
  padding: 18px 20px;
  width: 200px;
  background-color: #525252;
  color: #fff;
`
const ScriptSubject = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f9f9f9;

  & div:last-child {
    margin-top: 10px;
    font-size: 14px;
    color: #777;
  }
`