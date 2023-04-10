import Navigator from "../../components/common/Navigator";
import {BoardContainer, TitleContainer} from "../../assets/GlobalStyles";
import React from "react";
import {useParams} from "react-router-dom";
import PlatformHistory from "./History";
import PlatformAdExchangeDetail from "./AdExchagneDetail";
import PlatformHistoryDetail from "./HistoryDetail";
import PlatformAdExchange from "./AdExchange";
import PlatformUserDetail from "./UserDetail";
import PlatformUser from "./User";

function Platform(){
  const params = useParams()

  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>플랫폼 관리</h1>
          <Navigator/>
        </TitleContainer>
        {params.id === 'platform' &&
          <PlatformUser/>
        }
        {params.id === 'platformUserDetail' &&
          <PlatformUserDetail/>
        }
        {params.id === 'platformHistory' &&
          <PlatformHistory/>
        }
        {params.id === 'platformHistoryDetail' &&
          <PlatformHistoryDetail/>
        }
        {params.id === 'platformAdExchange' &&
          <PlatformAdExchange/>
        }
        {params.id === 'platformAdExchangeDetail' &&
          <PlatformAdExchangeDetail/>
        }
      </BoardContainer>
    </main>
  )
}

export default Platform