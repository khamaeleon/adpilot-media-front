import Navigator from "../../components/common/Navigator";
import {BoardTableContainer, DefaultButton} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {useAtom} from "jotai";
import {
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail,  BoardSearchResultTitle,
  ColSpan1, ColSpan2,
  ColTitle,
  RowSpan, SaveExcelButton, SearchButton, SearchInput,
  TitleContainer
} from "../../assets/GlobalStyles";
import {Link, useNavigate} from "react-router-dom";
import {
  columnAdminData,
  columnAdminSetting,
  columnHistoryData,
  columnHistorySetting,
  historyListInfo,
  searchAdminParams
} from "./entity";
import {atom} from "jotai/index";
import {selListAdmin} from "../../services/ManageAdminAxios";
import Table from "../../components/table";

const AdminInfoList = atom([])
function PlatformAdmin(){
  const [adminInfoList, setAdminInfoList] = useAtom(AdminInfoList)
  const [searchAdminParamsState,setSearchAdminParamsState] = useState(searchAdminParams)
  const navigate = useNavigate()

  /**
   * 어드민 관리 INIT
   */
  useEffect(()=>{
    selListAdmin(searchAdminParamsState).then(response =>{
      if(response){
        setAdminInfoList(response)
      }
    })
  },[])

  /**
   * 어드민 계정 추가
   */
  const resistAdminMember = () =>{
    navigate('/board/platform2/detail',{ state: {id:'NEW'}})
  }

  /**
   * 아이디 및 담당자명 입력
   * @param event
   */
  const handleSearchName =(event) =>{
    setSearchAdminParamsState({
      ...searchAdminParamsState,
      searchText: event.target.value
    })
  }

  /**
   * 아이디 및 담당자명 검색
   */
  const searchAdminList =() =>{
    selListAdmin(searchAdminParamsState).then(response =>{
      if(response){
        setAdminInfoList(response)
      }
    })
  }

  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>플랫폼 관리</h1>
          <Navigator/>
        </TitleContainer>
        <Board>
          <BoardHeader>어드민 관리</BoardHeader>
          <BoardSearchDetail>
            {/*line1*/}
            <RowSpan>
              <ColSpan2>
                <ColTitle><span>검색어</span></ColTitle>
                <SearchInput>
                  <input type={'text'}
                         placeholder={'아이디 및 담당자명 검색'}
                         value={searchAdminParams.name}
                         onChange={handleSearchName}

                  />
                </SearchInput>
                <SearchButton onClick={searchAdminList}>검색</SearchButton>
              </ColSpan2>
            </RowSpan>
          </BoardSearchDetail>
          <BoardSearchResultTitle>
            <div>
              총 <span>120</span>건의 매체
            </div>
            <ColSpan1 style={{justifyContent: 'flex-end'}}>
              <SaveExcelButton type={'button'}>엑셀 저장</SaveExcelButton>
              <DefaultButton type={'button'} onClick={resistAdminMember}>계정 추가</DefaultButton>
            </ColSpan1>
          </BoardSearchResultTitle>
          <BoardTableContainer>
            <Table columns={columnAdminData}
                   data={adminInfoList}/>
          </BoardTableContainer>
        </Board>
      </BoardContainer>
    </main>
  )
}

export default PlatformAdmin
