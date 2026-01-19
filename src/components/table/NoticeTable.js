import React, {useEffect, useState} from "react";
import {CancelButton, ColSpan2, CopyCode, Memo, RowSpan, Script, Site,} from "../../assets/GlobalStyles";
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import '@inovua/reactdatagrid-enterprise/base.css';
import '../../assets/default-light.scss'
import {useAtom, useSetAtom} from "jotai";
import {modalController} from "../../store";
import {ModalBody, ModalFooter, ModalHeader} from "../modal/Modal";
import {VerticalRule} from "../common/Common";
import {ConvertedMediaComponent} from "../Account/ModalComponents";
import {GuideBody, GuideContainer, GuideHeader, Off, On, PreviewSubmit, ScriptSubject, Small, SwitchBox, TotalCount} from "./styles/common";
import {mediaSearchResult} from "../../pages/media_manage/entity/medialist";
import {css} from "styled-components";
const mainColor = css`${props => props.theme.color.mainColor}`
function UseAtom (props) {
  const [searchResult, setSearchResult] = useAtom(mediaSearchResult)
  useEffect(() => {
    setSearchResult([...searchResult, props.objects])
  }, [props.objects]);

  return null
}
export const i18n = Object.assign({}, ReactDataGrid.defaultProps.i18n, {
  sortAsc: '오름차순',
  sortDesc: '내림차순',
  unsort:'정렬 해제',
  autoSizeToFit:'크기에 맞게 자동 조정',
  autoresizeThisColumn:'열 자동 조정',
  autoresizeAllColumns:'모든 열 자동 조정',
  columns: '항목 설정',
  pageText: '페이지',
  ofText: '/',
  perPageText: '페이지 당',
  showingText: '페이지',
})

function NoticeTable (props) {
  const {columns, data, groups } = props
  const [gridRef, setGridRef] = useState(null);
  const gridStyle = {minHeight: 200, overflow: 'auto', border: 'none'}

  useEffect(() => {
    if(gridRef){
      gridRef.current.setColumnSizesToFit()
    }
  },[gridRef])

  const emptyText = <p style={{
    fontSize: 16,
  }}>{props.emptyText !== undefined ? props.emptyText : '데이터가 없습니다.' }</p>
  /**
   * 오른쪽 마우스 클릭 방지
   * @param menuProps
   * @param rowProps
   */
  const renderRowContextMenu = (menuProps, { rowProps }) => {
    menuProps.autoDismiss = true
  }

  const gridElement = (
    <ReactDataGrid
      licenseKey={process.env.REACT_APP_DATA_GRID_LICENSE_KEY}
      idProperty={props.idProperty}
      handle={setGridRef}
      columns={columns}
      dataSource={data}
      showHeader={false}
      showColumnMenuFilterOptions={false}
      showCellBorders={false}
      showZebraRows={false}
      groups={groups !== null ? groups : false}
      enableColumnAutosize={true}
      showColumnMenuLockOptions={false}
      showColumnMenuGroupOptions={false}
      emptyText={emptyText}
      limit={30}
      pagination={false}
      livePagination={false}
      defaultShowCellBorders={false}
      scrollThreshold={props.scrollThreshold}
      style={Object.assign(gridStyle, props.style)}
      showHoverRows={false}
      activeCell={null}
      i18n={i18n}
      renderRowContextMenu={renderRowContextMenu}
      {...props}
    />
  )
  return(
    <>
      <RowSpan>
        <ColSpan2>
          {props.totalCount && <TotalCount><span/>총 <span style={{fontWeight: "bold"}}>{props?.totalCount[0]}</span> 건의 {props?.totalCount[1]}</TotalCount>}
        </ColSpan2>
      </RowSpan>
      {gridElement}
    </>
  )
}

export default NoticeTable;
