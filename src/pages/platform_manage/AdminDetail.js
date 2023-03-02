import styled from "styled-components";
import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail, CancelButton, ColSpan1, ColSpan2, ColSpan3, ColTitle, Input, inputStyle, RelativeDiv,
  RowSpan, Span4, SubmitButton, SubmitContainer,
  TitleContainer, ValidationScript
} from "../../assets/GlobalStyles";
import {VerticalRule} from "../../components/common/Common";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {atom} from "jotai/index";
import {adminAllType, adminInfo, selectAccountUseInfo} from "./entity";
import {useAtom} from "jotai";
import {useLocation} from "react-router-dom";
import {createAdmin} from "../../services/ManageAdminAxios";

const AdminInfo = atom(adminInfo)

function PlatformAdminDetail() {
  const [showPassword, setShowPassword] = useState(false)
  const [adminInfoState, setAdminInfoState] = useAtom(AdminInfo)
  const [useManager, setUseManager] = useState('use')
  const {register, handleSubmit, watch, reset, formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: adminInfoState
  })
  const {state} = useLocation();
  const onError = (error) => console.log(error)
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    console.log(state.id)
    if (state.id === 'NEW') {
      setAdminInfoState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        phoneNumber: '',
        accountUseYn: 'IN_USE'
      })
      //신규
    } else {
      //ID 넘겨서 정보 가져와서 SET함
      setAdminInfoState({
        password: '',
        confirmPassword: '',
        name: '조규홍',
        phoneNumber: '01073050616',
        email: 'chocto@findinglab.co.kr',
        accountUseYn: 'IN_USE',
      })
      reset({
        password: '',
        confirmPassword: '',
        name: '조규홍',
        phoneNumber: '01073050616',
        email: 'chocto@findinglab.co.kr',
        accountUseYn: 'IN_USE',
      })
    }
  }, [])

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

  const onSubmit = (data) => {
    // 최종데이터
    console.log(data)
    createAdmin(adminInfoState).then((response) => {
      console.log(response)
    })
  }

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <BoardContainer>
          <TitleContainer>
            <h1>플랫폼 관리</h1>
            <Navigator/>
          </TitleContainer>
          <Board>
            <BoardHeader>기본 정보</BoardHeader>
            <BoardSearchDetail>
              <RowSpan>
                <ColSpan3>
                  <ColTitle><Span4>아이디</Span4></ColTitle>
                  <RelativeDiv>
                    {state.id !== 'NEW' ?
                      <Input
                        type={'text'}
                        placeholder={'아이디를 입력해주세요'}
                        value={adminInfoState.email}
                        readOnly={true}
                      /> :
                      <Input
                        type={'text'}
                        placeholder={'아이디를 입력해주세요'}
                        value={adminInfoState.email}
                        {...register("email", {
                          required: "관리자 아이디를 입력해주세요",
                        })}
                        onChange={(e) => handleAdminId(e)}
                      />
                    }
                    {errors.email && <ValidationScript>{errors.email?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan3>
                <ColSpan1>
                  {state.id === 'NEW' &&
                    <DuplicateButton>중복 확인</DuplicateButton>
                  }
                </ColSpan1>
              </RowSpan>
              <RowSpan>
                <ColSpan3>
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
                      value={adminInfoState.password}
                      onChange={(e) => handlePassword(e)}
                    />
                    {errors.password && <ValidationScript>{errors.password?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan3>
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
                      value={adminInfoState.confirmPassword}
                      onChange={(e) => handleConfirmPassword(e)}
                    />
                    {errors.confirmPassword && <ValidationScript>{errors.confirmPassword?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan3>
              </RowSpan>
            </BoardSearchDetail>
            <VerticalRule style={{marginTop: 20, backgroundColor: "#eeeeee"}}/>
          </Board>
          <Board>
            <BoardHeader>담당자 정보</BoardHeader>
            <BoardSearchDetail>
              <RowSpan>
                <ColSpan3>
                  <ColTitle><Span4>담당자명</Span4></ColTitle>
                  <RelativeDiv>
                    {state.id === 'NEW' ?
                      <Input
                        type={'text'}
                        placeholder={'담당자 명을 입력해주세요'}
                        {...register("name", {
                          required: "담당자 명을 입력해주세요",
                        })}
                        value={adminInfoState.name}
                        onChange={(e) => handleManagerName(e)}
                      />
                      :
                      <Input
                        type={'text'}
                        placeholder={'담당자 명을 입력해주세요'}
                        value={adminInfoState.name}
                        readOnly={true}
                      />
                    }
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
                      })}
                      value={adminInfoState.phoneNumber}
                      onChange={(e) => handleManagerPhone(e)}
                    />
                    {errors.phoneNumber && <ValidationScript>{errors.phoneNumber?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan3>
              </RowSpan>
              {state.id !== 'NEW' &&
                <RowSpan>
                  <ColSpan1>
                    <ColTitle><Span4>사용 여부</Span4></ColTitle>
                    <RelativeDiv>
                      <input type={'radio'}
                             id={'use'}
                             name={'useManager'}
                             checked={useManager == 'use' ? true : false}
                             onChange={() => setUseManager('use')}/>
                      <label htmlFor={'use'}>사용</label>
                      <input type={'radio'}
                             id={'unuse'}
                             name={'useManager'}
                             checked={useManager == 'use' ? false : true}
                             onChange={() => setUseManager('unuse')}/>
                      <label htmlFor={'unuse'}>미사용</label>
                    </RelativeDiv>
                  </ColSpan1>
                  <ColSpan2/>
                </RowSpan>
              }
            </BoardSearchDetail>
            <VerticalRule style={{marginTop: 20, backgroundColor: "#eeeeee"}}/>
          </Board>
          <SubmitContainer>
            <CancelButton>취소</CancelButton>
            <SubmitButton type={"submit"}>저장</SubmitButton>
          </SubmitContainer>
        </BoardContainer>
      </form>
    </main>
  )
}

export default PlatformAdminDetail

const DuplicateButton = styled.button`
  width: 150px;
  height: 45px;
  background-color: #777;
  border-radius: 5px;
  color: #fff;
  font-size: 15px;
`
