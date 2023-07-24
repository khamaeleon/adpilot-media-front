import {useNavigate} from "react-router-dom";
import {useAtom, useSetAtom} from "jotai";
import {tokenResultAtom} from "../login/entity";
import {modalController} from "../../store";
import {AdminInfo} from "../layout";
import {
  accountCreateInvoice,
  accountInfoColumns,
  accountInfoRevenue,
  accountInfoSetting,
  accountInfoTable,
  accountProfile
} from "./entity";
import React, {useEffect, useState} from "react";
import {
  accountCreateInvoiceRecord,
  accountMonthlyListTableData,
  accountRevenueStatus,
  accountUserProfile
} from "../../services/account/AccountAdminAxios";
import {
  userAccountMonthlyListTableData,
  userAccountProfile,
  userAccountRevenueStatus
} from "../../services/account/AccountUserAxios";
import {toast, ToastContainer} from "react-toastify";
import {
  BoardSearchResult, CancelButton,
  DashBoardCard,
  DashBoardColSpan2,
  DashBoardHeader,
  RowSpan, SubmitButton,
  TextMainColor
} from "../../assets/GlobalStyles";
import {AccountBody, AccountButton, NoAccountBody, RevenueBorderBox, RevenueScrollBox, StatusBoard} from "./styles";
import {decimalFormat, removeStr} from "../../common/StringUtils";
import {Tooltip} from "../../components/common/Tooltip";
import {SearchUser} from "../../components/common/SearchUser";
import Table from "../../components/table";
import {useForm} from "react-hook-form";
import {ModalBody, ModalFooter, ModalHeader} from "../../components/modal/Modal";

function ModalRequestAmount (props){
  const [,setModal] = useAtom(modalController)
  const {tax, maxAmount} = props
  const [requestAmountValue, setRequestAmountValue] = useState(0)
  const [requestAmountVAT, setRequestAmountVAT] = useState(0)
  const [examinedAmount, setExaminedAmount] = useState(0)

  const {register, handleSubmit, setValue, setError, formState:{errors} } = useForm()

  useEffect(() => {
    tax !== 'Y' ? setRequestAmountVAT(0) : setRequestAmountVAT(requestAmountValue / 10)
  }, []);

  const cancelBtn = () => {
    setModal({
      isShow: false
    })
  }
  const handleChange = (value) => {
    let num = removeStr(value)
    let numberNum = Number(num)
    if(maxAmount < numberNum){
      setError('requestAmountValue', {type: 'required', message:'정산 신청금이 잔여 정산금을 초과하였습니다.'})
    } else {
      setRequestAmountValue(numberNum)
      setValue('requestAmountValue', numberNum)
      tax !== 'Y' ? setRequestAmountVAT(0) : setRequestAmountVAT(numberNum / 10)
      tax !== 'Y' ? setExaminedAmount(numberNum) : setExaminedAmount(numberNum+(numberNum/10))
      setError('requestAmountValue', '')
    }
  }
  const onSubmit = () => {
    requestAmountValue >= 100000 ? props.handleOnSubmit(requestAmountValue) :
      setError('requestAmountValue', {type: 'required', message:'정산 신청금은 최소 10만원 이상 설정 가능합니다.'})
  }
  const onError = () => console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <ModalHeader title={'정산 신청'}/>
      <ModalBody>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <RevenueScrollBox>
            <div>
              <p>수익금 최종 결산은 매월 5일까지의 통계 데이터를 기반으로 집계됩니다.</p>
              <p>수익금 정산 심사가 승인된 경우, 매월 10일 이전까지 세금계산서를 발행해주세요.</p>
              <p>정산 신청하지 않은 수익금은 자동으로 이월 처리됩니다.</p>
              <p>세금 계산서 발행은 지금 예정 금액으로 발행해주세요.</p>
            </div>
          </RevenueScrollBox>
          <RevenueBorderBox>
            <div className={'gray'}>
              <span>정산 가능 금액</span>
              <p className={'won color-black'}>{decimalFormat(maxAmount)}</p>
            </div>
          </RevenueBorderBox>
          <p style={{marginTop: 10}}>정산 신청금 입력<small style={{paddingLeft: 5, color: '#bbb', fontSize: 11}}>※ 정산 신청금은 최소 10만원 이상 설정 가능합니다.</small></p>
          <RevenueBorderBox>
            <div>
              <span>정산 신청금</span>
              <div className={'flex-box'}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                  <p className={'won color-black'}>
                    <input type={'text'} value={decimalFormat(requestAmountValue)}
                           {...register("requestAmountValue", {
                             required: "정산 금액을 입력해주세요,",
                             pattern:{
                               value: /^[0-9,]+$/,
                               message: "숫자만 입력 가능합니다."
                             },
                             onChange:(e) => handleChange(e.target.value)
                           })}
                    />
                  </p>
                  {errors.requestAmountValue && <span style={{color: '#f55a5a', fontSize: 12}}>{errors.requestAmountValue.message}</span>}
                </div>

                <button type='button' onClick={() => handleChange(maxAmount)}>전액 신청</button>
              </div>
            </div>
            <div className={'gray small'}>
              <span>VAT</span>
              <p className={'won'}>{decimalFormat(requestAmountVAT)}</p>
            </div>
          </RevenueBorderBox>
          <RevenueBorderBox>
            <div>
              <span>지급 예정</span>
              <p className={'won'}><TextMainColor>{requestAmountValue === '0' ? '0' : decimalFormat(examinedAmount)}</TextMainColor></p>
            </div>
          </RevenueBorderBox>
        </div>
      </ModalBody>
      <ModalFooter style={{borderTop: 0, paddingTop: 0}}>
        <CancelButton type='button' onClick={()=> cancelBtn()}>취소</CancelButton>
        <SubmitButton type={'submit'}>정산 신청</SubmitButton>
      </ModalFooter>
    </form>
  )
}

export default function AccountManage() {
  const navigate = useNavigate()
  const [tokenResultInfo] = useAtom(tokenResultAtom)
  const setModal = useSetAtom(modalController)
  const [adminInfoState,setAdminInfoState] = useAtom(AdminInfo) //매체 전환 계정 정보
  const [accountProfileState, setAccountProfileState] = useAtom(accountProfile) //프로필 조회
  const [revenueState, setRevenueState] = useAtom(accountInfoRevenue) //수익 현황
  const [createInvoice, setCreateInvoice] = useState(accountCreateInvoice) //정산신청
  const [accountInfoTableData, setAccountInfoTableData] = useAtom(accountInfoTable) //월별 정산 이력 테이블 데이터

  useEffect(() => {
    createInvoice.requestAmount > 0 && accountCreateInvoiceRecord(createInvoice).then(response => {
      response && accountRevenueStatus(accountProfileState.username).then(response => {
        if(response !== null) {
          setRevenueState(response)
        }
      })
    })
  }, [createInvoice])


  useEffect(() => {
    if(tokenResultInfo.role !== 'NORMAL') { // 어드민 계정
      if(adminInfoState.convertedUser !== ''){
        accountUserProfile(adminInfoState.convertedUser).then(response => { //정산 프로필 조회
          setAccountProfileState(response)
          handleAdminApi(adminInfoState.convertedUser)
        })
      } else {
        setAccountProfileState(null)
        handleAdminApi('')
      }
    } else { // 사용자 계정
      userAccountProfile(tokenResultInfo.username).then(response => { //정산 프로필 조회
        setAccountProfileState(response)
        if(response !== null) {
          userAccountRevenueStatus(tokenResultInfo.username).then(response => {
            setRevenueState(response)// 월별 수익
          })
          userAccountMonthlyListTableData(tokenResultInfo.username).then(response => setAccountInfoTableData(response))// 정산 수익
        }
      })
    }
  }, [adminInfoState.convertedUser])

  /**
   * 어드민 정산 수익, 월별 수익 현황 조회
   * @param userName
   */
  const handleAdminApi = (userName) => { // 어드민 정산 수익, 월별 수익 현황 조회 API
    accountMonthlyListTableData(userName).then(response => { // 월별 수익
      response !== null ? setAccountInfoTableData(response) : setAccountInfoTableData([])
    })
    accountRevenueStatus(userName).then(response => { // 정산 수익
      if(response !== null) {
        setRevenueState(response)
      }
    })
  }

  /**
   * 모달안에 매체 검색 선택시
   */
  const handleSearchResult = (accountUserData) => {
    //매체 검색 api 호출
    accountUserProfile(accountUserData.username).then(response => {
      localStorage.setItem('mediaUsername',accountUserData.username)
      setAdminInfoState({
        ...adminInfoState,
        convertedUser: accountUserData.username,
        id: accountUserData.id,
        accountProfile: response !== null ? true : false
      })
      setAccountProfileState(response);
      handleAdminApi(accountUserData.username)
    })
  }

  const handleRevenueState = (data) => { //정산 신청 완료
    setCreateInvoice({
      ...createInvoice,
      username: accountProfileState.username,
      requesterId: tokenResultInfo.id,
      requestAmount: data,
      invoiceStatus: 'INVOICE_REQUEST'
    })
    setModal({
      isShow: false
    })
  }

  const handleModalRequestAmount = () => {
    revenueState?.revenueBalance !== 0 ? setModal({
        isShow: true,
        width: 700,
        modalComponent: () => {return <ModalRequestAmount tax={accountProfileState.taxYn} revenueStatus={revenueState} handleOnSubmit={handleRevenueState} maxAmount={revenueState?.revenueBalance}/>}
      })
      :
      toast.warning('정산 가능 금액이 없습니다.')
  }
  return (
    <>
      <RowSpan style={{minWidth: 1200, gap:30, marginTop: 0, alignItems:'stretch'}}>
        {/* 수익현황 */}
        <DashBoardColSpan2>
          <DashBoardCard style={{paddingBottom: 20}}>
            <DashBoardHeader>수익 현황</DashBoardHeader>
              <StatusBoard>
                <div>
                  <p>수익금</p>
                  <p className='won'>{decimalFormat(revenueState.revenueAmount)}</p>
                </div>
                <ul>
                  <li>
                    <p>정산 신청</p>
                    <p className='won'>{decimalFormat(revenueState.invoiceRequestAmount)}</p>
                  </li>
                  <li>
                    <p>잔여 정산금</p>
                    <p className='won'>{decimalFormat(revenueState.revenueBalance)}</p>
                  </li>
                  <li>
                    <p>총 이월</p>
                    <p className='won'>{decimalFormat(revenueState.totalCarryOver)}</p>
                  </li>
                  <li>
                    <p>지급 예정</p>
                    <p className='won'>{decimalFormat(revenueState.examinedCompletedAmount)}</p>
                  </li>
                  <li>
                    <p>지급 완료</p>
                    <p className='won'>{decimalFormat(revenueState.paymentCompletedAmount)}</p>
                  </li>
                </ul>
              </StatusBoard>
            {
              (adminInfoState.convertedUser !== '' && accountProfileState !== null) &&
              <div style={{display: "flex", justifyContent: "center"}}>
                <AccountButton type={'button'} onClick={handleModalRequestAmount}>정산 신청</AccountButton>
              </div>
            }
          </DashBoardCard>
        </DashBoardColSpan2>
        {/* 정산프로필 */}
        <DashBoardColSpan2>
          <DashBoardCard>
            <DashBoardHeader>정산 프로필</DashBoardHeader>
            {
              accountProfileState !== null ?
                <AccountBody>
                  <div>
                    <div className={'icon'}></div>
                    <span>사업자 정보</span>
                    <Tooltip text={accountProfileState.businessName} maxLength={14}/>
                    <div className={'border-box'}>
                      <span>{accountProfileState.businessNumber}</span>
                    </div>
                  </div>
                  <div>
                    <div className={'icon'}></div>
                    <span>담당자 정보</span>
                    <p>{accountProfileState.managerName}</p>
                    <div className={'border-box'}>
                      <span>{accountProfileState.managerPhone}</span>
                      <span className={'line-clamp_2'}>{accountProfileState.managerEmail}</span>
                    </div>
                  </div>
                  <div>
                    <div className={'icon'}></div>
                    <span>정산 정보</span>
                    <p>{accountProfileState.bankAccountNumber}</p>
                    <div className={'border-box'}>
                      <span>{accountProfileState.bankType}</span>
                      <span>예금주 {accountProfileState.accountHolder}</span>
                    </div>
                  </div>
                </AccountBody>
                :
                <NoAccountBody>
                  {
                    tokenResultInfo.role !== 'NORMAL' ?
                      (adminInfoState.convertedUser !== '' ?
                        <>
                          <p>정산 프로필이 등록되지 않았습니다.</p>
                          <p><TextMainColor>정산 프로필을</TextMainColor> 등록해주세요.</p>
                          <AccountButton onClick={()=>navigate('/board/accountProfile')}>정산 프로필 등록</AccountButton>
                        </>
                        :
                        <>
                          <p><TextMainColor>매체 계정으로 전환</TextMainColor>하여 정산 프로필 정보를 확인해주세요.</p>
                          <SearchUser title={'매체 계정 검색'} onSubmit={handleSearchResult} btnStyle={'SearchUser'} />
                        </>
                      )
                      :
                      <>
                        <p>I AM 담당자에게 문의하여</p>
                        <p><TextMainColor>정산 프로필 정보</TextMainColor>를 등록해주세요.</p>
                      </>
                  }
                </NoAccountBody>
            }
          </DashBoardCard>
        </DashBoardColSpan2>
      </RowSpan>
      {/* 월별 정산 이력 */}
      <DashBoardCard>
        <DashBoardHeader style={{marginBottom: 0}}>월별 정산이력</DashBoardHeader>
        <BoardSearchResult style={{marginTop: 0}}>
          <Table columns={accountInfoColumns}
                 data={accountInfoTableData}
                 titleTotal={false}
                 settings={accountInfoSetting}
                 showHoverRows={false}
                 activeCell={[0]}
          />
        </BoardSearchResult>
      </DashBoardCard>
      {/* 토스트 팝업 */}
      <ToastContainer position="top-center"
                      autoClose={1500}
                      hideProgressBar
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      limit={1}
                      style={{zIndex: 9999999}}/>
    </>
  )
}