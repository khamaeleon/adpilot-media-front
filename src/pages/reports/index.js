import Navigator from "../../components/common/Navigator";
import {BoardContainer, RowSpan, TitleContainer,} from "../../assets/GlobalStyles";
import ReportsMedia from "./Media";
import ReportsInventory from "./Page";
import ReportsPeriod from "./Period";
import ReportsAdExchange from "./AdExchange";
import {useParams} from "react-router-dom";
import ScrollToTop from "../../components/common/ScrollToTop";
import React from "react";
import {useAtom} from "jotai";
import {tokenResultAtom} from "../login/entity";
import {SearchUser} from "../../components/common/SearchUser";
import {accountUserProfile} from "../../services/account/AccountAdminAxios";
import {AdminInfo} from "../layout";
import {MediaSearchInfo} from "../dash_board";

function Reports(){
  const params = useParams()
  const [tokenUserInfo] = useAtom(tokenResultAtom)
  const [mediaSearchInfo, setMediaSearchInfo] = useAtom(MediaSearchInfo)
  const [adminInfoState, setAdminInfoState] = useAtom(AdminInfo)

  /**
   * 모달안에 매체 검색 선택시
   */
  const handleSearchResult = (keyword) => {
    //매체 검색 api 호출
    setMediaSearchInfo(mediaSearchInfo)
    if(keyword.id !== undefined) {
      //userId 로 다시 조회 대시보드
      localStorage.setItem('mediaUsername',keyword.username)
      accountUserProfile(keyword.username).then(response => {
        setAdminInfoState({
          ...adminInfoState,
          convertedUser: keyword.username,
          id: keyword.id,
          accountProfile: response !== null
        })
      })
    }
  }

  return(
    <main>
      <ScrollToTop/>
      <BoardContainer>
        <RowSpan style={{alignItems:'center', marginTop: 0}}>
          <TitleContainer>
            <h1>보고서</h1>
            <Navigator/>
          </TitleContainer>
          {tokenUserInfo.role !== 'NORMAL' &&
            <div>
              <SearchUser title={'매체 계정 전환'} onSubmit={handleSearchResult} btnStyl={'SwitchUserButton'} />
            </div>
          }
        </RowSpan>
        {/* 기간별보고서 */}
        {params.id === 'reports' && <ReportsPeriod/>}
        {/* 매체별보고서 */}
        {params.id === 'reportsMedia' && <ReportsMedia/>}
        {/* 지면별보고서 */}
        {params.id === 'reportsInventory' && <ReportsInventory/>}
        {/* 외부연동수신보고서 */}
        {params.id === 'reportsAdExchange' && <ReportsAdExchange/>}
      </BoardContainer>
    </main>
  )
}

export default Reports
