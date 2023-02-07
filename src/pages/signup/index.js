import {Link, useParams} from "react-router-dom";
import styled from "styled-components";
import {useState} from "react";
import Checkbox from "../../components/common/Checkbox";

function Terms () {
  const [isAgreeAll, setIsAgreeAll] = useState(false)
  const [agree, setAgree] = useState({
    term1: false,
    term2: false,
    term3: false,
  })
  const handleChangeAgreeAll = (event) => {
    setIsAgreeAll(event.target.checked)
  }
  const handleChangeTerms = () => {

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
        <TermsBox>
          약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용
          약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용
          약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용
          약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용
          약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용
          약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용약관 내용 약관 내용약관
          내용약관 내용약관 내용약관 내용약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용
          약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용
          약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용
          약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용
          약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용
          약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용
          약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용
          약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용약관 내용 약관 내용약관
          내용약관 내용약관 내용약관 내용약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용
          약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용
        </TermsBox>
      </div>
      <AlignRight>
        <Checkbox
          title={'위 내용에 동의합니다.'}
          type={'a'}
          isChecked={agree.term1}
          onMethod={handleChangeTerms}/>
      </AlignRight>
      <VerticalRule/>
      {/*약관2*/}
      <div>
        <h3>약관명 (필수)</h3>
        <TermsBox>
          약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용
          약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용
          약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용
          약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용
          약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용
          약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용약관 내용 약관 내용약관
          내용약관 내용약관 내용약관 내용약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용
          약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용
          약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용
          약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용
          약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용
          약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용
          약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용
          약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용약관 내용 약관 내용약관
          내용약관 내용약관 내용약관 내용약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용
          약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용
        </TermsBox>
      </div>
      <AlignRight>
        <Checkbox
          title={'위 내용에 동의합니다.'}
          type={'a'}
          isChecked={agree.term2}
          onMethod={handleChangeTerms}/>
      </AlignRight>
      {/*약관3*/}
      <div>
        <h3>약관명 (필수)</h3>
        <TermsBox>
          약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용
          약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용
          약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용
          약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용
          약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용
          약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용약관 내용 약관 내용약관
          내용약관 내용약관 내용약관 내용약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용
          약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용
          약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용
          약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용
          약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용
          약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용
          약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용
          약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용약관 내용 약관 내용약관
          내용약관 내용약관 내용약관 내용약관 내용 약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용약관 내용
          약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용 약관 내용
        </TermsBox>
      </div>
      <AlignRight>
        <Checkbox
          title={'위 내용에 동의합니다.'}
          type={'a'}
          isChecked={agree.term3}
          onMethod={handleChangeTerms}/>
      </AlignRight>
    </article>
  )
}

function Basic () {
  return (
    <div>step2</div>
  )
}

function Done () {
  return (
    <div>step3</div>
  )
}

function SignUp(){
  const params = useParams()
  const [steps, setStep] = useState({
    step1 : true,
    step2 : false,
    step3 : false
  })
  const handleNextStep = () => {
    if(steps.step1 && !steps.step2 && !steps.step3) {
      setStep({
        step1 : true,
        step2 : true,
        step3 : false
      })
    } else if (steps.step1 && steps.step2 && !steps.step3) {
      setStep({
        step1 : true,
        step2 : true,
        step3 : true
      })
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
            <Step>
              <div style={{backgroundImage:`url("/assets/images/join/icon_membership_step02_off.png")`}}></div>
              <div>
                <h3>STEP 02</h3>
                <p>기본 정보 입력</p>
              </div>
            </Step>
            <Arrow/>
            <Step>
              <div style={{backgroundImage:`url("/assets/images/join/icon_membership_step03_off.png")`}}></div>
              <div>
                <h3>STEP 03</h3>
                <p>회원 가입 완료</p>
              </div>
            </Step>
          </Steps>
        </article>
      </StepContainer>
      <SignUpContents>
        {steps.step1 && !steps.step2 && !steps.step3 && <Terms/>}
        {steps.step1 && steps.step2 && !steps.step3 && <Basic/>}
        {steps.step1 && steps.step2 && steps.step3 && <Done/>}
        <article style={{borderTop:'1px solid #dcdcdc'}}>
          <ButtonGroup>
            <button type={'button'}>취소</button>
            <button type={'button'} onClick={handleNextStep}>다음</button>
          </ButtonGroup>
        </article>
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
    border-radius: 66px;
    background-repeat: no-repeat;
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
      background-color: #262626;
    }
  }
`