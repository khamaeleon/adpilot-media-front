import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {ModalBody, ModalFooter, ModalHeader} from "../modal/Modal";
import {CancelButton} from "../../assets/GlobalStyles";
import {useAtom} from "jotai";
import {modalController} from "../../store";

function SelectBox(props){
  const {value, options, onSelect} = props
  const [select, setSelect] = useState()
  const [, setModal] = useAtom(modalController)
  const handleChange = (confirm, targetValue) => {
    if(confirm){
      onSelect(targetValue);
    }else{
      setSelect('CONFIRMING')
    }
    setModal({isShow:false});
  }

  useEffect(()=>{
    setSelect(value)
  },[value])
  const showModal = (e) => {
    setSelect(e.target.value)
    setModal({
      isShow: true,
      width: 470,
      modalComponent: () => {
        return (
            <div>
              <ModalHeader title={'지면 게재 상태 변경'} closeBtn={false}/>
              <ModalBody>
                <ScriptSubject>
                  <p>해당 지면의 심사 상태를 변경하시겠습니까?</p>
                  <p>심사승인 시 광고가 정상 송출됩니다.</p>
                  <p>심사반려 시 수정이 불가합니다.</p>
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
    <SelectContainer value={select} multiple={false} onChange={showModal} disabled={select !== 'CONFIRMING'}>{list}</SelectContainer>
  )
}

export default SelectBox

const SelectContainer = styled('select')`
  padding: 5px;
  height: 30px;
  outline: none;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
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