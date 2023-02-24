import React, {useCallback, useEffect, useRef, useState} from "react";
import {
  BoardSearchResultTitle,
  ColSpan1,
  ColSpan3, CopyCode,
  SaveExcelButton,
  Script, Site,
} from "../../assets/GlobalStyles";
import {exportToXlsx} from "../../exportUtils";
import {Link} from "react-router-dom";
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-enterprise/base.css';
import '../../assets/default-light.scss'
import { mediaSearchResult} from "../../pages/media_manage/entity";
import {useAtom} from "jotai";
import styled from "styled-components";
import {modalController} from "../../store";
import {ModalBody, ModalFooter, ModalHeader} from "../modal/Modal";
import {VerticalRule} from "../common/Common";


function UseAtom (props){
  const [searchResult,setSearchResult] = useAtom(mediaSearchResult)
  useEffect(() => {
    console.log(props.objects)
    setSearchResult([...searchResult,props.objects])
  }, [props.objects]);

  return null
}

function SwitchComponent(props){
  const {value, cellProps} = props
  const [select, setSelect] = useState(value)
  const background = !select ? {background: '#ddd'} : {background: '#f5811f'};
  const position = select ? {left: ' calc(100% - 4px)', transform: 'translateX(-100%)'} : null

  const handleClick = () => {
    cellProps.data.status = !cellProps.data.status
    setSelect(cellProps.data.status)
    return (
      <UseAtom objects={cellProps.data}/>
    )
  }

  return(
    <SwitchBox
      style={background}
      onClick={() => handleClick()}
    >
      <label style={position}/>
      {select ? <On>ON</On>:  <Off>OFF</Off>}
    </SwitchBox>
  )
}

export const renderSwitch = {
  render: ({value, cellProps}) => {
    return (
      <SwitchComponent value={value} cellProps={cellProps}/>
    );
  }
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

function ScriptComponent(props){
  const {cellProps} = props
  const[modal, setModal] = useAtom(modalController)
  const handleClick = () => {
    console.log('click')
    setModal({
      isShow: true,
      width: 1320,
      modalComponent: () => {
        return (
          <div>
            <ModalHeader title={'지면 스크립트 발급 안내'}/>
            <ModalBody>
              <ScriptSubject>
                <div>지면 등록이 완료되었습니다.<br/>
                  하단 발급된 광고 스크립트를 스크립트 삽인 가이드를 참고하여 표출할 광고 콘텐츠 HTML 영역에 삽입해주세요.
                </div>
                <div>※ 발급된 스크립트 정보는 지면 관리에서 확인 가능합니다.</div>
              </ScriptSubject>
              <GuideContainer>
                <GuideHeader>스크립트 표출</GuideHeader>
                <GuideBody>
                  <pre>{cellProps.data.script}</pre>
                </GuideBody>
              </GuideContainer>
              <VerticalRule style={{margin: "20px 0"}}/>
            </ModalBody>
            <ModalFooter>
              <PreviewSubmit onClick={() => setModal({isShow: false})}>확인</PreviewSubmit>
            </ModalFooter>
          </div>
        )
      }
    })
  }
  return(
    <Script onClick={e => {
      e.stopPropagation()
      handleClick()
    }}/>
  )
}

export const Icon = (icon) => {
  const handleCopyClipBoard = (text) => {
    try {
      navigator.clipboard.writeText(text);
      alert('클립보드에 복사되었습니다.');
    } catch (error) {
      alert('클립보드 복사에 실패하였습니다.');
    }
  };

  const renderer = {
    render: ({value,cellProps}) => {
      return(
        <>
          {icon === 'script' &&
            <ScriptComponent cellProps={cellProps} />
          }
          {icon === 'url' &&
            <a href={value} target={'_blank'}>
              <Site/>
            </a>
          }
          {icon === 'copyCode' &&
            <CopyCode onClick={() => handleCopyClipBoard(value)}/>
          }
        </>
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
  const {columns, data, settings, groups, titleTotal} = props
  const [activeCell, setActiveCell] = useState([0]);
  const [gridRef, setGridRef] = useState(null);
  const gridStyle = { minHeight: 350, border: 'none', borderTop: '1px solid #dddddd' }
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
  columnData()
  useEffect(() => {

    setActiveCell([data.length])
  }, []);

  const renderRowContextMenu = (menuProps, { rowProps, cellProps }) => {
    menuProps.autoDismiss = true
    menuProps.items = [
      {
        label: '원하는 메뉴'
      }
    ]
  }

  const gridElement = (
    <ReactDataGrid idProperty={'status'}
                   handle={setGridRef}
                   columns={columns}
                   dataSource={data}
                   rowHeight={60}
                   headerHeight={48}
                   showZebraRows={true}
                   showCellBorders={'horizontal'}
                   groups={groups !== null ? groups : false}
                   enableColumnAutosize={true}
                   renderRowContextMenu={renderRowContextMenu}
                   style={gridStyle}/>
  )

  return(
    <>
      <BoardSearchResultTitle>
        <ColSpan3>
          {props.titleTotal !== false && <>총 <span>{JSON.stringify(activeCell)}</span>건의 매체</>}
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

const GuideButton = styled.button`
  margin-left: auto;
  padding: 15px 27px;
  border: 1px solid #ddd;
  background-color: #fff;
  transition-duration: 0.5s;

  &:hover {
    color: #f5811f
  }
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
const GuideSubject = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e5e5e5;
  font-size: 14px;
`
const GuideBody = styled.div`
  display: flex;
  padding: 20px;
`

const PreviewTab = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #e5e5e5;

  & div {
    padding: 14px 29px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
      border: 1px solid #f5811f;
      color: #f5811f
    }
  }
`

const PreviewBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
  padding: 20px;
  min-height: 160px;
  max-height: 360px;
  background-color: #eeeeee;
  border: 1px solid #e5e5e5;
  overflow: auto;

  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    border: 1px dashed #f5811f;

    &:before {
      content: "실제 배너 표출 사이즈"
    }
  }
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

const Input = styled.input`
  padding: 0 20px;
  width: 100%;
  border: 1px solid #e5e5e5;
  height: 45px;
  border-radius: 5px;
  &:read-only {
    background-color: #f9fafb;
  }
`