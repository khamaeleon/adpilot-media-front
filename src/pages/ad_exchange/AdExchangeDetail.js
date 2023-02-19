import styled from "styled-components";
import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {inputStyle} from "../../assets/GlobalStyles";
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

function AdExchangeDetail(){
  const today = moment().toDate()
  const tomorrow = moment().add(1, 'd').toDate();
  const [dateRange, setDateRange] = useState([today, tomorrow]);
  const [startDate, endDate] = dateRange;
  const activeStyle = {paddingBottom:16,borderBottom:'4px solid #f5811f'}
  const [modal, setModal] = useAtom(modalController)

  const componentModal = () => {
    return (
      <div>
        <ModalHeader title={'일자별 통계'}/>
        <ModalBody>
          <ModalContainer>
            <BoardSearchDetail>
              {/*line1*/}
              <RowSpan>
                <ColSpan1>
                  <ColTitle><span>광고상품</span></ColTitle>
                  <div><Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/></div>
                </ColSpan1>
                <ColSpan1>
                  <ColTitle><span>이벤트</span></ColTitle>
                  <div><Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/></div>
                </ColSpan1>
                <ColSpan1>
                  <ColTitle><span>외부연동 유무</span></ColTitle>
                  <div><Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/></div>
                </ColSpan1>
                <ColSpan1/>
              </RowSpan>
              {/*line2*/}
              <RowSpan>
                <ColSpan1>
                  <ColTitle><span>디바이스</span></ColTitle>
                  <div><Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/></div>
                </ColSpan1>
                <ColSpan3>
                  <ColTitle><span>에이전트 유형</span></ColTitle>
                  <div>
                    <AgentType>
                      <Checkbox title={'전체'} type={'c'} id={'all'}/>
                      <Checkbox title={'PC 웹'} type={'c'} id={'pc'}/>
                      <Checkbox title={'PC 어플리케이션'} type={'c'} id={'pc-app'}/>
                      <Checkbox title={'반응형웹'} type={'c'} id={'responsive'}/>
                      <Checkbox title={'MOBILE 웹'} type={'c'} id={'mobile'}/>
                      <Checkbox title={'Native App'} type={'c'} id={'native'}/>
                      <Checkbox title={'WebApp'} type={'c'} id={'webapp'}/>
                    </AgentType>
                  </div>
                </ColSpan3>
              </RowSpan>
              {/*line3*/}
              <RowSpan>
                <ColSpan1>
                  <ColTitle><span>기간</span></ColTitle>
                  <div style={{width:'100%'}}>
                    <DateContainer>
                      <CalendarBox>
                        <CalendarIcon/>
                      </CalendarBox>
                      <CustomDatePicker
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(date) => setDateRange(date)}
                        dateFormat="MM월 dd일"
                        locale={ko}
                        isClearable={false}
                      />
                    </DateContainer>
                  </div>
                </ColSpan1>
                <ColSpan3>
                  <div>
                    <RangePicker>
                      <div>이번달</div>
                      <HorizontalRule style={{margin: "0 10px"}}/>
                      <div>지난달</div>
                      <HorizontalRule style={{margin: "0 10px"}}/>
                      <div>오늘</div>
                      <HorizontalRule style={{margin: "0 10px"}}/>
                      <div>어제</div>
                      <HorizontalRule style={{margin: "0 10px"}}/>
                      <div>지난7일</div>
                      <HorizontalRule style={{margin: "0 10px"}}/>
                      <div>지난30일</div>
                      <HorizontalRule style={{margin: "0 10px"}}/>
                      <div>지난90일</div>
                      <HorizontalRule style={{margin: "0 10px"}}/>
                      <div>지난 180일</div>
                    </RangePicker>
                  </div>
                </ColSpan3>
              </RowSpan>
            </BoardSearchDetail>
          </ModalContainer>
        </ModalBody>
      </div>
    )
  }

  const handleModal = () => {

  }

  useEffect(()=>{
    setModal({
      isShow: false,
      width: 1500,
      modalComponent: () => componentModal()
    })
  },[])

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
            <BoardInfoItem>
              <ListBody>
                <div><Square/>지면병</div>
                <div>네이트 우측</div>
              </ListBody>
              <ListBody>
                <div><Square/>지면병</div>
                <div>네이트 우측</div>
              </ListBody>
            </BoardInfoItem>
            <BoardInfoItem>
              <ListBody>
                <div><Square/>지면병</div>
                <div>네이트 우측</div>
              </ListBody>
              <ListBody>
                <div><Square/>지면병</div>
                <div>네이트 우측</div>
              </ListBody>
            </BoardInfoItem>
            <BoardInfoItem>
              <ListBody>
                <div><Square/>지면병</div>
                <div>네이트 우측</div>
              </ListBody>
              <ListBody>
                <div><Square/>지면병</div>
                <div>네이트 우측</div>
              </ListBody>
            </BoardInfoItem>
          </BoardInfo>
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