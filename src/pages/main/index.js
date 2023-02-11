import styled from "styled-components";
import {Link} from "react-router-dom";

function Main(){
  return(
    <div id={'container'}>
      홈
      <Link to={'/board/dashboard'}>대시보드</Link>
    </div>
  )
}

export default Main

const Aside = styled.div`
  width: 280px;
  height: 100vh;
  background-color: #535353;
`