import styled from "styled-components";
export function VerticalRule (props) {
  return(
    <VerticalRuleContainer {...props}/>
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