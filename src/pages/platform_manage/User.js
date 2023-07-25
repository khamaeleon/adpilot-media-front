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
      if(response !== null){
        setUserInfoList(response?.rows)
        setTotalInfo({
          totalCount: response?.totalCount,
          totalPages: response?.totalPages,
          currentPage:response?.currentPage
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
      mediaType: mediaType.value
    })
  }
  /**
   * 검색 타입 선택
   * @param mediaSearchType
   */
  const handleMediaSearchType =(mediaSearchType) =>{
    setSearchAccountInfoState({
      ...searchAccountInfoState,
      mediaSearchType: mediaSearchType.value,
      siteName: mediaSearchType.value !== null ? searchAccountInfoState.siteName : '',
      username: mediaSearchType.value !== null ? searchAccountInfoState?.username: '',
      phoneNumber: mediaSearchType.value !== null ? searchAccountInfoState.phoneNumber: '',
      searchText: mediaSearchType.value !== null ? searchAccountInfoState?.searchText: ''
    })
  }
  /**
   * 계정 사용여부
   * @param accountUseYn
   */
  const handleSelectAccountUseYn =(activeYn) =>{
    setSearchAccountInfoState({
      ...searchAccountInfoState,
      activeYn: activeYn.value
    })
  }
  /**
   * 검색버튼
   */
  const searchUserList =() =>{
    selUserList(searchAccountInfoState).then(response =>{
      if(response){
        setUserInfoList(response?.rows)
        setTotalInfo({
          totalCount: response?.totalCount,
          totalPages: response?.totalPages,
          currentPage:response?.currentPage
        })
      }
    })
  }

  /**
   * 검색어 입력
   * @param event
   */
  const handleSearchName =(event) =>{
    if(searchAccountInfoState.mediaSearchType ==='MEDIA_NAME'){
      setSearchAccountInfoState({
        ...searchAccountInfoState,
        siteName: event.target.value,
        username:'',
        phoneNumber:'',
        searchText:event.target.value
      })
    }else if(searchAccountInfoState.mediaSearchType ==='MEDIA_ID'){

      setSearchAccountInfoState({
        ...searchAccountInfoState,
        username: event.target.value,
        siteName: '',
        phoneNumber:'',
        searchText:event.target.value
      })
    }else if(searchAccountInfoState.mediaSearchType ==='PHONE'){
      setSearchAccountInfoState({
        ...searchAccountInfoState,
        siteName: '',
        username:'',
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
              options={mediaTypeState}
              value={searchAccountInfoState.mediaType !== '' ? mediaTypeState.find(type => type.value === searchAccountInfoState.mediaType) : mediaTypeState[0]}
              onChange={handleMediaType}
              />
          </ColSpan1>
          <ColSpan1>
            <ColTitle><span>활성화 여부</span></ColTitle>
            <div style={{width: '70%'}}>
              <Select styles={inputStyle}
                      options={accountUseYnState}
                      placeholder={'선택'}
                      value={searchAccountInfoState.activeYn !== ''  ? accountUseYnState.find(type => type.value === searchAccountInfoState.activeYn) : accountUseYnState[0]}
                      onChange={handleSelectAccountUseYn}
              />
            </div>
          </ColSpan1>
          <ColSpan1>
            <ColTitle><span>검색어</span></ColTitle>
            <Select styles={inputStyle}
                    options={mediaSearchType}
                    value={searchAccountInfoState.mediaSearchType !== null ? mediaSearchType.find(type => type.value === searchAccountInfoState.mediaSearchType) : mediaSearchType[0]}
                    onChange={handleMediaSearchType}
            />
          </ColSpan1>
          <ColFraction>
            <SearchInput>
              <input type={'text'}
                     placeholder={searchAccountInfoState.mediaSearchType !== null ?'검색어를 입력해 주세요.' : '검색 항목을 선택해 주세요.'}
                     value={searchAccountInfoState?.searchText}
                     onChange={handleSearchName}
                     onKeyDown={e => (e.key === 'Enter') && searchUserList()}
                     readOnly={searchAccountInfoState.mediaSearchType === null ? true : false}
              />
            </SearchInput>
            <SearchButton onClick={()=>searchUserList()}>적용</SearchButton>
          </ColFraction>
        </RowSpan>
      </BoardSearchDetail>
      <BoardTableContainer>
        <Table columns={columnUserData}
               totalCount={[totalInfo.totalCount, '매체']}
               data={userInfoList !== null ? userInfoList : []}/>
      </BoardTableContainer>
    </Board>
  )
}