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
import {
  GuideBody,
  GuideContainer,
  GuideHeader,
  Off,
  On,
  PreviewSubmit,
  ScriptSubject,
  Small,
  SwitchBox,
  TotalCount
} from "./styles/common";
import {mediaSearchResult} from "../../pages/media_manage/entity/medialist";
import {useLocation} from "react-router-dom";

function UseAtom (props){
  const [searchResult,setSearchResult] = useAtom(mediaSearchResult)
  useEffect(() => {
    setSearchResult([...searchResult,props.objects])
  }, [props.objects]);

  return null
}

export function SwitchComponent(props){
  const {value, cellProps, eventClick} = props
  const [select, setSelect] = useState(value)
  const [, setModal] = useAtom(modalController)
  const background = !select ? {background: '#ddd'} : {background: '#f5811f'};
  const position = select ? {left: ' calc(100% - 4px)', transform: 'translateX(-100%)'} : null

  useEffect(() => {
    setSelect((cellProps.data.publishYn === 'Y'))
  }, [value]);

  const handleClick = (confirm) => {

    if(confirm){
      cellProps.data.publishYn = (cellProps.data.publishYn === 'Y') ? 'N' : 'Y';
      eventClick();
    }
    setSelect((cellProps.data.publishYn === 'Y'))
    setModal({isShow:false});
    return (
      <UseAtom objects={cellProps.data}/>
    )
  }
  const showModal = () => {
    setModal({
      isShow: true,
      width: 470,
      modalComponent: () => {
        return (
            <div>
              <ModalHeader title={'지면 게재 상태 변경'} closeBtn={false}/>
              <ModalBody>
                <div>게재 상태를 변경하시겠습니까?</div>
              </ModalBody>
              <ModalFooter>
                <CancelButton onClick={()=>handleClick(false)}>취소</CancelButton>
                <PreviewSubmit onClick={()=>handleClick(true)}>확인</PreviewSubmit>
              </ModalFooter>
            </div>
        )
      }
    })
  }

  return(
    <SwitchBox
      style={background}
      onClick={() => showModal()}
    >
      <label style={position}/>
      {select ? <On>ON</On>:  <Off>OFF</Off>}
    </SwitchBox>
  )
}


function ScriptComponent(props){
  const {cellProps} = props
  const[modal, setModal] = useAtom(modalController)
  const handleClick = () => {
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
                <GuideHeader>스크립트 표출 <Icon icon={'copyCode'} value={cellProps.data.script}/></GuideHeader>
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

function MemoComponent(props){
  const {cellProps} = props
  const setModal = useSetAtom(modalController)
  function handleMemoClick(){
    setModal({
      isShow: true,
      width: 500,
      modalComponent:() => {
        return <ConvertedMediaComponent data={cellProps} setModal={setModal}/>
      }
    })
  }
  return(
    <Memo onClick={e => {
      e.stopPropagation()
      handleMemoClick()
    }}/>
  )
}

export function Icon(props) {
  const handleCopyClipBoard = async (text) => {
    if(navigator.clipboard){
      navigator.clipboard
        .writeText(text)
        .then(()=>{alert('클립보드에 복사되었습니다.')})
        .catch(()=>{alert('복사를 다시 시도해 주세요.')});
    } else {
      if (!document.queryCommandSupported("copy")) {
        return alert("복사하기가 지원되지 않는 브라우저입니다.");
      }

      // 흐름 3.
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.top = 0;
      textarea.style.left = 0;
      textarea.style.position = "fixed";

      // 흐름 4.
      document.body.appendChild(textarea);
      // focus() -> 사파리 브라우저 서포팅
      textarea.focus();
      // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
      textarea.select();
      // 흐름 5.
      document.execCommand("copy");
      // 흐름 6.
      document.body.removeChild(textarea);
      alert("클립보드에 복사되었습니다.");
    }
  };
  return(
    <>
      {props.icon === 'script' &&
        <ScriptComponent cellProps={props.cellProps} />
      }
      {props.icon === 'memo' &&
        <MemoComponent cellProps={props.cellProps.data} />
      }
      {props.icon === 'url' &&
        <a href={props.value} target={'_blank'}>
          <Site/>
        </a>
      }
      {props.icon === 'copyCode' &&
        <CopyCode onClick={() => handleCopyClipBoard(props.value)}/>
      }
    </>
  )
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

function Table (props) {
  const {columns, data, groups } = props
  const [gridRef, setGridRef] = useState(null);
  const gridStyle = {minHeight: 450}
  const location = useLocation()

  useEffect(() => {
    if(gridRef){
      gridRef.current.setColumnSizesToFit()
    }
  },[gridRef])

  const emptyText = <p style={{
    fontSize: 16,
  }}>{props.emptyText !== undefined ? props.emptyText : '데이터가 없습니다.' }</p>

  const exportCSV = () => {
   alert('download')
  };

  const gridElement = (
    <ReactDataGrid
      licenseKey={process.env.REACT_APP_DATA_GRID_LICENSE_KEY}
      idProperty={props.idProperty}
      handle={setGridRef}
      columns={columns}
      dataSource={data}
      headerHeight={48}
      showZebraRows={false}
      showCellBorders={'horizontal'}
      groups={groups !== null ? groups : false}
      enableColumnAutosize={true}
      showColumnMenuLockOptions={false}
      showColumnMenuGroupOptions={false}
      emptyText={emptyText}
      limit={30}
      pagination={props.pagination}
      livePagination={props.livePagination}
      scrollThreshold={props.scrollThreshold}
      style={Object.assign(gridStyle,props.style)}
      showHoverRows={false}
      activeCell={null}
      i18n={i18n}
      {...props}
    />
  )
  return(
    <>
      {/*엑셀다운 기능 임시 닫음*/}
      {/*<RowSpan style={{justifyContent: 'flex-end'}}>*/}
      {/*  <SaveExcelButton onClick={exportCSV}>엑셀 저장</SaveExcelButton>*/}
      {/*</RowSpan>*/}
      <RowSpan>
        <ColSpan2>
          {props.totalCount && <TotalCount><span/>총 <span>{props?.totalCount[0]}</span> 건의 {props?.totalCount[1]}</TotalCount>}
        </ColSpan2>
        <Small>* shift를 누른 상태에서 스크롤시 좌우 스크롤이 가능합니다.</Small>
      </RowSpan>
      {gridElement}
    </>
  )
}

export default Table
