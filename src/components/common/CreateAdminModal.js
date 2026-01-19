import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {
  CancelButton, ColSpan1, ColSpan2, ColSpan3,
  ColSpan4, ColTitle,
  Input, mainColor,
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
import {useLocation, useNavigate} from "react-router-dom";
import {
  createAdmin,
} from "../../services/platform/ManageAdminAxios";

export default function CreateAdminModal(props) {
  const {formType, title, onClick, buttonText, userId} = props;
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
          <CreateForm formType={formType} title={title} onSubmitProps={onClick} onClose={onClose} userId={userId}/>
        )
      }
    })
  }
  return (
      <Button type={'button'} onClick={handleModalComponent}>+ {buttonText}</Button>
  )
}

function CreateForm(props) {
  const { formType, title, onSubmitProps, onClose, userId } = props;
  const [showPassword, setShowPassword] = useState(false)
  const [, setModal] = useAtom(modalController)
  const [adminInfoState, setAdminInfoState] = useState(adminInfoAtom)
  const {register, handleSubmit, watch, reset, formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: adminInfoState
  })
  const {state} = useLocation();
  const navigate = useNavigate();

  const onError = (error) => {
    console.log(error);
  }
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
  /**
   * 사용여부
   * @param activeYn
   */
  const handleActiveYn = (activeYn) => {
    setAdminInfoState({
      ...adminInfoState,
      activeYn: activeYn
    })
  }

  const onSubmit = () => {
    createAdmin(adminInfoState).then((response) => {
      if (response) {
        toast.success("생성 되었습니다.",{onClose: () => navigate(0), autoClose:100, delay:0})
      } else {
        toast.warning("관리자 추가에 실패 하였습니다.")
      }
    })
  }
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  return (
      <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <ModalHeader title={title} style={{borderBottomWidth: 0}}/>
        <ModalBody>
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span4>아이디</Span4></ColTitle>
                <RelativeDiv>
                  <Input
                      type={'text'}
                      placeholder={'이메일 형태 아이디를 입력해주세요'}
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
          <ColSpan4>
            <ColTitle><Span4>비밀번호</Span4></ColTitle>
            <RelativeDiv>
              <Input
                  maxLength={16}
                  type={showPassword ? 'text' : 'password'}
                  placeholder={'대문자, 숫자, 영문, 특수 기호를 포함 (10자 ~ 16자)'}
                  {...register("password", {
                    required: "비밀번호를 입력해주세요",
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,20}$/,
                      message: "비밀번호를 확인해주세요. 대문자, 숫자, 영문, 특수 기호를 포함 (10자 ~ 16자)"
                    }
                  })}
                  value={adminInfoState.password}
                  onChange={(e) => handlePassword(e)}
              />
              {errors.password && <ValidationScript>{errors.password?.message}</ValidationScript>}
            </RelativeDiv>
          </ColSpan4>
              <ColSpan1>
                <div onClick={handleShowPassword}>
                      <span style={{
                        marginRight: 10,
                        width: 30,
                        height: 30,
                        display: 'inline-block',
                        verticalAlign: 'middle',
                        backgroundImage: `url(/assets/images/common/checkbox_${showPassword ? 'on' : 'off'}_B.png)`
                      }}/>
                  <span>{showPassword ? '가리기' : '보기'}</span>
                </div>
              </ColSpan1>
            </RowSpan>
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span4>담당자명</Span4></ColTitle>
                <RelativeDiv>
                  <Input
                      type={'text'}
                      placeholder={'담당자 명을 입력해주세요'}
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
          <CancelButton type={"button"} onClick={onClose}>취소</CancelButton>
          <SubmitButton type={"submit"}>{'생성'}</SubmitButton>
        </ModalFooter>
      </form>
        <ToastContainer position="top-center"
                        autoClose={1500}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        limit={1}
                        style={{zIndex: 9999999}}/>
      </>
  )
}

const Button = styled.button`
  width: 100px;
  height: 35px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  background-color: white;
  border: 1px solid #ccc;

  &:hover {
    font-weight: bold;
    color: ${mainColor};
  }
`