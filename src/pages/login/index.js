import styled from 'styled-components'
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import Modal, {ModalBody, ModalFooter, ModalHeader} from "../../components/modal/Modal";
import {useEffect, useState} from "react";
import {useCookies} from 'react-cookie'
import Checkbox from "../../components/common/Checkbox";
import {findIdParams, findPasswordParams, loginParams, UserToken} from "./entity";
import {login} from "../../services/AuthAxios";
import {useAtom} from "jotai";
import {atom} from "jotai/index";
import {FindIdResultAtom, modalController} from "../../store";
import {useForm} from "react-hook-form";
import {ValidationScript} from "../../assets/GlobalStyles";
import {toast, ToastContainer, useToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {selFindUserId} from "../../services/ManageUserAxios";
import {ComponentModalFindId, ComponentModalFindPassword} from "../../components/modal";

function FindPassword(props) {
  const [findPasswordInfo, setFindPasswordInfo] = useState(findPasswordParams)
  const {register, handleSubmit, formState:{errors}} = useForm()
  const success = true
  const handleFindPassword = () => {
    //axios 로 호출하여 서버쪽에서 이메일쪽으로 전송
    console.log(findPasswordInfo)
    if(success){
      props.openModal()
    } else {
      toast.info('입력정보를 확인해주세요')
    }
  }
  /**
   * 담당자 이메일
   * @param event
   */
  const handleManagerEmail = (event) =>{
    setFindPasswordInfo({
      ...findPasswordInfo,
      email: event.target.value
    })
  }
  /**
   * 담당자 연락처
   * @param event
   */
  const handleManagerPhone = (event) =>{
    setFindPasswordInfo({
      ...findPasswordInfo,
      phone: event.target.value
    })
  }
  /**
   * 담당자 아이디
   * @param event
   */
  const handleMemberId = (event) =>{
    setFindPasswordInfo({
      ...findPasswordInfo,
      userId: event.target.value
    })
  }

  const onSubmit = (data) => {
    handleFindPassword()
  }

  const onError = () => console.log(errors)

  return (
    <LoginInputComponent>
      <Title>
        <h1>비밀번호 찾기</h1>
      </Title>
      <form onSubmit={handleSubmit(onSubmit,onError)}>
      <InputGroup>
        <LabelInline>
          <span>아이디</span>
        </LabelInline>
        <div>
          <input type={'text'}
                 placeholder={'아이디를 입력 해주세요'}
                 value={findPasswordInfo.userId}
                 {...register('userId',{
                   required: "아이디를 입력 해주세요",
                   onChange:(e) => handleMemberId(e)
                 })}
          />
        </div>
        {errors.userId && <ValidationScript>{errors.userId.message}</ValidationScript>}
      </InputGroup>
      <InputGroup>
        <LabelInline>
          <span>담당자 연락처</span>
        </LabelInline>
        <FindCorporationNo>
          <input type={'text'}
                 placeholder={'연락처를 입력해주세요'}
                 value={findPasswordInfo.phone}
                 {...register('phone',{
                   required: "연락처를 입력해주세요,",
                   onChange:(e) => handleManagerPhone(e)
                 })}
          />
        </FindCorporationNo>
        {errors.phone && <ValidationScript>{errors.phone.message}</ValidationScript>}
      </InputGroup>
      <InputGroup>
        <LabelInline>
          <span>담당자 이메일</span>
        </LabelInline>
        <div>
          <input type={'text'}
                 placeholder={'담당자 이메일을 입력해주세요.'}
                 value={findPasswordInfo.email}
                 onChange={(e) => handleManagerEmail(e)}
                 {...register('email',{
                   required: "이메일을 입력해주세요,",
                   pattern: {
                     value: /[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*/i,
                     message: "이메일 형식을 확인해주세요"
                   },
                   onChange:(e) => handleManagerEmail(e)
                 })}
          />
        </div>
        {errors.email && <ValidationScript>{errors.email.message}</ValidationScript>}
      </InputGroup>
      <FindGroup/>
      <InputGroup>
        <Button type={'submit'}>
          비밀번호 찾기
        </Button>
      </InputGroup>
      </form>
    </LoginInputComponent>
  )
}

function FindId(props) {
  const [findIdInfo, setFindIdInfo] = useState(findIdParams)
  const [findIdResult,setFindIdResult] = useAtom(FindIdResultAtom)
  const {register, handleSubmit, formState:{errors}} = useForm()
  const success = true
  const handleFindId = () => {
    if(success){
      selFindUserId(findIdInfo).then(response => {
        console.log(response)
        setFindIdResult(response)
      })
      props.openModal()
    } else{
      toast.info('등록된 아이디나 이메일이 없습니다.')
    }
  }

  /**
   * 담당자 이메일
   * @param event
   */
  const handleManagerEmail = (event) =>{
    setFindIdInfo({
      ...findIdInfo,
      email: event.target.value
    })
  }
  /**
   * 담당자 연락처
   * @param event
   */
  const handleManagerPhone = (event) =>{
    setFindIdInfo({
      ...findIdInfo,
      phone: event.target.value
    })
  }
  const onSubmit = (data) => {
    handleFindId()
  }

  const onError = () => console.log(errors)

  return (
    <LoginInputComponent>
      <Title>
        <h1>아이디 찾기</h1>
      </Title>
      <form onSubmit={handleSubmit(onSubmit,onError)}>
      <InputGroup>
        <LabelInline>
          <span>담당자 연락처</span>
        </LabelInline>
        <FindCorporationNo>
          <input type={'text'}
                 placeholder={'연락처를 입력해주세요'}
                 value={findIdInfo.phone}
                 {...register('phone',{
                   required: "연락처를 입력해주세요",
                   onChange:(e) => handleManagerPhone(e)
                 })}
          />
        </FindCorporationNo>
        {errors.phone && <ValidationScript>{errors.phone.message}</ValidationScript>}
      </InputGroup>
      <InputGroup>
        <LabelInline>
          <span>담당자 이메일</span>
        </LabelInline>
        <div>
          <input type={'text'}
                 placeholder={'담당자 이메일을 입력해주세요.'}
                 value={findIdInfo.email}
                 {...register('email',{
                   required: "담당자 이메일을 입력해주세요",
                   pattern: {
                     value: /[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*/i,
                     message: "이메일 형식을 확인해주세요"
                   },
                   onChange:(e) => handleManagerEmail(e)
                 })}
          />
        </div>
        {errors.email && <ValidationScript>{errors.email.message}</ValidationScript>}
      </InputGroup>
      <FindGroup/>
      <InputGroup>
        <Button type={'submit'}>
          아이디찾기
        </Button>
      </InputGroup>
      </form>
    </LoginInputComponent>
  )
}
export const loginState = atom(UserToken)
function LoginComponent () {
  const [authAtom,setAuthAtom] = useAtom(loginState);
  const [loginParamsValue, setLoginParams] = useState(loginParams);
  const [isRemember, setIsRemember] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['rememberId'])
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();
  const {register,setValue, handleSubmit, formState:{errors}} = useForm()
  // 사용자 명
  const handleChangeId = (event) => {
    setLoginParams({
      ...loginParamsValue,
      userId:event.target.value
    })
    setValue('userId',event.target.value)
  }
  // 사용자 패스워드
  const handleChangePassword = (event) => {
    setLoginParams({
      ...loginParamsValue,
      password:event.target.value
    })
  }

  // 아이디 저장 Cookie 이용
  const handleChangeRemember = (event) => {
    setIsRemember(event.target.checked)
    if(event.target.checked) {
      setCookie('rememberId', loginParamsValue.id)
    } else {
      removeCookie('rememberId')
    }
  }

  const handleChangeLogin = () => {
    login(loginParams).then((response) => {
      console.log(response)
      if(response.success){
        //atom 안에 넣기 accessToken
        setAuthAtom(UserToken)
        if (response.data.isTermsAgree) {
          // go to main
          navigate("/")
        } else {
          navigate("/termsAgree")
        }
      }else{
        toast.info('아이디와 비밀번호를 확인해 주세요.')
      }
    });
  }

  // 쿠키에 아이디 저장 삭제
  useEffect(() => {
    if(cookies.rememberId !== undefined) {
      setLoginParams({
        userId:cookies.rememberId
      })
      setAuthAtom({
        ...authAtom,
        userId: cookies.rememberId
      })
      setValue('userId',cookies.rememberId)
      setIsRemember(true)
    }
  }, []);

  const onSubmit = (data) => {
    console.log(data)
    handleChangeLogin()
  }
  const onError = (error) => console.log(error)

  return (
    <LoginInputComponent>
      <Title>
        <h1>아이엠</h1>
      </Title>
      <form onSubmit={handleSubmit(onSubmit,onError)}>
      <InputGroup>
        <LabelInline>
          <span>아이디</span>
          <Checkbox
            onChange={handleChangeRemember}
            isChecked={isRemember}
            label={'아이디 저장'}
            type={'a'}/>
        </LabelInline>
        <div>
          <input
            type={'text'}
            placeholder={'아이디'}
            value={loginParamsValue.userId || ''}
            {...register('userId',{
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
            type={!showPassword ? 'password' : 'text'}
            placeholder={'비밀번호(8~12자)'}
            value={loginParamsValue.password || ''}
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
                message: "비밀번호를 확인해주세요. 숫자, 영문, 특수 기호를 포함 (10자 ~ 16자)"
              },
              onChange:handleChangePassword
            })}/>
          <ShowPassword
            style={showPassword ? {backgroundImage: "url('/assets/images/login/hide.png')"} : {backgroundImage: "url('/assets/images/login/show.png')"}}
            onClick={() => setShowPassword(!showPassword)}/>
        </div>
        {errors.password && <ValidationScript>{errors.password?.message}</ValidationScript>}
      </InputGroup>
      <FindGroup>
        <Link to={'/findId'}>아이디찾기</Link>
        <HorizontalRule/>
        <Link to={'/findPassword'}>비밀번호 찾기</Link>
        <HorizontalRule/>
        <Link to={'/signUp'}>회원가입</Link>
      </FindGroup>
      <InputGroup>
        <Button type={'submit'}>
          Login
        </Button>
      </InputGroup>
      </form>
    </LoginInputComponent>
  )
}



function Login(props){
  const [modal, setModal] = useAtom(modalController)
  const location = useLocation()
  const handleModalFindId = () => {
    setModal({
      isShow: true,
      width: 500,
      modalComponent: () => {
        return <ComponentModalFindId/>
      }
    })
  }

  const handleModalFindPassword = () => {
    setModal({
      isShow: true,
      width: 500,
      modalComponent: () => {
        return <ComponentModalFindPassword/>
      }
    })
  }
  return (
    <>
      <LoginContainer>
        <div>
          <div>
            <LoginLogo/>
            <div>
              {location.pathname === '/findid' && location.pathname === '/findpassword'?
                <>
                  <div>{location.pathname === '/findpassword' ? "비밀번호" : "아이디"} 찾기가 불가한 회원님들께서는</div>
                  <div>고객센터(070-1234-1234)로 연락 주시기 바랍니다.</div>
                </>
                :
                <>
                  <div>로그인 하시면 엠코퍼레이션에</div>
                  <div>다양한 서비스를 이용하실 수 있습니다.</div>
                </>
              }
            </div>
          </div>
        </div>
        <div>
          {props.match === 'findId' &&
            <FindId openModal={()=>handleModalFindId()}/>
          }
          {props.match == 'findPassword' &&
            <FindPassword openModal={()=>handleModalFindPassword()}/>
          }
          {props.match == 'login' &&
            <LoginComponent />
          }
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

