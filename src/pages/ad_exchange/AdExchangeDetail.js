import styled from "styled-components";
import Navigator from "../../components/common/Navigator";
import {useState} from "react";
import {
  Board,
  BoardContainer,
  BoardHeader,
  ColTitle,
  RowSpan,
  TitleContainer,
  ColSpan2, Input, Span4, ColSpan4, ColSpan1,
} from "../../assets/GlobalStyles";
import {ListBody} from "../../components/layout";
import {ReactSortable} from "react-sortablejs";
import Switch from "../../components/common/Switch";

function AdExchangeDetail(){
  const [sortList, setSortList] = useState([
    { id: 1, name: "크리테오", isActive: true, parameter: [{key: "파라미터", value: "ASDKFEIXCMEM5ASKE2"},{key: "파라미터", value: "ASDKFEIXCMEM5ASKE2"},{key: "파라미터", value: ""},{key: "파라미터", value: ""}] },
    { id: 2, name: "나스미디어", isActive: false, parameter: [{key: "파라미터", value: ""},{key: "파라미터", value: "ASDKFEIXCMEM5ASKE2"}]},
    { id: 3, name: "와이더플래닛", isActive: false, parameter: [{key: "파라미터", value: ""},{key: "파라미터", value: "ASDKFEIXCMEM5ASKE2"}]},
  ]);

  const handleChangeSwitch = (seq,value) => {
    const item = sortList.filter(item => item.id === seq)
    item[0].isActive = !value
    const newArray = [...sortList, sortList.splice(seq-1, 1)]
    newArray.splice(-1)
    setSortList(newArray)
  }

  const handleChangeParameterKey = (seq, key, value) => {
    const item = sortList.filter(item => item.id === seq)
    item[0].parameter[key].key = value.target.value
    const newArray = [...sortList, sortList.splice(seq-1, 1)]
    newArray.splice(-1)
    setSortList(newArray)
  }

  const handleChangeParameterValue = (seq, key,value) => {
    const item = sortList.filter(item => item.id === seq)
    item[0].parameter[key].value  = value.target.value
    const newArray = [...sortList, sortList.splice(seq-1, 1)]
    newArray.splice(-1)
    setSortList(newArray)
  }

  const handleAddParameter = (seq) => {

  }

  /**
   *
   * @param e
   * 소팅 인덱스 (기존순서번 =>, 변경된 순서번호)
   */
  const handleChangeSortEnd = (e) => {
    console.log(e.oldIndex, e.newIndex)
  }

  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>애드 익스체인지 관리</h1>
          <Navigator/>
        </TitleContainer>
        <Board>
          <BoardHeader>지면 정보</BoardHeader>
          <BoardInfo>
            <BoardInfoItem style={{borderRight:'1px solid #ddd'}}>
              <ListBody>
                <div style={{width: 100}}><Square/>지면병</div>
                <div>{'네이트 우측 120*600'}</div>
              </ListBody>
              <ListBody>
                <div style={{width: 100}}><Square/>게재 상태</div>
                <div>{'게재 중'}</div>
              </ListBody>
            </BoardInfoItem>
            <BoardInfoItem style={{borderRight:'1px solid #ddd'}}>
              <ListBody>
                <div style={{width: 100}}><Square/>지변 번호</div>
                <div>{'123456'}</div>
              </ListBody>
              <ListBody>
                <div style={{width: 100}}><Square/>상품</div>
                <div>{'배너'}</div>
              </ListBody>
            </BoardInfoItem>
            <BoardInfoItem>
              <ListBody>
                <div style={{width: 100}}><Square/>디바이스</div>
                <div>{'PC'}</div>
              </ListBody>
              <ListBody>
                <div style={{width: 100}}><Square/>에이전트</div>
                <div>{'PC 웹'}</div>
              </ListBody>
            </BoardInfoItem>
          </BoardInfo>
        </Board>
        <Board>
          <BoardHeader>플랫폼 연동 관리 <small>(연동 순서 관리)</small></BoardHeader>
          <SortableContainer>
            <ReactSortable list={sortList}
                           setList={setSortList}
                           onEnd={handleChangeSortEnd}
                           handle={'.handled'}>
              {sortList.map((item,key) => {
                return(
                  <SortListContainer key={key}>
                    <SortHeader>
                      <div className={'handled'}>::</div>
                      <ColSpan>
                        <Span4 style={{fontWeight: "bold"}}>
                          {item.name}
                        </Span4>
                        <Switch
                          seq={item.id}
                          completed={true}
                          disClose={item.isActive}
                          onClick={() => handleChangeSwitch(item.id,item.isActive)}
                        />
                      </ColSpan>
                    </SortHeader>
                    <SortBody style={item.isActive ? {height: (55 * item.parameter.length) + 50} : null}>
                      {item.parameter.map((item,key) => {
                        return (
                          <RowSpan key={key}>
                            <ColSpan4>
                              <ColTitle>
                                <Input type={'text'} value={item.key} onChange={(e) => handleChangeParameterKey(item.id, key, e)}/>
                              </ColTitle>
                              <Input type={'text'} value={item.value || ''} onChange={(e) => handleChangeParameterValue(item.id, key, e)}/>
                            </ColSpan4>
                            <ColSpan>
                              <AddButton onClick={handleAddParameter(item.id)}/>
                            </ColSpan>
                          </RowSpan>
                        )
                      })}
                    </SortBody>
                  </SortListContainer>
                )
              })}
            </ReactSortable>
          </SortableContainer>
        </Board>
      </BoardContainer>
    </main>
  )
}

export default AdExchangeDetail

const ModalContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
`

const BoardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fafafa;
`

const BoardInfoItem = styled.div`
  padding: 15px 0 15px 70px;
  width: 100%;
  & > div {
    padding: 8px 0;
  }
`

const Square = styled.div`
  display: inline-block;
  margin-right: 10px;
  width: 8px;
  height: 8px;
  background-color: #ccc;
`

const SortableContainer = styled.div`
  padding: 30px 0;
`

const SortListContainer = styled.div`
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
`

const SortHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background-color: #fff;
`

const SortBody = styled.div`
  padding: 0 30px;
  width: 100%;
  height: 0;
  background-color: #fafafa;
  overflow: hidden;
  transition-duration: 0.5s;
  & > div {
    margin-top: 0;
    width: 100%;
    height: 55px;
    display: flex;
    align-items: center;
  }
  & > div:first-child {
    margin-top: 25px;
  }
  & > div:last-child {
    margin-bottom: 25px;
  }
`
const ColSpan = styled.div`
  display: flex;
  align-items: center;
`

const AddButton = styled.div`
  margin: 0 0 0 10px;
  width: 34px;
  height: 24px;
  background-image: url("/assets/images/common/btn_calculate_plus.png");
  background-repeat: no-repeat;
`