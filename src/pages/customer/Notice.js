import {
  Board, BoardHeader,
  BoardSearchDetail,
  BoardSearchResultTitle,
  BoardTableContainer,
  ColSpan2,
  DefaultButton,
  Input, RowSpan,
} from "../../assets/GlobalStyles";
import Table from "../../components/table";
import React, {useEffect, useCallback, useState} from "react";
import {dataTotalInfo} from "../../components/common/entity";
import {columnNotice} from "./entity/NoticeEntity";
import WriteNoticeModal from "../../components/common/WriteNoticeModal";
import {
  selNoticeList,
} from "../../services/notice/NoticeAxios";
import {
  createNoticeAdmin, selNoticeListAdmin
} from "../../services/notice/NoticeAdminAxios";
import {useAtom} from "jotai";
import {tokenResultAtom} from "../login/entity";

export default function Notice() {

  const [tokenUserInfo] = useAtom(tokenResultAtom)

  const [totalInfo, setTotalInfo] = useState(dataTotalInfo);
  const [isSearch, setIsSearch] = useState(false);

  const [searchCondition, setSearchCondition] = useState(
      {keyword:'', pageSize: 10, currentPage: 1, publishYn:'ALL'});

  useEffect(()=>{
    if(tokenUserInfo.role !== '') onSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenUserInfo]);

  const handleSearch = (e) => {
    setSearchCondition({
      ...searchCondition,
      keyword: e.target.value
    })
  }

  const onWriteNotice = (data) => {
    createNoticeAdmin(data)
    .then(onSearch)

  }

  const onSearch = () => {
    setIsSearch(true);
  }

  const loadData = ({skip, limit}) => {
    let params = {
      ...searchCondition,
      currentPage: skip/limit + 1,
      pageSize: limit
    }

    if(tokenUserInfo.role !== 'NORMAL') {
      return selNoticeListAdmin(params).then(response => {
        const totalCount = response.totalElements;
        setIsSearch(false);
        setTotalInfo({
          totalCount: totalCount,
          currentCount: response?.content.length,
          currentPage: response.pageNumber,
          totalPages: response.totalPages
        });
        return {data: response?.content, count: parseInt(totalCount)};
      })
    } else {
      return selNoticeList({...params, publishYn: 'Y'}).then(response => {
        const totalCount = response.totalElements;
        setIsSearch(false);
        setTotalInfo({
          totalCount: response.totalCount,
          currentCount: response?.content.length,
          currentPage: response.pageNumber,
          totalPages: response.totalPages
        });
        return {data: response.content, count: parseInt(totalCount)};
      })
    }
  }
  const dataSource = useCallback(loadData, [searchCondition.currentPage, isSearch])
  return <>
    <Board>
      <BoardHeader>공지사항 현황</BoardHeader>
      <BoardSearchDetail>
        <RowSpan>
          <ColSpan2>
            <Input
                placeholder={'제목 검색'}
                value={searchCondition.keyword}
                onChange={handleSearch}
                onKeyDown={e => (e.key === 'Enter') && onSearch() }

            />
            <DefaultButton onClick={onSearch}>검색</DefaultButton>
          </ColSpan2>
        </RowSpan>

      </BoardSearchDetail>
      <BoardSearchResultTitle>
        <div/>
        <div>
          {tokenUserInfo.role !== "NORMAL" &&
              <WriteNoticeModal formType={'notice'} onClick={onWriteNotice} title={'공지사항 작성'} buttonText={'글쓰기'}/>
          }
        </div>
      </BoardSearchResultTitle>
      <BoardTableContainer>
        <Table
            columns={tokenUserInfo.role !== 'NORMAL' ? columnNotice : columnNotice.filter(column => column.name !== 'publishYn')}
            totalCount={[totalInfo.currentCount, '공지사항']}
            defaultLimit={searchCondition.pageSize}
            data={dataSource}
            pagination
        />
      </BoardTableContainer>
    </Board>
  </>
}