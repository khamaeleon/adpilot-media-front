import styled from "styled-components";
import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {ColSpan2, Input, inputStyle, Span4} from "../../assets/GlobalStyles";
import {HorizontalRule} from "../../components/common/Common";
import ko from "date-fns/locale/ko";
import moment from "moment";
import {useEffect, useState} from "react";
import {modalController} from "../../store";
import {useAtom} from "jotai";
import {ModalBody, ModalHeader} from "../../components/modal/Modal";
import {
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail, CalendarBox, CalendarIcon,
  ColSpan1,  ColSpan3,
  ColTitle, CustomDatePicker, DateContainer, RangePicker,
  RowSpan,
  TitleContainer,  AgentType,
} from "../../assets/GlobalStyles";
import {ListBody} from "../../components/layout";
import Checkbox from "../../components/common/Checkbox";
import {ReactSortable} from "react-sortablejs";
import Switch from "../../components/common/Switch";

function AdExchangeDetail(){
  const today = moment().toDate()
  const tomorrow = moment().add(1, 'd').toDate();
  const [dateRange, setDateRange] = useState([today, tomorrow]);
  const [startDate, endDate] = dateRange;
  const [modal, setModal] = useAtom(modalController)
  const [sortList, setSortList] = useState([
    { id: 1, name: "크리테오", isActive: true, uniquekey: "ASDKFEIXCMEM5ASKE2", apikey: "ASDKFEIXCMEM5ASKE2", parameter: "ASDKFEIXCMEM5ASKE2" },
    { id: 2, name: "나스미디어", isActive: false, uniquekey: "", apikey: "", parameter: "" },
    { id: 3, name: "와이더플래닛", isActive: false, uniquekey: "", apikey: "", parameter: "" },
    { id: 4, name: "크리테오", isActive: false, uniquekey: "ASDKFEIXCMEM5ASKE2", apikey: "ASDKFEIXCMEM5ASKE2", parameter: "ASDKFEIXCMEM5ASKE2" },
    { id: 5, name: "나스미디어", isActive: true, uniquekey: "", apikey: "", parameter: "" },
    { id: 6, name: "와이더플래닛", isActive: false, uniquekey: "", apikey: "", parameter: "" },
  ]);

  const handleChangeSwitch = (seq,active) => {

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
                <div><Square/>지면병</div>
                <div>{'네이트 우측 120*600'}</div>
              </ListBody>
              <ListBody>
                <div><Square/>게재 상태</div>
                <div>{'게재 중'}</div>
              </ListBody>
            </BoardInfoItem>
            <BoardInfoItem style={{borderRight:'1px solid #ddd'}}>
              <ListBody>
                <div><Square/>지변 번호</div>
                <div>{'123456'}</div>
              </ListBody>
              <ListBody>
                <div><Square/>상품</div>
                <div>{'배너'}</div>
              </ListBody>
            </BoardInfoItem>
            <BoardInfoItem>
              <ListBody>
                <div><Square/>디바이스</div>
                <div>{'PC'}</div>
              </ListBody>
              <ListBody>
                <div><Square/>에이전트</div>
                <div>{'PC 웹'}</div>
              </ListBody>
            </BoardInfoItem>
          </BoardInfo>
        </Board>
        <Board>
          <BoardHeader>플랫폼 연동 관리</BoardHeader>
          <SortableContainer>
            <ReactSortable list={sortList} setList={setSortList}>
              {sortList.map((item) => (
                <SortListContainer key={item.id}>
                  <SortHeader>
                    <div><Span4>{item.name}</Span4></div>
                    <div>
                      <Switch
                        seq={item.id}
                        completed={true}
                        disClose={item.isActive}
                        onClick={() => handleChangeSwitch(item.id,item.isActive)}
                      />
                    </div>
                  </SortHeader>
                  <SortBody>
                    <RowSpan>
                      <ColSpan2>
                        <ColTitle>키값</ColTitle>
                        <Input type={'text'} defaultValue={item.uniquekey} readOnly={item.isActive? false: true}/>
                      </ColSpan2>
                      <ColSpan2>
                        <ColTitle>API키 값</ColTitle>
                        <Input type={'text'} defaultValue={item.apikey} readOnly={item.isActive? false: true}/>
                      </ColSpan2>
                      <ColSpan2>
                        <ColTitle>파라미터키 값</ColTitle>
                        <Input type={'text'} defaultValue={item.parameter} readOnly={item.isActive? false: true}/>
                      </ColSpan2>
                    </RowSpan>
                  </SortBody>
                </SortListContainer>
              ))}
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
`

const SortHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 30px;
`

const SortBody = styled.div`
  padding: 15px 30px;
  background-color: #fafafa;
  & > div {
    margin-top: 0;
  }
`