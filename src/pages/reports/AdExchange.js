import React, {useCallback, useState} from "react";
import {useAtomValue} from "jotai";
import {Board, BoardHeader, BoardSearchResult,} from "../../assets/GlobalStyles";
import {
  reportsAdExchange,
  reportsStaticsAdExchangeByInventoryColumn,
  reportsStaticsAdExchangeColumn,
  reportsUserStaticsAdExchangeColumn,
} from "./entity/adexchange";
import {
  selectAdminStaticsAdExchange,
  selectAdminStaticsAdExchangeByInventory,
  selectUserStaticsAdExchange,
  selectUserStaticsAdExchangeByInventory,
} from "../../services/reports/adExchangeAxios";
import TableDetail from "../../components/table/TableDetail";
import {ReportsCondition} from "../../components/reports/Condition";
import {sort} from "../../components/reports/sortList";
import {UserInfo} from "../layout";
import {tokenResultAtom} from "../login/entity";

/**
 * 스타일
 * @param event
 */
const groupStyle = {
  textAlign: 'center',
}

const groups = [
  {name: 'defaultData', header: '연동 데이터', headerStyle: groupStyle},
  {name: 'platformData', header: '플랫폼 데이터', headerStyle: groupStyle},
]
/** 외부연동수신 보고서 **/
export default function ReportsAdExchange() {
  const [searchState, setSearchState] = useState(reportsAdExchange)
  const [searchCondition, setSearchCondition] = useState(reportsAdExchange)
  const [totalCount, setTotalCount] = useState(0)
  const userInfoState = useAtomValue(UserInfo)
  const tokenInfoState = useAtomValue(tokenResultAtom)
  const [creativeInfo, setCreativeInfo] = useState({})
  /**
   * 아코디언 데이타 페칭
   * @param event
   */
  const handleFetchDetailData = useCallback(async ({inventoryId}) => {
    const condition = {
      ...searchCondition,
      pageSize: 30,
      currentPage: 1,
      sortType: sort('INVENTORY_NAME_DESC',null)
    }
    if(tokenInfoState.role !== 'NORMAL') {
      return await selectAdminStaticsAdExchangeByInventory(creativeInfo.id, inventoryId, condition).then(response => {
        if(response !== null) {
          const data = response.rows
          setTotalCount(response.totalCount)
          return {data, count: response.totalCount}
        }
      })
    } else {
      return await selectUserStaticsAdExchangeByInventory(tokenInfoState.id, inventoryId, condition).then(response => {
        if(response !== null) {
          const data = response.rows
          setTotalCount(response.totalCount)
          return {data, count: response.totalCount}
        }
      })
    }
  },[searchCondition])

  /**
   * 기본 데이타
   * @param event
   */
  const dataSource = useCallback(async ({skip, sortInfo, limit}) => {
    const condition = {
      ...searchCondition,
      pageSize: 30,
      currentPage: skip/limit === 0 ? 1 : (skip/limit) + 1,
      sortType: sort('INVENTORY_NAME_DESC',sortInfo)
    }
    if(tokenInfoState.role !== 'NORMAL') {
      return await selectAdminStaticsAdExchange(creativeInfo.id, condition).then(response => {
        if(response !== null) {
          const data = response.rows
          setTotalCount(response.totalCount)
          return {data, count: response.totalCount}
        }
      })
    } else {
      return await selectUserStaticsAdExchange(tokenInfoState.id, condition).then(response => {
        if(response !== null) {
          const data = response.rows
          setTotalCount(response.totalCount)
          return {data, count: response.totalCount}
        }
      })
    }


  }, [userInfoState,searchCondition]);

  const onSearch = () => {
    setSearchCondition({
      ...searchState
    })
  }

  const handleSearchAdvertiser = (data) => {
    setCreativeInfo(data)
  }

  const handleClickReset = () => {
    setCreativeInfo({})
  }

  return (
    <Board>
      <BoardHeader>외부 연동 수신 보고서</BoardHeader>
      <ReportsCondition searchMediaInfo={creativeInfo} searchMedia={handleSearchAdvertiser} searchMediaReset={handleClickReset} searchState={searchState} setSearchState={setSearchState} onSearch={onSearch}/>
      <BoardSearchResult>
        <TableDetail columns={userInfoState.email === '' ? reportsStaticsAdExchangeColumn : reportsUserStaticsAdExchangeColumn}
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
