import React, {useEffect, useState} from "react";
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import '@inovua/reactdatagrid-enterprise/base.css';
import '../../assets/default-light.scss'
import {ColSpan2, RowSpan, SearchButton} from "../../assets/GlobalStyles";
import {Small, TotalCount} from "./styles/common";
import {useLocation} from "react-router-dom";
import moment from "moment/moment";
import {navigationName} from "../common/entity";

const accountExpandHeight = 300

function TableDetail (props) {
  const {columns, data, groups } = props
  const [gridRef, setGridRef] = useState(null);
  const gridStyle = { minHeight: 350, ...props.style}
  const location = useLocation()

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
    console.log(location)
  }, [gridRef])

  /**
   * ...펼쳐보기
   * @param data
   * @returns {JSX.Element}
   */
  const renderContactsGrid = ({data}) => {
    return (
      <ReactDataGrid
        handle={setGridRef}
        dataSource={props.detailData(data)}
        columns={props.detailColumn}
        enableColumnAutosize={true}
        groups={props.detailGroups}
        showZebraRows={false}
        pagination
        emptyText={emptyText}
      />
    );
  }

  const downloadBlob = (blob, fileName = `${navigationName[location.pathname].split('/')[2]}-${moment().format('DDmmss')}.csv`) => {
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.position = 'absolute';
    link.style.visibility = 'hidden';

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };
  const exportCSV = () => {
    const columns = gridRef.current.visibleColumns;

    const header = columns.map((c) => c.header).join(',');
    const rows = gridRef.current.data.map((data) => columns.map((c) => data[c.id]).join(','));

    const contents = [header].concat(rows).join('\n');
    const blob = new Blob([contents], { type: 'text/csv;charset=utf-8;' });

    downloadBlob(blob);
  };

  return(
    <>
      <RowSpan>
        <SearchButton style={{ marginTop: 20 }} onClick={exportCSV}>CSV 다운로드</SearchButton>
      </RowSpan>
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
      />
    </>
  )
}

export default TableDetail
