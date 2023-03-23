import Navigator from "../../components/common/Navigator";
import {
  TitleContainer,
  BoardContainer, RowSpan,
} from "../../assets/GlobalStyles";
import ReportsMedia from "./Media";
import ReportsInventory from "./Page";
import ReportsPeriod from "./Period";
import ReportsAdExchange from "./AdExchange";
import {useParams} from "react-router-dom";
import ScrollToTop from "../../components/common/ScrollToTop";
import {SearchUser} from "../../components/common/SearchUser";
import React, {useEffect, useState} from "react";
import {useAtom} from "jotai/index";
import {proceedPeriodAtom} from "../dash_board/entity";
import {AdminInfo} from "../layout";
import {MediaSearchInfo} from "../dash_board";
import {selUserByUserId} from "../../services/ManageUserAxios";
import {dashboardPeriodStatus} from "../../services/DashboardAxios";


function Reports(){
  const params = useParams()
  const [mediaSearchInfo, setMediaSearchInfo] = useAtom(MediaSearchInfo)
  const [userId, setUserId] = useState('')
  const [adminInfoState, setAdminInfoState] = useAtom(AdminInfo)

  useEffect(() => {
    if(localStorage.getItem('role') !== 'NORMAL'){
      if(localStorage.getItem('mediaUsername')) {
        selUserByUserId(localStorage.getItem('mediaUsername')).then(response => {
          setUserId(response?.id)
        })
      } else {
        setUserId('')
      }
    } else {
      selUserByUserId(localStorage.getItem('username')).then(response => {
        console.log(response)
        setUserId(response?.id)
      })
    }
  }, [adminInfoState]);
  /**
   * 모달안에 매체 검색 선택시
   */
  const handleSearchResult = (keyword) => {
    //매체 검색 api 호출
    setMediaSearchInfo(mediaSearchInfo)
    if(keyword.id !== undefined) {
      //userId 로 다시 조회 대시보드
      localStorage.setItem('mediaUsername',keyword.username)
      setUserId(keyword.id)
      setAdminInfoState({
        ...adminInfoState,
        convertedUser: keyword.username
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
          {localStorage.getItem('role') !== 'NORMAL' &&
            <div>
              <SearchUser title={'매체 계정 전환'} onSubmit={handleSearchResult} btnStyl={'SwitchUserButton'} />
            </div>
          }
        </RowSpan>
        {/* 기간별보고서 */}
        {params.id === 'reports' && <ReportsPeriod userId={userId}/>}
        {/* 매체별보고서 */}
        {params.id === 'reportsMedia' && <ReportsMedia />}
        {/* 지면별보고서 */}
        {params.id === 'reportsInventory' && <ReportsInventory userId={userId}/>}
        {/* 외부연동수신보고서 */}
        {params.id === 'reportsAdExchange' && <ReportsAdExchange userId={userId}/>}
      </BoardContainer>
    </main>
  )
}

export default Reports
