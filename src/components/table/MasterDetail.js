import React, {useCallback, useEffect, useRef, useState} from "react";
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import '@inovua/reactdatagrid-enterprise/base.css';
import '../../assets/default-light.scss'
import styled from "styled-components";
import {reportsStaticsInventoryByMedia, reportsStaticsInventoryByMediaColumn} from "../../pages/reports/entity";
import CheckBox from '@inovua/reactdatagrid-community/packages/CheckBox';

const defaultGroupBy = []

const accountRowHeight = 80
const detailRowHeight = accountRowHeight
const accountExpandHeight = 500


function MasterTable (props) {
  const {columns, data, settings, groups } = props
  const [activeCell, setActiveCell] = useState([0]);
  const [gridRef, setGridRef] = useState(null);
  const [enableColumnAutosize, setEnableColumnAutosize] = useState(true);
  const gridStyle = { minHeight: 800, border: 'none', borderTop: '1px solid #dddddd' }
  const [accountRowHeights, setAccountRowHeights] = useState({})
  const columnData = () => {
    columns.map(item => {
      Object.assign(item, {headerProps: {style: {backgroundColor: '#fafafa', color:'#b2b2b2'}}})
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

  const renderContactsGrid = ({data}) => {
    console.log(data)
    return (
      <ReactDataGrid
        handle={setGridRef}
        dataSource={props.detailData(data)}
        columns={reportsStaticsInventoryByMediaColumn}
        enableColumnAutosize={true}
      />
    );
  }

  return(
    <>
      <small>* shift를 누른 상태에서 스크롤시 좌우 스크롤이 가능합니다.</small>
      <ReactDataGrid
        handle={setGridRef}
        idProperty={'accountId'}
        dataSource={data}
        style={gridStyle}
        rowHeight={accountRowHeight}
        rowExpandHeight={accountExpandHeight}
        rowHeights={accountRowHeights}
        renderDetailsGrid={renderContactsGrid}
        defaultGroupBy={defaultGroupBy}
        columns={columns}
        enableColumnAutosize={true}
      />
    </>
  )
}

export default MasterTable


export const SwitchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 68px;
  height: 30px;
  background: #ddd;
  border-radius: 68px;
  position: relative;
  transition: background-color .2s;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  & > label {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 22px;
    height: 22px;
    border-radius: 22px;
    transition: 0.2s;
    background: #fff;
    box-shadow: 0 2px 3px 0 rgba(10, 10, 10, 0.4);
  }
`

export const On = styled.span`
  display: inline-block;
  width: 50%;
  margin-left: 10px;
  font-size: 12px;
  font-weight: 500;
  color: #fff
`
export const Off = styled.span`
  display: inline-block;
  width: 100%;
  text-align: right;
  margin-right: 8px;
  font-weight: 300;
  font-size: 12px;
  color: #999
`

const GuideContainer = styled.div`
  border: 1px solid #e5e5e5;
`
const GuideHeader = styled.div`
  padding: 18px 20px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #e5e5e5;
  color: #f5811f;
  font-size: 16px;
`
const GuideBody = styled.div`
  display: flex;
  padding: 20px;
`

const PreviewSubmit = styled.button`
  padding: 18px 20px;
  width: 200px;
  background-color: #525252;
  color: #fff;
`

const ScriptSubject = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f9f9f9;

  & div:last-child {
    margin-top: 10px;
    font-size: 14px;
    color: #777;
  }
`
