import React, {useCallback} from "react";
import {
  Board,
  BoardHeader,
  BoardSearchResult,
} from "../../assets/GlobalStyles";
import {
  reportsAdExchangeAtom,
  reportsStaticsAdExchange,
  reportsStaticsAdExchangeColumn,
  reportsStaticsAdExchangeByInventoryColumn,
} from "./entity";
import { useAtom, useAtomValue} from "jotai/index";
import {
  selectReportsStaticsAdExchange, selectReportsStaticsAdExchangeByInventory
} from "../../services/ReportsAxios";
import TableDetail from "../../components/table/TableDetail";
import {ReportsCondition} from "../../components/reports/Condition";

/**
 * 스타일
 * @param event
 */
const groupStyle = {
  textAlign: 'center',
  backgroundColor: '#fafafa',
  color:'#b2b2b2'
}
const groups = [
  { name: 'defaultData', header: '연동 데이터', headerStyle: groupStyle},
  { name: 'platformData', header: '플랫폼 데이터', headerStyle: groupStyle },
]
/** 외부연동수신 보고서 **/
export default function ReportsReception(){
  const [searchCondition, setSearchCondition] = useAtom(reportsAdExchangeAtom)
  const dataStaticsAdExchange = useAtomValue(reportsStaticsAdExchange)

  /**
   * 아코디언 데이타 페칭
   * @param event
   */
  const handleFetchDetailData = async ({inventoryId}) => {
    const fetchData = await selectReportsStaticsAdExchangeByInventory(inventoryId,searchCondition)
    if(fetchData !== false) {
      return fetchData.rows
    } else {
      return dataStaticsAdExchange.rows
    }
  }
  /**
   * 기본 데이타
   * @param event
   */
  const dataSource = useCallback(async() => {
    const fetchData = await selectReportsStaticsAdExchange(searchCondition)
    if(fetchData !== false) {
      return fetchData.rows
    } else {
      return dataStaticsAdExchange.rows
    }
  },[searchCondition,dataStaticsAdExchange]);

  return(
    <Board>
      <BoardHeader>매체별 보고서</BoardHeader>
      <ReportsCondition searchCondition={searchCondition} setSearchCondition={setSearchCondition}/>
      <BoardSearchResult>
        <TableDetail columns={reportsStaticsAdExchangeColumn}
                     data={dataSource}
                     detailData={handleFetchDetailData}
                     detailColumn={reportsStaticsAdExchangeByInventoryColumn}
                     detailGroups={groups}
                     idProperty={'inventoryId'}
                     groups={groups}/>
      </BoardSearchResult>
    </Board>
  )
}
