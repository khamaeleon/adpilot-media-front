import styled from "styled-components";
import Navigator from "../../components/common/Navigator";
import {
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail, CancelButton, ColSpan2, ColSpan3, ColTitle,
  RowSpan, Span4, SubmitButton, SubmitContainer,
  TitleContainer
} from "../../assets/GlobalStyles";
import {VerticalRule} from "../../components/common/Common";
import {atom, useAtom} from "jotai";
import {accountInfo} from "../signup/entity";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

const AccountInfo = atom(accountInfo)

function PlatformUserDetail() {
  const [accountInfoState, setAccountInfoState] = useAtom(AccountInfo)
  const [showPassword, setShowPassword] = useState(false)
  const {register, handleSubmit, watch, getValues, formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: accountInfo
  })
  const onError = (error) => console.log(error)

  useEffect(() => {
    setAccountInfoState({
      memberId: 'ghcho',
      password: '',
      confirmPassword: '',
      mediaName: 'CHO',
      managerName: '조규홍',
      managerPhone: '01073050616',
      managerEmail: 'chocto@findinglab.co.kr',
      secondManagerName: '한란민',
      secondManagerPhone: '01012345678',
      secondManagerEmail: 'ranminhan@finding.co.kr',
      mediaSiteUrl: 'http://finding.tyrcatch.co.kr',
      agencyYn: 'MEDIA',
    })
  }, [])

  /**
   * 패스워드 입력
   * @param event
   */
  const handlePassword = (event) => {
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

  /**
   * 매체 사이트 URL 입력
   * @param event
   */
  const handleMediaSiteUrl = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      mediaSiteUrl: event.target.value
    })
  }
  /**
   * 담당자명 입력
   * @param event
   */
  const handleManagerName = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      managerName: event.target.value
    })
  }
  /**
   * 담당자 연락처 입력
   * @param event
   */
  const handleManagerPhone = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      managerPhone: event.target.value
    })
  }
  /**
   * 담당자 이메일 입력
   * @param event
   */
  const handleManagerEmail = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      managerEmail: event.target.value
    })
  }

  /**
   * 담당자 2 이름 입력
   * @param event
   */
  const handleSecondManagerName = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      secondManagerName: event.target.value
    })
  }

  /**
   * 담당자 2 연락처 입력
   * @param event
   */
  const handleSecondManagerPhone = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      secondManagerPhone: event.target.value
    })
  }

  /**
   * 담당자 2 이메일 입력
   * @param event
   */
  const handleSecondManagerEmail = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      secondManagerEmail: event.target.value
    })
  }
  const onSubmit = (data) => {
    // 최종데이터
    console.log(data)
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
                <ColTitle><Span4>매체구분</Span4></ColTitle>
                <div>{(accountInfoState.agencyYn ==='MEDIA') ? '매체사' :'대행사'}</div>
              </ColSpan3>
            </RowSpan>
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span4>아이디</Span4></ColTitle>
                <div>
                  <Input
                    type={'text'}
                    placeholder={'아이디를 입력해주세요'}
                    value={accountInfoState.memberId}
                    readOnly={true}
                  />
                </div>
              </ColSpan3>
            </RowSpan>
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span4>비밀번호</Span4></ColTitle>
                <div>
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
                </div>
              </ColSpan3>
            </RowSpan>
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span4>비밀번호 확인</Span4></ColTitle>
                <div>
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
                  {errors.confirmPassword && <ValidationScript>{errors.confirmPassword?.message}</ValidationScript>}
                </div>
              </ColSpan3>
            </RowSpan>
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span4>매체명</Span4></ColTitle>
                <div>
                  <Input
                    type={'text'}
                    placeholder={'매체명을 입력해주세요'}
                    value={accountInfoState.mediaName}
                    readOnly={true}
                  />
                </div>
              </ColSpan3>
            </RowSpan>
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span4>매체 url</Span4></ColTitle>
                <div>
                  <Input
                    type={'text'}
                    placeholder={'매체 사이트 정보를 입력해주세요'}
                    {...register("mediaSiteUrl", {
                      required: "매체 사이트 정보를 입력해주세요",
                    })}
                    value={accountInfoState.mediaSiteUrl}
                    onChange={(e) => handleMediaSiteUrl(e)}
                    />
                  {errors.mediaSiteUrl && <ValidationScript>{errors.mediaSiteUrl?.message}</ValidationScript>}
                </div>
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
                <div>
                  <Input
                    type={'text'}
                    placeholder={'담당자 명을 입력해주세요'}
                    {...register("managerName", {
                      required: "Required",
                    })}
                    value={accountInfoState.managerName}
                    onChange={(e) => handleManagerName(e)}
                  />
                  {errors.managerName && <ValidationScript>{errors.managerName?.message}</ValidationScript>}
                </div>
              </ColSpan3>
            </RowSpan>
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span4>담당자 연락처</Span4></ColTitle>
                <div>
                  <Input
                    type={'text'}
                    placeholder={'연락처를 입력해주세요.'}
                    {...register("managerPhone", {
                      required: "담당자 연락처를 입력해주세요.",
                    })}
                    value={accountInfoState.managerPhone}
                    onChange={(e) => handleManagerPhone(e)}
                  />
                  {errors.managerPhone && <ValidationScript>{errors.managerPhone?.message}</ValidationScript>}
                </div>
              </ColSpan3>
            </RowSpan>
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span4>담당자 이메일</Span4></ColTitle>
                <div>
                  <Input
                    type={'text'}
                    placeholder={'이메일을 입력해주세요.'}
                    {...register("managerEmail", {
                      required: "담당자 이메일을 입력해주세요.",
                    })}
                    value={accountInfoState.managerEmail}
                    onChange={(e) => handleManagerEmail(e)}
                  />
                  {errors.managerEmail && <ValidationScript>{errors.managerEmail?.message}</ValidationScript>}
                </div>
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
                <div>
                  <Input
                    type={'text'}
                    placeholder={'담당자 명을 입력해주세요'}
                    value={accountInfoState.secondManagerName}
                    onChange={(e) => handleSecondManagerName(e)}
                  />
                </div>
              </ColSpan3>
            </RowSpan>
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span4>담당자 연락처</Span4></ColTitle>
                <div>
                  <Input
                    type={'text'}
                    placeholder={'연락처를 입력해주세요.'}
                    value={accountInfoState.secondManagerPhone}
                    onChange={(e) => handleSecondManagerPhone(e)}
                  />
                </div>
              </ColSpan3>
            </RowSpan>
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span4>담당자 이메일</Span4></ColTitle>
                <div>
                  <Input
                    type={'text'}
                    placeholder={'이메일을 입력해주세요.'}
                    value={accountInfoState.secondManagerEmail}
                    onChange={(e) => handleSecondManagerEmail(e)}
                  />
                </div>
              </ColSpan3>
            </RowSpan>
            <RowSpan>
              <ColSpan2>
                <ColTitle><Span4>사용 여부</Span4></ColTitle>
                <div style={{display: 'flex', gap: 10}}>
                  <input type={'radio'}
                         id={'use'}
                         name={'isUse'}
                  />
                  <label htmlFor={'use'}>사용</label>
                  <input type={'radio'}
                         id={'unUse'}
                         name={'isUse'}
                  />
                  <label htmlFor={'unUse'}>미사용</label>
                </div>
              </ColSpan2>
            </RowSpan>
          </BoardSearchDetail>
          <VerticalRule style={{marginTop: 20, backgroundColor: "#eeeeee"}}/>
        </Board>
        <SubmitContainer>
          <CancelButton>취소</CancelButton>
          <SubmitButton type={"submit"}>정보 수정</SubmitButton>
        </SubmitContainer>
      </BoardContainer>
      </form>
    </main>
  )
}

export default PlatformUserDetail

const Input = styled.input`
  padding: 0 20px;
  width: 100%;
  border: 1px solid #e5e5e5;
  height: 45px;
  border-radius: 10px;
  background-color: #f9fafb;
`
const ValidationScript = styled.div`
  position: absolute;
  bottom: -16px;
  left: 140px;
  color: #f55a5a;
  font-size: 12px !important;
`
