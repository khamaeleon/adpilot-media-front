import React, {useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import {reportsStaticsAll, reportsStaticsAllColumn, reportsStaticsAtom} from "./entity/period";
import {Board, BoardHeader, BoardSearchResult, ChartContainer} from "../../assets/GlobalStyles";
import {useAtom, useAtomValue, useSetAtom} from "jotai";
import Table from "../../components/table";
import {ReportsCondition} from "../../components/reports/Condition";
import {VerticalRule} from "../../components/common/Common";
import {selectStaticsAll} from "../../services/reports/periodAxios";
import {ResponsiveBar} from "@nivo/bar";
import {sort} from "../../components/reports/sortList";
import {UserInfo} from "../layout";
import {useResetAtom} from "jotai/utils";

/** 일자별 차트 **/
function MyResponsiveBar(props) {
  const {selectKey} = props
  const periodData = useAtomValue(reportsStaticsAll)

  return (
    <ResponsiveBar
      data={periodData.length !== 0 ? periodData : []}
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
  const resetAtom = useResetAtom(reportsStaticsAtom)
  const setPeriodData = useSetAtom(reportsStaticsAll)

  useEffect(() => {
    return () => {
      resetAtom()
    }
  }, []);
  /**
   * 아코디언 데이타 페칭
   * @param event
   */
  const handleSearchCondition = async({skip,limit,sortInfo}) => {
    console.log(skip,limit,sortInfo)
    const condition = {
      ...searchCondition,
      pageSize: 30,
      currentPage: skip/limit === 0 ? 1 : (skip/limit) + 1,
      sortType: sort('DATE_DESC',sortInfo)
    }

    return await selectStaticsAll(userInfoState.id, condition).then(response => {
      const data = response.rows
      setTotalCount(response.totalCount)
      setPeriodData(data)
      return {data, count: response.totalCount}
    })
  }
  console.log(searchCondition)

  const dataSource = useCallback(handleSearchCondition,[searchCondition]);

  /**
   * 차트 키값 선택
   * @param key
   */
  const handleChangeChartKey = (key) => {
    setChartKey(key)
  }

  // const handleOnSearch = () => {
  //   handleSearchCondition(searchCondition)
  // }

  return(
    <Board>
      <BoardHeader>기간별 보고서</BoardHeader>
      <ReportsCondition searchCondition={searchCondition} setSearchCondition={setSearchCondition} />
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