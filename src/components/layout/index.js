import styled from "styled-components";

export function BoardBody (props) {
  const {children} = props
  return (
    <Body>
      {children}
    </Body>
  )
}


const Body = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid #dddddd;
`