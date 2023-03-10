import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Checkbox from "../../components/common/Checkbox";
import {loginAdminParams, loginParams, UserToken} from "./entity";
import {login} from "../../services/AuthAxios";
import {useForm} from "react-hook-form";
import {RowSpan, ValidationScript} from "../../assets/GlobalStyles";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components'

function AdminLogin(props) {
  const [loginParamsValue, setLoginParams] = useState(loginAdminParams);
  const navigate = useNavigate();
  const {register, handleSubmit, formState: {errors}} = useForm()
  // 사용자 명
  const handleChangeId = (event) => {
    setLoginParams({
      ...loginParamsValue,
      email: event.target.value
    })
  }
  // 사용자 패스워드
  const handleChangePassword = (event) => {
    setLoginParams({
      ...loginParamsValue,
      password: event.target.value
    })
  }

  const onSubmit = (data) => {
    console.log(data)
    login(loginParamsValue).then((response) => {
      console.log(response)
      if (response) {
        navigate('/board/dashboard')
      } else {
        toast.info('아이디와 비밀번호를 확인해 주세요.')
      }
    });
  }
  const onError = (error) => console.log(error)
  return (
    <>
      <LoginContainer>
        <div>
          <div>
            <LoginLogo/>
            <div>
              <>
                <div>로그인 하시면 엠코퍼레이션에</div>
                <div>다양한 서비스를 이용하실 수 있습니다.</div>
              </>
            </div>
          </div>
        </div>
        <div>
          <LoginInputComponent>
            <Title>
              <h1>아이엠</h1>
            </Title>
            <RowSpan style={{justifyContent: 'flex-end'}}>
              <Link to={'/login'}>사용자로그인</Link>
            </RowSpan>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <InputGroup>
                <LabelInline>
                  <span>아이디</span>
                </LabelInline>
                <div>
                  <input
                    type={'text'}
                    placeholder={'아이디'}
                    value={loginParamsValue.email || ''}
                    {...register('email', {
                      required: "아이디를 입력해주세요",
                      onChange: (e) => {
                        handleChangeId(e)
                      }
                    })}/>
                </div>
                {errors.userId && <ValidationScript>{errors.userId.message}</ValidationScript>}
              </InputGroup>
              <InputGroup>
                <LabelInline>
                  <span>비밀번호</span>
                </LabelInline>
                <div style={{position: 'relative'}}>
                  <input
                    type={'password'}
                    placeholder={'비밀번호(8~12자)'}
                    value={loginParamsValue.password || ''}
                    {...register("password", {
                      required: "비밀번호를 입력해주세요",
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
                        message: "비밀번호를 확인해주세요. 숫자, 영문, 특수 기호를 포함 (10자 ~ 16자)"
                      },
                      onChange: handleChangePassword
                    })}/>
                </div>
                {errors.password && <ValidationScript>{errors.password?.message}</ValidationScript>}
              </InputGroup>
              <InputGroup>
                <Button type={'submit'}>
                  Login
                </Button>
              </InputGroup>
            </form>
          </LoginInputComponent>
        </div>
      </LoginContainer>
      <ToastContainer position="top-center"
                      autoClose={1500}
                      hideProgressBar
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      style={{zIndex: 9999999}}/>
    </>
  )
}

export default AdminLogin

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

      & div {
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
  position: relative;
  margin: 30px 0 15px 0;

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

const Button = styled.button`
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


const ShowPassword = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  background-image: url('/assets/images/login/hide.png');
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: center;
`

const LabelInline = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`
