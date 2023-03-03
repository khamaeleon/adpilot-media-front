import styled from "styled-components";
import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail,
  CancelButton,
  ColSpan1,
  ColSpan2,
  ColSpan3,
  ColTitle,
  DeleteButton,
  Input,
  inputStyle,
  RelativeDiv,
  RowSpan,
  Span4,
  SubmitButton,
  SubmitContainer,
  TitleContainer,
  ValidationScript
} from "../../assets/GlobalStyles";
import {VerticalRule} from "../../components/common/Common";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {atom} from "jotai/index";
import {useAtom} from "jotai";
import {useLocation} from "react-router-dom";
import {accountProfile} from "./entity";
import {accountUserProfile, calculateProfileChange} from "../../services/AccountAxios";
import {phoneNumFormat} from "../../common/StringUtils";
import {toast, ToastContainer} from "react-toastify";

const AccountProfileState = atom(accountProfile)

function AccountProfile() {
  const [texType, setTexType] = useState(true)
  const [accountProfileState, setAccountProfileState] = useAtom(AccountProfileState)
  const [calculateProfileState, setCalculateProfileState] = useState(AccountProfileState)
  const {register, handleSubmit, setValue, setError, reset ,formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: accountProfileState
  })
  const {state} = useLocation();
  useEffect(() => {
    accountUserProfile('nate9988').then(response => {
      setCalculateProfileState(response)
    })
    // reset({
    //   "user_id" : "test",
    //   "manager_name" : "mangerCVDcv",
    //   "manager_email" : "manager@mcorpor.com",
    //   "manager_phone" : "010-1234-5678",
    //   "bank_account_number" : "1111",
    //   "bank_type" : "123",
    //   "account_holder" : "hcson",
    //   "passbook_copy" : "/test/",
    //   "gross_calculate" : 1.0,
    //   "business_name" : 'Mcorporation',
    //   "business_number" : "123455",
    //   "business_license_copy" : "copy",
    //   "business" : "컴퓨터",
    //   "business_type" : "좋아!",
    //   "ceo_name" : "홍길동",
    //   "address" : "seoul",
    //   "address_detail" : "good",
    //   "tax_yn" : true,
    //   "media_type" : "AGENT"
    // })

  }, [accountProfileState])

  /**
   * 담당자명 입력
   * @param event
   */
  const handleManagerName = (event) => {
    setCalculateProfileState({
      ...calculateProfileState,
      manager_name: event.target.value
    })
  }
  /**
   * 담당자 연락처 입력
   * @param event
   */
  const handleManagerPhone = (event) => {
    let num = phoneNumFormat(event.target.value)
    setCalculateProfileState({
      ...calculateProfileState,
      manager_phone: num
    })
  }
  /**
   * 담당자 이메일 입력
   * @param event
   */
  const handleManagerEmail = (event) => {
    setCalculateProfileState({
      ...calculateProfileState,
      manager_email: event.target.value
    })
  }

  const handleBusinessNumber = (event) => {
    setCalculateProfileState({
      ...calculateProfileState,
      business_number: event.target.value,
      business_name: '',
      ceo_name:'',
    })
  }

  const handleBusiness = (event) => {
    setCalculateProfileState({
      ...calculateProfileState,
      business: event.target.value
    })
  }

  const handleBusinessType = (event) => {
    setCalculateProfileState({
      ...calculateProfileState,
      business_type: event.target.value
    })
  }

  const handleAddress = (event) => {
    setCalculateProfileState({
      ...calculateProfileState,
      address: event.target.value
    })
  }

  const handleBankNumber = (event) => {
    setCalculateProfileState({
      ...calculateProfileState,
      bank_account_number: event.target.value
    })
  }

  const handleAccountHolder = (event) => {
    setCalculateProfileState({
      ...calculateProfileState,
      account_holder: event.target.value
    })
  }

  const handleBusinessLicense = (value) => {
    setCalculateProfileState({
      ...calculateProfileState,
      business_license_copy: value !== 'del' ? '사업자 등록증 사본 등록': '',
    })
  }

  const handlePassbook = (value) => {
    setCalculateProfileState({
      ...calculateProfileState,
      passbook_copy: value !== 'del' ? '통장 사본 등록': '',
    })
  }

  const onSubmit = (data) => {
    calculateProfileChange(calculateProfileState).then(response => {
      response && toast.success('완료')
    })
  }

  const onError = (error) => toast.warning(error)

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <BoardContainer>
          <TitleContainer>
            <h1>플랫폼 관리</h1>
            <Navigator/>
          </TitleContainer>
          <Board>
            <BoardHeader>사업자 정보</BoardHeader>
            <BoardSearchDetail>
              <RowSpan>
                <ColSpan3>
                  <ColTitle><Span4>매체구분</Span4></ColTitle>
                  <div>{(calculateProfileState.media_type !== 'AGENT') ? '매체사' :'대행사'}</div>
                </ColSpan3>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>담당자</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'담당자 명을 입력해주세요'}
                      {...register("manager_name", {
                        required: "담당자 명을 입력해주세요",
                        onChange:(e) => handleManagerName(e)
                      })}
                      value={calculateProfileState.manager_name}
                    />
                    {errors.manager_name && <ValidationScript>{errors.manager_name?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>이메일</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'이메일을 입력해주세요.'}
                      {...register("manager_email", {
                        required: "담당자 이메일을 입력해주세요.",
                        pattern: {
                          value: /[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*/i,
                          message: "이메일 형식을 확인해주세요"
                        },
                        onChange: (e) => handleManagerEmail(e)
                      })}
                      value={calculateProfileState.manager_email}

                    />
                    {errors.manager_email && <ValidationScript>{errors.manager_email?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>연락처</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'연락처를 입력해주세요.'}
                      {...register("manager_phone", {
                        required: "담당자 연락처를 입력해주세요.",
                        pattern: {
                          value: /0([1-9][0-9]?){1,2}[.-]?([0-9]{3,4})[.-]?([0-9]{4})/g,
                          message: "연락처 정보를 확인해주세요"
                        },
                        onChange : (e) => handleManagerPhone(e)
                      })}
                      value={calculateProfileState.manager_phone}

                    />
                    {errors.manager_phone && <ValidationScript>{errors.manager_phone?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>회사명</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'회사명'}
                      value={calculateProfileState.business_name}
                      readOnly={true}
                    />
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan style={{justifyContent: 'flex-start'}}>
                <ColSpan2>
                  <ColTitle><Span4>사업자 등록 번호</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'사업자 등록 번호'}
                      {...register("business_number", {
                        required: "사업자 조회를 해주세요",
                        onChange:(e) => handleBusinessNumber(e)
                      })}
                      value={calculateProfileState.business_number}
                      readOnly={true}
                    />
                    {errors.business_number && <ValidationScript>{errors.business_number?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan2>
                <ColSpan1>
                  <DuplicateButton>사업자 조회</DuplicateButton>
                </ColSpan1>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>업태</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'업태'}
                      {...register("business", {
                        required: "업태를 입력해주세요",
                        onChange:(e) => handleBusiness(e)
                      })}
                      value={calculateProfileState.business}
                    />
                    {errors.business && <ValidationScript>{errors.business?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>종목</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'종목'}
                      {...register("business_type", {
                        required: "종목을 입력해주세요",
                        onChange:(e) => handleBusinessType(e)
                      })}
                      value={calculateProfileState.business_type}
                    />
                    {errors.business_type && <ValidationScript>{errors.business_type?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>대표자 성명</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'대표자 성명'}
                      value={calculateProfileState.ceo_name}
                      readOnly={true}
                    />
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>사업장 주소</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'사업장 주소'}
                      {...register("address", {
                        required: "주소를 입력해주세요",
                        onChange:(e) => handleAddress(e)
                      })}
                      value={calculateProfileState.address}
                    />
                    {errors.address && <ValidationScript>{errors.address?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan style={{justifyContent: 'flex-start'}}>
                <ColSpan2>
                  <ColTitle><Span4>사업자 등록증</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      style={{paddingRight: 35}}
                      type={'text'}
                      placeholder={'사업자 등록증'}
                      {...register("business_license_copy", {
                        required: "사업자 등록증을 등록해주세요",
                      })}
                      value={calculateProfileState.business_license_copy}
                      readOnly={true}
                    />
                    {errors.business_license_copy && <ValidationScript>{errors.business_license_copy?.message}</ValidationScript>}
                    <DeleteButton onClick={()=> handleBusinessLicense('del')} />
                  </RelativeDiv>
                </ColSpan2>
                <ColSpan1>
                  <DuplicateButton onClick={()=> handleBusinessLicense('add')}>파일 첨부</DuplicateButton>
                </ColSpan1>
              </RowSpan>
            </BoardSearchDetail>
            <VerticalRule style={{marginTop: 20, backgroundColor: "#eeeeee"}}/>
          </Board>
          <Board>
            <BoardHeader>정산 정보</BoardHeader>
            <BoardSearchDetail>
              <RowSpan>
                <ColSpan1>
                  <ColTitle><Span4>은행 선택</Span4></ColTitle>
                  <RelativeDiv>
                    <Select styles={inputStyle}
                            components={{IndicatorSeparator: () => null}}
                            options={null}
                            value={0}
                      // onChange={}
                    />
                  </RelativeDiv>
                </ColSpan1>
              </RowSpan>
              <RowSpan style={{justifyContent: 'flex-start'}}>
                <ColSpan2>
                  <ColTitle><Span4>계좌 번호</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'계좌 번호'}
                      {...register("bank_account_number", {
                        required: "계좌 번호를 입력해주세요",
                        onChange:(e) => handleBankNumber(e)
                      })}
                      value={calculateProfileState.bank_account_number}
                    />
                    {errors.bank_account_number && <ValidationScript>{errors.bank_account_number?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>예금주</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'예금주'}
                      {...register("account_holder", {
                        required: "예금주를 입력해주세요",
                        onChange:(e) => handleAccountHolder(e)
                      })}
                      value={calculateProfileState.account_holder}
                    />
                    {errors.account_holder && <ValidationScript>{errors.account_holder?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan style={{justifyContent: 'flex-start'}}>
                <ColSpan2>
                  <ColTitle><Span4>통장 사본</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      style={{paddingRight: 35}}
                      type={'text'}
                      placeholder={'통장 사본'}
                      {...register("passbook_copy", {
                        required: "통장 사본을 등록해주세요",
                      })}
                      value={calculateProfileState.passbook_copy}
                      readOnly={true}
                    />
                    {errors.passbook_copy && <ValidationScript>{errors.passbook_copy?.message}</ValidationScript>}
                    <DeleteButton onClick={()=> handlePassbook('del')}/>
                  </RelativeDiv>
                </ColSpan2>
                <ColSpan1>
                  <DuplicateButton onClick={()=> handlePassbook('add')}>파일 첨부</DuplicateButton>
                </ColSpan1>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>과세 여부</Span4></ColTitle>
                  <RelativeDiv>
                    <input type={'radio'} id={'taxation'} name={'taxSelect'} defaultChecked={true} onChange={() => setTexType(true)}/>
                    <label htmlFor={'taxation'}>과세</label>
                    <input type={'radio'} id={'taxFree'} name={'taxSelect'} onChange={() => setTexType(false)}/>
                    <label htmlFor={'taxFree'}>면세</label>
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan1>
                  <ColTitle><Span4>그로스 정산</Span4></ColTitle>
                  <RelativeDiv>
                    <Select styles={inputStyle}
                            components={{IndicatorSeparator: () => null}}
                            options={null}
                            value={calculateProfileState.gross_calculate}
                            // onChange={}
                    />
                  </RelativeDiv>
                </ColSpan1>
              </RowSpan>
            </BoardSearchDetail>
          </Board>
          <SubmitContainer>
            <SubmitButton type={"submit"}>저장</SubmitButton>
          </SubmitContainer>
        </BoardContainer>
      </form>
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
    </main>
  )
}

export default AccountProfile

const DuplicateButton = styled.button`
  width: 150px;
  height: 45px;
  background-color: #777;
  border-radius: 5px;
  color: #fff;
  font-size: 15px;
`
