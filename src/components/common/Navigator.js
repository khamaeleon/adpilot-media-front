import styled from "styled-components";
import {useLocation} from "react-router-dom";
import {navigationName} from "./entity";

function Navigator () {
  const location = useLocation()
  console.log()

  return (
    <NavigatorContainer>
      <Depth>홈</Depth>
      <Arrow/>
      <Depth>지면 관리</Depth>
      <Arrow/>
      <Depth style={{color:'#f5811f'}}>
        {navigationName[location.pathname]}
      </Depth>
    </NavigatorContainer>
  )
}
export default Navigator

const NavigatorContainer = styled.div`
  margin:5px 0;
  display: flex;
  align-items: center;
`

const Depth = styled.div`
  margin-right: 10px;
  font-size: 15px;
`

const Arrow = styled.div`
  margin-right: 10px;
  width: 6px;
  height: 9px;
  background-image: url("/assets/images/common/icon_left.png");
  background-repeat: no-repeat;
`