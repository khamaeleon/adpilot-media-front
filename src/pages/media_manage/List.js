import Navigator from "../../components/common/Navigator";
import Select from "react-select";
import Checkbox from "../../components/common/Checkbox";
import React, { useEffect, useState} from "react";
import {
  calculationAllType,
  columnData, deviceTypeInfo,
  mediaSearchResult,
  searchMediaInfo,
  searchMediaTypeAll
} from "./entity";
import {
  AgentType,
  Board,
  BoardContainer, BoardHeader, BoardSearchDetail,
  BoardSearchResult, BoardSearchResultTitle,
  ColSpan1,
  ColSpan2,
  ColSpan3, ColTitle,
  inputStyle, RowSpan, SaveExcelButton, SearchButton, SearchInput,
  TitleContainer
} from "../../assets/GlobalStyles";
import Table from "../../components/table";
import {selInventoryList} from "../../services/InventoryAxios";
import {useAtom} from "jotai/index";
import SearchBoard from "../../components/common/SearchBoard";
function MediaList() {
  const [inventorySearchList, setInventorySearchList] = useAtom(mediaSearchResult);

  useEffect(() => {
     selInventoryList(searchMediaInfo).then(response =>{
       if(response){
         setInventorySearchList(response)
       }
     })
  }, []);

  const onClickSearchMedia =(e) => {
    //지면리스트 호출
    selInventoryList(e).then(response =>{
      if(response){
        setInventorySearchList(response)
      }
    })
  }

  return (
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>지면 관리</h1>
          <Navigator/>
        </TitleContainer>
        <Board>
          <BoardHeader>지면 리스트</BoardHeader>
          <BoardSearchDetail>
            <SearchBoard deviceType calculationType searchKeyword onSearch={onClickSearchMedia}/>
          </BoardSearchDetail>
          <BoardSearchResultTitle>
            <div>
              총 <span>{inventorySearchList.length}</span>건의 매체
            </div>
            <div>
              <SaveExcelButton>엑셀 저장</SaveExcelButton>
            </div>
          </BoardSearchResultTitle>
          <BoardSearchResult>
            <Table columns={columnData}
                   data={inventorySearchList}/>
          </BoardSearchResult>
        </Board>
      </BoardContainer>
    </main>
  )
}

export default MediaList;
