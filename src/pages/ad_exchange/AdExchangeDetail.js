import styled from "styled-components";
import Navigator from "../../components/common/Navigator";
import { useEffect, useState} from "react";
import {
  Board,
  BoardContainer,
  BoardHeader,
  ColTitle,
  RowSpan,
  TitleContainer,
  ColSpan2,
  Input,
  Span4,
  ColSpan1,
  CancelButton,
  SubmitButton,
  SubmitContainer,
  ColSpan3, HandleButton,
} from "../../assets/GlobalStyles";
import {ListBody} from "../../components/layout";
import {ReactSortable} from "react-sortablejs";
import Switch from "../../components/common/Switch";
import {useLocation, useNavigate} from "react-router-dom";
import {
  exchangePlatformTypeList,
  getAdExchangeById, updateAdExchange,
} from "../../services/adexchange/AdExchangeAxios";
import { useAtom} from "jotai";
import {adExchangeAtom} from "./entity";
import {toast, ToastContainer} from "react-toastify";
import {
  BoardInfo,
  BoardInfoItem, ColSpan,
  Handled,
  SortableContainer,
  SortBody,
  SortHeader,
  SortListContainer,
  Square
} from "./styles";

/* 키 입력 컴포넌트 (그리드가 상태변경시 내부에서 리렌더링을 일으키지 않아서 상태변경시키기 위해 컴포넌트로 밖으로 빼서 사용) */
function InputKey (props) {
  return (
    <Input disabled={props.disabled} placeholder={'key'} type={'text'} value={props.value} onChange={props.onChange}/>
  )
}

/* 값 입력 컴포넌트 */
function InputValue (props) {
  return (
    <Input disabled={props.disabled} placeholder={'value'} type={'text'} value={props.value} onChange={props.onChange}/>
  )
}
/* 드래그 정렬 컴포넌트 */
function SortBodyComponent(props){
  const { data, handleChangeParameter } = props
  const [paramKey, setParamKey] = useState('');
  const [paramValue, setParamValue] = useState('');

  const minusParam = (item, index) => {
    handleChangeParameter(item, index)

  }
  const addParam = () => {
    if(paramKey !== '' && paramValue !== ''){

      data.params.push({key:paramKey, value:paramValue})

      setParamKey('');
      setParamValue('');
      // handleAddParameter(list)
    }
  }

  return(
    <SortBody>
      <div>
        <RowSpan>
          <ColSpan1>
            <ColTitle>
              KEY
            </ColTitle>
            <InputKey value={paramKey} onChange={(e) => setParamKey(e.target.value)}/>
          </ColSpan1>
          <ColSpan3>
            <ColTitle>
              VALUE
            </ColTitle>
            <InputValue value={paramValue} onChange={(e) => setParamValue(e.target.value)}/>
          </ColSpan3>
        </RowSpan>
        <HandleButton onClick={addParam}>+</HandleButton>
      </div>
        {data.params !== undefined && data.params?.map((datum,key) => {
          return (
          <div key={key}>
            <RowSpan>
              <ColSpan1>
                <ColTitle>
                  KEY
                </ColTitle>
                <InputKey disabled value={datum.key} />
              </ColSpan1>
              <ColSpan3>
                <ColTitle>
                  VALUE
                </ColTitle>
                <InputValue disabled value={datum.value} />
              </ColSpan3>
            </RowSpan>
            <HandleButton onClick={()=>minusParam(data, key)}>-</HandleButton>
          </div>
          )
        })}
    </SortBody>
  )
}

function AdExchangeDetail(){
  const [exchangePlatforms, setExchangePlatforms] = useState([]);
  const [adExchangeData, setAdExchangeData] = useAtom(adExchangeAtom)
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * 초기값 데이터 페칭
   */
  useEffect(() => {
    async function fetchAndGetData() {
      const data = await getAdExchangeById(location.state.id);
      setAdExchangeData(data)
    }
    fetchAndGetData()

    exchangePlatformTypeList().then(response => {
      setExchangePlatforms(response.map((data, index)=> {
        return {
            exchangePlatformId: '',
            exchangePlatformType: data,
            exchangeServiceType: "IN_COMING",
            params: [],
            publish: false,
            sortNumber: index
        }}))
    })
  },[location])

  /**
   *  정렬 리스트 did update
   */
  useEffect(() => {

    setExchangePlatforms(sortPublishAndNumber(exchangePlatforms?.map(data => adExchangeData.inventoryExchanges.find(value => value.exchangePlatformType.value === data.exchangePlatformType.value)
    ? adExchangeData.inventoryExchanges.find(value => value.exchangePlatformType.value === data.exchangePlatformType.value): data
    )))
  },[adExchangeData])


  /**
   * 스위치 버튼 클릭
   * @param seq
   * @param value
   */
  const handleChangeSwitch = (item, publish) => {
    setExchangePlatforms(exchangePlatforms?.map(data => (data.exchangePlatformType.value === item.exchangePlatformType.value) ? {...data, publish: publish} : data))
  }

  const handleChangeExchangePlatformId = (item, e) => {
    setExchangePlatforms(exchangePlatforms?.map(data => (data.exchangePlatformType.value === item.exchangePlatformType.value) ? {...data, exchangePlatformId: e.target.value}: data));
  }

  const handleChangeParameter = (item, index) => {
    setExchangePlatforms(exchangePlatforms?.map(data => (data.exchangePlatformType.value === item.exchangePlatformType.value) ? {...data, params: data.params.filter((e,i)=> i !== index)}: data))
  }

  const sortPublishAndNumber = (dataArr) => {
    return dataArr.sort((a,b) => {
      if(a.sortNumber < b.sortNumber){
        return -1;
      }else if(a.sortNumber > b.sortNumber) {
        return 1;
      }else{
        return 0;
      }
    }).sort((a,b) => {
      if(a.publish > b.publish){
        return -1;
      }else if(a.publish < b.publish) {
        return 1;
      }else{
        return 0;
      }
    })
  }


  /**
   * 저장 put
   * @returns {Promise<void>}
   */
  const handleChangeSave = async () => {
    if(exchangePlatforms.filter(data => data.publish === true).find(value => value.exchangePlatformId === '' || value.exchangePlatformId === null) !== undefined){
      toast.error('연동사 ID는 필수값입니다.')
    }else{
      await updateAdExchange(adExchangeData.inventoryId, exchangePlatforms.map((data, key) => { return {...data, sortNumber: key}})).then((response) => {
        if(response.statusCode === 200) {
          toast.success('정보 수정이 성공하였습니다.')
          navigate("/board/adExchange")
        }else{
          toast.info('정보 수정에 실패하였습니다.')
        }
      })
    }
  }

  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>애드 익스체인지 관리</h1>
          <Navigator/>
        </TitleContainer>
        <Board>
          <BoardHeader>지면 정보</BoardHeader>
          <BoardInfo>
            <BoardInfoItem style={{borderRight:'1px solid #ddd'}}>
              <ListBody>
                <div style={{width: 100}}><Square/>지면명</div>
                <div>{adExchangeData?.inventoryName}</div>
              </ListBody>
              <ListBody>
                <div style={{width: 100}}><Square/>광고 상품</div>
                <div>{adExchangeData?.productType.label}</div>
              </ListBody>
            </BoardInfoItem>
            <BoardInfoItem style={{borderRight:'1px solid #ddd'}}>
              <ListBody>
                <div style={{width: 100}}><Square/>게재 상태</div>
                <div>{adExchangeData?.publish ? "게재 중" : "게재 중지"}</div>
              </ListBody>
              <ListBody>
                <div style={{width: 100}}><Square/>디바이스</div>
                <div>{adExchangeData?.deviceType}</div>
              </ListBody>
            </BoardInfoItem>
            <BoardInfoItem>
              <ListBody>
                <div style={{width: 100}}><Square/>지면 번호</div>
                <div>{adExchangeData?.inventoryId}</div>
              </ListBody>
              <ListBody>
                <div style={{width: 100}}><Square/>에이전트</div>
                <div>{adExchangeData?.agentTypes?.map(data => data.label).join(', ')}</div>
              </ListBody>
            </BoardInfoItem>
          </BoardInfo>
        </Board>
        <Board>
          <BoardHeader>
            <div>
              플랫폼 연동 관리 <small>(연동 순서 관리)</small>
            </div>
          </BoardHeader>
          <SortableContainer>

            <ReactSortable list={exchangePlatforms}
                           setList={setExchangePlatforms}
                           handle={'.handled'}>
              {exchangePlatforms?.map((item, key) => {
                return(
                  <SortListContainer key={item.sortNumber} style={item.publish === true ? {borderColor:'#f5811f'} : null}>
                    <Handled className={'handled'}></Handled>
                    <div>
                      <SortHeader>
                        <ColSpan>
                          <Span4 style={{fontWeight: "bold"}}>
                            {item.exchangePlatformType.label}
                          </Span4>
                          <Switch
                            item={item}
                            completed={true}
                            disClose={item.publish}
                            onClick={handleChangeSwitch}
                          />
                        </ColSpan>
                        <ColSpan2>
                          <Span4 style={{fontWeight: "bold"}}>
                            연동사 ID
                          </Span4>
                          <Input placeholder={'연동사 ID를 입력해주세요.'} type={'text'} value={item.exchangePlatformId != null ? item.exchangePlatformId : ''} onChange={(e) => handleChangeExchangePlatformId(item, e)}/>
                        </ColSpan2>
                      </SortHeader>
                      <SortBodyComponent
                          data={item}
                          handleChangeParameter={handleChangeParameter}/>
                    </div>
                  </SortListContainer>
                )
              })}
            </ReactSortable>
          </SortableContainer>
        </Board>
        <SubmitContainer>
          <CancelButton onClick={()=> navigate('/board/adExchange')}>취소</CancelButton>
          <SubmitButton onClick={handleChangeSave}>정보 수정</SubmitButton>
        </SubmitContainer>
      </BoardContainer>
      <ToastContainer position="top-center"
                      autoClose={1500}
                      hideProgressBar
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      style={{zIndex: 9999999}}/>
    </main>
  )
}

export default AdExchangeDetail

