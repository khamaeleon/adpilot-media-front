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
  GuideHeader, Off,
  On,
  PreviewSubmit,
  ScriptSubject,
  Small,
  SwitchBox,
  TotalCount
} from "./styles/common";
import {mediaSearchResult} from "../../pages/media_manage/entity/medialist";
function UseAtom (props){
  const [searchResult,setSearchResult] = useAtom(mediaSearchResult)
  useEffect(() => {
    console.log(props.objects)
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

  const handleClick = (confirm) => {

    if(confirm){
      cellProps.data.publish = !cellProps.data.publish;
      eventClick();
    }
    setSelect(cellProps.data.publish)
    setModal({isShow:false});
    return (
      <UseAtom objects={cellProps.data}/>
    )
  }
  const showModal = () => {
    setSelect(!cellProps.data.publish)
    setModal({
      isShow: true,
      width: 660,
      modalComponent: () => {
        return (
            <div>
              <ModalHeader title={'지면 게재 상태 변경'}/>
              <ModalBody>
                <ScriptSubject>
                  {!cellProps.data.publish ?
                  <div>지면을 게재하시겠습니까?<br/>
                    지면이 게재되면 광고가 노출됩니다.
                  </div>
                  :
                      <div>지면을 게재를 중지하시겠습니까?<br/>
                        게재가 중지되면 광고가 나오지 않아요.
                      </div>
                  }
                   </ScriptSubject>
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
    console.log(text)
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 복사되었습니다.');
    } catch (error) {
      alert('클립보드 복사에 실패하였습니다.');
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

function Table (props) {
  const {columns, data, settings, groups } = props
  const [gridRef, setGridRef] = useState(null);
  const gridStyle = {minHeight: 450}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columnData = () => {
    // eslint-disable-next-line array-callback-return
    columns.map(item => {
      Object.assign(item, settings.default)
    })
    // eslint-disable-next-line array-callback-return
    settings.setColumns.map(item => {
      Object.assign(columns[item.target],item.value)
      Object.assign(columns[item.target],item.function)
    })
  }

  useEffect(() => {
    if(settings !== undefined) {
      columnData()
    } else {
      // eslint-disable-next-line array-callback-return
      columns.map(item => {
        Object.assign(item, {textAlign: 'center'})
      })
    }
  }, [columnData, columns, settings]);


  const emptyText = <p style={{
    fontSize: 16,

  }}>{props.emptyText !== undefined ? props.emptyText : '데이터가 없습니다.' }</p>

  useEffect(() => {
    if(gridRef){
      gridRef.current.setColumnSizesToFit()
    }
  },[gridRef])

  const gridElement = (
    <ReactDataGrid
      licenseKey={process.env.REACT_APP_DATA_GRID_LICENSE_KEY}
      idProperty={props.idProperty}
      handle={setGridRef}
      columns={columns}
      dataSource={data}
      rowHeight={null}
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
      // enableColumnHover={true}
      style={Object.assign(gridStyle,props.style)}
      {...props}
    />
  )
  return(
    <>
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
