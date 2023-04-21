import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  CancelButton,
  ColSpan1,
  ColSpan2,
  ColSpan3,
  ColSpan4,
  ColTitle,
  Input,
  RelativeDiv,
  RowSpan,
  Span4,
  SubmitButton,
  SubmitContainer,
  ValidationScript
} from "../../assets/GlobalStyles";
import {VerticalRule} from "../../components/common/Common";
import {useAtom} from "jotai";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import {
  selMyInfo,
  selUserInfo, updateMyInfo,
  updateUser
} from "../../services/platform/ManageUserAxios";
import {toast} from "react-toastify";
import {ModalBody, ModalFooter, ModalHeader} from "../../components/modal/Modal";
import {modalController} from "../../store";
import styled from "styled-components";
import {accountInfoAtom, adminInfoAtom} from "./entity/common";
import {tokenResultAtom} from "../login/entity";
import {multiAxiosCall} from "../../common/StringUtils";


export function PwChange(props) {
  const {onSubmit, modalInfo,onSave,title} = props;
  const [, setModal] = useAtom(modalController)
  const handleModalComponent = () => {
    setModal({
      isShow: true,
      width: 700,
      modalComponent: () => {
        return (
          <PwChangeModal onSave={onSave} modalInfo={modalInfo} onSubmit={onSubmit}/>
        )
      }
    })
  }
  return <Button type={'button'} onClick={handleModalComponent}>{title}</Button>
}

function PwChangeModal(props) {
  const [showPassword, setShowPassword] = useState(false)
  const [, setModal] = useAtom(modalController)
  const [accountInfoState, setAccountInfoState] = useAtom(props.modalInfo==='USER'? accountInfoAtom: adminInfoAtom)
  const {register, handleSubmit, watch, reset, formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: accountInfoState
  })
  const onError = (error) => console.log(error)
  /**
   * 패스워드 입력
   * @param event
   */
  const handlePassword = (event) => {
    console.log(event.target.value)
    setAccountInfoState({
      ...accountInfoState,
      password: event.target.value
    })
  }
  /**
   * 패스원드 컨펌
   * @param event
   */
  const handleConfirmPassword = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      confirmPassword: event.target.value
    })
  }
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
    console.log(showPassword)
  }

  const handleSave = (data) => {
    props.onSave(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleSave, onError)}>
      <ModalHeader title={'비밀번호 변경'}/>
      <ModalBody>
        <RowSpan>
          <ColSpan4>
            <ColTitle><Span4>비밀번호</Span4></ColTitle>
            <RelativeDiv>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder={'숫자, 영문, 특수 기호를 포함 (10자 ~ 16자)'}
                {...register("password", {
                  required: "비밀번호를 입력해주세요",
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
                    message: "비밀번호를 확인해주세요. 숫자, 영문, 특수 기호를 포함 (10자 ~ 16자)"
                  }
                })}
                value={accountInfoState.password}
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
          <ColSpan3 style={{width: '80%'}}>
            <ColTitle><Span4>비밀번호 확인</Span4></ColTitle>
            <RelativeDiv>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder={'숫자, 영문, 특수 기호를 포함 (10자 ~ 16자)'}
                {...register("confirmPassword", {
                  required: "비밀번호를 입력해주세요",
                  validate: (value) => {
                    if (watch('password') !== value) {
                      return "입력하신 비밀번호가 맞는지 확인부탁드립니다."
                    }
                  }
                })}
                value={accountInfoState.confirmPassword}
                onChange={(e) => handleConfirmPassword(e)}
              />
              {errors.confirmPassword && <ValidationScript style={{marginBottom: 5}}>{errors.confirmPassword?.message}</ValidationScript>}
            </RelativeDiv>
          </ColSpan3>
        </RowSpan>
      </ModalBody>
      <ModalFooter>
        <SubmitButton type={"submit"} >변경</SubmitButton>
      </ModalFooter>
      </form>
    </div>
  )
}

function PlatformUserDetail() {
  const [accountInfoState, setAccountInfoState] = useAtom(accountInfoAtom)
  const [tokenResultInfo] = useAtom(tokenResultAtom)
  const [, setModal] = useAtom(modalController)
  const {register, handleSubmit, watch, reset, formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: accountInfoState
  })
  const onError = (error) => console.log(error)
  const navigate = useNavigate()
  const {state} = useLocation();

  useEffect(() => {
    function callbackFunc(response) {
      const resInfo = {
        ...response[0],
        activeYn: response[0].status === 'NORMAL' ? 'Y' : 'N'
      };

      setAccountInfoState(resInfo);
      reset(resInfo);
    }

    multiAxiosCall([tokenResultInfo.role === 'NORMAL' ? selMyInfo(state.id) : selUserInfo(state.id)], callbackFunc);

  }, [])
  /**
   * 매체 사이트 URL 입력
   * @param event
   */
  const handleMediaSiteUrl = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      siteUrl: event.target.value
    })
  }
  /**
   * 담당자명 입력
   * @param event
   */
  const handleManagerName = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      managerName1: event.target.value
    })
  }
  /**
   * 담당자 연락처 입력
   * @param event
   */
  const handleManagerPhone = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      managerPhone1: event.target.value
    })
  }
  /**
   * 담당자 이메일 입력
   * @param event
   */
  const handleManagerEmail = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      managerEmail1: event.target.value
    })
  }

  /**
   * 담당자 2 이름 입력
   * @param event
   */
  const handleSecondManagerName = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      managerName2: event.target.value
    })
  }

  /**
   * 담당자 2 연락처 입력
   * @param event
   */
  const handleSecondManagerPhone = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      managerPhone2: event.target.value
    })
  }

  /**
   * 담당자 2 이메일 입력
   * @param event
   */
  const handleSecondManagerEmail = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      managerEmail2: event.target.value
    })
  }
  /**
   * 사용여부
   * @param activeYn
   */
  const handleActiveYn = (activeYn) => {
    setAccountInfoState({
      ...accountInfoState,
      activeYn: activeYn
    })
  }

  const onSubmit = () => {

    function callbackFunc(response) {
      if (response[0]) {
        tokenResultInfo.role === 'NORMAL' ? navigate('/board/dashboard') : navigate('/board/platform');
      } else {
        toast.warning("수정이 실패 하였습니다. 관리자한테 문의하세요")
      }
    }

    multiAxiosCall([tokenResultInfo.role === 'NORMAL' ? updateMyInfo(accountInfoState) : updateUser(accountInfoState) ], callbackFunc)
    // 최종데이터

  }
  const handleSavePassword = (data) =>{

    function callbackFunc(response) {
      if (response[0]) {
        setModal({
          isShow: false,
          modalComponent: null
        })
      } else {
        toast.warning("수정이 실패 하였습니다. 관리자한테 문의하세요")
      }
    }
    multiAxiosCall([tokenResultInfo.role === 'NORMAL' ? updateMyInfo(data) : updateUser(data)], callbackFunc)
  }

  const onModalPw = () => {
    setModal({
      isShow: false,
      modalComponent: null
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Board>
        <BoardHeader>기본 정보</BoardHeader>
        <BoardSearchDetail>
          {tokenResultInfo.role !== 'NORMAL' &&
            <RowSpan>
              <ColSpan4>
                <ColTitle><Span4>계정 활성화 여부</Span4></ColTitle>
                <ColSpan1>
                  <input type={'radio'}
                         id={'use'}
                         name={'useManager'}
                         checked={accountInfoState.activeYn === 'Y' ? true : false}
                         onChange={() => handleActiveYn('Y')}/>
                  <label htmlFor={'use'}>활성</label>
                  <input type={'radio'}
                         id={'unuse'}
                         name={'useManager'}
                         checked={accountInfoState.activeYn === 'Y' ? false : true}
                         onChange={() => handleActiveYn('N')}/>
                  <label htmlFor={'unuse'}>비활성</label>
                </ColSpan1>
              </ColSpan4>
            </RowSpan>
          }
          <RowSpan>
            <ColSpan3>
              <ColTitle><Span4>매체구분</Span4></ColTitle>
              <div>{(accountInfoState.mediaType === 'DIRECT') ? '매체사' : '대행사'}</div>
            </ColSpan3>
          </RowSpan>
          <RowSpan>
            <ColSpan3>
              <ColTitle><Span4>아이디</Span4></ColTitle>
              <RelativeDiv>
                <Input
                  type={'text'}
                  placeholder={'아이디를 입력해주세요'}
                  value={accountInfoState.username || ""}
                  readOnly={true}
                />
              </RelativeDiv>

            </ColSpan3>
            <PwChange title={'비밀번호 변경'} modalInfo={'USER'} onSave={handleSavePassword} onSubmit={onModalPw}/>
          </RowSpan>
          <RowSpan>
          </RowSpan>
          <RowSpan>
            <ColSpan3>
              <ColTitle><Span4>매체명</Span4></ColTitle>
              <RelativeDiv>
                <Input
                  type={'text'}
                  placeholder={'매체명을 입력해주세요'}
                  value={accountInfoState.siteName || ""}
                  readOnly={true}
                />
              </RelativeDiv>
            </ColSpan3>
          </RowSpan>
          <RowSpan>
            <ColSpan3>
              <ColTitle><Span4>매체 url</Span4></ColTitle>
              <RelativeDiv>
                <Input
                  type={'text'}
                  placeholder={'매체 사이트 정보를 입력해주세요'}
                  {...register("siteUrl", {
                    required: "매체 사이트 정보를 입력해주세요",
                  })}
                  value={accountInfoState.siteUrl || ""}
                  onChange={(e) => handleMediaSiteUrl(e)}
                />
                {errors.siteUrl && <ValidationScript>{errors.siteUrl?.message}</ValidationScript>}
              </RelativeDiv>
            </ColSpan3>
          </RowSpan>
        </BoardSearchDetail>
        <VerticalRule style={{marginTop: 20, backgroundColor: "#eeeeee"}}/>
      </Board>
      <Board>
        <BoardHeader>담당자1 정보</BoardHeader>
        <BoardSearchDetail>
          <RowSpan>
            <ColSpan3>
              <ColTitle><Span4>담당자명</Span4></ColTitle>
              <RelativeDiv>
                <Input
                  type={'text'}
                  placeholder={'담당자 명을 입력해주세요'}
                  {...register("managerName1", {
                    required: "담당자 명을 입력해주세요",
                  })}
                  value={accountInfoState.managerName1 || ""}
                  onChange={(e) => handleManagerName(e)}
                />
                {errors.managerName1 && <ValidationScript>{errors.managerName1?.message}</ValidationScript>}
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
                  {...register("managerPhone1", {
                    required: "담당자 연락처를 입력해주세요.",
                  })}
                  value={accountInfoState.managerPhone1 || ""}
                  onChange={(e) => handleManagerPhone(e)}
                />
                {errors.managerPhone1 && <ValidationScript>{errors.managerPhone1?.message}</ValidationScript>}
              </RelativeDiv>
            </ColSpan3>
          </RowSpan>
          <RowSpan>
            <ColSpan3>
              <ColTitle><Span4>담당자 이메일</Span4></ColTitle>
              <RelativeDiv>
                <Input
                  type={'text'}
                  placeholder={'이메일을 입력해주세요.'}
                  {...register("managerEmail1", {
                    required: "담당자 이메일을 입력해주세요.",
                  })}
                  value={accountInfoState.managerEmail1 || ""}
                  onChange={(e) => handleManagerEmail(e)}
                />
                {errors.managerEmail1 && <ValidationScript>{errors.managerEmail1?.message}</ValidationScript>}
              </RelativeDiv>
            </ColSpan3>
          </RowSpan>
        </BoardSearchDetail>
        <VerticalRule style={{marginTop: 20, backgroundColor: "#eeeeee"}}/>
      </Board>
      <Board>
        <BoardHeader>담당자2 정보(선택)</BoardHeader>
        <BoardSearchDetail>
          <RowSpan>
            <ColSpan3>
              <ColTitle><Span4>담당자명</Span4></ColTitle>
              <RelativeDiv>
                <Input
                  type={'text'}
                  placeholder={'담당자 명을 입력해주세요'}
                  value={accountInfoState.managerName2 || ""}
                  onChange={(e) => handleSecondManagerName(e)}
                />
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
                  value={accountInfoState.managerPhone2 || ""}
                  onChange={(e) => handleSecondManagerPhone(e)}
                />
              </RelativeDiv>
            </ColSpan3>
          </RowSpan>
          <RowSpan>
            <ColSpan3>
              <ColTitle><Span4>담당자 이메일</Span4></ColTitle>
              <RelativeDiv>
                <Input
                  type={'text'}
                  placeholder={'이메일을 입력해주세요.'}
                  value={accountInfoState.managerEmail2 || ""}
                  onChange={(e) => handleSecondManagerEmail(e)}
                />
              </RelativeDiv>
            </ColSpan3>
          </RowSpan>
        </BoardSearchDetail>
        <VerticalRule style={{marginTop: 20, backgroundColor: "#eeeeee"}}/>
      </Board>
      <SubmitContainer>
        <CancelButton onClick={() => navigate('/board/platform')}>취소</CancelButton>
        <SubmitButton type={"submit"}>정보 수정</SubmitButton>
      </SubmitContainer>
    </form>
  )
}

export default PlatformUserDetail

const Button = styled.button`
  width: 150px;
  height: 45px;
  border-radius: 5px;
  background-color: #777777;
  color: #fff;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background-color: #535353;
  }
`