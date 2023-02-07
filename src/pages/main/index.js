import styled from "styled-components";

function Main(){
  return(
    <div id={'container'}>
      <aside>
        <Aside>
        </Aside>
      </aside>
      <main>

      </main>
    </div>
  )
}

export default Main

const Aside = styled.div`
  width: 280px;
  height: 100vh;
  background-color: #535353;
`