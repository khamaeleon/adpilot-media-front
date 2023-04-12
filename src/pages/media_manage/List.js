import React, {useEffect} from "react";
import {columnData, mediaSearchResult} from "./entity/medialist";
import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardSearchResult,
  BoardSearchResultTitle,
  SaveExcelButton
} from "../../assets/GlobalStyles";
import Table from "../../components/table";
import {selInventoryList} from "../../services/mediamanage/InventoryAxios";
import {useAtom} from "jotai";
import SearchBoard from "../../components/common/SearchBoard";
import {searchInfo} from "./entity/common";

function MediaList() {
  const [inventorySearchList, setInventorySearchList] = useAtom(mediaSearchResult);

  useEffect(() => {
     const username = localStorage.getItem("username")
    console.log(username)
     selInventoryList(searchInfo).then(response =>{
       if(response){
         setInventorySearchList(response)
       }
     })
  }, [setInventorySearchList]);

  const onClickSearchMedia =(e) => {
    //지면리스트 호출
    selInventoryList(e).then(response =>{
      if(response){
        setInventorySearchList(response)
      }
    })
  }

  return (
    <Board>
      <BoardHeader>지면 리스트</BoardHeader>
      <BoardSearchDetail>
        <SearchBoard deviceType calculationType searchKeyword onSearch={onClickSearchMedia}/>
      </BoardSearchDetail>
      <BoardSearchResultTitle>
        <div>
        </div>
        <div>
          <SaveExcelButton>엑셀 저장</SaveExcelButton>
        </div>
      </BoardSearchResultTitle>
      <BoardSearchResult>
        <Table columns={columnData}
               totalCount={[inventorySearchList.length,'매체']}
               data={inventorySearchList}/>
      </BoardSearchResult>
    </Board>
  )
}

export default MediaList;
