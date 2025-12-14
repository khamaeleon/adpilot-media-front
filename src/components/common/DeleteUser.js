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
          <DeleteModal onSubmit={onSubmit}/>
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
  const handleSubmit = () => {
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
        <ModalHeader title={"계정 삭제"}/>
        <ModalBody style={{backgroundColor: '#fff'}}>
          <MediaSearchColumn>
            <CheckBoxDiv>
              <label>
                <input type="checkbox"
                       className={'checkbox-type-del'}
                       id={"checkFor"}
                       onChange={(e) => handleChangeChecked(e)}
                       checked={checked}
                />
                <span>{'계정 삭제'}는 개인정보 및 모든 서비스 이용 기록의 영구 삭제를 포함합니다. 삭제 후 복구가 불가능합니다. 그래도 진행하시겠습니까?</span>
              </label>
            </CheckBoxDiv>
          </MediaSearchColumn>
          <DeleteUserButton type={'button'} disabled={!checked} onClick={handleSubmit}>{'삭제하기'}</DeleteUserButton>
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
  background-color: #2c2b2b;
  color: #fff;

  & > div:first-child {
    min-width: 70px;
  }

  & > div:last-child {
    width: 100%;
  }
`
const CheckBoxDiv = styled.div`
  & > label > input{
    width: 40px;
    margin-right: 20px;
  }
  & > label > span{
    color: #b72020;
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
  font-weight: bold;
`



const MediaSearchResult = styled.div`
  font-size: 13px;

  & table {
    margin-top: 18px;
    width: 100%;

    & th {
      padding: 12px;
      background-color: #fafafa;
      color: #b2b2b2;
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
    }

    & td {
      text-align: center;
      padding: 12px;
      border-bottom: 1px solid #e5e5e5;
      cursor: pointer;
    }
  }
`