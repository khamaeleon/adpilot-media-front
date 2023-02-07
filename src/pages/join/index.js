import {Link, useParams} from "react-router-dom";
import styled from "styled-components";

function terms () {
  return (
    <div>step1</div>
  )
}

function basic () {
  return (
    <div>step2</div>
  )
}

function done () {
  return (
    <div>step3</div>
  )
}

function Join(){
  const params = useParams()
  return(
    <div>
      <JoinHeader>
        <Link to={'/'}>
          <Logo/>
        </Link>
      </JoinHeader>
    </div>
  )
}

export default Join

const JoinHeader = styled.div`
  height: 100px;
`

const Logo = styled.div``