import styled from "styled-components";
export function VerticalRule (props) {
  return(
    <VerticalRuleContainer {...props}/>
  )
}

export function HorizontalRule (props) {
  return(
    <HorizontalRuleContainer {...props}/>
  )
}

export function AdSample(props) {
  return(
    <div></div>
  )
}
const VerticalRuleContainer = styled.div`
  width: 100%;
  height: 1px;
  background-color: #dcdcdc;
`

const HorizontalRuleContainer = styled.div`
  width: 1px;
  height: 10px;
  background-color: #dcdcdc;
`