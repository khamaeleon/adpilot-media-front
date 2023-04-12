import Navigator from "../../components/common/Navigator";
import React from "react";
import {BoardContainer, TitleContainer,} from "../../assets/GlobalStyles";
import {useParams} from "react-router-dom";
import AdExchangeDetail from "./AdExchangeDetail";
import AdExchangeManage from "./AdExchange";

function AdExchange(){
  const params = useParams()

  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <div>
            <h1>애드 익스체인지 관리</h1>
            <Navigator/>
          </div>
        </TitleContainer>
        {params.id === 'adExchange' &&  <AdExchangeManage/> }
        {params.id === 'adExchangeDetail' &&  <AdExchangeDetail/> }
      </BoardContainer>
    </main>
  )
}

export default AdExchange