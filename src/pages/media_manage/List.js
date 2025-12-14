import React, {useEffect} from "react";
import {columnData, mediaSearchResult} from "./entity/medialist";
import {Board, BoardHeader, BoardSearchDetail, BoardSearchResult} from "../../assets/GlobalStyles";
import Table from "../../components/table";
import {selInventoryList} from "../../services/mediamanage/InventoryAxios";
import {useAtom} from "jotai";
import SearchBoard from "../../components/common/SearchBoard";
import {searchInfo} from "./entity/common";
import {useNavigate} from "react-router-dom";

function MediaList() {
  const [inventorySearchList, setInventorySearchList] = useAtom(mediaSearchResult);
    const navigate = useNavigate();
  useEffect(() => {
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
      <BoardSearchResult>
        <Table columns={columnData(navigate)}
               totalCount={[inventorySearchList.length,'지면']}
               idProperty="inventoryId"
               emptyText={'지면 리스트가 없습니다.'}
               activeCell={null}
               data={inventorySearchList}/>
      </BoardSearchResult>
    </Board>
  )
}

export default MediaList;
