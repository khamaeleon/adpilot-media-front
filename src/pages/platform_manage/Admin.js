import {
  Board,
  BoardHeader,
  BoardSearchDetail, BoardSearchResultTitle,
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
  columnAdminData,
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
  createAdmin,
  selAdminList
} from "../../services/platform/ManageAdminAxios";
import CreateAdminModal from "../../components/common/CreateAdminModal";

const UserInfoList = atom([])
export default function PlatformAdmin(){
  const [searchAccountInfoState ,setSearchAccountInfoState] = useState(searchAccountInfo)
  const [mediaTypeState]=useState(mediaType)
  const [mediaSearchType]=useState(selectMediaSearchType)
  const [accountUseYnState]=useState(selectAccountUseInfo)
  const [userInfoList, setUserInfoList] = useAtom(UserInfoList)
  const [totalInfo,setTotalInfo] = useState(dataTotalInfo)

  useEffect(()=>{
    selAdminList(searchAccountInfoState).then(response =>{
      if(response !== null){
        setUserInfoList(response?.content)
        setTotalInfo({
          totalCount: response?.totalElements,
          totalPages: response?.totalPages,
          currentPage:response?.pageNumber
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
    selAdminList(searchAccountInfoState).then(response =>{
      if(response){
        setUserInfoList(response?.content)
        setTotalInfo({
          totalCount: response?.totalElements,
          totalPages: response?.totalPages,
          currentPage:response?.pageNumber
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
      <BoardHeader>
        관리자 관리
      </BoardHeader>
      <BoardSearchDetail>
        {/*line1*/}
        <RowSpan>
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
          <ColFraction>
            <SearchButton onClick={()=>searchUserList()}>검색</SearchButton>
          </ColFraction>
        </RowSpan>
      </BoardSearchDetail>

      <BoardTableContainer>

        <BoardSearchResultTitle>
          <div/>
          <div>
            <CreateAdminModal formType={'admin'} title={'관리자 추가'} buttonText={'관리자 추가'}/>
          </div>
        </BoardSearchResultTitle>
        <Table columns={columnAdminData}
               totalCount={[totalInfo.totalCount, '관리자']}
               data={userInfoList !== null ? userInfoList : []}/>
      </BoardTableContainer>
    </Board>
  )
}