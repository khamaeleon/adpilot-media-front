import styled from "styled-components";
import {Link} from "react-router-dom";

function Main(){
  return(
    <div id={'container'}>
      <Header>
        <Link to={'/board/dashboard'}>대시보드</Link>
        <Link to={'/board/media'}>지면관리</Link>
        <Link to={'/board/platform'}>외부 연동 관리</Link>
        <Link to={'/board/reports'}>보고서</Link>
        <Link to={'/board/adExchange'}>정산관리</Link>
        <Link to={'/board/service'}>서비스관리</Link>
      </Header>
    </div>
  )
}

export default Main

const Header = styled.div`
  width: 1200px;
  height: 100px;
  padding: 20px;
  font-size: 30px;
  & a {
    padding: 20px;
    &:hover {
      background-color: #956A3E;
      color: #fff;
    }
  }
`