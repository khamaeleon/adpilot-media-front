import {
  Board,
  BoardHeader,
  BoardSearchDetail, BoardSearchResultTitle, BoardTableContainer, ColFraction,
  ColSpan1,
  ColSpan2, ColSpan3,
  ColTitle,
  inputStyle,
  RowSpan, SaveExcelButton, SearchButton, SearchInput
} from "../../assets/GlobalStyles";
import Select from "react-select";
import Table from "../../components/table";
import {
  columnUserData,
  mediaType,
  searchAccountInfo,
  selectAccountUseInfo,
  selectMediaSearchType
} from "./entity/common";
import React, {useEffect, useState} from "react";
import {atom, useAtom} from "jotai";
import {dataTotalInfo} from "../../components/common/entity";
import {selUserList} from "../../services/platform/ManageUserAxios";

const UserInfoList = atom([])
export default function PlatformUser(){
  const [searchAccountInfoState ,setSearchAccountInfoState] = useState(searchAccountInfo)
  const [mediaTypeState]=useState(mediaType)
  const [mediaSearchType]=useState(selectMediaSearchType)
  const [accountUseYnState]=useState(selectAccountUseInfo)
  const [userInfoList, setUserInfoList] = useAtom(UserInfoList)
  const [totalInfo,setTotalInfo] = useState(dataTotalInfo)

  useEffect(()=>{
    selUserList(searchAccountInfoState).then(response =>{
      if(response){
        console.log(response)
        setUserInfoList(response.rows)
        setTotalInfo({
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          currentPage:response.currentPage
        })
      }
    })
  },[])

  /**
   * 매체 타입 변경
   * @param mediaType
   */
  const handleMediaType =(mediaType) =>{
    setSearchAccountInfoState({
      ...searchAccountInfoState,
      mediaType:mediaType
    })
    //검색
    selUserList({...searchAccountInfoState,mediaType:mediaType.value}).then(response =>{

      if(response){
        setUserInfoList(response.rows)
        setTotalInfo({
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          currentPage:response.currentPage
        })
      }
    })
  }
  /**
   * 검색 타입 선택
   * @param mediaSearchType
   */
  const handleMediaSearchType =(mediaSearchType) =>{
    setSearchAccountInfoState({
      ...searchAccountInfoState,
      mediaSearchType:mediaSearchType
    })
  }
  /**
   * 계정 사용여부
   * @param accountUseYn
   */
  const handleSelectAccountUseYn =(activeYn) =>{
    setSearchAccountInfoState({
      ...searchAccountInfoState,
      activeYn: activeYn
    })
    //검색
    selUserList({...searchAccountInfoState,activeYn:activeYn.value}).then(response =>{
      if(response){
        setUserInfoList(response.rows)
        setTotalInfo({
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          currentPage:response.currentPage
        })
      }
    })
  }
  /**
   * 검색버튼
   */
  const searchUserList =() =>{
    console.log(searchAccountInfoState)
    selUserList(searchAccountInfoState).then(response =>{
      if(response){
        setUserInfoList(response.rows)
        setTotalInfo({
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          currentPage:response.currentPage
        })
      }
    })
  }

  /**
   * 검색어 입력
   * @param event
   */
  const handleSearchName =(event) =>{
    if(searchAccountInfoState.mediaSearchType.value ==='MEDIA_NAME'){
      setSearchAccountInfoState({
        ...searchAccountInfoState,
        siteName: event.target.value,
        searchText:event.target.value
      })
    }else if(searchAccountInfoState.mediaSearchType.value ==='MEDIA_ID'){
      setSearchAccountInfoState({
        ...searchAccountInfoState,
        username: event.target.value,
        searchText:event.target.value
      })
    }else if(searchAccountInfoState.mediaSearchType.value ==='PHONE'){
      setSearchAccountInfoState({
        ...searchAccountInfoState,
        phoneNumber: event.target.value,
        searchText:event.target.value
      })
    }
  }
  return(
    <Board>
      <BoardHeader>사용자 관리</BoardHeader>
      <BoardSearchDetail>
        {/*line1*/}
        <RowSpan>
          <ColSpan1>
            <ColTitle><span>매체 구분</span></ColTitle>
            <Select styles={inputStyle}
              components={{IndicatorSeparator: () => null}}
              options={mediaTypeState}
              value={(searchAccountInfoState.mediaType !== '' && searchAccountInfoState.mediaType.value !== '') ? searchAccountInfoState.mediaType : {id: "0", value: "ALL", label: "전체"}}
              onChange={handleMediaType}
              />
          </ColSpan1>
          <ColSpan1>
            <ColTitle><span>사용 여부</span></ColTitle>
            <Select styles={inputStyle}
                    components={{IndicatorSeparator: () => null}}
                    options={accountUseYnState}
                    value={(searchAccountInfoState.activeYn !== '' && searchAccountInfoState.activeYn.value !== '') ? searchAccountInfoState.activeYn : {id: "1", value: "ALL", label: "전체"}}
                    onChange={handleSelectAccountUseYn}
            />
          </ColSpan1>
          <ColSpan1>
            <ColTitle><span>검색어</span></ColTitle>
            <Select styles={inputStyle}
                    components={{IndicatorSeparator: () => null}}
                    options={mediaSearchType}
                    value={(searchAccountInfoState.mediaSearchType !== '' && searchAccountInfoState.mediaSearchType.value !== '') ? searchAccountInfoState.mediaSearchType : {id: "1", value: "select", label: "선택"}}
                    onChange={handleMediaSearchType}
            />
          </ColSpan1>
          <ColFraction>
            <SearchInput>
              <input type={'text'}
                     placeholder={'아이디 및 담당자명 검색'}
                     value={searchAccountInfoState.searchText}
                     onChange={handleSearchName}
                     readOnly={(searchAccountInfoState.mediaSearchType === '' || searchAccountInfoState.mediaSearchType.value === 'select') ? true:false}
              />
            </SearchInput>
            <SearchButton onClick={()=>searchUserList()}>검색</SearchButton>
          </ColFraction>
        </RowSpan>
      </BoardSearchDetail>
      <BoardTableContainer>
        <Table columns={columnUserData}
               totalCount={[totalInfo.totalCount, '매체']}
               data={userInfoList}/>
      </BoardTableContainer>
    </Board>
  )
}