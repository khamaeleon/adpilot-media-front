import React, {useCallback, useEffect, useRef, useState} from "react";
import {BoardSearchResultTitle, ColSpan1, ColSpan3, SaveExcelButton, TableButton} from "../../assets/GlobalStyles";
import {exportToXlsx} from "../../exportUtils";
import {Off, On, SwitchBox} from "../../pages/media_manage/List";
import {Link} from "react-router-dom";
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-enterprise/index.css';
export const renderSwitch = {
  render: ({value, cellProps}) => {
    const background = !value ? {background: '#ddd'} : {background: '#f5811f'};
    const position = value ? {left: ' calc(100% - 4px)', transform: 'translateX(-100%)'} : null
    const handleClick = () => {
      console.log(cellProps.data.id)
    }
    return (
      <>
        <SwitchBox
          style={background}
          onClick={handleClick}
        >
          <label style={position}/>
          {value ? <On>ON</On>:  <Off>OFF</Off>}
        </SwitchBox>
      </>
    );
  }
}

export const RenderButton = (label) =>{
  const renderer = {
    render: ({value, cellProps}) => {
      const handleClick = () => {
        console.log(cellProps.data.id)
      }
      return(
        <TableButton onClick={handleClick}>{label}</TableButton>
      )
    }
  }
  return renderer
}

export const ButtonRef = (label) => {
  const renderer = {
    render: ({value}) => {
      return(
        <a href={value} target={'_blank'}>
          <TableButton>{label}</TableButton>
        </a>
      )
    }
  }
  return renderer
}
export const HyperRef = (link) => {
  const renderer = {
    render: ({value}) => {
      return(
        <a href={link} target={'_blank'}>{value}</a>
      )
    }
  }
  return renderer
}

export const LinkRef = (link) => {
  const renderer = {
    render: ({value}) => {
      return(
        <Link to={link}>{value}</Link>
      )
    }
  }
  return renderer
}

function ExportButton({ onExport, children }) {
  const [exporting, setExporting] = useState(false);
  return (
    <SaveExcelButton disabled={exporting}
                     onClick={async () => {
                       setExporting(true);
                       await onExport();
                       setExporting(false);
                     }}>{exporting ? '저장 중' : children}
    </SaveExcelButton>
  );
}

function Table (props) {
  const {columns, data, settings, groups} = props
  const [gridRef, setGridRef] = useState(null);

  const gridStyle = { minHeight: 550 }
  const columnData = () => {
    columns.map(item => {
      Object.assign(item, settings.default)
    })
    settings.setColumns.map(item => {
      Object.assign(columns[item.target],item.value)
      Object.assign(columns[item.target],item.function)
    })
  }

  useEffect(() => {
    columnData()

  }, [settings]);


  const gridElement = (
    <ReactDataGrid idProperty={'id'}
                   handle={setGridRef}
                   columns={columns}
                   dataSource={data}
                   rowHeight={60}
                   headerHeight={48}
                   showZebraRows={false}
                   showCellBorders={'horizontal'}
                   groups={groups !== null ? groups : false}
                   enableColumnAutosize={true}
                   style={gridStyle}/>
  )

  return(
    <>
      <BoardSearchResultTitle>
        <ColSpan3>
          총 <span>120</span>건의 매체
        </ColSpan3>
        <ColSpan1 style={{justifyContent: "flex-end"}}>
          <ExportButton onExport={() => exportToXlsx(gridElement, 'CommonFeatures.xlsx')}>
            XSLX 저장
          </ExportButton>
        </ColSpan1>
      </BoardSearchResultTitle>
      {gridElement}
    </>
  )
}

export default Table