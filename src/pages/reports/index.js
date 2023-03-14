import Navigator from "../../components/common/Navigator";
import {
  TitleContainer,
  BoardContainer,
} from "../../assets/GlobalStyles";
import ReportsMedia from "./Media";
import ReportsPage from "./Page";
import ReportsReception from "./AdExchange";
import ReportsPeriod from "./Period";
import {useParams} from "react-router-dom";

function Reports(){
  const params = useParams()
  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>보고서</h1>
          <Navigator/>
        </TitleContainer>
        {params.id === 'reports' && <ReportsPeriod />}
        {params.id === 'reports2' && <ReportsMedia />}
        {params.id === 'reports3' && <ReportsPage />}
        {params.id === 'reports4' && <ReportsReception />}
      </BoardContainer>
    </main>
  )
}

export default Reports
