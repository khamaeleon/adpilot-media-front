import styled from "styled-components";

function Modal(props) {
  return (
    <>
      {props.show &&
        <Dim id={'modal'}>
          {props.children}
        </Dim>
      }</>
  )
}

export default Modal

const Dim = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,.5);
`