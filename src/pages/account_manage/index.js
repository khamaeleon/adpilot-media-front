import styled from "styled-components";
import {BoardContainer, TitleContainer} from "../../assets/GlobalStyles";
import Navigator from "../../components/common/Navigator";

function Account(){
  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>정산관리</h1>
          <Navigator/>
        </TitleContainer>
      </BoardContainer>
    </main>
  )
}

export default Account
