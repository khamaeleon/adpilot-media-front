import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardTableContainer,
  ColFraction,
  ColSpan1,
  ColTitle,
  inputStyle,
  RowSpan,
  SearchButton,
  SearchInput
} from "../../assets/GlobalStyles";
import Select from "react-select";
import Table from "../../components/table";
import {
  columnTermData,
  columnUserData,
  mediaType,
  searchAccountInfo,
  selectAccountUseInfo,
  selectMediaSearchType
} from "./entity/common";
import React, {useEffect, useState} from "react";
import {atom, useAtom} from "jotai";
import {dataTotalInfo} from "../../components/common/entity";
import {
  selPolicyTerms,
  selUserList
} from "../../services/platform/ManageUserAxios";

const termList = atom([])
export default function PlatformTerm(){
  const [termList, setTermList] = useState([])
  const [totalInfo,setTotalInfo] = useState(dataTotalInfo)

  useEffect(()=>{
    selPolicyTerms().then(response =>{

      if(response !== null){
        setTermList(response)
        setTotalInfo({
          totalCount: response.length,
          totalPages: response.length,
          currentPage:response.length
        })
      }
    })
  },[])


  return(
    <Board>
      <BoardHeader>약관 관리</BoardHeader>
      <BoardSearchDetail>
        {/*line1*/}
        <RowSpan></RowSpan>
      </BoardSearchDetail>
      <BoardTableContainer>
        <Table columns={columnTermData}
               totalCount={[totalInfo.totalCount, '매체']}
               data={termList !== null ? termList : []}/>
      </BoardTableContainer>
    </Board>
  )
}