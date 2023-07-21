import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {atom, useAtom, useSetAtom} from "jotai";
import {useForm} from "react-hook-form";
import {accountInfo} from "./entity";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Checkbox from "../../components/common/Checkbox";
import {DefaultButton, RelativeDiv} from "../../assets/GlobalStyles";
import {selPolicyLatestTerms, selValidUserId, signUp} from "../../services/platform/ManageUserAxios";
import {
  AfterSignUpGuild,
  AlignRight,
  Arrow,
  ButtonGroup,
  Form,
  Logo,
  Round,
  SignUpContents,
  SignUpHeader,
  SignUpVerify,
  Step,
  StepContainer,
  Steps,
  TermsBox,
  ValidationScript
} from "./styles";
import {VerticalRule} from "../../components/common/Common";

const NextStep = atom({
  terms: false,
  validation: false
})
const TermsInfo = atom([])
const AccountInfo = atom(accountInfo)

function Terms() {
  const [accountInfo, setAccountInfo] = useAtom(AccountInfo);
  const [termsInfo, setTermsInfo] = useAtom(TermsInfo)
  const [isAgreeAll, setIsAgreeAll] = useState(false)
  const setValidation = useSetAtom(NextStep)

  useEffect(() => {
    selPolicyLatestTerms().then(response => {
      setTermsInfo(response)
      setAccountInfo({
        ...accountInfo,
        serviceTermsId: response.find(value => value.termsType === 'SERVICE').id,
        privacyTermsId: response.find(value => value.termsType === 'PRIVACY').id,
        operationTermsId: response.find(value => value.termsType === 'OPERATION').id
      })
    })
  }, [])
  /**
   * 약관 전체 선택 및 동의
   */
  useEffect(() => {
    if (accountInfo.isAgreedByServiceTerms && accountInfo.isAgreedByPrivacyTerms && accountInfo.isAgreedByOperationTerms) {
      setIsAgreeAll(true)
      setValidation({
        terms: true,
        validation: false
      })
    } else {
      setIsAgreeAll(false)
      setValidation({
        terms: false,
        validation: false
      })
    }
    console.log(accountInfo)
  }, [accountInfo, isAgreeAll, setValidation]);

  /**
   * 약관 전체 선택 핸들러
   * @param event
   */
  const handleChangeAgreeAll = (event) => {
    setAccountInfo({
      ...accountInfo,
      isAgreedByServiceTerms: event.target.checked,
      isAgreedByPrivacyTerms: event.target.checked,
      isAgreedByOperationTerms: event.target.checked
    })
    setIsAgreeAll(event.target.checked)
  }
  /**
   * 약관 동의 핸들러
   * @param event
   */
  const handleChangeTerms = (event) => {
    if (event.target.id === 'serviceTerms') {
      setAccountInfo({
        ...accountInfo,
        isAgreedByServiceTerms: event.target.checked
      })
    } else if (event.target.id === 'privacyTerms') {
      setAccountInfo({
        ...accountInfo,
        isAgreedByPrivacyTerms: event.target.checked
      })
    } else if (event.target.id === 'operationTerms') {
      setAccountInfo({
        ...accountInfo,
        isAgreedByOperationTerms: event.target.checked
      })
    }
  }

  return (
    <article>
      <div><h2>약관 동의</h2></div>
      <VerticalRule style={{height: 3, backgroundColor: '#aaa'}}/>
      <AlignRight>
        <Checkbox
          type={'c'}
          label={'하기 모든 약관에 동의합니다.'}
          isChecked={isAgreeAll}
          onChange={(e) => handleChangeAgreeAll(e)}/>
      </AlignRight>
      <VerticalRule/>
      {/*약관 1*/}
      <div>
        <h3>서비스 약관 (필수)</h3>
        <TermsBox>
          {termsInfo !== null &&
            termsInfo.map((value) => {
              if (value.termsType === 'SERVICE') {
                return value.content
              }
            })
          }
        </TermsBox>
      </div>
      <AlignRight>
        <Checkbox
          type={'a'}
          label={'위 내용에 동의합니다.'}
          isChecked={
            accountInfo.isAgreedByServiceTerms
          }
          id={'serviceTerms'}
          onChange={(e) => handleChangeTerms(e)}/>
      </AlignRight>
      <VerticalRule/>
      {/*약관2*/}
      <div>
        <h3>개인처리방침 약관(필수)</h3>
        <TermsBox>
          {termsInfo !== null &&
            termsInfo.map((value) => {
              if (value.termsType === 'PRIVACY') {
                return value.content
              }
            })
          }
        </TermsBox>
      </div>
      <AlignRight>
        <Checkbox
          label={'위 내용에 동의합니다.'}
          type={'a'}
          id={'privacyTerms'}
          isChecked={accountInfo.isAgreedByPrivacyTerms}
          onChange={(e) => handleChangeTerms(e)}/>
      </AlignRight>
      {/*약관3*/}
      <div>
        <h3>운영 처리방침(필수)</h3>
        <TermsBox>
          {termsInfo !== null &&
            termsInfo.map((value) => {
              if (value.termsType === 'OPERATION') {
                return value.content
              }
            })
          }
        </TermsBox>
      </div>
      <AlignRight>
        <Checkbox
          label={'위 내용에 동의합니다.'}
          type={'a'}
          id={'operationTerms'}
          isChecked={accountInfo.isAgreedByOperationTerms}
          onChange={(e) => handleChangeTerms(e)}/>
      </AlignRight>
    </article>
  )
}

function Basic(props) {
  const [showPassword, setShowPassword] = useState(false)
  const [accountInfo, setAccountInfo] = useAtom(AccountInfo);
  const [agreeValidation, setAgreeValidation] = useAtom(NextStep)
  const setValidation = useSetAtom(NextStep)
  const {register, handleSubmit, watch,  formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: accountInfo
  })

  const handleNextStep = () => {
    props.nextStep()
    setAgreeValidation({
      ...agreeValidation,
      validation: true
    })
  }
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  /**
   * 아이디 입력
   * @param event
   */
  const handleMemberId = (event) => {
    setAccountInfo({
      ...accountInfo,
      username: event.target.value
    })
  }

  /**
   * 패스워드 입력
   * @param event
   */
  const handlePassword = (event) => {
    setAccountInfo({
      ...accountInfo,
      password: event.target.value
    })
  }

  /**
   * 패스원드 컨펌
   * @param event
   */
  const handleConfirmPassword = (event) => {
    setAccountInfo({
      ...accountInfo,
      confirmPassword: event.target.value
    })
  }

  /**
   * 매체명 입력
   * @param event
   */
  const handleMediaName = (event) => {
    setAccountInfo({
      ...accountInfo,
      siteName: event.target.value
    })
  }

  /**
   * 매체 사이트 URL 입력
   * @param event
   */
  const handleMediaSiteUrl = (event) => {
    setAccountInfo({
      ...accountInfo,
      siteUrl: event.target.value
    })
  }
  /**
   * 담당자명 입력
   * @param event
   */
  const handleManagerName = (event) => {
    setAccountInfo({
      ...accountInfo,
      managerName1: event.target.value
    })
  }
  /**
   * 담당자 연락처 입력
   * @param event
   */
  const handleManagerPhone = (event) => {
    let num = event.target.value.replace(/[a-z]|[ㄱ-ㅎ]|[.-]/i, '')
    setAccountInfo({
      ...accountInfo,
      managerPhone1: num
    })
  }
  /**
   * 담당자 이메일 입력
   * @param event
   */
  const handleManagerEmail = (event) => {
    setAccountInfo({
      ...accountInfo,
      managerEmail1: event.target.value
    })
  }

  /**
   * 담당자 2 이름 입력
   * @param event
   */
  const handleSecondManagerName = (event) => {
    setAccountInfo({
      ...accountInfo,
      managerName2: event.target.value
    })
  }

  /**
   * 담당자 2 연락처 입력
   * @param event
   */
  const handleSecondManagerPhone = (event) => {
    let num = event.target.value.replace(/[a-z]|[ㄱ-ㅎ]|[.-]/i, '')
    setAccountInfo({
      ...accountInfo,
      managerPhone2: num
    })
  }

  /**
   * 담당자 2 이메일 입력
   * @param event
   */
  const handleSecondManagerEmail = (event) => {
    setAccountInfo({
      ...accountInfo,
      managerEmail2: event.target.value
    })
  }
  /**
   * 대행사 여부
   * @param mediaType
   */
  const handleChangeMediaType = (mediaType) => {
    setAccountInfo({
      ...accountInfo,
      mediaType: mediaType
    })
  }
  /**
   * 아이디 중복 체크
   */
  const checkUserId = () =>{
    if(accountInfo.username === ''){
      toast.warning('아이디를 입력해주세요')
    }else{
      selValidUserId(accountInfo.username).then(response => {
        console.log(response)
        if(response.validUsername){
          //사용가능한 아이디 입니다.
          toast.success('사용가능한 아이디입니다')
        }else{
          toast.warning('중복된 아이디입니다')
        }
      })
    }
  }
  /**
   * 회원가입
   */
  const onSubmit = () => {
    signUp(accountInfo).then(response => {
      if(response.responseCode.statusCode === 200){
        setValidation({
          terms: true,
          validation: true
        })
        handleNextStep()
      }else{
        toast.warning('회원가입에 실패하였습니다. 관리자에게 문의하세요')
      }
    })
  }
  const onError = (error) => console.log(error)

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <article>
        <div><h2>기본 정보 입력</h2></div>
        <VerticalRule style={{height: 3, backgroundColor: '#aaa'}}/>
        <Form>
          <h2>기본 정보 입력</h2>
          <div>
            <div>대행사 구분</div>
            <div>
              <input type={'radio'}
                     id={'use'}
                     name={'direct'}
                     checked={accountInfo.mediaType === 'DIRECT'}
                     onChange={() => handleChangeMediaType('DIRECT')}/>
              <label htmlFor={'use'}>매체사</label>
              <input type={'radio'}
                     id={'unUse'}
                     name={'agency'}
                     checked={accountInfo.mediaType === 'AGENCY'}
                     onChange={() => handleChangeMediaType('AGENCY')}/>
              <label htmlFor={'unUse'}>대행사</label>
            </div>
          </div>
          <RelativeDiv>
            <div>아이디</div>
            <div>
              <input
                type={'text'}
                placeholder={'아이디를 입력해주세요'}
                {...register("username", {
                  required: "아이디를 입력해주세요",
                  pattern: {
                    value: /^[a-z0-9_]{4,20}$/,
                    message: "아이디 형식에 맞지 않습니다"
                  },
                  onChange: (e) => handleMemberId(e)
                })
                }
                value={accountInfo.username}
              />
              {errors.username && <ValidationScript>{errors.username?.message}</ValidationScript>}
              <DefaultButton type='button' onClick={()=>checkUserId()}>중복검사</DefaultButton>
            </div>

          </RelativeDiv>
          <RelativeDiv>
            <div>비밀번호</div>
            <div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={'숫자, 영문, 특수 기호를 포함 (10자 ~ 16자)'}
                {...register("password", {
                  required: "비밀번호를 입력해주세요",
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
                    message: "비밀번호를 확인해주세요. 숫자, 영문, 특수 기호를 포함 (10자 ~ 16자)"
                  },
                  onChange: (e) => handlePassword(e)
                })}
                value={accountInfo.password}

              />
              {errors.password && <ValidationScript>{errors.password?.message}</ValidationScript>}
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
            </div>
          </RelativeDiv>
          <RelativeDiv>
            <div>비밀번호 확인</div>
            <div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={'숫자, 영문, 특수 기호를 포함 (10자 ~ 16자)'}
                {...register("confirmPassword", {
                  required: "비밀번호를 입력해주세요",
                  validate: (value) => {
                    if (watch('password') !== value) {
                      return "입력하신 비밀번호가 맞는지 확인부탁드립니다."
                    }
                  },
                  onChange: (e) => handleConfirmPassword(e)
                })}
                value={accountInfo.confirmPassword}
              />
              {errors.confirmPassword && <ValidationScript>{errors.confirmPassword?.message}</ValidationScript>}
            </div>
          </RelativeDiv>
          <RelativeDiv>
            <div>매체명</div>
            <div>
              <input
                type={'text'}
                placeholder={'매체명을 입력해주세요'}
                {...register("siteName", {
                  required: "매체명을 입력해주세요",
                  onChange: (e) => handleMediaName(e)
                })}
                value={accountInfo.siteName}

              />
              {errors.siteName && <ValidationScript>{errors.siteName?.message}</ValidationScript>}
            </div>
          </RelativeDiv>
          <RelativeDiv>
            <div>매체 url</div>
            <div>
              <input
                type={'text'}
                placeholder={'매체 사이트 정보를 입력해주세요'}
                {...register("siteUrl", {
                  required: "매체 사이트 정보를 입력해주세요",
                  pattern: {
                    value:  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
                    message: '올바른 URL 주소를 입력해 주세요.'
                  },
                  onChange: (e) => handleMediaSiteUrl(e)
                })}
                value={accountInfo.siteUrl}

              />
              {errors.siteUrl && <ValidationScript>{errors.siteUrl?.message}</ValidationScript>}
            </div>
          </RelativeDiv>
          <h2>담당자1 정보(필수)</h2>
          <RelativeDiv>
            <div>담당자명</div>
            <div>
              <input
                type={'text'}
                placeholder={'담당자 명을 입력해주세요'}
                {...register("managerName1", {
                  required: "담당자 명을 입력해주세요",
                  onChange: (e) => handleManagerName(e)
                })}
                value={accountInfo.managerName1}
              />
              {errors.managerName1 && <ValidationScript>{errors.managerName1?.message}</ValidationScript>}
            </div>
          </RelativeDiv>
          <RelativeDiv>
            <div>담당자 연락처</div>
            <div>
              <input
                type={'text'}
                placeholder={'연락처를 입력해주세요.'}
                {...register("managerPhone1", {
                  required: "담당자 연락처를 입력해주세요.",
                  pattern: {
                    value: /^01([0|1|6|7|8|9]?)([0-9]{3,4})([0-9]{4})$/,
                    message: "연락처 정보를 확인해주세요"
                  },
                  onChange: (e) => handleManagerPhone(e)
                })}
                value={accountInfo.managerPhone1}
              />
              {errors.managerPhone1 && <ValidationScript>{errors.managerPhone1?.message}</ValidationScript>}
            </div>
          </RelativeDiv>
          <RelativeDiv>
            <div>담당자 이메일</div>
            <div>
              <input
                type={'text'}
                placeholder={'이메일을 입력해주세요.'}
                {...register("managerEmail1", {
                  required: "담당자 이메일을 입력해주세요.",
                  pattern: {
                    value: /[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*/i,
                    message: "이메일 형식을 확인해주세요"
                  },
                  onChange: (e) => handleManagerEmail(e)
                })}
                value={accountInfo.managerEmail1}
              />
              {errors.managerEmail1 && <ValidationScript>{errors.managerEmail1?.message}</ValidationScript>}
            </div>
          </RelativeDiv>
          <h2>담당자2 정보(선택)</h2>
          <RelativeDiv>
            <div>담당자명</div>
            <div>
              <input
                type={'text'}
                placeholder={'담당자 명을 입력해주세요'}
                value={accountInfo.managerName2}
                onChange={(e) => handleSecondManagerName(e)}
              />
            </div>
          </RelativeDiv>
          <RelativeDiv>
            <div>담당자 연락처</div>
            <div>
              <input
                type={'text'}
                placeholder={'연락처를 입력해주세요.'}
                value={accountInfo.managerPhone2}
                onChange={(e) => handleSecondManagerPhone(e)}
              />
            </div>
          </RelativeDiv>
          <RelativeDiv>
            <div>담당자 이메일</div>
            <div>
              <input
                type={'text'}
                placeholder={'이메일을 입력해주세요.'}
                value={accountInfo.managerEmail2}
                onChange={(e) => handleSecondManagerEmail(e)}
              />
            </div>
          </RelativeDiv>
        </Form>
      </article>
      <ButtonGroup>
        <SignUpVerify type={"submit"}>가입 요청</SignUpVerify>
      </ButtonGroup>
    </form>
  )
}

function Done() {
  return (
    <article>
      <AfterSignUpGuild>
        <div>
          <Round style={{backgroundImage: 'url("/assets/images/join/img_number_01.png")'}}>
            <span>01</span>
          </Round>
          <h3>기본 정보 입력</h3>
        </div>
        <div>
          <Round style={{backgroundImage: 'url("/assets/images/join/img_number_03.png")'}}>
            <span>03</span>
          </Round>
          <h3>서비스 이용</h3>
        </div>
      </AfterSignUpGuild>
      <div style={{margin: '50px 0', padding: 40, textAlign: "center", border: "1px solid #ddd", borderRadius: 5}}>
        “서비스명”은 회원 가입 승인 후 서비스 이용이 가능합니다.<br/>
        최종 승인 시 기본 정보 입력 시 등록하신 연락처로 승인 완료 안내 문자가 발송됩니다.<br/>
        ※ 가입 승인은 영업일 기준 24시간 내 완료됩니다.
      </div>
    </article>
  )
}

function SignUp() {
  const [agreeValidation] = useAtom(NextStep)
  const navigate = useNavigate()
  const [steps, setStep] = useState({
    step1: false,
    step2: false,
    step3: false
  })
  const handleNextStep = () => {
    console.log(steps)
    if (agreeValidation.terms) {
      if (!steps.step1 && !steps.step2 && !steps.step3) {
        setStep({
          step1: true,
          step2: false,
          step3: false
        })
      }
    } else {
      toast.warning('전체 약관이 동의가 되지 않았습니다.')
    }
    if (agreeValidation.terms && !agreeValidation.validation) {
      if (steps.step1 && !steps.step2 && !steps.step3) {
        setStep({
          step1: true,
          step2: true,
          step3: false
        })
      }
    }
    if (agreeValidation.terms && agreeValidation.validation) {
      if (steps.step1 && !steps.step2 && !steps.step3) {
        setStep({
          step1: true,
          step2: true,
          step3: true
        })
      }
    }
  }
  return (
    <div className={'sign-up'}>
      <SignUpHeader>
        <article>
          <Link to={'/'}>
            <Logo/>
          </Link>
        </article>
      </SignUpHeader>
      <StepContainer>
        <article>
          <div><h1>회원 가입</h1></div>
          <div><p>회원가입 하시면 엠코퍼레이션에 다양한 서비스를 이용하실 수 있습니다.</p></div>
          <Steps>
            <Step style={steps.step1 ? {backgroundColor: '#535353', color: '#fff'} : null}>
              <div style={{backgroundImage: `url("/assets/images/join/icon_membership_step01_on.png")`}}></div>
              <div style={steps.step1 ? {color: '#fff'} : null}>
                <h3>STEP 01</h3>
                <p>약관 동의</p>
              </div>
            </Step>
            <Arrow/>
            <Step style={steps.step1 ? {backgroundColor: '#535353', color: '#fff'} : null}>
              <div
                style={{backgroundImage: `url("/assets/images/join/icon_membership_step02_${steps.step2 ? 'on' : 'off'}.png")`}}></div>
              <div>
                <h3>STEP 02</h3>
                <p>기본 정보 입력</p>
              </div>
            </Step>
            <Arrow/>
            <Step style={steps.step2 ? {backgroundColor: '#535353', color: '#fff'} : null}>
              <div
                style={{backgroundImage: `url("/assets/images/join/icon_membership_step03_${steps.step3 ? 'on' : 'off'}.png")`}}></div>
              <div>
                <h3>STEP 03</h3>
                <p>회원 가입 완료</p>
              </div>
            </Step>
          </Steps>
        </article>
      </StepContainer>
      <SignUpContents>
        {!steps.step1 && !steps.step2 && !steps.step3 &&
          <>
            <Terms/>
            <article style={{borderTop: '1px solid #dcdcdc'}}>
              <ButtonGroup>
                <button type={'button'} onClick={() => navigate('/login')}>취소</button>
                <button type={'button'} onClick={handleNextStep}>다음</button>
              </ButtonGroup>
            </article>
          </>
        }
        {steps.step1 && !steps.step2 && !steps.step3 &&
          <Basic nextStep={handleNextStep}/>
        }
        {steps.step1 && steps.step2 && !steps.step3 &&
          <>
            <Done/>
            <ButtonGroup>
              {/* eslint-disable-next-line no-restricted-globals */}
              <button onClick={() => location.replace('/login')}>홈으로</button>
            </ButtonGroup>
          </>
        }
      </SignUpContents>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{zIndex: 9999999}}
      />
    </div>
  )
}

export default SignUp
