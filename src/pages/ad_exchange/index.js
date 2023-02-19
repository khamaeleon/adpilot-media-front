import styled from "styled-components";
import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {BoardSearchResult, ColSpan2, inputStyle, Span1, Span2, Span3, Span4} from "../../assets/GlobalStyles";

import {HorizontalRule, VerticalRule} from "../../components/common/Common";
import {useEffect, useState} from "react";
import {
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail,
  ColSpan1,  ColSpan3,
  ColTitle, RangePicker,
  RowSpan,
  TitleContainer,
  AgentType,
} from "../../assets/GlobalStyles";
import {Link} from "react-router-dom";
import Checkbox from "../../components/common/Checkbox";

function AdExchange(){
  const PARENT_ID = '전체';
  const CHILD_1_ID = 'PC 웹';
  const CHILD_2_ID = 'MOBILE';

  const getCheckedChildrenCount = (checkedItems) => {
    const childItems = Object.keys(checkedItems).filter((i) => i !== PARENT_ID);
    return childItems.reduce(
      (count, i) => (checkedItems[i] ? count + 1 : count),
      0,
    );
  };

  const getIsParentIndeterminate = (checkedItems) => {
    const checkedChildrenCount = getCheckedChildrenCount(checkedItems);
    return checkedChildrenCount > 0 && checkedChildrenCount < 3;
  };
  const initialCheckedItems = {
    [PARENT_ID]: false,
    [CHILD_1_ID]: false,
    [CHILD_2_ID]: false,
  };
  const [checkedItems, setCheckedItems] = useState(initialCheckedItems);
  const onChange = (event) => {
    const itemValue = event.target.value;

    if (itemValue === PARENT_ID) {
      const newCheckedState = !checkedItems[PARENT_ID];
      // Set all items to the checked state of the parent
      setCheckedItems(
        Object.keys(checkedItems).reduce(
          (items, i) => ({ ...items, [i]: newCheckedState }),
          {},
        ),
      );
    } else {
      const newCheckedItems = {
        ...checkedItems,
        [itemValue]: !checkedItems[itemValue],
      };

      setCheckedItems({
        // If all children would be unchecked, also uncheck the parent
        ...newCheckedItems,
        [PARENT_ID]: getCheckedChildrenCount(newCheckedItems) > 0,
      });
    }
  };

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
                <ColTitle><Span1>게재 상태</Span1></ColTitle>
                <div><Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/></div>
              </ColSpan1>
              <ColSpan1>
                <ColTitle><Span2>광고 상품</Span2></ColTitle>
                <div><Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/></div>
              </ColSpan1>
              <ColSpan2/>
            </RowSpan>
            {/*line2*/}
            <RowSpan>
              <ColSpan1>
                <ColTitle><Span1>디바이스</Span1></ColTitle>
                <div>
                  <AgentType>
                    <Checkbox
                      isChecked={checkedItems[PARENT_ID]}
                      isIndeterminate={getIsParentIndeterminate(checkedItems)}
                      onChange={onChange}
                      title="전체"
                      value={PARENT_ID}
                      name="parent"
                      id="parent"
                      type={'c'}
                    />
                    <Checkbox
                      isChecked={checkedItems[CHILD_1_ID]}
                      onChange={onChange}
                      title="PC 웹"
                      value={CHILD_1_ID}
                      name="child-1"
                      type={'c'}
                    />
                    <Checkbox
                      isChecked={checkedItems[CHILD_2_ID]}
                      onChange={onChange}
                      title="MOBILE"
                      value={CHILD_2_ID}
                      name="child-1"
                      type={'c'}
                    />
                  </AgentType>
                </div>
              </ColSpan1>
              <ColSpan3>
                <ColTitle><Span2>에이전트 유형</Span2></ColTitle>
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