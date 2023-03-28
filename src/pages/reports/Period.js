import React, {useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import {reportsStaticsAllColumn, reportsStaticsAtom, userIdAtom} from "./entity";
import {Board, BoardHeader, BoardSearchResult, ChartContainer} from "../../assets/GlobalStyles";
import {useAtom, useAtomValue} from "jotai/index";
import Table from "../../components/table";
import {ReportsCondition} from "../../components/reports/Condition";
import {VerticalRule} from "../../components/common/Common";
import {selectStaticsAll, selectStaticsUserAll} from "../../services/ReportsAxios";
import {ResponsiveBar} from "@nivo/bar";
import {sort} from "./sortList";
import {getThisMonth} from "../../common/DateUtils";
import {UserInfo} from "../layout";

/** 일자별 차트 **/

function MyResponsiveBar(props) {
  const {selectKey} = props
  const [data, setData] = useState([])
  const userInfoState = useAtomValue(UserInfo)
  useEffect(() => {
    const condition = {
      pageSize: 30,
      currentPage: 1,
      searchStartDate: getThisMonth().startDay,
      searchEndDate: getThisMonth().endDay,
      productType: null,
      eventType: null,
      isAdExchange: null,
      deviceType: null,
      agentType: ['WEB', 'WEB_APP', 'MOBILE_WEB', 'MOBILE_NATIVE_APP'],
      sortType: "DATE_ASC"
    }
    selectStaticsAll(userInfoState.id, condition).then(response => {
      setData(response.rows)
    })
  }, [selectKey]);


  return (
    <ResponsiveBar
      data={data.length !== 0 ? data : []}
      keys={[selectKey]}
      indexBy="historyDate"
      margin={{top: 40, right: 40, bottom: 130, left: 40}}
      padding={0.75}
      valueScale={{type: 'linear'}}
      indexScale={{type: 'band', round: true}}
      colors={['#f5811f']}
      axisLeft={false}
      axisBottom={{
        tickSize: 0,
        tickPadding: 15,
        tickRotation: -45,
        legendOffset: 32,
      }}
      enableLabel={false}
      enableGridY={false}
    />
  )
}
/** 기간별 보고서 **/
export default function ReportsPeriod(){
  const [searchCondition, setSearchCondition] = useAtom(reportsStaticsAtom)
  const [chartKey, setChartKey] = useState('proceedsAmount')
  const [totalCount, setTotalCount] = useState(0)
  const activeStyle = {borderBottom:'4px solid #f5811f'}
  const userInfoState = useAtomValue(UserInfo)
  /**
   * 아코디언 데이타 페칭
   * @param event
   */
  const handleSearchCondition = async({skip,limit,sortInfo}) => {
    const condition = {
      ...searchCondition,
      pageSize: 30,
      currentPage: skip/limit === 0 ? 1 : (skip/limit) + 1,
      sortType: sort('DATE_ASC',sortInfo)
    }

    const fetchData = await selectStaticsAll(userInfoState.id,condition).then(response => {
      const data = response.rows
      setTotalCount(response.totalCount)
      return {data, count: response.totalCount}
    })
    return fetchData
  }

  const dataSource = useCallback(handleSearchCondition,[userInfoState.id,searchCondition]);

  /**
   * 차트 키값 선택
   * @param event
   */
  const handleChangeChartKey = (key) => {
    setChartKey(key)
  }

  return(
    <Board>
      <BoardHeader>기간별 보고서</BoardHeader>
      <ReportsCondition searchCondition={searchCondition} setSearchCondition={setSearchCondition}/>
      <ChartContainer style={{height:250}}>
        <ChartLabel>
          <div onClick={() => handleChangeChartKey('proceedsAmount')} style={chartKey==='proceedsAmount' ? activeStyle : null}>수익금</div>
          <div onClick={() => handleChangeChartKey('requestCount')} style={chartKey==='requestCount' ? activeStyle : null}>요청수</div>
          <div onClick={() => handleChangeChartKey('responseCount')} style={chartKey==='responseCount' ? activeStyle : null}>응답수</div>
          <div onClick={() => handleChangeChartKey('exposureCount')} style={chartKey==='exposureCount' ? activeStyle : null}>노출수</div>
          <div onClick={() => handleChangeChartKey('clickCount')} style={chartKey==='clickCount' ? activeStyle : null}>클릭수</div>
          <div onClick={() => handleChangeChartKey('costAmount')} style={chartKey==='costAmount' ? activeStyle : null}>비용</div>
        </ChartLabel>
        <VerticalRule style={{backgroundColor:'#e5e5e5'}}/>
        <MyResponsiveBar selectKey={chartKey}/>
      </ChartContainer>
      <BoardSearchResult>
        <Table columns={reportsStaticsAllColumn}
               totalCount={[totalCount,'보고서']}
               data={dataSource}
               rowHeight={70}
               pagination
               livePagination
               scrollThreshold={0.7}
               style={{minHeight: 500}}/>
      </BoardSearchResult>
    </Board>
  )
}
/** 스티일 시트 **/
const ChartLabel = styled.div`
  display: flex;
  gap: 30px;
  padding: 0 40px;
  & div {
    display: flex;
    align-items: center;
    height: 45px;
    border-bottom: 4px solid #fff;
    cursor: pointer;
  }
`