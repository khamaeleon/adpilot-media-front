import {useAtom} from "jotai";
import React, {useEffect, useState} from "react";
import {ModalBody, ModalHeader} from "../modal/Modal";
import styled from "styled-components";
import {selKeywordUser} from "../../services/platform/ManageUserAxios";
import {modalController} from "../../store";
import {
  ColSpan4, mainColor,
  RelativeDiv,
  ResetButton,
  RowSpan,
  SaveExcelButton,
  subColor
} from "../../assets/GlobalStyles";
import {accountCreateInvoice} from "../../pages/account_manage/entity";
import {decimalFormat, removeStr} from "../../common/StringUtils";
import {useForm} from "react-hook-form";
import {tokenResultAtom} from "../../pages/login/entity";
import {AccountButton} from "../../pages/account_manage/styles";
import Checkbox from "./Checkbox";

export function DeleteUser(props) {
  const {title, onSubmit, btnStyle} = props;
  const [, setModal] = useAtom(modalController)
  useEffect(()=>{
    return () => {
      setModal({isShow:false});
    }
  },[])
  const handleModalComponent = () => {
    setModal({
      isShow: true,
      width: 600,
      modalComponent: () => {
        return (
          <DeleteModal title={title} onSubmit={onSubmit}/>
        )
      }
    })
  }

switch (btnStyle){
  default : return <Button type={'button'} onClick={handleModalComponent}>{title}</Button>;
  }
}


function DeleteModal (props) {
  const [, setModal] = useAtom(modalController)
  const [tokenResultInfo] = useAtom(tokenResultAtom)
  const [mediaSearchInfo, setMediaSearchInfo] = useState(null)
  const [checked, setChecked] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [validation, setValidation] = useState('')
  const {title} = props;
  const handleSubmit = () => {
    console.log(checked)
    if (checked) {
      setModal({
        isShow: false,
        modalComponent: null
      })
      props.onSubmit(checked ? 'Y' : 'N')
      setValidation('')
    } else {
      setValidation('위 사항을 체크해주세요.')
    }
  }
  const handleChangeChecked = () => {
    setChecked(!checked);
  }

  return (
      <div>
        <ModalHeader title={title}/>
        <ModalBody style={{backgroundColor: '#fff'}}>
          <MediaSearchColumn>
            <CheckBoxDiv>
              <span>{title}는 개인정보 및 모든 서비스 이용 기록의 <b>영구 삭제</b>를 포함합니다.</span><br />
              <span>삭제 후 복구가 불가능합니다. 그래도 진행하시겠습니까?</span>
              <label style={{marginTop: '20px'}}>
                <input type="checkbox"
                       className={'checkbox-type-del'}
                       id={"checkFor"}
                       onChange={(e) => handleChangeChecked(e)}
                       checked={checked}
                />
                  <span>위 내용을 확인했으며, 삭제 후 복구가 불가함에 동의합니다.</span>
              </label>
            </CheckBoxDiv>
          </MediaSearchColumn>
          {validation !== '' && <Validation>{validation}</Validation>}
          <DeleteUserButton type={'button'} onClick={handleSubmit}>{'삭제하기'}</DeleteUserButton>
        </ModalBody>
      </div>
  )
}

const MediaSearchColumn = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  width: 100%;
  background-color: #FEF3F2;
  color: #fff;
  border-color: #FEE4E2;

  & > div:first-child {
    min-width: 70px;
  }

  & > div:last-child {
    width: 100%;
  }
`
const CheckBoxDiv = styled.div`
  & {
    color: #b72020;
  }
  & > label > input{
    width: 40px;
    margin-right: 20px;
  }
`

const Button = styled.button`
  width: 150px;
  height: 45px;
  border-radius: 5px;
  background-color: ${mainColor};
  color: #fff;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background-color: ${subColor};
    border-color: #1B4F72;
  }
`

const DeleteUserButton = styled.button`
  display: block;
  margin: 15px auto 0;
  padding: 13px 0;
  width: 200px;
  background-color: ${mainColor};
  color: #ffffff;
`

const Validation = styled.div`
  margin-top: 10px;
  text-align: center;
  color: #f55a5a;
  font-size: 13px !important;
`