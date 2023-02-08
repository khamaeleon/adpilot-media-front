import {Link, useParams} from "react-router-dom";
import styled from "styled-components";
import {useEffect, useState} from "react";
import Checkbox from "../../components/common/Checkbox";
import {atom, useAtom, useSetAtom} from "jotai";
import {useForm} from "react-hook-form";

const NextStep = atom({
  terms: false,
  validation: false
})

function Terms () {
  const [isAgreeAll, setIsAgreeAll] = useState(false)
  const setValidation = useSetAtom(NextStep)
  const [agree, setAgree] = useState({
    term1: false,
    term2: false,
    term3: false,
  })
  const handleChangeAgreeAll = (event) => {
    setIsAgreeAll(event.target.checked)
    setAgree({
      term1: event.target.checked,
      term2: event.target.checked,
      term3: event.target.checked,
    })
  }
  useEffect(() => {
    if(agree.term1 && agree.term2 && agree.term3) {
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
  }, [agree]);

  const handleChangeTerms = (event) => {
    if(event.target.id == 'term1') {
      setAgree({
        ...agree,
        term1: event.target.checked,
      })
    }
    if(event.target.id == 'term2') {
      setAgree({
        ...agree,
        term2: event.target.checked,
      })
    }
    if(event.target.id == 'term3') {
      setAgree({
        ...agree,
        term3: event.target.checked,
      })
    }
  }

  return (
    <article>
      <div><h2>약관 동의</h2></div>
      <VerticalRule style={{height: 3, backgroundColor:'#aaa'}}/>
      <AlignRight>
        <Checkbox
          title={'하기 모든 약관에 동의합니다.'}
          type={'b'}
          isChecked={isAgreeAll}
          onMethod={handleChangeAgreeAll}/>
      </AlignRight>
      <VerticalRule/>
      {/*약관 1*/}
      <div>
        <h3>약관명 (필수)</h3>
        <TermsBox></TermsBox>
      </div>
      <AlignRight>
        <Checkbox
          title={'위 내용에 동의합니다.'}
          type={'a'}
          isChecked={agree.term1}
          id={'term1'}
          onMethod={handleChangeTerms}/>
      </AlignRight>
      <VerticalRule/>
      {/*약관2*/}
      <div>
        <h3>약관명 (필수)</h3>
        <TermsBox></TermsBox>
      </div>
      <AlignRight>
        <Checkbox
          title={'위 내용에 동의합니다.'}
          type={'a'}
          id={'term2'}
          isChecked={agree.term2}
          onMethod={handleChangeTerms}/>
      </AlignRight>
      {/*약관3*/}
      <div>
        <h3>약관명 (필수)</h3>
        <TermsBox></TermsBox>
      </div>
      <AlignRight>
        <Checkbox
          title={'위 내용에 동의합니다.'}
          type={'a'}
          id={'term3'}
          isChecked={agree.term3}
          onMethod={handleChangeTerms}/>
      </AlignRight>
    </article>
  )
}

function Basic (props) {
  const [user, setUser] = useState({

  })
  const [showPassword, setShowPassword] = useState(false)
  const setValidation = useSetAtom(NextStep)

  const { register, handleSubmit, watch, getValues, formState: { errors } } = useForm({
    mode: "onSubmit",
    defaultValues: {
      mediaType:'',
      id: '',
      password: '',
      confirmPassword: '',
      businessRegistrationNumber: '',
      businessLicense:'',
      mediaName:'',
      mediaURL:"",
      managerName:'',
      managerContact:'',
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
  }
  const onError = (error) => console.log(error)

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <article>
        <div><h2>기본 정보 입력</h2></div>
        <VerticalRule style={{height: 3, backgroundColor:'#aaa'}}/>
        <Form>
          <div>
            <div>매체 구분</div>
            <div>
              <div>
                <label htmlFor={'media'}>
                  <input type={'radio'} name={'media'} id={'media'}/>
                  <span>매체</span>
                </label>
              </div>
              <div>
                <label htmlFor={'media1'}>
                  <input type={'radio'} name={'media'} id={'media1'}/>
                  <span>매체 대행사</span>
                </label>
              </div>
            </div>
          </div>
          <div>
            <div>아이디</div>
            <div>
              <input
                type={'text'}
                placeholder={'아이디'}
                {...register("id",{
                  required:"Required"
                })
                }
              />
            </div>
          </div>
          <div>
            <div>비밀번호</div>
            <div>
              <input
                type={showPassword ? 'text':'password'}
                placeholder={'숫자, 영문, 특수 기호를 포함 (10자 ~ 16자)'}
                {...register("password",{
                  required: true,
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
                    message: "비밀번호를 확인해주세요. 숫자, 영문, 특수 기호를 포함 (10자 ~ 16자)"
                  }
                })}
              />
              {errors.password && <ValidationScript>{errors.password?.message}</ValidationScript>}
              <div onClick={handleShowPassword} >
                <span style={{marginRight:10,width:30,height:30,display:'inline-block',verticalAlign:'middle',backgroundImage:`url(/assets/images/common/checkbox_${showPassword?'on':'off'}_B.png)`}}/>
                <span>{showPassword ? '가리기':'보기'}</span>
              </div>
            </div>
          </div>
          <div>
            <div>비밀번호 확인</div>
            <div>
              <input
                type={showPassword ? 'text':'password'}
                placeholder={'숫자, 영문, 특수 기호를 포함 (10자 ~ 16자)'}
                {...register("confirm_password",{
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
                {...register("businessRegistrationNumber",{
                  required: "Required",
                })}
              />
              {errors.businessRegistrationNumber && <ValidationScript>{errors.businessRegistrationNumber?.message}</ValidationScript>}
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
              {errors.businessLicense && <ValidationScript>{errors.businessRegistrationNumber?.message}</ValidationScript>}
              <FileButton>
                파일첨부
                <input
                  type={'file'}
                  style={{display:"none"}}
                  {...register("businessLicense",{
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
                {...register("mediaName",{
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
                {...register("mediaURL",{
                  required: "Required",
                })}
              />
            </div>
          </div>
          <div>
            <div>담당자명</div>
            <div>
              <input
                type={'text'}
                placeholder={'담당자 명을 입력해주세요'}
                {...register("managerName",{
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
                {...register("managerContact",{
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
                {...register("managerEmail",{
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

function Done () {
  return (
    <article>
      <AfterSignUpGuild>
        <div>
          <Round style={{backgroundImage:'url("/assets/images/join/img_number_01.png")'}}>
            <span>01</span>
          </Round>
          <h3>기본 정보 입력</h3>
        </div>
        <div>
          <Round style={{backgroundImage:'url("/assets/images/join/img_number_02.png")'}}>
            <span>02</span>
          </Round>
          <h3>검토 및 승인</h3>
        </div>
        <div>
          <Round style={{backgroundImage:'url("/assets/images/join/img_number_03.png")'}}>
            <span>03</span>
          </Round>
          <h3>서비스 이용</h3>
        </div>
      </AfterSignUpGuild>
      <div style={{margin:'50px 0',padding:40,textAlign:"center",border:"1px solid #ddd", borderRadius: 5}}>
        “서비스명”은 회원 가입 승인 후 서비스 이용이 가능합니다.<br/>
        최종 승인 시 기본 정보 입력 시 등록하신 연락처로 승인 완료 안내 문자가 발송됩니다.<br/>
        ※ 가입 승인은 영업일 기준 24시간 내 완료됩니다.
      </div>
    </article>
  )
}

function SignUp(){
  const [agreeValidation] = useAtom(NextStep)
  const [steps, setStep] = useState({
    step1 : true,
    step2 : false,
    step3 : false
  })
  const handleNextStep = () => {
    if(agreeValidation.terms) {
      if (steps.step1 && !steps.step2 && !steps.step3) {
        setStep({
          step1: true,
          step2: true,
          step3: false
        })
      }
    }
    if(agreeValidation.validation) {
      if (steps.step1 && steps.step2 && !steps.step3) {
        setStep({
          step1 : true,
          step2 : true,
          step3 : true
        })
      }
    }

  }
  return(
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
          <div><h1>회원가입</h1></div>
          <div><p>회원가입 하시면 엠코퍼레이션에  다양한 서비스를 이용하실 수 있습니다.</p></div>
          <Steps>
            <Step style={steps.step1 ? {backgroundColor: '#535353',color:'#fff'} : null}>
              <div style={{backgroundImage:`url("/assets/images/join/icon_membership_step01_on.png")`}}></div>
              <div style={steps.step1 ? {color: '#fff'} : null}>
                <h3>STEP 01</h3>
                <p>약관 동의</p>
              </div>
            </Step>
            <Arrow/>
            <Step style={steps.step2 ? {backgroundColor: '#535353',color:'#fff'} : null}>
              <div style={{backgroundImage:`url("/assets/images/join/icon_membership_step02_${steps.step2 ? 'on':'off'}.png")`}}></div>
              <div>
                <h3>STEP 02</h3>
                <p>기본 정보 입력</p>
              </div>
            </Step>
            <Arrow/>
            <Step  style={steps.step3 ? {backgroundColor: '#535353',color:'#fff'} : null}>
              <div style={{backgroundImage:`url("/assets/images/join/icon_membership_step03_${steps.step3 ? 'on':'off'}.png")`}}></div>
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
            <article style={{borderTop:'1px solid #dcdcdc'}}>
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
  & article > div {
    & h1 {
      text-align: center;
      font-size: 50px;
    }
    & p {
      text-align: center;
      font-size: 20px;
    }
  }
`

const Steps = styled.div`
  margin: 50px 0 70px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Step = styled.div`
  display: flex;
  padding: 17px;
  width: 320px;
  border-radius: 50px;
  background-color: #f8f8f8;
  & > div:first-child {
    width: 66px;
    height: 66px;
    border-radius: 100%;
    background-repeat: no-repeat;
    background-size: 66px;
    background-position: center;
  }
  & > div:last-child {
    margin-left: 24px;
    & h3 {
      margin: 0;
      padding: 0;
      color: #ddd;
      font-size: 30px;
    }
    & p {
      margin: 0;
      padding: 0;
      font-size: 18px;
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
`
const TermsBox = styled.div`
  padding: 20px;
  width: 100%;
  height: 183px;
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
  border:1px solid #e9ebee;
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
    & input[type='text'], input[type='password'] {
      margin: 0 10px;
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
  color:#fff;
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