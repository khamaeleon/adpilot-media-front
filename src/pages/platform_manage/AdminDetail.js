import styled from "styled-components";
import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail, CancelButton, ColSpan1,  ColSpan3, ColTitle, Input, inputStyle, RelativeDiv,
  RowSpan, Span4, SubmitButton, SubmitContainer,
  TitleContainer, ValidationScript
} from "../../assets/GlobalStyles";
import {VerticalRule} from "../../components/common/Common";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {atom} from "jotai/index";
import {adminAllType, adminInfo} from "./entity";
import {useAtom} from "jotai";
import {useLocation} from "react-router-dom";

const AdminInfo = atom(adminInfo)
function PlatformAdminDetail(){
  const [showPassword, setShowPassword] = useState(false)
  const [adminInfoState, setAdminInfoState] =useAtom(AdminInfo)
  const [adminTypeState,setAdminTypeState]=useState(adminAllType.filter(value => value.value!=='ALL'))
  const {register, handleSubmit, watch, reset ,formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: adminInfoState
  })
  const { state } = useLocation();
  const onError = (error) => console.log(error)
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    console.log(state.id)
    if( state.id ==='NEW'){
      setAdminInfoState({
        memberId: '',
        password: '',
        confirmPassword:'',
        adminName:'',
        adminPhone: '',
        adminEmail: '',
        adminType: {id: "2", value: "SUPER_ADMIN", label: "최고관리자"},
        accountUseYn:'IN_USE'
      })
      //신규
    }else{
      //ID 넘겨서 정보 가져와서 SET함
      setAdminInfoState({
        memberId: 'ghcho',
        password: '',
        confirmPassword: '',
        adminName: '조규홍',
        adminPhone: '01073050616',
        adminEmail: 'chocto@findinglab.co.kr',
        adminType: {id: "2", value: "SUPER_ADMIN", label: "최고관리자"},
        accountUseYn: 'IN_USE',
      })
      reset({
        memberId: 'ghcho',
        password: '',
        confirmPassword: '',
        adminName: '조규홍',
        adminPhone: '01073050616',
        adminEmail: 'chocto@findinglab.co.kr',
        adminType: {id: "2", value: "SUPER_ADMIN", label: "최고관리자"},
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
      memberId: event.target.value
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
      adminName: event.target.value
    })
  }
  /**
   * 담당자 연락처 입력
   * @param event
   */
  const handleManagerPhone = (event) => {
    setAdminInfoState({
      ...adminInfoState,
      adminPhone: event.target.value
    })
  }
  /**
   * 담당자 이메일 입력
   * @param event
   */
  const handleManagerEmail = (event) => {
    setAdminInfoState({
      ...adminInfoState,
      adminEmail: event.target.value
    })
  }
  const handleAdminType =(adminType) =>{
    setAdminInfoState({
      ...adminInfoState,
      adminType: adminType
    })
    //검색
  }

  const onSubmit = (data) => {
    // 최종데이터
    console.log(data)
  }

  return(
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
                    value={adminInfoState.memberId}
                    readOnly={true}
                    />  :
                    <Input
                      type={'text'}
                      placeholder={'아이디를 입력해주세요'}
                      value={adminInfoState.memberId}
                      {...register("memberId", {
                        required: "관리자 아이디를 입력해주세요",
                      })}
                      onChange={(e) => handleAdminId(e)}
                    />
                  }
                  {errors.memberId && <ValidationScript>{errors.memberId?.message}</ValidationScript>}
                </RelativeDiv>
              </ColSpan3>
              <ColSpan1>
                <DuplicateButton>중복 확인</DuplicateButton>
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
          <VerticalRule style={{marginTop:20,backgroundColor:"#eeeeee"}}/>
        </Board>
        <Board>
          <BoardHeader>담당자 정보</BoardHeader>
          <BoardSearchDetail>
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span4>담당자명</Span4></ColTitle>
                <RelativeDiv>
                  <Input
                    type={'text'}
                    placeholder={'담당자 명을 입력해주세요'}
                    {...register("adminName", {
                      required: "담당자 명을 입력해주세요",
                    })}
                    value={adminInfoState.adminName}
                    onChange={(e) => handleManagerName(e)}
                  />
                  {errors.adminName && <ValidationScript>{errors.adminName?.message}</ValidationScript>}
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
                    {...register("adminPhone", {
                      required: "담당자 연락처를 입력해주세요.",
                    })}
                    value={adminInfoState.adminPhone}
                    onChange={(e) => handleManagerPhone(e)}
                  />
                  {errors.adminPhone && <ValidationScript>{errors.adminPhone?.message}</ValidationScript>}
                </RelativeDiv>
              </ColSpan3>
            </RowSpan>
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span4>담당자 이메일</Span4></ColTitle>
                <RelativeDiv>
                  <Input
                    type={'text'}
                    placeholder={'이메일을 입력해주세요.'}
                    {...register("adminEmail", {
                      required: "담당자 이메일을 입력해주세요.",
                    })}
                    value={adminInfoState.adminEmail}
                    onChange={(e) => handleManagerEmail(e)}
                  />
                  {errors.adminEmail && <ValidationScript>{errors.adminEmail?.message}</ValidationScript>}
                </RelativeDiv>
              </ColSpan3>
            </RowSpan>
          </BoardSearchDetail>
          <VerticalRule style={{marginTop:20,backgroundColor:"#eeeeee"}}/>
        </Board>

        <Board>
          <BoardHeader>담당자 권한</BoardHeader>
          <BoardSearchDetail>
            <RowSpan>
              <ColSpan1>
                <ColTitle><Span4>권한 설정</Span4></ColTitle>
                <RelativeDiv>
                  <Select styles={inputStyle}
                          components={{IndicatorSeparator: () => null}}
                          options={adminTypeState}
                          value={(adminInfoState.adminType !== undefined && adminInfoState.adminType.value !== '') ? adminInfoState.adminType : {id: "1", value: "NONE", label: "선택"}}
                          onChange={handleAdminType}
                  />
                </RelativeDiv>
              </ColSpan1>
            </RowSpan>
          </BoardSearchDetail>
          <VerticalRule style={{marginTop:20,backgroundColor:"#eeeeee"}}/>
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
