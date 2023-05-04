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
  const gridStyle = { minHeight: 450, ...props.style}
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
    const uFEFF = "\uFEFF"

    // Office 2007 이전에는 ANSI 1252 인코딩을 기본 값, BOM을 추가하면 Office 2007 이후 버전
    // 하여 해결책으로 제시하는 바는
    // 1. csv 파일의 포맷을 컴퓨터에서 바꾼다 (매번 변경해줘야하는 번거로움이 생김)
    // 2. 거의 모든 엑셀은 utf든 ansi든 표시할 기능을 갖추고 있음. 엑셀 기본 인코딩 설정을 변경 (뷰어에서 설정을 바꿀수있지만 컴퓨터에 능숙하지 않은 사람에게 교육시키는 일이 어려움)
    // 3. csv를 ANSI로 작성한다 (디코딩 기본값이 utf8인 엑셀을 사용한다면 오히려 ansi로 작성한 파일을 열었을때 깨질수 있음)
    // 4. 구글시트, 폴라리스, 넘버스 등은 자동으로 파일의 인코딩을 잘 알아내는데 반하여 엑셀일부는
    // 가끔 인코딩을 식별하지 못하기 때문에 엑셀에서도 인식할 수 있도록 csv에 인코딩을 표시해준다.
    // (문서의 맨 앞에 /ufeff 문자열을 추가 하면 해당 내용이 어떤 문자열로 인코딩 되었는지 표현하는 식별자.
    // 이것을 맨 앞에 적어 놓으면 엑셀 프로그램은 파일의 인코딩을 이해하고 그에 맞게 출력한다.)

    const contents = [header].concat(rows).join('\n');
    const blob = new Blob([uFEFF+contents], { encoding: 'UTF-8', type: 'text/csv;charset=utf-8;' });

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
        {...props}
      />
    </>
  )
}

export default TableDetail
