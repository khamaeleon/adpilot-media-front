import React, {useCallback, useEffect, useState} from "react";
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import '@inovua/reactdatagrid-enterprise/base.css';
import '../../assets/default-light.scss'
import {ColSpan2, RowSpan} from "../../assets/GlobalStyles";
import {Small, TotalCount} from "./styles/common";
import {i18n} from "./index";
import {useAtom, useAtomValue} from "jotai";
import {rowDetailsDataAtom, tableIdAtom} from "../../pages/reports/entity/common";


function RowDetails (props) {
  const [tableId, setTableId] = useAtom(tableIdAtom)
  const rowDetailsData = useAtomValue(rowDetailsDataAtom)
  const [gridRef, setGridRef] = useState(null);
  useEffect(() => {
    setTableId(props.entity)
  }, []);
  /**
   * ...reference react data grid
   * auto size column size to fit
   */
  useEffect(() => {
    if(gridRef){
      gridRef.current.setColumnSizesToFit()
    }
  }, [gridRef])
  const renderRowContextMenu = (menuProps, { rowProps }) => {
    menuProps.autoDismiss = true
    console.log('오른쪽 클릭 방지')
  }
  const emptyText = <p style={{
    fontSize: 16,
  }}>{'데이터가 없습니다.' }</p>
  return (
    <ReactDataGrid
      licenseKey={process.env.REACT_APP_DATA_GRID_LICENSE_KEY}
      handle={setGridRef}
      dataSource={rowDetailsData}
      columns={props.detailColumn}
      enableColumnAutosize={true}
      groups={props.detailGroups}
      showZebraRows={false}
      pagination
      emptyText={emptyText}
      activeCell={null}
      renderRowContextMenu={renderRowContextMenu}
      i18n={i18n}
    />
  )
}

const accountExpandHeight = 300
function TableDetail (props) {
  const {columns, data, groups, isSearch } = props
  const [gridRef, setGridRef] = useState(null);
  const gridStyle = { minHeight: 450, ...props.style}

  /**
   * ...빈 데이터 텍스트
   * @type {JSX.Element}
   */
  const emptyText = <p style={{
    fontSize: 16,
  }}>{props.emptyText !== undefined ? props.emptyText : '데이터가 없습니다.' }</p>

  /**
   * ...reference react data grid
   * auto size column size to fit
   */
  useEffect(() => {
    if(gridRef){
      gridRef.current.setColumnSizesToFit()
    }
  }, [gridRef])
  /**
   * 오른쪽 클릭 방지
   * @param menuProps
   * @param rowProps
   */
  const renderRowContextMenu = (menuProps, { rowProps }) => {
    menuProps.autoDismiss = true
  }

  /**
   * ...펼쳐보기
   * @param data
   * @returns {JSX.Element}
   */
  const renderContactsGrid = useCallback(({data}) => {

    return (
      <RowDetails entity={data} detailColumn={props.detailColumn} detailGroups={props.detailGroups}/>
    );
  }, [])

  const exportCSV = () => {
   alert('download')
  };

  return(
    <>
      {/*엑셀다운 기능 임시 닫음*/}
      {/*<RowSpan style={{justifyContent: 'flex-end'}}>*/}
      {/*  <SaveExcelButton onClick={exportCSV}>엑셀 저장</SaveExcelButton>*/}
      {/*</RowSpan>*/}
      <RowSpan>
        <ColSpan2>
          {props.totalCount && <TotalCount><span/>총 <span>{props?.totalCount[0]}</span> 건의 {props?.totalCount[1]}</TotalCount> }
        </ColSpan2>
        <Small>* shift를 누른 상태에서 스크롤시 좌우 스크롤이 가능합니다.</Small>
      </RowSpan>
      <ReactDataGrid
        licenseKey={process.env.REACT_APP_DATA_GRID_LICENSE_KEY}
        handle={setGridRef}
        rowExpandHeight={accountExpandHeight}
        rowHeights={null}
        headerHeight={48}
        renderDetailsGrid={renderContactsGrid}
        enableColumnAutosize={true}
        showColumnMenuLockOptions={false}
        showColumnMenuGroupOptions={false}
        emptyText={emptyText}
        idProperty={props.idProperty}
        dataSource={data}
        columns={columns}
        groups={groups}
        showZebraRows={false}
        pagination={props.pagination}
        livePagination={props.livePagination}
        scrollThreshold={props.scrollThreshold}
        // enableColumnHover={true}
        limit={30}
        style={Object.assign(gridStyle,props.style)}
        i18n={i18n}
        renderRowContextMenu={renderRowContextMenu}
        {...props}
      />
    </>
  )
}

export default TableDetail
