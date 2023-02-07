import {Link, useParams} from "react-router-dom";
import styled from "styled-components";
import {useState} from "react";

function terms () {
  return (
    <div>step1</div>
  )
}

function basic () {
  return (
    <div>step2</div>
  )
}

function done () {
  return (
    <div>step3</div>
  )
}

function SignUp(){
  const params = useParams()
  const [steps, setStep] = useState('step1')
  return(
    <div className={'sign-up'}>
      <JoinHeader>
        <article>
          <Link to={'/'}>
            <Logo/>
          </Link>
        </article>
      </JoinHeader>
      <StepContainer>
        <article>
          <div><h1>회원가입</h1></div>
          <div><p>회원가입 하시면 엠코퍼레이션에  다양한 서비스를 이용하실 수 있습니다.</p></div>
          <Steps>
            <Step style={steps == 'step1' ? {backgroundColor: '#535353',color:'#fff'} : null}>
              <div style={{backgroundImage:`url("/assets/images/join/icon_membership_step01_on.png")`}}></div>
              <div style={steps == 'step1' ? {color: '#fff'} : null}>
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
      <JoinContents>

      </JoinContents>
    </div>
  )
}

export default SignUp

const JoinHeader = styled.div`
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
  margin-top: 50px;
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

const JoinContents = styled.div`
`