import {Link} from "react-router-dom";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {atom, useAtom, useSetAtom} from "jotai";
import {useForm} from "react-hook-form";
import {termsInfo} from "./entity";
import Checkbox from "@atlaskit/checkbox";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const NextStep = atom({
  terms: false,
  validation: false
})
const TermsInfo = atom(termsInfo)

function Terms() {
  const [termsInfo, setTermsInfo] = useAtom(TermsInfo)
  const [isAgreeAll, setIsAgreeAll] = useState(false)
  const setValidation = useSetAtom(NextStep)
  /**
   * 약관 전체 선택 및 동의
   */
  useEffect(() => {
    if(termsInfo[0].requiredAgree && termsInfo[1].requiredAgree && termsInfo[2].requiredAgree){
      setIsAgreeAll(true)
      setValidation({
        terms: true,
        validation: false
      })
    }else{
      setIsAgreeAll(false)
      setValidation({
        terms: false,
        validation: false
      })
    }
  }, [termsInfo,isAgreeAll]);

  /**
   * 약관 전체 선택 핸들러
   * @param event
   */
  const handleChangeAgreeAll = (event) => {
    setTermsInfo(termsInfo.map(termsInfoValue => {
      if(termsInfoValue.requiredAgree !== event.target.checked){
        return {
          ...termsInfoValue,
          requiredAgree: event.target.checked
        }
      }else{
        return  {
          ...termsInfoValue
        }
      }
    }))
    setIsAgreeAll(event.target.checked)
  }
  /**
   * 약관 동의 핸들러
   * @param event
   */
  const handleChangeTerms = (event) => {
    if (event.target.id === 'serviceTerms') {
      setTermsInfo(termsInfo.map(termsInfoValue => {
        if (termsInfoValue.termsType === 'SERVICE') {
          return {
            ...termsInfoValue,
            requiredAgree: event.target.checked
          }
        }else{
          return  {
            ...termsInfoValue
          }
        }
      }))
    }else if(event.target.id === 'privacyTerms') {
      setTermsInfo(termsInfo.map(termsInfoValue => {
        if (termsInfoValue.termsType === 'PRIVACY') {
          return {
            ...termsInfoValue,
            requiredAgree: event.target.checked
          }
        }else{
          return  {
            ...termsInfoValue
          }
        }
      }))
    }else if(event.target.id === 'operationTerms') {
      setTermsInfo(termsInfo.map(termsInfoValue => {
        if (termsInfoValue.termsType === 'OPERATION') {
          return {
            ...termsInfoValue,
            requiredAgree: event.target.checked
          }
        }else{
          return  {
            ...termsInfoValue
          }
        }
      }));
    }
  }

  return (
    <article>
      <div><h2>약관 동의</h2></div>
      <VerticalRule style={{height: 3, backgroundColor: '#aaa'}}/>
      <AlignRight>
        <Checkbox
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
          label={'위 내용에 동의합니다.'}
          isChecked={
            termsInfo[0].requiredAgree
          }
          id={'serviceTerms'}
          onChange={(e)=>handleChangeTerms(e)}/>
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
          isChecked={
            termsInfo[1].requiredAgree
          }
          onChange={(e)=>handleChangeTerms(e)}/>
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
          isChecked={
            termsInfo[2].requiredAgree
          }
          onChange={(e)=>handleChangeTerms(e)}/>
      </AlignRight>
    </article>
  )
}

function Basic(props) {
  const [showPassword, setShowPassword] = useState(false)
  const [isAgent, setIsAgent] = useState(false)
  const setValidation = useSetAtom(NextStep)

  const {register, handleSubmit, watch, getValues, formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: {
      mediaType: '',
      id: '',
      password: '',
      confirmPassword: '',
      businessRegistrationNumber: '',
      businessLicense: '',
      mediaName: '',
      mediaURL: "",
      managerName: '',
      managerContact: '',
      managerEmail: '',
      emailDomain: ''
    }
  })

  const handleNextStep = () => {
    props.nextStep()
  }
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = (data) => {
    // 최종데이터
    console.log(data)
    setValidation({
      terms: true,
      validation: true
    })
  }
  const onError = (error) => console.log(error)
  const handleChangeIsAgent = () => {
    setIsAgent(!isAgent)
  }
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
              <Checkbox
                label={'대행사(대행사일 경우에만 체크)'}
                isChecked={isAgent}
                onChange={handleChangeIsAgent}/>
            </div>
          </div>
          <div>
            <div>아이디</div>
            <div>
              <input
                type={'text'}
                placeholder={'아이디'}
                {...register("id", {
                  required: "Required"
                })
                }
              />
            </div>
          </div>
          <div>
            <div>비밀번호</div>
            <div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={'숫자, 영문, 특수 기호를 포함 (10자 ~ 16자)'}
                {...register("password", {
                  required: true,
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
                    message: "비밀번호를 확인해주세요. 숫자, 영문, 특수 기호를 포함 (10자 ~ 16자)"
                  }
                })}
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
          </div>
          <div>
            <div>비밀번호 확인</div>
            <div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={'숫자, 영문, 특수 기호를 포함 (10자 ~ 16자)'}
                {...register("confirm_password", {
                  required: true,
                  validate: (value) => {
                    if (watch('password') !== value) {
                      return "입력하신 비밀번호가 맞는지 확인부탁드립니다."
                    }
                  }
                })}
              />
              {errors.confirm_password && <ValidationScript>{errors.confirm_password?.message}</ValidationScript>}
            </div>
          </div>
          <div>
            <div>사업자 등록 번호</div>
            <div>
              <input
                type={'text'}
                placeholder={'사업자 등록 번호'}
                {...register("businessRegistrationNumber", {
                  required: "Required",
                })}
              />
              {errors.businessRegistrationNumber &&
                <ValidationScript>{errors.businessRegistrationNumber?.message}</ValidationScript>}
            </div>
          </div>
          <div>
            <div>사업자 등록증</div>
            <div>
              <input
                type={'text'}
                placeholder={'사업자 등록증을 첨부해주세요.'}
                value={getValues("businessLicense")[0]?.name || ""}
                readOnly={true}
              />
              {errors.businessLicense &&
                <ValidationScript>{errors.businessRegistrationNumber?.message}</ValidationScript>}
              <FileButton>
                파일첨부
                <input
                  type={'file'}
                  style={{display: "none"}}
                  {...register("businessLicense", {
                    required: "Required",
                  })}
                />
              </FileButton>
            </div>
          </div>
          <div>
            <div>매체명</div>
            <div>
              <input
                type={'text'}
                placeholder={'매체명'}
                {...register("mediaName", {
                  required: "Required",
                })}
              />
            </div>
          </div>
          <div>
            <div>매체 url</div>
            <div>
              <input
                type={'text'}
                placeholder={'url'}
                {...register("mediaURL", {
                  required: "Required",
                })}
              />
            </div>
          </div>
          <h2>담당자1 정보(필수)</h2>
          <div>
            <div>담당자명</div>
            <div>
              <input
                type={'text'}
                placeholder={'담당자 명을 입력해주세요'}
                {...register("managerName", {
                  required: "Required",
                })}
              />
            </div>
          </div>
          <div>
            <div>담당자 연락처</div>
            <div>
              <input
                type={'text'}
                placeholder={'연락처를 입력해주세요.'}
                {...register("managerContact", {
                  required: "Required",
                })}
              />
            </div>
          </div>
          <div>
            <div>담당자 이메일</div>
            <div>
              <input
                type={'text'}
                placeholder={'이메일을 입력해주세요.'}
                {...register("managerEmail", {
                  required: "Required",
                })}
              />
              <Select {...register("emailDomain")}>
                <option value={'direct'}>직접입력</option>
                <option value={'kakao.com'}>@kakao.com</option>
                <option value={'google.com'}>@google.com</option>
                <option value={'naver.com'}>@naver.com</option>
                <option value={'nate.com'}>@nate.com</option>
              </Select>
            </div>
          </div>
          <h2>담당자2 정보(선택)</h2>
          <div>
            <div>담당자명</div>
            <div>
              <input
                type={'text'}
                placeholder={'담당자 명을 입력해주세요'}
                {...register("managerName", {
                  required: "Required",
                })}
              />
            </div>
          </div>
          <div>
            <div>담당자 연락처</div>
            <div>
              <input
                type={'text'}
                placeholder={'연락처를 입력해주세요.'}
                {...register("managerContact", {
                  required: "Required",
                })}
              />
            </div>
          </div>
          <div>
            <div>담당자 이메일</div>
            <div>
              <input
                type={'text'}
                placeholder={'이메일을 입력해주세요.'}
                {...register("managerEmail", {
                  required: "Required",
                })}
              />
              <Select {...register("emailDomain")}>
                <option value={'direct'}>직접입력</option>
                <option value={'kakao.com'}>@kakao.com</option>
                <option value={'google.com'}>@google.com</option>
                <option value={'naver.com'}>@naver.com</option>
                <option value={'nate.com'}>@nate.com</option>
              </Select>
            </div>
          </div>
        </Form>
      </article>
      <ButtonGroup>
        <SignUpVerify onClick={handleNextStep} type={"submit"}>가입 요청</SignUpVerify>
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
          <Round style={{backgroundImage: 'url("/assets/images/join/img_number_02.png")'}}>
            <span>02</span>
          </Round>
          <h3>검토 및 승인</h3>
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
  const [steps, setStep] = useState({
    step1: true,
    step2: false,
    step3: false
  })
  const handleNextStep = () => {
    if (agreeValidation.terms) {
      if (steps.step1 && !steps.step2 && !steps.step3) {
        setStep({
          step1: true,
          step2: true,
          step3: false
        })
      }
    }else{
      toast.warning('전체 약관이 동의가 되지 않았습니다.')
    }
    if (agreeValidation.validation) {
      if (steps.step1 && steps.step2 && !steps.step3) {
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
            <Step style={steps.step2 ? {backgroundColor: '#535353', color: '#fff'} : null}>
              <div
                style={{backgroundImage: `url("/assets/images/join/icon_membership_step02_${steps.step2 ? 'on' : 'off'}.png")`}}></div>
              <div>
                <h3>STEP 02</h3>
                <p>기본 정보 입력</p>
              </div>
            </Step>
            <Arrow/>
            <Step style={steps.step3 ? {backgrouaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaandColor: '#535353', color: '#fff'} : null}>
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
        {steps.step1 && !steps.step2 && !steps.step3 &&
          <>
            <Terms/>
            <article style={{borderTop: '1px solid #dcdcdc'}}>
              <ButtonGroup>
                <button type={'button'}>취소</button>
                <button type={'button'} onClick={handleNextStep}>다음</button>
              </ButtonGroup>
            </article>
          </>
        }
        {steps.step1 && steps.step2 && !steps.step3 &&
          <Basic nextStep={handleNextStep}/>
        }
        {steps.step1 && steps.step2 && steps.step3 &&
          <>
            <Done/>
            <ButtonGroup>
              <button>홈으로</button>
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

const SignUpHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  border-bottom: 1px solid #eee;
`

const Logo = styled.div`
  width: 212px;
  height: 45px;
  background-image: url("/assets/images/logos/logo@2x.png");
  background-repeat: no-repeat;
  background-size: contain;
`

const StepContainer = styled.div`
  & article {
    padding: 20px 0;
  }
  & article > div {
    & h1 {
      text-align: center;
      font-size: 40px;
    }

    & p {
      text-align: center;
      font-size: 20px;
    }
  }
`

const Steps = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Step = styled.div`
  display: flex;
  padding: 12px;
  width: 320px;
  border-radius: 50px;
  background-color: #f8f8f8;

  & > div:first-child {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-repeat: no-repeat;
    background-size: 48px;
    background-position: center;
  }

  & > div:last-child {
    margin-left: 24px;
    & h3 {
      margin: 0;
      padding: 0;
      color: #ddd;
      font-size: 20px;
    }

    & p {
      margin: 0;
      padding: 0;
      font-size: 14px;
      text-align: left;
    }
  }
`

const Arrow = styled.div`
  width: 15px;
  height: 20px;
  background-repeat: no-repeat;
  background-image: url("/assets/images/join/icon_next.png");
`

const SignUpContents = styled.div`
  padding: 50px 0 70px 0;
  background-color: #f8f8f8;
  & article {
    & h2 {
      margin-bottom: 10px;
    }
    & h3 {
      margin:20px 0 10px 0;
    }
  }
`
const TermsBox = styled.div`
  padding: 20px;
  width: 100%;
  height: 143px;
  border-radius: 5px;
  border: 1px solid #e9ebee;
  background-color: #fff;
  overflow: auto;
`
const AlignRight = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 28px 0;
`
const VerticalRule = styled.div`
  width: 100%;
  height: 1px;
  background-color: #dcdcdc;
`

const ButtonGroup = styled.div`
  padding: 60px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  & button {
    font-size: 16px;
    color: #535353;
    transition-duration: 0.5s;
    cursor: pointer;
  }

  & button:first-child {
    padding: 18px 60px;
    background-color: #fff;
    border: 1px solid #535353;

    &:hover {
      border: 1px solid #f5811f;
      color: #f5811f;
    }
  }

  & button:last-child {
    margin-left: 15px;
    padding: 18px 60px;
    background-color: #535353;
    color: #fff;

    &:hover {
      border: 0;
      background-color: #262626;
      color: #fff;
    }
  }
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 0;
  padding: 60px 40px;
  width: 100%;
  background-color: #fff;
  border: 1px solid #e9ebee;
  & h2 {
    margin-top: 20px;
  }
  & > div {
    position: relative;
    margin: 10px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 50px;
    font-size: 16px;
  }

  & > div > div:first-child {
    width: 120px;
  }

  & > div > div:last-child {
    display: flex;
    align-items: center;
    & > * {
      margin-right: 10px;
    }
    & > div > label {
      display: flex;
      align-items: center;
    }
    & input[type='radio'] + span {
      display: inline-block;
      margin: 0 0 0 10px;
    }
    & input[type='text'], input[type='password'] {
      
      min-width: 600px;
      height: 50px;
      border-radius: 5px;
      border: 1px solid #e5e5e5;
      padding: 20px;
    }

    & select {
      height: 50px;
      border-radius: 5px;
      border: 1px solid #e5e5e5;
      padding: 0 20px;
    }
  }
`

const SignUpVerify = styled.button`
  width: 300px;
  height: 60px;
  background-color: #535353;
  font-size: 16px;
  color: #fff;
`

const AfterSignUpGuild = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
`

const Round = styled.div`
  position: relative;
  width: 240px;
  height: 240px;
  border-radius: 100%;
  border: 1px solid #e9ebee;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: center;

  & span {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 47px;
    height: 47px;
    border-radius: 100%;
    background-color: #535353;
    color: #fff;
    font-size: 18px;
  }
`

const FileButton = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 192px;
  height: 50px;
  background-color: #777777;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
`

const Select = styled.select`
  width: 192px;
  outline: 0;
`
const ValidationScript = styled.div`
  position: absolute;
  bottom: -16px;
  left: 140px;
  color: #f55a5a;
  font-size: 12px !important;
`