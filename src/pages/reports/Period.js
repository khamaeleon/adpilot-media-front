import React, {useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import {reportsStatics, reportsStaticsAll, reportsStaticsAllColumn, reportsUserStaticsAllColumn} from "./entity/period";
import {Board, BoardHeader, BoardSearchResult, ChartContainer, ChartTooltip} from "../../assets/GlobalStyles";
import {useAtom, useAtomValue, useSetAtom} from "jotai";
import Table from "../../components/table";
import {ReportsCondition} from "../../components/reports/Condition";
import {VerticalRule} from "../../components/common/Common";
import {selectStaticsAll} from "../../services/reports/periodAxios";
import {ResponsiveBar} from "@nivo/bar";
import {sort} from "../../components/reports/sortList";
import {UserInfo} from "../layout";
import {dateFormat, decimalFormat, moneyToFixedFormat, numberToFixedFormat} from "../../common/StringUtils";
import {lockedRows, summaryReducer} from "./entity/common";

/** 일자별 차트 **/
function MyResponsiveBar(props) {
  const {selectKey, data} = props
  const [periodData,setPeriodData] = useAtom(reportsStaticsAll)
  useEffect(() => {
    setPeriodData(data)
  }, [data]);

  const yFormatted = (itemData) => {
    let value;
    if(['clickRate'].includes(itemData.id)) {
      value = numberToFixedFormat(itemData.value)+'%'
    } else if(['costAmount','revenueAmount', 'cpc', 'ecpm'].includes(itemData.id)) {
      value = moneyToFixedFormat(itemData.value)+'원'
    } else {
      value = decimalFormat(itemData.value)
    }
    return value
  }

  const dateFormatted = (tick) => {
    let value;
    if (periodData.length > 31) {
      value = tick.tickIndex%5 == 0 ? tick.value : null
    } else {
      value = tick.value
    }
    return dateFormat(value, 'MM.DD')
  }
  const tickComponent = (tick) => {
    return(
      <g transform={`translate(${tick.x},${tick.y})`} >
        <line />
        <text textAnchor="middle"
              dominantBaseline="middle"
              transform={`translate(${tick.textX}, ${tick.textY})`}
              fontSize={12}
        >
          {dateFormatted(tick)}
        </text>
    </g>
    )
  }
  return (
    <ResponsiveBar
      data={periodData.length !== 0 ? periodData : []}
      keys={[selectKey]}
      indexBy="historyDate"
      margin={{top: 30, right: 30, bottom: 80, left: 30}}
      padding={0.75}
      valueScale={{type: 'linear'}}
      indexScale={{type: 'band', round: true}}
      colors={['#f5811f']}
      axisLeft={false}
      axisBottom={{
        tickSize: 0,
        tickPadding: 15,
        legendOffset: 32,
        renderTick: tickComponent
      }}
      tooltip={(props) => {
        return (
          <ChartTooltip>
            <p>{props.indexValue}</p>
            <p>{yFormatted(props)}</p>
          </ChartTooltip>
        )
      }}
      enableLabel={false}
      enableGridY={false}
    />
  )
}
/** 기간별 보고서 **/
export default function ReportsPeriod(){
  const [searchCondition, setSearchCondition] = useState(reportsStatics)
  const [searchState, setSearchState] = useState(reportsStatics)
  const [chartKey, setChartKey] = useState('revenueAmount')
  const [totalCount, setTotalCount] = useState(0)
  const [chartPageSize, setChartPageSize] = useState(30)
  const activeStyle = {borderBottom:'4px solid #f5811f'}
  const userInfoState = useAtomValue(UserInfo)
  const setPeriodData = useSetAtom(reportsStaticsAll)

  /**
   * 아코디언 데이타 페칭
   * @param event
   */
  const handleSearchCondition = async({skip,limit,sortInfo}) => {
    const condition = {
      ...searchCondition,
      pageSize: 30,
      currentPage: skip/limit === 0 ? 1 : (skip/limit) + 1,
      sortType: sort('DATE_DESC',sortInfo)
    }

    return await selectStaticsAll(userInfoState?.id, condition).then(response => {
      if(response) {
        const data = response.rows
        setTotalCount(response.totalCount)
        return {data, count: response.totalCount}
      }
    })
  }

  const dataSource = useCallback(handleSearchCondition,[searchCondition, userInfoState]);

  const handleChartSearchCondition = async() => {
    const condition = {
      ...searchCondition,
      pageSize: chartPageSize,
      currentPage: 1,
      sortType: 'DATE_ASC'
    }

    return await selectStaticsAll(userInfoState?.id, condition).then(response => {
      if(response) {
        const data = response?.rows
        data.map((item,key) => {
          Object.assign(data[key],{clickRate: item.exposureCount !== 0 ? (item.validClickCount / item.exposureCount) * 100 : 0})
          Object.assign(data[key],{cpc:item.validClickCount !== 0 ? item?.costAmount / item.validClickCount : 0})
          Object.assign(data[key],{ecpm: item.exposureCount !== 0 ? (item?.costAmount / item.exposureCount) * 1000 : 0},)
        })
        setPeriodData(data)
      }
    })
  }

  const dataSource2 = useCallback(handleChartSearchCondition,[searchCondition, userInfoState]);

  /**
   * 차트 키값 선택
   * @param key
   */
  const handleChangeChartKey = (key) => {
    setChartKey(key)
  }

  const onSearch = () => {
    setSearchCondition({
      ...searchState
    })
  }

  return(
    <Board>
      <BoardHeader>기간별 보고서</BoardHeader>
      <ReportsCondition searchState={searchState} setSearchState={setSearchState} setChartPageSize={setChartPageSize} onSearch={onSearch}/>
      <ChartContainer style={{height:250}}>
        <ChartLabel>
          <div onClick={() => handleChangeChartKey('revenueAmount')} style={chartKey==='revenueAmount' ? activeStyle : null}>수익금</div>
          <div onClick={() => handleChangeChartKey('requestCount')} style={chartKey==='requestCount' ? activeStyle : null}>요청수</div>
          {userInfoState.email === '' &&
            <div onClick={() => handleChangeChartKey('responseCount')} style={chartKey==='responseCount' ? activeStyle : null}>응답수</div>
          }
          <div onClick={() => handleChangeChartKey('exposureCount')} style={chartKey==='exposureCount' ? activeStyle : null}>노출수</div>
          <div onClick={() => handleChangeChartKey('validClickCount')} style={chartKey==='validClickCount' ? activeStyle : null}>클릭수</div>
          {userInfoState.email === '' &&
            <>
              <div onClick={() => handleChangeChartKey('clickRate')} style={chartKey==='clickRate' ? activeStyle : null}>클릭률</div>
              <div onClick={() => handleChangeChartKey('costAmount')} style={chartKey==='costAmount' ? activeStyle : null}>비용</div>
              <div onClick={() => handleChangeChartKey('cpc')} style={chartKey==='cpc' ? activeStyle : null}>CPC</div>
              <div onClick={() => handleChangeChartKey('ecpm')} style={chartKey==='ecpm' ? activeStyle : null}>ECPM</div>
            </>
          }
        </ChartLabel>
        <VerticalRule style={{backgroundColor:'#e5e5e5'}}/>
        {
          dataSource2 !== null && <MyResponsiveBar selectKey={chartKey} data={dataSource2}/>
        }

      </ChartContainer>
      <BoardSearchResult>
        <Table columns={userInfoState.email === '' ? reportsStaticsAllColumn : reportsUserStaticsAllColumn}
               lockedRows={lockedRows}
               summaryReducer={summaryReducer}
               totalCount={[totalCount,'보고서']}
               data={dataSource}
               defaultSortInfo={{name:"historyDate", dir: -1}}
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