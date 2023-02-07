import styled from "styled-components";

function DashBoard(){
  return(
    <div id={'container'}>
      <aside>
        <Aside>
        </Aside>
      </aside>
      <main>
        대쉬 보드야ㅌ
      </main>
    </div>
  )
}

export default DashBoard

const Aside = styled.div`
  width: 280px;
  height: 100vh;
  background-color: #535353;
`