import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {DefaultButton, inputStyle} from "../../assets/GlobalStyles";
import {useEffect, useState} from "react";
import {modalController} from "../../store";
import {useAtom} from "jotai";
import {
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail, BoardSearchResult, BoardSearchResultTitle, CalendarBox, CalendarIcon,
  ColSpan1, ColSpan2, ColSpan3,
  ColTitle, CustomDatePicker, DateContainer, RangePicker,
  RowSpan, SaveExcelButton, SearchButton, SearchInput,
  TitleContainer
} from "../../assets/GlobalStyles";
import {Link, useNavigate} from "react-router-dom";
import {adminAllType, adminInfoList, searchAccountInfo, selectAccountUseInfo} from "./entity";
import {atom} from "jotai/index";

const AdminInfoList = atom(adminInfoList)
function PlatformAdmin(){
  const activeStyle = {paddingBottom:16,borderBottom:'4px solid #f5811f'}
  const [searchAccountInfoState ,setSearchAccountInfoState] = useState(searchAccountInfo)
  const [accountUseYnState,setAccountUseYnState]=useState(selectAccountUseInfo)
  const [adminTypeState,setAdminTypeState]=useState(adminAllType)
  const [adminInfoList] = useAtom(AdminInfoList)
  const navigate = useNavigate()
  /**
   * 관리자 구분
   * @param mediaType
   */
  const handleAdminType =(adminType) =>{
    setSearchAccountInfoState({
      ...searchAccountInfoState,
      selectAdminType: adminType
    })
    //검색
  }
  /**
   * 계정 사용여부
   * @param accountUseYn
   */
  const handleSelectAccountUseYn =(accountUseYn) =>{
    setSearchAccountInfoState({
      ...searchAccountInfoState,
      selectAccountUseYn: accountUseYn
    })
    //검색
  }
  /**
   * 어드민 계정 추가
   */
  const resistAdminMember = () =>{
    navigate('/board/platform2/detail',{ state: {id:'NEW'}})
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
              <ColSpan1>
                <ColTitle><span>관리자 구분</span></ColTitle>
                <div>
                  <Select styles={inputStyle}
                          components={{IndicatorSeparator: () => null}}
                          options={adminTypeState}
                          value={(searchAccountInfoState.selectAdminType !== undefined && searchAccountInfoState.selectAdminType.value !== '') ? searchAccountInfoState.selectAdminType : {id: "1", value: "all", label: "전체"}}
                          onChange={handleAdminType}
                  />
                </div>
              </ColSpan1>
              <ColSpan1>
                <ColTitle><span>사용 여부</span></ColTitle>
                <div>
                  <Select styles={inputStyle}
                          components={{IndicatorSeparator: () => null}}
                          options={selectAccountUseInfo}
                          value={(searchAccountInfoState.selectAccountUseYn !== undefined && searchAccountInfoState.selectAccountUseYn.value !== '') ? searchAccountInfoState.selectAccountUseYn : {id: "1", value: "all", label: "전체"}}
                          onChange={handleSelectAccountUseYn}
                  />
                </div>
              </ColSpan1>
              <ColSpan2/>
            </RowSpan>
            <RowSpan>
              <ColSpan2>
                <ColTitle><span>검색어</span></ColTitle>
                <SearchInput>
                  <input type={'text'} placeholder={'검색할 매체명을 입력해주세요.'}/>
                </SearchInput>
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
          <BoardSearchResult>
            <table>
              <thead>
              <tr>
                <th>설정 권한</th>
                <th>아이디</th>
                <th>담당자명</th>
                <th>담당자 연락처</th>
                <th>생성 일시</th>
                <th>사용 여부</th>
              </tr>
              </thead>
              <tbody>
              {/*반복*/
                adminInfoList !==null && adminInfoList.map((adminListInfo,key) =>{
                  return (
                    <tr key={key}>
                      <td>{adminListInfo.adminTypeLabel}</td>
                      <td><Link to={'/board/platform2/detail'} state={ {id:adminListInfo.memberId}} >{adminListInfo.memberId}</Link></td>
                      <td>{adminListInfo.adminName}</td>
                      <td>{adminListInfo.adminPhone}</td>
                      <td>{adminListInfo.resistDate}</td>
                      <td>{(adminListInfo.accountUseYn ==='IN_USE') ? '사용중' :'미사용'}</td>
                    </tr>
                    )
                })
              }
              </tbody>
            </table>
          </BoardSearchResult>
        </Board>
      </BoardContainer>
    </main>
  )
}

export default PlatformAdmin
