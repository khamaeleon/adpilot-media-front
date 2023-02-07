import styled from 'styled-components'
import {Link, useParams} from "react-router-dom";
import LoginModal from "../../components/modal/LoginModal";
import {useEffect, useState} from "react";
import {useCookies} from 'react-cookie'
import Checkbox from "../../components/common/Checkbox";

function FindPassword(props) {
  const handleFindPassword = () => {
    props.openModal()
  }
  return (
    <LoginInputComponent>
      <Title>
        <h1>비밀번호 찾기</h1>
      </Title>
      <InputGroup>
        <LabelInline>
          <span>아이디</span>
        </LabelInline>
        <div>
          <input type={'email'} placeholder={'아이디(이메일)'}/>
        </div>
      </InputGroup>
      <InputGroup>
        <LabelInline>
          <span>사업자 등록 번호</span>
        </LabelInline>
        <FindCorporationNo>
          <input type={'text'} placeholder={''}/>
          <VerticalRule/>
          <input type={'text'} placeholder={''}/>
          <VerticalRule/>
          <input type={'text'} placeholder={''}/>
        </FindCorporationNo>
      </InputGroup>
      <InputGroup>
        <LabelInline>
          <span>담당자 이메일</span>
        </LabelInline>
        <div>
          <input type={'text'} placeholder={'담당자 이메일을 입력해주세요.'}/>
        </div>
      </InputGroup>
      <FindGroup/>
      <InputGroup>
        <Button type={'submit'} onClick={handleFindPassword}>
          비밀번호 찾기
        </Button>
      </InputGroup>
    </LoginInputComponent>
  )
}
function FindId() {
  return (
    <LoginInputComponent>
      <Title>
        <h1>아이디 찾기</h1>
      </Title>
      <InputGroup>
        <LabelInline>
          <span>사업자 등록 번호</span>
        </LabelInline>
        <FindCorporationNo>
          <input type={'text'} placeholder={''}/>
          <VerticalRule/>
          <input type={'text'} placeholder={''}/>
          <VerticalRule/>
          <input type={'text'} placeholder={''}/>
        </FindCorporationNo>
      </InputGroup>
      <InputGroup>
        <LabelInline>
          <span>담당자 이메일</span>
        </LabelInline>
        <div>
          <input type={'text'} placeholder={'담당자 이메일을 입력해주세요.'}/>
        </div>
      </InputGroup>
      <FindGroup/>
      <InputGroup>
        <Button type={'submit'}>
          아이디찾기
        </Button>
      </InputGroup>
    </LoginInputComponent>
  )
}
function LoginComponent () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRemember, setIsRemember] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['rememberEmail'])
  // 사용자 이메일
  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }
  // 사용자 패스워드
  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }
  // 아이디 저장
  const handleChangeRemember = (event) => {
    console.log(event.target.checked)
    setIsRemember(event.target.checked)
    if(event.target.checked) {
      setCookie('rememberEmail', email)
    } else {
      removeCookie('rememberEmail')
    }
  }

  const handleChangeLogin = () => {

  }

  useEffect(() => {
    if(cookies.rememberEmail !== undefined) {
      setEmail(cookies.rememberEmail)
      setIsRemember(true)
    }
  }, []);

  return (
    <LoginInputComponent>
      <Title>
        <h1>Login</h1>
      </Title>
      <InputGroup>
        <LabelInline>
          <span>아이디</span>
          <Checkbox onMethod={handleChangeRemember} isChecked={isRemember} title={'아이디 저장'} type={'b'}/>
        </LabelInline>
        <div>
          <input
            type={'email'}
            placeholder={'아이디(이메일)'}
            onChange={handleChangeEmail}
            value={email || ''} />
        </div>
      </InputGroup>
      <InputGroup>
        <LabelInline>
          <span>비밀번호</span>
        </LabelInline>
        <div>
          <input
            type={'password'}
            placeholder={'비밀번호(8~12자)'}
            onChange={handleChangePassword}
            value={password || ''} />
        </div>
      </InputGroup>
      <FindGroup>
        <Link to={'/'}>아이디찾기</Link>
        <HorizontalRule/>
        <Link to={'/'}>비밀번호 찾기</Link>
        <HorizontalRule/>
        <Link to={'/'}>회원가입</Link>
      </FindGroup>
      <InputGroup>
        <Button type={'button'} onClick={handleChangeLogin}>
          Login
        </Button>
      </InputGroup>
    </LoginInputComponent>
  )
}
function Login(props){
  const [show, setShow] = useState(false)
  console.log(props.match)
  const modalClose = () => {
    setShow(false)
  }
  return (
    <>
      {show &&
        <LoginModal showModal={show}>
          <ModalComponent>
            <header>
              <LabelInline>
                <span>비밀번호 찾기 결과</span>
                <Close onClick={modalClose}/>
              </LabelInline>
            </header>
            <main>
              <ModalBody>
                <EmailId>gildo****3@naver.com</EmailId>으로 임시 비밀번호가 발급되었습니다.
                로그인 후 반드시 비밀번호를 변경해주시기 바랍니다.
              </ModalBody>
            </main>
            <footer>
              <ModalButton>로그인</ModalButton>
            </footer>
          </ModalComponent>
        </LoginModal>
      }
      <LoginContainer>
        <div>
          <div>
            <LoginLogo/>
            <div>
              <p>로그인 하시면 엠코퍼레이션에</p>
              <p>다양한 서비스를 이용하실 수 있습니다.</p>
            </div>
          </div>
        </div>
        <div>
          {props.match === 'findId' &&
            <FindId />
          }
          {props.match == 'findPassword' &&
            <FindPassword openModal={()=>setShow(true)}/>
          }
          {props.match == 'login' &&
            <LoginComponent />
          }
        </div>
      </LoginContainer>
    </>
  )
}

export default Login

const LoginContainer = styled.div`
  display: flex;
  & > div:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 100vh;
    background-image: url('/assets/images/login/login_background.png');
    background-size: cover;
    text-align: center;
    & div > div:last-child {
      margin-top: 20px;
      & p {
        line-height: 5px;
        color: #fff;
        font-size: 1rem;
      }
    }
    
  }
  & > div:last-child {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    width: 40%;
    height: 100vh;
  }
`

const FindGroup = styled.div`
  margin: 25px 0 50px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const HorizontalRule = styled.span`
  display: inline-block;
  width: 1px;
  height: 10px;
  background-color: #777;
`

const VerticalRule = styled.span`
  flex-shrink: 0;
  display: inline-block;
  width: 7px;
  height: 1px;
  background-color: #777;
  margin: 0 10px; 
`

const Title = styled.div`
  margin-bottom: 70px;
  text-align: center;
  & h1 {
    font-family: 'Roboto';
    font-size: 2.2rem;
    font-weight: 900;
  }
`

const LoginLogo = styled.div`
  width: 300px;
  height: 150px;
  background-image: url('/assets/images/logos/logo_white.png');
`

const LoginInputComponent = styled.div`
  width: 350px;
`

const InputGroup = styled.div`
  margin: 15px 0;
  & input[type='text'], input[type='email'], input[type='password'] {
    width: 100%;
    height: 50px;
    padding: 15px;
    border: 1px solid #e9ebee;
    background-color: #f9fafb;
    border-radius: 10px;
    outline: 0;
  }
  & input[type='checkbox'] + label {
    font-size: 0.9rem;
    color: #777
  }
`

const LabelInline = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

const Button = styled.button `
  padding: 16px;
  width: 100%;
  color: #fff;
  background-color: #f5811f;
  font-size: 1.6rem;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: #db7219;
  }
`

const FindCorporationNo = styled.div`
  display: flex;
  align-items: center;
`

const ModalComponent = styled.div`
  width: 500px;
  background-color: #fff;
  border-radius: 10px;
  & header {
    padding: 17px 25px;
    border-bottom: 1px solid #dadada;
    font-size: 18px;
    font-weight: 800;
  }
  & main {
    padding: 20px 25px;
  }
  & footer {
    display: flex;
    justify-content: center;
    padding: 20px;
    border-top: 1px solid #f2f2f2;
  }
`
const ModalBody = styled.div`
  padding: 20px 35px; 
  border-radius: 10px;
  background-color: #f9f9f9;
`

const Close = styled.div`
  padding: 4px;
  width: 24px;
  height: 24px;
  background-image: url('/assets/images/common/btn_popup_close.png');
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`

const ModalButton = styled.button`
  padding: 13px 0;
  width: 200px;
  background-color: #535353;
  color: #fff;
  font-size: 16px;
`

const EmailId = styled.span `
  color: #f5811f;
`