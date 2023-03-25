import Navigator from "../../components/common/Navigator";
import {BoardContainer, RowSpan, TitleContainer,} from "../../assets/GlobalStyles";
import ReportsMedia from "./Media";
import ReportsInventory from "./Page";
import ReportsPeriod from "./Period";
import ReportsAdExchange from "./AdExchange";
import {useParams} from "react-router-dom";
import ScrollToTop from "../../components/common/ScrollToTop";
import React, {useEffect} from "react";
import {useAtom} from "jotai/index";
import {selUserByUserId} from "../../services/ManageUserAxios";
import {tokenResultAtom} from "../login/entity";
import {userIdAtom} from "./entity";
import {useSetAtom} from "jotai";


function Reports(){
  const params = useParams()
  const setUserId = useSetAtom(userIdAtom)
  const [tokenUserInfo] = useAtom(tokenResultAtom)
  /**
   * 계정 체크
   */
  useEffect(() => {
    if(tokenUserInfo.role !== 'NORMAL'){
      if(localStorage.getItem('mediaUsername')) {
        selUserByUserId(localStorage.getItem('mediaUsername')).then(response => {
          setUserId(response?.id)
        })
      } else {
        setUserId('')
      }
    } else {
      selUserByUserId(tokenUserInfo.id).then(response => {
        setUserId(response?.id)
      })
    }
  }, [tokenUserInfo]);

  return(
    <main>
      <ScrollToTop/>
      <BoardContainer>
        <RowSpan style={{alignItems:'center', marginTop: 0}}>
          <TitleContainer>
            <h1>보고서</h1>
            <Navigator/>
          </TitleContainer>
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
