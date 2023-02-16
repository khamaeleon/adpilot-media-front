import styled from "styled-components";
import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {BoardSearchResult, ColSpan2, inputStyle} from "../../assets/GlobalStyles";
import Checkbox from "@atlaskit/checkbox";
import {HorizontalRule, VerticalRule} from "../../components/common/Common";
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
  TitleContainer,
  AgentType, ColSpan4, ChartContainer
} from "../../assets/GlobalStyles";
import {Link} from "react-router-dom";

function AdExchange(){

  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>애드 익스체인지 관리</h1>
          <Navigator/>
        </TitleContainer>
        <Board>
          <BoardHeader>지면별 연동사 수신 연동</BoardHeader>
          <BoardSearchDetail>
            {/*line1*/}
            <RowSpan>
              <ColSpan1>
                <ColTitle><span>게재 상태</span></ColTitle>
                <div><Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/></div>
              </ColSpan1>
              <ColSpan1>
                <ColTitle><span>광고 상품</span></ColTitle>
                <div><Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/></div>
              </ColSpan1>
              <ColSpan2/>
            </RowSpan>
            {/*line2*/}
            <RowSpan>
              <ColSpan1>
                <ColTitle><span>디바이스</span></ColTitle>
                <div>
                  <AgentType>
                    <Checkbox label={'전체'}/>
                    <Checkbox label={'PC 웹'}/>
                    <Checkbox label={'MOBILE'}/>
                  </AgentType>
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
            {/*line3*/}
            <RowSpan>
            </RowSpan>
          </BoardSearchDetail>
          <BoardSearchResult>
            <table>
              <thead>
              <tr>
                <th>게재 상태</th>
                <th>지면명</th>
                <th>지면번호</th>
                <th>연동사</th>
                <th>광고 상품</th>
                <th>에이전트</th>
                <th>지면 사이즈</th>
              </tr>
              </thead>
              <tbody>
                {/*반복*/}
                <tr>
                  <td>{'게재중'}</td>
                  <td><Link to={'/board/adExchange/detail?id=1'}>{'네이트 중앙 240*600'}</Link></td>
                  <td>{'123456'}</td>
                  <td>{'1'}</td>
                  <td>{'배너'}</td>
                  <td>{'PC 웹'}</td>
                  <td>{'600*120'}</td>
                </tr>
                <tr>
                  <td>{'게재중'}</td>
                  <td><Link to={'/board/adExchange/detail?id=2'}>{'네이트 중앙 400*400'}</Link></td>
                  <td>{'123456'}</td>
                  <td>{'1'}</td>
                  <td>{'배너'}</td>
                  <td>{'PC 웹'}</td>
                  <td>{'600*120'}</td>
                </tr>
              </tbody>
            </table>
          </BoardSearchResult>
        </Board>
      </BoardContainer>
    </main>
  )
}

export default AdExchange

const ModalContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
`