import styled from "styled-components";
import React, {useCallback, useState} from "react";
import {
  Board,
  BoardHeader,
  BoardSearchResult,
  ReportsDetail
} from "../../assets/GlobalStyles";
import Table from "../../components/table";
import {
  reportsMediaAtom, reportsMediaDetailAtom,
  reportsStaticsInventoryByMediaColumn,
  reportsStaticsMedia,
  reportsStaticsMediaColumn, reportsStaticsMediaDetail, reportsStaticsMediaDetailColumn
} from "./entity";
import { useAtom, useAtomValue} from "jotai/index";
import {modalController} from "../../store";
import {
  selectReportsStaticsInventoryByMedia,
  selectReportsStaticsMedia,
  selectReportsStaticsMediaDetail
} from "../../services/ReportsAxios";
import TableDetail from "../../components/table/TableDetail";
import {ModalBody, ModalContainer, ModalHeader} from "../../components/modal/Modal";
import {ReportsCondition} from "../../components/reports/Condition";

function ReportsMediaModalComponent(props) {
  const [searchCondition, setSearchCondition] = useAtom(reportsMediaDetailAtom)
  const dataStaticsMedia = useAtomValue(reportsStaticsMediaDetail)
  /**
   * 데이터 페칭 (함수없이 짧게 만듬)
   * @param event
   */
  const dataSource = useCallback(async () => {
    const fetchData = await selectReportsStaticsMediaDetail(props.accountId, searchCondition)
    if(fetchData !== false) {
      return fetchData.rows
    } else {
      return dataStaticsMedia.rows
    }
  }, [props.accountId,searchCondition, dataStaticsMedia]);

  return (
    <div>
      <ModalHeader title={'일자별 통계'}/>
      <ModalBody>
        <ModalContainer>
          <ReportsCondition searchCondition={searchCondition} setSearchCondition={setSearchCondition}/>
          <Table columns={reportsStaticsMediaDetailColumn}
                 data={dataSource}/>
        </ModalContainer>
      </ModalBody>
    </div>
  )
}

export function ReportsMediaModal(props){
  const [, setModal] = useAtom(modalController)
  const handleClick = async () => {
    setModal({
      isShow: true,
      width: 1320,
      modalComponent: () => {
        return <ReportsMediaModalComponent accountId={props.accountId}/>
      }
    })
  }

  return (
    <ReportsDetail onClick={(e) => {
      e.stopPropagation()
      handleClick()
    }}/>
  )
}


export default function  ReportsMedia(){
  const [searchCondition, setSearchCondition] = useAtom(reportsMediaAtom)
  const dataStaticsMedia = useAtomValue(reportsStaticsMedia)
  const [, setLoading] = useState(false);
  /**
   * 기본 데이타 페칭 (인피니티 포함)
   * @param event
   */
  const dataSource = useCallback( async ({skip, sortInfo, limit}) => {
    const condition = {
      pageSize: 10,
      currentPage:1,
      searchStartDate: searchCondition.searchStartDate,
      searchEndDate: searchCondition.searchEndDate,
      productType: searchCondition.productType,
      eventType: searchCondition.eventType,
      isAdExchange: searchCondition.isAdExchange,
      deviceType: searchCondition.deviceType,
      agentType: searchCondition.agentType,
      sortType: null
    }
    const fetchData = await selectReportsStaticsMedia(condition).then(response => {
      const data = response.rows
      return {data, count: response.totalCount}
    });
    return fetchData
  },[searchCondition]);
  /**
   * 상세 데이타 페칭
   * @param event
   */
  const handleFetchDetailData = async ({accountId}) => {
    const fetchData = await selectReportsStaticsInventoryByMedia(accountId,searchCondition)
    if(fetchData !== false) {
      return fetchData.rows
    } else {
      return dataStaticsMedia.rows
    }
  }
  return(
    <Board>
      <BoardHeader>매체별 보고서</BoardHeader>
      <ReportsCondition searchCondition={searchCondition} setSearchCondition={setSearchCondition}/>
      <BoardSearchResult>
        <TableDetail columns={reportsStaticsMediaColumn}
                     data={dataSource}
                     detailData={handleFetchDetailData}
                     detailColumn={reportsStaticsInventoryByMediaColumn}
                     idProperty={'accountId'}
                     onLoadingChange={setLoading}
                     pagination
                     livePagination
                     scrollThreshold={0.7}/>
      </BoardSearchResult>
    </Board>
  )
}
