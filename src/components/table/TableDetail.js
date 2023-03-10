import React, {useCallback, useEffect, useRef, useState} from "react";
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import '@inovua/reactdatagrid-enterprise/base.css';
import '../../assets/default-light.scss'
import styled from "styled-components";
import {reportsStaticsInventoryByMedia, reportsStaticsInventoryByMediaColumn} from "../../pages/reports/entity";
import CheckBox from '@inovua/reactdatagrid-community/packages/CheckBox';

const defaultGroupBy = []

const rowHeight = 60
const detailRowHeight = rowHeight
const accountExpandHeight = 300


function TableDetail (props) {
  const {columns, data, settings, groups } = props
  const [activeCell, setActiveCell] = useState([0]);
  const [gridRef, setGridRef] = useState(null);
  const gridStyle = { minHeight: 800 }
  const [accountRowHeights, setAccountRowHeights] = useState({})
  const columnData = () => {
    columns.map(item => {
      Object.assign(item, {headerProps: {style: {backgroundColor: '#fafafa', color:'#b2b2b2', textAlign: 'center'}}})
      Object.assign(item, settings.default)
    })
    settings.setColumns.map(item => {
      Object.assign(columns[item.target],item.value)
      Object.assign(columns[item.target],item.function)
    })
  }

  useEffect(() => {
    if(settings !== undefined) {
      columnData()
    } else {
      columns.map(item => {
        Object.assign(item, {headerProps: {style: {backgroundColor: '#fafafa', color:'#b2b2b2'}}})
        Object.assign(item, {textAlign: 'center'})
      })
    }
    setActiveCell([data.length])
  }, []);

  useEffect(() => {
    if(gridRef){
      gridRef.current.setColumnSizesToFit()
    }
  },[gridRef])

  const footerRows = [
    {
      render: {
        accountId: <strong>Total</strong>,
        costAmount: <strong>{props.footer.totalCount}</strong>
      },
    }
  ]

  const renderContactsGrid = ({data}) => {
    console.log(data)
    return (
      <ReactDataGrid
        handle={setGridRef}
        dataSource={props.detailData(data)}
        columns={props.detailColumn}
        rowHeight={detailRowHeight}
        enableColumnAutosize={true}
        groups={props.detailGroups}
      />
    );
  }

  return(
    <>
      <Small>* shift를 누른 상태에서 스크롤시 좌우 스크롤이 가능합니다.</Small>
      <ReactDataGrid
        handle={setGridRef}
        idProperty={props.idProperty}
        dataSource={data}
        style={gridStyle}
        rowHeight={rowHeight}
        rowExpandHeight={accountExpandHeight}
        rowHeights={accountRowHeights}
        renderDetailsGrid={renderContactsGrid}
        columns={columns}
        enableColumnAutosize={true}
        groups={groups}
        footerRows={footerRows}
      />
    </>
  )
}

export default TableDetail

const Small = styled.small`
  display: inline-block;
  width: 100%;
  text-align: right;
  padding: 10px;
`