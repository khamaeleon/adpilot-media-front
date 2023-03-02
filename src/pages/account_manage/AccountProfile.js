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
import {accountProfile, calculateProfile} from "./entity";
import {accountUserProfile} from "../../services/AccountAxios";

const AccountProfileState = atom(accountProfile)

function AccountProfile() {
  const [texType, setTexType] = useState(true)
  const [accountProfileState, setAccountProfileState] = useAtom(AccountProfileState)
  const [calculateProfileState, setCalculateProfileState] = useState(AccountProfileState)
  const {register, handleSubmit, watch, reset ,formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: accountProfileState
  })
  const {state} = useLocation();
  const onError = (error) => console.log(error)
  useEffect(() => {
    accountUserProfile('test').then(response => {
      setAccountProfileState(response)
      console.log(response)
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
    setCalculateProfileState({
      ...calculateProfileState,
      manager_phone: event.target.value
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

  const onSubmit = (data) => {
    console.log(data)
  }
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
                  <div>{(accountProfileState.media_type !== 'AGENT') ? '매체사' :'대행사'}</div>
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
                      })}
                      value={calculateProfileState.manager_name}
                      onChange={(e) => handleManagerName(e)}
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
                      })}
                      value={calculateProfileState.manager_email}
                      onChange={(e) => handleManagerEmail(e)}
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
                      })}
                      value={calculateProfileState.manager_phone}
                      onChange={(e) => handleManagerPhone(e)}
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
                      value={accountProfileState.business_name}
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
                      style={{textAlign:'center'}}
                      type={'number'}
                      placeholder={''}
                      value={accountProfileState.business_number}
                      readOnly={true}
                    />
                    <Input
                      style={{textAlign:'center'}}
                      type={'number'}
                      placeholder={''}
                      value={accountProfileState.business_number}
                      readOnly={true}
                    />
                    <Input
                      style={{textAlign:'center'}}
                      type={'number'}
                      placeholder={''}
                      value={accountProfileState.business_number}
                      readOnly={true}
                    />
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
                      value={accountProfileState.business}
                      readOnly={true}
                    />
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
                      value={accountProfileState.business_type}
                      readOnly={true}
                    />
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
                      value={accountProfileState.ceo_name}
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
                      value={accountProfileState.address + ' ' + accountProfileState.address_detail}
                      readOnly={true}
                    />
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
                      value={accountProfileState.business_license_copy}
                      readOnly={true}
                    />
                    <DeleteButton />
                  </RelativeDiv>
                </ColSpan2>
                <ColSpan1>
                  <DuplicateButton>파일 첨부</DuplicateButton>
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
                      value={accountProfileState.bank_account_number}
                      readOnly={true}
                    />
                  </RelativeDiv>
                </ColSpan2>
                <ColSpan1>
                  <DuplicateButton>계좌 조회</DuplicateButton>
                </ColSpan1>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>예금주</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'예금주'}
                      value={accountProfileState.account_holder}
                      readOnly={true}
                    />
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
                      value={accountProfileState.passbook_copy}
                      readOnly={true}
                    />
                    <DeleteButton />
                  </RelativeDiv>
                </ColSpan2>
                <ColSpan1>
                  <DuplicateButton>파일 첨부</DuplicateButton>
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
                            value={accountProfileState.gross_calculate}
                            // onChange={}
                    />
                  </RelativeDiv>
                </ColSpan1>
              </RowSpan>
            </BoardSearchDetail>
          </Board>
          <SubmitContainer>
            <CancelButton type={'button'}>취소</CancelButton>
            <SubmitButton type={"submit"}>저장</SubmitButton>
          </SubmitContainer>
        </BoardContainer>
      </form>
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
