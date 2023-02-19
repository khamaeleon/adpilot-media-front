import {BoardContainer, TitleContainer} from "../../assets/GlobalStyles";
import Navigator from "../../components/common/Navigator";

function AdProvide() {
  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>애드 익스체인지 관리</h1>
          <Navigator/>
        </TitleContainer>
      </BoardContainer>
    </main>
  )
}

export default AdProvide