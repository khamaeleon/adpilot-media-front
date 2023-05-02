import {Board, BoardHeader, BoardSearchDetail, BoardSearchResult} from "../../assets/GlobalStyles";
import SearchBoard from "../../components/common/SearchBoard";
import Table from "../../components/table";
import {adExchangeListAtom, columnAdExChangeData} from "./entity";
import React, {useEffect, useState} from "react";
import {searchInfo} from "../media_manage/entity/common";
import {useAtom} from "jotai";
import {getAdExchangeList} from "../../services/adexchange/AdExchangeAxios";

export default function AdExchangeManage() {
  const [adExChangeList, setAdExChangeList] = useAtom(adExchangeListAtom)
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [deviceChecked, ] = useState({
    pc: true,
    mobile: true,
    responsive:true
  })
  /**
   * 초기 데이터 리스트 페칭
   * @param event
   */
  useEffect(() => {
    async function fetchAndGetList() {
      const data = await getAdExchangeList(searchInfo);
      if(data !== null){
        setAdExChangeList(data)
      }
    }
    fetchAndGetList()
  }, []);

  /**
   * 체크박스 전체 체크
   * @param event
   */
  useEffect(() => {
    if (deviceChecked.pc && deviceChecked.mobile && deviceChecked.responsive) {
      setIsCheckedAll(true)
    } else {
      setIsCheckedAll(false)
    }
  }, [deviceChecked, isCheckedAll]);

  /**
   * 검색 데이터 페칭
   * @param e
   */
  const handleSearchAdExchange = async(e) => {
    const data = await getAdExchangeList(e);
    if(data !== undefined){
      setAdExChangeList(data)
    }
  }
  return (
    <Board>
      <BoardHeader>지면별 연동사 수신 연동</BoardHeader>
      <BoardSearchDetail>
        <SearchBoard productType deviceType searchKeyword onSearch={handleSearchAdExchange}/>
      </BoardSearchDetail>
      <BoardSearchResult>
        <Table columns={columnAdExChangeData}
               totalCount={[adExChangeList.length, '지면']}
               idProperty={"inventoryId"}
               emptyText={'지면 리스트가 없습니다.'}
               defaultSortInfo={{name: 'publishYn', dir: -1}}
               data={adExChangeList}/>
      </BoardSearchResult>
    </Board>
  )
}