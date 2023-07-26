import {BoardContainer, ResetButton, RowSpan, TitleContainer} from "../../assets/GlobalStyles";
import Navigator from "../../components/common/Navigator";
import {accountInfoRevenue, accountInfoTable, accountProfile,} from "./entity";
import React, {useEffect} from "react";
import {useAtom, useSetAtom} from "jotai";
import {accountMonthlyListTableData, accountRevenueStatus, accountUserProfile} from "../../services/account/AccountAdminAxios";
import {SearchUser} from "../../components/common/SearchUser";
import {AdminInfo} from "../layout";
import {tokenResultAtom} from "../login/entity";
import {useNavigate, useParams} from "react-router-dom";
import {
  userAccountMonthlyListTableData,
  userAccountProfile,
  userAccountRevenueStatus
} from "../../services/account/AccountUserAxios";
import AccountManage from "./AccountManage";
import AccountHistory from "./AccountHistory";
import AccountProfile from "./AccountProfile";
import AccountConfirm from "./AccountConfirm";
import AccountData from "./AccountData";


function Account(){
  const params = useParams()
  const [tokenResultInfo] = useAtom(tokenResultAtom)
  const [adminInfoState,setAdminInfoState] = useAtom(AdminInfo) //매체 전환 계정 정보
  const setAccountProfileState = useSetAtom(accountProfile) //프로필 조회
  const setRevenueState = useSetAtom(accountInfoRevenue) //수익 현황
  const setAccountInfoTableData = useSetAtom(accountInfoTable) //월별 정산 이력 테이블 데이터
  const [tokenUserInfo] = useAtom(tokenResultAtom)
  const navigate = useNavigate();
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
          userAccountRevenueStatus(tokenResultInfo.username).then(response => setRevenueState(response))// 월별 수익
          userAccountMonthlyListTableData(tokenResultInfo.username).then(response => setAccountInfoTableData(response))// 정산 수익
        }
      })
    }
  }, [])

  /**
   * 어드민 정산 수익, 월별 수익 현황 조회
   * @param userName
   */
  const handleAdminApi = (userName) => { // 어드민 정산 수익, 월별 수익 현황 조회 API
    accountMonthlyListTableData(userName).then(response => { // 월별 수익
      response !== null && setAccountInfoTableData(response)
    })
    accountRevenueStatus(userName).then(response => { // 정산 수익
      setRevenueState(response)
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
        accountProfile: response !== null
      })
      setAccountProfileState(response);
      handleAdminApi(accountUserData.username)
    })
  }

  const handleClickReset = () => {
    localStorage.removeItem("mediaUsername")
    setAdminInfoState({
      ...adminInfoState,
      convertedUser: '',
      id: '',
    })
    params.id === 'accountProfile' && navigate('/board/account')
  }

  return(
    <main>
      <BoardContainer>
        <TitleContainer style={{alignItems: 'center'}}>
          <div>
            <h1>정산 관리</h1>
            <Navigator/>
          </div>
          {
            tokenUserInfo.role !== 'NORMAL' &&
            adminInfoState.convertedUser !== '' &&
            <RowSpan style={{marginTop: 0}}>
              <SearchUser title={'매체 계정 검색'} onSubmit={handleSearchResult} btnStyle={'SearchUser'}/>
              <ResetButton onClick={handleClickReset}>매체 전체</ResetButton>
            </RowSpan>
          }
        </TitleContainer>
        {params.id === 'account' && <AccountManage/>}
        {params.id === 'accountHistory' && <AccountHistory />}
        {params.id === 'accountProfile' && <AccountProfile />}
        {params.id === 'accountConfirm' && <AccountConfirm />}
        {params.id === 'accountData' && <AccountData />}
      </BoardContainer>

    </main>
  )
}

export default Account
