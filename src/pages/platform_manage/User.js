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
import styled from "styled-components";

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
    selUserList(searchAccountInfoState).then(response =>{
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
  return(<>
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
        </RowSpan>
        <RowSpan>
          <ColSearch>
          <Select styles={SearchStyle}
                  options={mediaSearchType}
                  value={searchAccountInfoState.mediaSearchType !== null ? mediaSearchType.find(type => type.value === searchAccountInfoState.mediaSearchType) : mediaSearchType[0]}
                  onChange={handleMediaSearchType}
          />
            <SearchInput>
              <input type={'text'}
                     placeholder={searchAccountInfoState.mediaSearchType !== null ?'검색어를 입력해 주세요.' : '검색 항목을 선택해 주세요.'}
                     value={searchAccountInfoState?.searchText}
                     onChange={handleSearchName}
                     onKeyDown={e => (e.key === 'Enter') && searchUserList()}
                     readOnly={searchAccountInfoState.mediaSearchType === null ? true : false}
              />
            </SearchInput>
            </ColSearch>
            <SearchButton onClick={()=>searchUserList()}>적용</SearchButton>
        </RowSpan>
      </BoardSearchDetail>
    </Board><Board>
      <BoardTableContainer>
        <Table columns={columnUserData}
               totalCount={[totalInfo.totalCount, '매체']}
               data={userInfoList !== null ? userInfoList : []}/>
      </BoardTableContainer>
    </Board>
      </>
  )
}


const ColSearch = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 50%;
  & > div:first-child {
    position: relative;
    width: 30%;
    height: 35px;
  }
  & > div:last-child {
    position: relative;
    width: 100%;
  }
  & > Select {
    width: 10%;
  }
`
const SearchStyle = {
  indicatorSeparator: () => null,
  container: (styles) => ({
    ...styles,
    width: '100%',
  }),
  control: (styles,{isFocused,isDisabled}) => ({
    ...styles,
    backgroundColor: isDisabled ?'#F9FAFB' : 'white',
    border: '1px solid #e5e5e5',
    height: 35,
    minHeight: 35,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    boxShadow: isFocused && `0 0 0 1px #1E3A8A`,
    ':hover': {
      ...styles[':hover'],
      borderColor: isFocused && `#1E3A8A`
    }
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor:
          isDisabled ? undefined :
              isSelected ? `#1E3A8A` :
                  isFocused ? '#3B82F6'
                      :undefined,
      color:
          isDisabled ? '#222' :
              isSelected ? '#fff' : '#222',
      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled ?
            isSelected ? `#1E3A8A`
                : undefined
            :undefined

      }
    }
  },
  input: (styles) => ({
    ...styles,
    height: 26,
    borderRadius: 5,
  }),
  placeholder: (styles) => ({
    ...styles
  }),
  singleValue: (styles, { data }) => ({
    ...styles
  }),
};

const SearchInput = styled.div`
  position: relative;
  width: 100%;
  & input[type='text'] {
    padding: 0 20px;
    width: 100%;
    height: 35px;
    border: 1px solid #e5e5e5;
    border-left-width: 0;
    border-radius: 5px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    &:hover {
      border: 1px solid #b3b3b3;
    }
  }
`