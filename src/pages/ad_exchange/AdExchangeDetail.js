import styled from "styled-components";
import Navigator from "../../components/common/Navigator";
import {useCallback, useEffect, useRef, useState} from "react";
import {
  Board,
  BoardContainer,
  BoardHeader,
  ColTitle,
  RowSpan,
  TitleContainer,
  ColSpan2, Input, Span4, ColSpan4, ColSpan1, CancelButton, SubmitButton, SubmitContainer, ColSpan3,
} from "../../assets/GlobalStyles";
import {ListBody} from "../../components/layout";
import {ReactSortable} from "react-sortablejs";
import Switch from "../../components/common/Switch";
import {useLocation} from "react-router-dom";
import {getAdExchangeById, getAdExchangeList, updateAdExchange} from "../../services/AdExchangeAxios";
import {useAtom} from "jotai";
import {adExchangeAtom, adExchangeSortListAtom} from "./entity";
import {toast, ToastContainer, useToast} from "react-toastify";

/* 키 입력 컴포넌트 (그리드가 상태변경시 내부에서 리렌더링을 일으키지 않아서 상태변경시키기 위해 컴포넌트로 밖으로 빼서 사용) */
function InputKey (props) {
  const [key, setKey] = useState(props.value)
  const handleChange = (e) => {
    setKey(e.target.value)
    props.onChange(e)
  }
  return (
    <Input style={props.publish ? {backgroundColor:'#efefef'}: null} type={'text'} value={key} onChange={handleChange}/>
  )
}

/* 값 입력 컴포넌트 */
function InputValue (props) {
  const [key, setKey] = useState(props.value)
  const handleChange = (e) => {
    setKey(e.target.value)
    props.onChange(e)
  }
  return (
    <Input style={props.publish ? {backgroundColor:'#efefef'}: null} type={'text'} value={key} onChange={handleChange}/>
  )
}

/* 드래그 정렬 컴포넌트 */
function SortBodyComponent(props){
  const {item, handleChangeParameterKey, handleChangeParameterValue, handleAddParameter} = props
  const [list, setList] = useState(item)
  const [isShow, setIsShow] = useState()

  useEffect(() => {
    setIsShow(item.publish)
  }, [item.publish]);

  const addParam = () => {
    console.log(list)
    const newParam = {
      "key":"",
      "value":""
    }
    const addParams = list.params
    addParams.push(newParam)
    setList({
      ...list,
      params: addParams
    })
    handleAddParameter(list)
  }
  return(
    <SortBody style={isShow ? {height: (55 * list.params.length) + 30} : {height: 0}}>
      <div>
      {list.params.map((datum,key) => {
        return (
          <RowSpan key={key}>
            <ColSpan1>
              <ColTitle>
                KEY
              </ColTitle>
              <InputKey publish={list.publish} value={datum.key} onChange={(e) => handleChangeParameterKey(item.id,key,e)}/>
            </ColSpan1>
            <ColSpan3>
              <ColTitle>
                VALUE
              </ColTitle>
              <InputValue  publish={list.publish} value={datum.value} onChange={(e) => handleChangeParameterValue(item.id, key, e)}/>

            </ColSpan3>
          </RowSpan>
        )
      })}
      </div>
      <AddButton onClick={addParam}>
        추가
      </AddButton>
    </SortBody>
  )
}

function AdExchangeDetail(){
  const [sortList, setSortList] = useAtom(adExchangeSortListAtom);
  const [adExchangeData, setAdExchangeData] = useAtom(adExchangeAtom)
  const location = useLocation();

  /**
   * 초기값 데이터 페칭
   */
  useEffect(() => {
    async function fetchAndGetData() {
      const data = await getAdExchangeById(location.state.id);
      console.log(data)
      setAdExchangeData(data)
    }
    fetchAndGetData()
  },[])

  /**
   *  정렬 리스트 did update
   */
  useEffect(() => {
    setSortList(adExchangeData?.inventoryExchanges)
  },[adExchangeData])

  /**
   * 드래그 정렬 did update
   */
  useEffect(() => {
    setSortList(sortList)
  }, [sortList]);

  /**
   * 스위치 버튼 클릭
   * @param seq
   * @param value
   */
  const handleChangeSwitch = (seq,value) => {
    const item = sortList.filter(item => item.id === seq)
    item[0].publish = !value
    console.log(sortList)
    setSortList([...sortList])
  }

  /**
   * 키값 수정 상태관리
   * @param seq
   * @param key
   * @param value
   */
  const handleChangeParameterKey = (seq, key, value) => {
    const item = sortList.filter(item => item.id === seq)
    item[0].params[key].key = value.target.value
  }

  /**
   * 값 수정 상태관리
   * @param seq
   * @param key
   * @param value
   */
  const handleChangeParameterValue = (seq,key,value) => {
    const item = sortList.filter(item => item.id === seq)
    item[0].params[key].value  = value.target.value
  }

  /**
   * create 키
   * @param addParams
   */
  const handleAddParameter = (addParams) => {
    const item = sortList.filter(item => item.id === addParams.id)
    item[0].params = addParams.params
  }

  /**
   *
   * @param e
   * 소팅 인덱스 (기존순서번 =>, 변경된 순서번호)
   */
  const handleChangeSortingEnd = (e) => {
    sortList.map((data,key) => {
      data.sortNumber = key
    })
    console.log(sortList)
  }

  /**
   * 저장 put
   * @returns {Promise<void>}
   */
  const handleChangeSave = async () => {
    setAdExchangeData({
      ...adExchangeData,
      inventoryExchanges: sortList
    })
    await updateAdExchange(adExchangeData).then((response) => {
      if(response.responseCode.statusCode === 200) {
        toast.success('정보 수정이 성공하였습니다.')
      }else{
        toast.info('정보 수정에 실패하였습니다.')
      }
    })
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
                <div style={{width: 100}}><Square/>게재 상태</div>
                <div>{adExchangeData?.publish ? "게재 중" : "게재 중지"}</div>
              </ListBody>
            </BoardInfoItem>
            <BoardInfoItem style={{borderRight:'1px solid #ddd'}}>
              <ListBody>
                <div style={{width: 100}}><Square/>지면 번호</div>
                <div>{adExchangeData?.inventoryId}</div>
              </ListBody>
              <ListBody>
                <div style={{width: 100}}><Square/>상품</div>
                <div>{adExchangeData?.productType}</div>
              </ListBody>
            </BoardInfoItem>
            <BoardInfoItem>
              <ListBody>
                <div style={{width: 100}}><Square/>디바이스</div>
                <div>{adExchangeData?.deviceType}</div>
              </ListBody>
              <ListBody>
                <div style={{width: 100}}><Square/>에이전트</div>
                <div>{adExchangeData?.agentTypes?.join(' ,')}</div>
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
            <ReactSortable list={sortList}
                           setList={setSortList}
                           onEnd={handleChangeSortingEnd}
                           handle={'.handled'}>
              {sortList?.map((item, key) => {
                return(
                  <SortListContainer key={item.sortNumber}>
                    <Handled className={'handled'}></Handled>
                    <div>
                      <SortHeader>
                        <ColSpan>
                          <Span4 style={{fontWeight: "bold"}}>
                            {item.exchangePlatformType}
                          </Span4>
                          <Switch
                            seq={item.id}
                            completed={true}
                            disClose={item.publish}
                            onClick={() => handleChangeSwitch(item.id,item.publish)}
                          />
                        </ColSpan>
                      </SortHeader>
                      <SortBodyComponent item={item} handleChangeParameterKey={handleChangeParameterKey} handleChangeParameterValue={handleChangeParameterValue} handleAddParameter={handleAddParameter}/>
                    </div>
                  </SortListContainer>
                )
              })}
            </ReactSortable>
          </SortableContainer>
        </Board>
        <SubmitContainer>
          <CancelButton>취소</CancelButton>
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

const BoardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fafafa;
`

const BoardInfoItem = styled.div`
  padding: 15px 0 15px 70px;
  width: 100%;
  & > div {
    padding: 8px 0;
  }
`

const Square = styled.div`
  display: inline-block;
  margin-right: 10px;
  width: 8px;
  height: 8px;
  background-color: #ccc;
`

const SortableContainer = styled.div`
  padding: 30px 0;
`

const SortListContainer = styled.div`
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  height: 100%;
  & > div:last-child {
    width: 100%;
  }
`

const SortHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background-color: #fff;
  padding: 17px 30px;
  border-bottom: 1px solid #ddd;
`

const SortBody = styled.div`
  display: flex;
  padding: 0 30px;
  width: 100%;
  background-color: #fafafa;
  overflow: hidden;
  transition-duration: 0.5s;
  & > div:first-child {
    width: 90%;
  }
  & > button {
    width: 10%;
    margin-top: 20px;
    margin-left:15px ;
  }
  & > div > div {
    margin-top: 0;
    width: 100%;
    height: 55px;
    display: flex;
    align-items: center;
  }
  & > div > div:first-child {
    margin-top: 15px;
  }
  & > div > div:last-child {
    margin-bottom: 15px;
  }
`
const ColSpan = styled.div`
  display: flex;
  align-items: center;
`

const AddButton = styled.button`
  width: 120px;
  height: 45px;
  border: 1px solid #e5e5e5;
  background-color: #fff;
  &:hover {
    color: #f5811f;
  }
`

const Handled = styled.div`
  width: 50px;
  border-right: 1px solid #ddd;
  background-image: url("/assets/images/common/btn_tausch_off.png");
  background-image: -webkit-image-set(url("/assets/images/common/btn_tausch_off.png") 1x, url("/assets/images/common/btn_tausch_off@2x.png") 2x, url("/assets/images/common/btn_tausch_off@3x.png") 3x);
  background-repeat: no-repeat;
  background-position: center;
  &:hover {
    background-image: url("/assets/images/common/btn_tausch_on.png");
    background-image: -webkit-image-set(url("/assets/images/common/btn_tausch_on.png") 1x, url("/assets/images/common/btn_tausch_on@2x.png") 2x, url("/assets/images/common/btn_tausch_on@3x.png") 3x);
  }
`