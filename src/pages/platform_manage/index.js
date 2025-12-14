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
import PlatformAdminDetail from "./AdminDetail";
import {SearchUser} from "../../components/common/SearchUser";
import PlatformTerm from "./Term";
import PlatformTermDetail from "./TermDetail";

function Platform(){
  const params = useParams()

  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <div>
            <h1>플랫폼 관리</h1>
            <Navigator/>
          </div>
        </TitleContainer>
        {console.log(params.id)}
        {params.id === 'platform' &&
          <PlatformUser/>
        }
        {params.id === 'platformUserDetail' &&
          <PlatformUserDetail/>
        }
        {params.id === 'platformTerm' &&
            <PlatformTerm/>
        }
        {params.id === 'platformTermDetail' &&
            <PlatformTermDetail/>
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
        {params.id === 'myPageUser' && <PlatformUserDetail/>}
        {params.id === 'myPageAdmin'&& <PlatformAdminDetail/>}
      </BoardContainer>
    </main>
  )
}

export default Platform