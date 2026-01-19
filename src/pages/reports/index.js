import Navigator from "../../components/common/Navigator";
import {BoardContainer, TitleContainer,} from "../../assets/GlobalStyles";
import ReportsMedia from "./Media";
import ReportsInventory from "./Page";
import ReportsPeriod from "./Period";
import ReportsAdExchange from "./AdExchange";
import {useParams} from "react-router-dom";
import ScrollToTop from "../../components/common/ScrollToTop";
import React from "react";
import {useAtom} from "jotai";
import {tokenResultAtom} from "../login/entity";
import {accountUserProfile} from "../../services/account/AccountAdminAxios";
import {AdminInfo} from "../layout";
import {MediaSearchInfo} from "../dash_board";

export default function Reports(){
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
        <TitleContainer>
          <div>
            <h1>보고서</h1>
            <Navigator/>
          </div>
        </TitleContainer>
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
};
