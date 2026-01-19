import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {
  CancelButton, ColSpan1, ColSpan2, ColSpan3,
  ColSpan4, ColTitle,
  Input,
  RelativeDiv,
  RowSpan,
  Span4,
  SubmitButton, SubmitContainer,
  ValidationScript,
} from "../../assets/GlobalStyles";
import {useAtom} from "jotai";
import {Controller, useForm} from "react-hook-form";
import {ModalBody, ModalFooter, ModalHeader} from "../modal/Modal";
import {modalController} from "../../store";
import {toast, ToastContainer} from "react-toastify";
import {adminInfoAtom} from "../../pages/platform_manage/entity/common";
import {useLocation} from "react-router-dom";
import {
  createAdmin,
  updateAdmin
} from "../../services/platform/ManageAdminAxios";
import {
  navigate
} from "@inovua/reactdatagrid-community/packages/Calendar/src/DecadeView";
import {VerticalRule} from "./Common";

export default function SelectAdminModal(props) {
  const {formType, title, onClick, buttonText, userId, data} = props;
  const [, setModal] = useAtom(modalController)
  useEffect(()=>{
    return ()=> {
      onClose()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const onClose = () => {
    setModal({ isShow: false })
  }

  const handleModalComponent = () => {
    setModal({
      isShow: true,
      width: 900,
      modalComponent: () => {
        return (
          <SelectForm formType={formType} title={title} onSubmitProps={onClick} onClose={onClose} userId={userId} data={data}/>
        )
      }
    })
  }
  return (
      <Button type={'button'} onClick={handleModalComponent}>{buttonText}</Button>
  )
}

function SelectForm(props) {
  const { formType, title, onSubmitProps, onClose, userId, data } = props;
  const [, setModal] = useAtom(modalController)
  const [adminInfoState, setAdminInfoState] = useState(adminInfoAtom)
  const {register, handleSubmit, watch, reset, formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: adminInfoState
  })
  const {state} = useLocation();
  console.log(data)
  useEffect(()=>{
    setAdminInfoState(data);
  },[])

  const onError = (error) => console.log(error);
  /**
   * 아이디 입력
   * @param event
   */
  const handleAdminId = (event) => {
        setAdminInfoState({
          ...adminInfoState,
          email: event.target.value
        })
      }
  /**
   * 패스워드 입력
   * @param event
   */
  const handlePassword = (event) => {
    setAdminInfoState({
      ...adminInfoState,
      password: event.target.value
    })
  }

  /**
   * 패스원드 컨펌
   * @param event
   */
  const handleConfirmPassword = (event) => {
    setAdminInfoState({
      ...adminInfoState,
      confirmPassword: event.target.value
    })
  }
  /**
   * 담당자명 입력
   * @param event
   */
  const handleManagerName = (event) => {
    setAdminInfoState({
      ...adminInfoState,
      name: event.target.value
    })
  }
  /**
   * 담당자 연락처 입력
   * @param event
   */
  const handleManagerPhone = (event) => {
    setAdminInfoState({
      ...adminInfoState,
      phoneNumber: event.target.value
    })
  }

  return (
      <form onSubmit={handleSubmit( onError)}>
        <ModalHeader title={title} style={{borderBottomWidth: 0}}/>
        <ModalBody>
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span4>아이디</Span4></ColTitle>
                <RelativeDiv>
                  <Input
                      type={'text'}
                      placeholder={'이메일 형태 아이디를 입력해주세요'}
                      disabled
                      value={adminInfoState.email || ""}
                      {...register("email", {
                        required: "관리자 아이디를 입력해주세요",
                      })}
                      onChange={(e) => handleAdminId(e)}
                  />
                  {errors.email && <ValidationScript>{errors.email?.message}</ValidationScript>}
                </RelativeDiv>
              </ColSpan3>
            </RowSpan>
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span4>담당자명</Span4></ColTitle>
                <RelativeDiv>
                  <Input
                      type={'text'}
                      placeholder={'담당자 명을 입력해주세요'}
                      disabled
                      {...register("name", {
                        required: "담당자 명을 입력해주세요",
                      })}
                      value={adminInfoState.name || ""}
                      onChange={(e) => handleManagerName(e)}
                  />
                  {errors.name && <ValidationScript>{errors.name?.message}</ValidationScript>}
                </RelativeDiv>
              </ColSpan3>
            </RowSpan>
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span4>담당자 연락처</Span4></ColTitle>
                <RelativeDiv>
                  <Input
                      type={'text'}
                      placeholder={'연락처를 입력해주세요.'}
                      disabled
                      {...register("phoneNumber", {
                        required: "담당자 연락처를 입력해주세요.",
                        pattern: {
                          value: /^[0-9-]+$/g,
                          message: "연락처를 형식을 확인해주세요"
                        },
                      })}
                      value={adminInfoState.phoneNumber || ""}
                      onChange={(e) => handleManagerPhone(e)}
                  />
                  {errors.phoneNumber && <ValidationScript>{errors.phoneNumber?.message}</ValidationScript>}
                </RelativeDiv>
              </ColSpan3>
            </RowSpan>
        </ModalBody>
        <ModalFooter style={{borderWidth: 0}}>
          <CancelButton type={"button"} onClick={onClose}>확인</CancelButton>
        </ModalFooter>
      </form>
  )
}

const Button = styled.button`
  width: 100%;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  background-color: white;

  &:hover {
    font-weight: bold;
  }
`