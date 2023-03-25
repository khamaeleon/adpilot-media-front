import React, {useCallback, useState} from "react";
import {useAtom} from "jotai/index";
import {Board, BoardHeader, BoardSearchResult,} from "../../assets/GlobalStyles";
import {
  reportsAdExchangeAtom,
  reportsStaticsAdExchangeByInventoryColumn,
  reportsStaticsAdExchangeColumn, userIdAtom,
} from "./entity";
import {
  selectStaticsAdExchange,
  selectStaticsAdExchangeByInventory, selectStaticsUserAdExchange,
  selectStaticsUserAdExchangeByInventory,
} from "../../services/ReportsAxios";
import TableDetail from "../../components/table/TableDetail";
import {ReportsCondition} from "../../components/reports/Condition";
import {sort} from "./sortList";
import {useAtomValue} from "jotai";

/**
 * 스타일
 * @param event
 */
const groupStyle = {
  textAlign: 'center',
  backgroundColor: '#fafafa',
  color: '#b2b2b2'
}

const groups = [
  {name: 'defaultData', header: '연동 데이터', headerStyle: groupStyle},
  {name: 'platformData', header: '플랫폼 데이터', headerStyle: groupStyle},
]
/** 외부연동수신 보고서 **/
export default function ReportsAdExchange() {
  const userId = useAtomValue(userIdAtom)
  const [searchCondition, setSearchCondition] = useAtom(reportsAdExchangeAtom)
  const [totalCount, setTotalCount] = useState(0)

  /**
   * 아코디언 데이타 페칭
   * @param event
   */
  const handleFetchDetailData = useCallback(async ({inventoryId}) => {
    const condition = {
      ...searchCondition,
      pageSize: 50,
      currentPage: 1,
      sortType: sort('INVENTORY_NAME_ASC',null)
    }
    if(userId !== '' && userId !== undefined) {
      const fetchData = await selectStaticsUserAdExchangeByInventory(userId, inventoryId, condition).then(response => {
        const data = response.rows
        setTotalCount(response.totalCount)
        return {data, count: response.totalCount}
      });
      console.log(fetchData)
      return fetchData
    } else {
      const fetchData = await selectStaticsAdExchangeByInventory(inventoryId, condition).then(response => {
        const data = response.rows
        setTotalCount(response.totalCount)
        return {data, count: response.totalCount}
      });
      return fetchData
    }
  },[])

  /**
   * 기본 데이타
   * @param event
   */
  const dataSource = useCallback(async ({skip, sortInfo, limit}) => {
    const condition = {
      ...searchCondition,
      pageSize: 30,
      currentPage: skip/limit === 0 ? 1 : (skip/limit) + 1,
      sortType: sort('INVENTORY_NAME_ASC',sortInfo)
    }
    if(userId !== '' && userId !== undefined) {
      const fetchData = await selectStaticsUserAdExchange(userId, condition).then(response => {
        const data = response.rows
        setTotalCount(response.totalCount)
        return {data, count: response.totalCount}
      });
      return fetchData
    } else {
      const fetchData = await selectStaticsAdExchange(condition).then(response => {
        const data = response.rows
        setTotalCount(response.totalCount)
        return {data, count: response.totalCount}
      });
      return fetchData
    }
  }, [searchCondition]);

  return (
    <Board>
      <BoardHeader>외부 연동 수신 보고서</BoardHeader>
      <ReportsCondition searchCondition={searchCondition} setSearchCondition={setSearchCondition}/>
      <BoardSearchResult>
        <TableDetail columns={reportsStaticsAdExchangeColumn}
                     data={dataSource}
                     detailData={handleFetchDetailData}
                     detailColumn={reportsStaticsAdExchangeByInventoryColumn}
                     detailGroups={groups}
                     idProperty={'inventoryId'}
                     totalCount={[totalCount, '보고서']}
                     groups={groups}
                     style={{minHeight: 500}}/>
      </BoardSearchResult>
    </Board>
  )
}
