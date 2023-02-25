import styled from "styled-components";
import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail, CancelButton, ColSpan1, ColSpan2, ColSpan3, ColSpan4, ColTitle, Input, inputStyle, RelativeDiv,
  RowSpan, Span4, SubmitButton, SubmitContainer,
  TitleContainer, ValidationScript
} from "../../assets/GlobalStyles";
import {VerticalRule} from "../../components/common/Common";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {atom} from "jotai/index";
import {useAtom} from "jotai";
import {useLocation} from "react-router-dom";
import {accountInfo} from "../signup/entity";
import {adminAllType} from "./entity";

const AccountInfo = atom(accountInfo)

function AccountProfile() {
  const [texType, setTexType] = useState('taxation')
  const [accountInfoState, setAccountInfoState] = useAtom(AccountInfo)
  const {register, handleSubmit, watch, reset ,formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: accountInfoState
  })
  const {state} = useLocation();
  const onError = (error) => console.log(error)
  useEffect(() => {
    setAccountInfoState({
      memberId: 'ghcho',
      password: '',
      confirmPassword: '',
      mediaName: 'CHO',
      managerName: '조규홍',
      managerPhone: '01073050616',
      managerEmail: 'chocto@findinglab.co.kr',
      secondManagerName: '한란민',
      secondManagerPhone: '01012345678',
      secondManagerEmail: 'ranminhan@finding.co.kr',
      mediaSiteUrl: 'http://finding.tyrcatch.co.kr',
      agencyYn: 'MEDIA',
    })
    reset({
      memberId: 'ghcho',
      password: '',
      confirmPassword: '',
      mediaName: 'CHO',
      managerName: '조규홍',
      managerPhone: '01073050616',
      managerEmail: 'chocto@findinglab.co.kr',
      secondManagerName: '한란민',
      secondManagerPhone: '01012345678',
      secondManagerEmail: 'ranminhan@finding.co.kr',
      mediaSiteUrl: 'http://finding.tyrcatch.co.kr',
      agencyYn: 'MEDIA',
    })

  }, [])

  /**
   * 담당자명 입력
   * @param event
   */
  const handleManagerName = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      managerName: event.target.value
    })
  }
  /**
   * 담당자 연락처 입력
   * @param event
   */
  const handleManagerPhone = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      managerPhone: event.target.value
    })
  }
  /**
   * 담당자 이메일 입력
   * @param event
   */
  const handleManagerEmail = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      managerEmail: event.target.value
    })
  }
  return (
    <main>
      <form>
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
                  <div>{(accountInfoState.agencyYn === 'MEDIA') ? '매체사' :'대행사'}</div>
                </ColSpan3>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>담당자</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'담당자 명을 입력해주세요'}
                      {...register("managerName", {
                        required: "Required",
                      })}
                      value={accountInfoState.managerName}
                      onChange={(e) => handleManagerName(e)}
                    />
                    {errors.managerName && <ValidationScript>{errors.managerName?.message}</ValidationScript>}
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
                      {...register("managerEmail", {
                        required: "담당자 이메일을 입력해주세요.",
                      })}
                      value={accountInfoState.managerEmail}
                      onChange={(e) => handleManagerEmail(e)}
                    />
                    {errors.managerEmail && <ValidationScript>{errors.managerEmail?.message}</ValidationScript>}
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
                      {...register("managerPhone", {
                        required: "담당자 연락처를 입력해주세요.",
                      })}
                      value={accountInfoState.managerPhone}
                      onChange={(e) => handleManagerPhone(e)}
                    />
                    {errors.managerPhone && <ValidationScript>{errors.managerPhone?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>상호명</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'상호명'}
                      value={'엠코퍼레이션'}
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
                      type={'number'}
                      placeholder={''}
                      value={'000'}
                      readOnly={true}
                    />
                    <Input
                      type={'number'}
                      placeholder={''}
                      value={'000'}
                      readOnly={true}
                    />
                    <Input
                      type={'number'}
                      placeholder={''}
                      value={'000'}
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
                      value={'도매 및 소매업'}
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
                      value={'전자상거래업'}
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
                      value={'홍길동'}
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
                      value={'서울 서초구 남부순환로 2406'}
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
                      placeholder={''}
                      value={'Mcorporation 사업자 등록증.pdf'}
                      readOnly={true}
                    />
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
                      value={'12345-658-9871239'}
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
                      value={'홍길동'}
                      readOnly={true}
                    />
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>과세 여부</Span4></ColTitle>
                  <RelativeDiv>
                    <input type={'radio'} id={'taxation'} name={'taxSelect'} defaultChecked={true} onChange={() => setTexType('taxation')}/>
                    <label htmlFor={'taxation'}>과세</label>
                    <input type={'radio'} id={'taxFree'} name={'taxSelect'} onChange={() => setTexType('taxFree')}/>
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
                            value={0}
                            // onChange={}
                    />
                  </RelativeDiv>
                </ColSpan1>
              </RowSpan>
            </BoardSearchDetail>
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

export default AccountProfile

const DuplicateButton = styled.button`
  width: 150px;
  height: 45px;
  background-color: #777;
  border-radius: 5px;
  color: #fff;
  font-size: 15px;
`
