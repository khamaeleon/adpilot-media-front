import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {inputStyle} from "../../assets/GlobalStyles";
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
import {Link} from "react-router-dom";
import {accountUseYn, adminAllType, searchAccountInfo} from "./entity";

function PlatformAdmin(){
  const activeStyle = {paddingBottom:16,borderBottom:'4px solid #f5811f'}
  const [searchAccountInfoState ,setSearchAccountInfoState] = useState(searchAccountInfo)
  const [accountUseYnState,setAccountUseYnState]=useState(accountUseYn)
  const [adminTypeState,setAdminTypeState]=useState(adminAllType)

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
                          options={accountUseYnState}
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
            <div>
              <SaveExcelButton>엑셀 저장</SaveExcelButton>
            </div>
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
              {/*반복*/}
              <tr>
                <td>최고관리자</td>
                <td><Link to={'/board/platform2/detail?id=1'}>nate1234</Link></td>
                <td>홍길동</td>
                <td>01012345678</td>
                <td>YYYY.MM.DD</td>
                <td>사용</td>
              </tr>
              <tr>
                <td>어드민</td>
                <td>natead123</td>
                <td>홍길동</td>
                <td>01012345678</td>
                <td>YYYY.MM.DD</td>
                <td style={{color:"#db6f6f"}}>미사용</td>
              </tr>
              </tbody>
            </table>
          </BoardSearchResult>
        </Board>
      </BoardContainer>
    </main>
  )
}

export default PlatformAdmin
