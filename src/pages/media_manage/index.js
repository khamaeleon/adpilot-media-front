import styled from "styled-components";
import Navigator from "../../components/common/Navigator";
import Checkbox from "../../components/common/Checkbox";
import {useCallback, useEffect, useState} from "react";
import ko from 'date-fns/locale/ko';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {BoardBody, ListHead, ListBody} from "../../components/layout";
import {atom, useAtom, useAtomValue, useSetAtom} from "jotai";
import {modalController} from "../../store";
import Modal, {ModalBody, ModalFooter, ModalHeader} from "../../components/modal/Modal";
import {AdSample, VerticalRule} from "../../components/common/Common";
import {mediaCategoryOneDepthInfo, mediaResistInfo, mediaSearchInfo} from "./entity";
import Select from "react-select";

const manageMedia = atom({
  id: null,
  corporationName: "",
  mediaName: ""
})

const MediaResistAtom = atom(mediaResistInfo)
const MediaSearchInfo = atom(mediaSearchInfo)

function MediaInfo() {
  const [mediaResistState, setMediaResistState] = useAtom(MediaResistAtom)
  const [mediaSearchInfo, setMediaSearchInfo] = useAtom(MediaSearchInfo)
  const [mediaCategoryOneDepthState] = useState(mediaCategoryOneDepthInfo)
  const [deviceType, setDeviceType] = useState('pc')
  const [modal, setModal] = useAtom(modalController)
  const [selectedMedia, setSelectedMedia] = useAtom(manageMedia)

  // 매체 검색결과
  const handleSearchResult = () => {
    //매체 검색 api 호출
    setMediaSearchInfo(mediaSearchInfo)
  }
  const handleModalComponent = () => {
    setModal({
      isShow: true,
      width: 600,
      modalComponent: () => componentModalSearchMedia()
    })
    setSelectedMedia({
      ...selectedMedia,
      id: null
    })
  }

  useEffect(() => {
    if(mediaResistState.siteName !== ""){
      handleModalComponent()
    }
  }, [mediaResistState]);

  const handleMediaSearchSelected = () => {
    setModal({
      isShow: false,
      modalComponent: null
    })
  }
  /**
   * 검색 결과에서 매체 선택 했을때
   * @param item
   */
  const handleChangeSelectedMedia = (item) => {
    setMediaResistState({
      ...mediaResistState,
      siteName: item.siteName
    })
    // 색깔 넣어줘~~~
  }
  // 모달 컴포넌트 children
  const componentModalSearchMedia = () =>{
    return (
      <div>
        <ModalHeader title={"매체 검색"}/>
        <ModalBody>
          <MediaSearchColumn>
            <div>매체명</div>
            <div>
              <InputGroup>
                <input type={'text'} placeholder={"매체명을 입력해주세요."}/>
                <button onClick={() => handleSearchResult()}>검색</button>
              </InputGroup>
            </div>
          </MediaSearchColumn>
          <MediaSearchResult>
            {mediaSearchInfo.length !== 0 &&
              <>
                <table>
                  <thead>
                  <tr>
                    <th>매체명</th>
                    <th>아이디</th>
                    <th>담당자명</th>
                  </tr>
                  </thead>
                  <tbody>
                  {mediaSearchInfo.map((item, key) => {
                    return(
                      <tr key={key}
                          onClick={() =>handleChangeSelectedMedia(item)}
                          style={mediaResistState.siteName === item.siteName ? {backgroundColor: "#f5811f",color:'#fff'} : null}>
                        <td>{item.siteName}</td>
                        <td>{item.memberId}</td>
                        <td>{item.managerName}</td>
                      </tr>
                    )
                  })}
                  </tbody>
                </table>
                <MediaSelectedButton onClick={handleMediaSearchSelected}>선택 완료</MediaSelectedButton>
              </>
            }
          </MediaSearchResult>
        </ModalBody>
      </div>
    )
  }

  /**
   * 지면명 입력
   * @param event
   */
  const handleInventoryName = (event) => {
    setMediaResistState({
      ...mediaResistState,
      inventoryName: event.target.value
    })
  }

  const handleMediaCategoryOneDepth = (category) => {
    setMediaResistState({
      ...mediaResistState,
      category:category
    })
  }

  return (
    <BoardBody>
      <li>
        <ListHead>매체 검색</ListHead>
        <ListBody>
          { mediaResistState.memberId !== null &&
            <input type={'text'} value={mediaResistState.siteName || ""} readOnly={true}/>
          }
          <Button onClick={handleModalComponent}>매체 검색</Button>
        </ListBody>
      </li>
      <li>
        <ListHead>지면명</ListHead>
        <ListBody>
          <InputWiden type={'text'}
                      placeholder={'지면명을 입력해주세요.'}
                      value={mediaResistState.inventoryName || ""}
                      onChange={e=>handleInventoryName(e)}
          />
        </ListBody>
      </li>
      <li>
        <ListHead>지면 카테고리</ListHead>
        <ListBody>
          <Select options={mediaCategoryOneDepthState}
                  placeholder={'선택하세요'}
                  value={(mediaResistState.category !== undefined && mediaResistState.category.value !== '') ? mediaResistState.category : '' }
                  onChange={handleMediaCategoryOneDepth}
                  styles={{
                    input: (baseStyles,state) => (
                      {
                        ...baseStyles,
                        minWidth: "300px",
                      })
                  }}/>

        </ListBody>
      </li>
      <li>
        <ListHead>디바이스 유형</ListHead>
        <ListBody>
          <CustomRadio type={'radio'} id={'pc'} name={'device-type'} onChange={()=> setDeviceType('pc')} defaultChecked={true}/>
          <label htmlFor={'pc'}>PC</label>
          <CustomRadio type={'radio'} id={'mobile'} name={'device-type'} onChange={()=> setDeviceType('mobile')}/>
          <label htmlFor={'mobile'}>MOBILE</label>
        </ListBody>
      </li>
      <li>
        <ListHead>에이전트 유형</ListHead>
        <ListBody>
          {deviceType === 'pc' &&
            <>
              <input type={'radio'} id={'web'} name={'agent-type'}/>
              <label htmlFor={'web'}>PC 웹</label>
              <input type={'radio'} id={'application'} name={'agent-type'}/>
              <label htmlFor={'application'}>PC 어플리케이션</label>
              <input type={'radio'} id={'responsive'} name={'agent-type'}/>
              <label htmlFor={'responsive'}>반응형 웹</label>
            </>
          }
          {deviceType === 'mobile' &&
            <>
              <input type={'radio'} id={'mobileWeb'} name={'agent-type'}/>
              <label htmlFor={'mobileWeb'}>MOBILE 웹</label>
              <input type={'radio'} id={'native'} name={'agent-type'}/>
              <label htmlFor={'native'}>NATIVE 앱</label>
              <input type={'radio'} id={'webapp'} name={'agent-type'}/>
              <label htmlFor={'webapp'}>웹 앱</label>
            </>
          }
        </ListBody>
      </li>
      <li>
        <ListHead>지면 url</ListHead>
        <ListBody>
          <InputWiden type={'text'} placeholder={'https://'}/>
        </ListBody>
      </li>
    </BoardBody>
  )
}
const bannerSize = atom([])
function PreviewBanner(){
  const [size] = useAtom(bannerSize)
  return(
    <div style={size.length !== 0 ? {width:parseInt(size[0]),height: parseInt(size[1])} : null}></div>
  )
}

function AdProductInfo() {
  const [isCheckedAll, setIsCheckedAll] = useState(false)
  const [selectBannerName, setSelectBannerName] = useState('')
  const [, setPreviewBannerSize] = useAtom(bannerSize)
  const [modal, setModal] = useAtom(modalController)
  const [checked, setChecked] = useState({
    main: false,
    cart: false,
    match: false
  })

  const adPreviewSize = [
    { id: "p1",preview: "300*150", name: "w300x150(300_150)"},
    { id: "p2",preview: "200*200", name: "w200x200(200_200)"},
    { id: "p3",preview: "120*600", name: "w120x600(120_600)"},
    { id: "p4",preview: "150*150", name: "w150x150(150_150)"},
    { id: "p5",preview: "160*600", name: "w160x600(160_600)"},
    { id: "p6",preview: "200*200", name: "w200x200(200_200)"},
    { id: "p7",preview: "100*200", name: "w100x200(100_200)"},
    { id: "p8",preview: "100*300", name: "w100x300(100_300)"},
    { id: "p9",preview: "100*400", name: "w100x400(100_400)"},
    { id: "p10",preview: "100*500", name: "w100x500(100_500)"},
    { id: "p11",preview: "100*600", name: "w100x600(100_600)"},
    { id: "p12",preview: "200*200", name: "w200x200(200_200)"},
    { id: "p13",preview: "300*300", name: "w300x300(300_300)"},
    { id: "p14",preview: "400*400", name: "w400x400(400_400)"},
    { id: "p15",preview: "500*500", name: "w500x500(500_500)"},
    { id: "p16",preview: "600*600", name: "w600x600(600_600)"}
  ]
  const handleChangeSelectAll = (event) => {
    setIsCheckedAll(event.target.checked)
    setChecked({
      main: event.target.checked,
      cart: event.target.checked,
      match: event.target.checked
    })
  }

  const handleChangeChecked = (event) => {
    if (event.target.id === 'main') {
      setChecked({
        ...checked,
        main: event.target.checked,
      })
    }
    if (event.target.id === 'cart') {
      setChecked({
        ...checked,
        cart: event.target.checked,
      })
    }
    if (event.target.id === 'match') {
      setChecked({
        ...checked,
        match: event.target.checked,
      })
    }
  }

  const handleSelectBanner = (event) => {
    if (event.target.dataset.name == undefined) {
      setSelectBannerName(event.target.parentElement.dataset.name)
      adPreviewSize.filter(item => {
        if(item.id === event.target.parentElement.dataset.name){
          setPreviewBannerSize(item.preview.split('*'))
        }
      })
    } else {
      setSelectBannerName(event.target.dataset.name)
      adPreviewSize.filter(item => {
        if(item.id === event.target.dataset.name){
          setPreviewBannerSize(item.preview.split('*'))
        }
      })
    }
  }

  const componentModalAdTypeGuide = () => {
    return(
      <div>
        <ModalHeader title={'광고 유형 가이드'}/>
        <ModalBody>
          <GuideContainer>
            <GuideHeader>배너 광고란?</GuideHeader>
            <GuideSubject>배너 광고 안내 내용</GuideSubject>
            <GuideBody>
              <div>
                <AdSample/>
                <p>광고 예시</p>
              </div>
            </GuideBody>
          </GuideContainer>
          <VerticalRule style={{margin: '20px 0'}}/>
          <GuideContainer>
            <GuideHeader>아이커버 광고란?</GuideHeader>
            <GuideSubject>아이커버 안내 내용</GuideSubject>
            <GuideBody>
              <div>
                <AdSample/>
                <p>광고 예시</p>
              </div>
            </GuideBody>
          </GuideContainer>
        </ModalBody>
      </div>
    )
  }

  const handleModalAdTypeGuide = () => {
    setModal({
      isShow: true,
      width: 1320,
      modalComponent: () => componentModalAdTypeGuide()
    })
  }

  const handleSelectPreviewBanner = (item) => {
    setPreviewBannerSize(item.preview.split('*'))
    setSelectBannerName(item.id)
  }
  const componentModalPreview = () => {
    return(
      <div>
        <ModalHeader title={'지면 미리보기'}/>
        <ModalBody>
          <PreviewTab>
            {adPreviewSize !== undefined && adPreviewSize.map((item, key) => {
              return(
                <div key={key} id={item.id}
                     onClick={() => handleSelectPreviewBanner(item)}
                     style={selectBannerName === item.id ? {border:"1px solid #f5811f",color: "#f5811f"} : null}
                >{item.preview}</div>
              )
            })}
          </PreviewTab>
          <PreviewBody>
            <PreviewBanner />
          </PreviewBody>
        </ModalBody>
        <ModalFooter>
          <button>확인</button>
        </ModalFooter>
      </div>
    )
  }

  const handleModalPreview = () => {
    setModal({
      isShow: true,
      width: 1320,
      modalComponent: () => componentModalPreview()
    })
  }

  useEffect(() => {
    if(checked.main && checked.cart && checked.match) {
      setIsCheckedAll(true)
    } else {
      setIsCheckedAll(false)
    }
  }, [checked]);
  const selectBannerHover = {
    border: '1px solid #f5811f'
  }

  useEffect(() => {
    if(modal.isShow){
      handleModalPreview()
    }
  }, [selectBannerName]);

  return (
    <BoardBody>
      <li>
        <ListHead>광고 상품</ListHead>
        <ListBody>
          <input type={'radio'} id={'banner'} name={'product'} defaultChecked={true}/>
          <label htmlFor={'banner'}>배너</label>
          <input type={'radio'} id={'pop'} name={'product'}/>
          <label htmlFor={'pop'}>팝언더</label>
          <GuideButton onClick={handleModalAdTypeGuide}>광고 유형 가이드</GuideButton>
        </ListBody>
      </li>
      <li>
        <ListHead>이벤트 설정</ListHead>
        <ListBody>
          <EventSet>
            <Checkbox title={'전체'} type={'c'} id={'all'} isChecked={isCheckedAll} onMethod={handleChangeSelectAll}/>
            <Checkbox title={'본상품'} type={'c'} id={'main'} isChecked={checked.main} onMethod={handleChangeChecked}/>
            <Checkbox title={'장바구니'} type={'c'} id={'cart'} isChecked={checked.cart} onMethod={handleChangeChecked}/>
            <Checkbox title={'리턴 매칭'} type={'c'} id={'match'} isChecked={checked.match} onMethod={handleChangeChecked}/>
          </EventSet>
        </ListBody>
      </li>
      <li>
        <ListHead>지면 유형</ListHead>
        <ListBody>
          <select>
            <option>지면 유형 선택</option>
          </select>
        </ListBody>
      </li>
      <li>
        <ListHead>지면 유형</ListHead>
        <ListBody>
          <SelectBanner>
            {adPreviewSize !== undefined && adPreviewSize.map((item,key) => {
              return(
                <div key={key} data-name={item.id} onClick={handleSelectBanner} style={selectBannerName === item.id ? selectBannerHover : null }>
                  <Box style={{width:`${item.preview.split('*')[0]/6}px`,height:`${item.preview.split('*')[1]/6}px`}}/>
                  <div>{item.name}</div>
                  {selectBannerName === item.id &&
                    <Preview onClick={() => handleModalPreview("300*150")}>지면미리보기</Preview>
                  }
                </div>
              )
            })}
          </SelectBanner>
        </ListBody>
      </li>
    </BoardBody>
  )
}

function MediaAccount() {
  const today = moment().toDate()
  const tomorrow = moment().add(1, 'd').toDate();
  const [dateRange, setDateRange] = useState([today, tomorrow]);
  const [startDate, endDate] = dateRange;
  return (
    <BoardBody>
      <li>
        <ListHead>매체 검색</ListHead>
        <ListBody>
          <Date>
            <CalendarBox>
              <CalendarIcon/>
            </CalendarBox>
            <CustomDatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(date) => setDateRange(date)}
              locale={ko}
              isClearable={false}
            />
          </Date>
          <select>
            <option>정산 유형 선택</option>
          </select>
          <input type={'text'} placeholder={'단위별 금액 입력'}/>
          <input type={'text'} placeholder={'비고'}/>
          <AddButton/>
        </ListBody>
      </li>
      <li>
        <ListHead>대행사 정산 여부</ListHead>
        <ListBody>
          <input type={'radio'} id={'unpaid'} name={'calculate'} defaultChecked={true}/>
          <label htmlFor={'unpaid'}>미정산</label>
          <input type={'radio'} id={'paid'} name={'calculate'}/>
          <label htmlFor={'paid'}>정산</label>
        </ListBody>
      </li>
      <li>
        <ListHead>계약 기간</ListHead>
        <ListBody>
          <Date>
            <CalendarBox>
              <CalendarIcon/>
            </CalendarBox>
            <CustomDatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(date) => setDateRange(date)}
              locale={ko}
              isClearable={false}
            />
          </Date>
          <select>
            <option>정산 유형 선택</option>
          </select>
          <input type={'text'} placeholder={'단위별 금액 입력'}/>
          <input type={'text'} placeholder={'비고'}/>
          <AddButton/>
        </ListBody>
      </li>
    </BoardBody>
  )
}

function AddInfo() {
  return (
    <BoardBody>
      <li>
        <ListHead>지면 상세 설명</ListHead>
        <ListBody>
          <Textarea rows={5} placeholder={'https://'}/>
        </ListBody>
      </li>
      <li>
        <ListHead>광고 미송출 대체 설정</ListHead>
        <ListBody>
          <input type={'radio'} id={'none'} name={'substitute'}/>
          <label htmlFor={'none'}>없음</label>
          <input type={'radio'} id={'image'} name={'substitute'}/>
          <label htmlFor={'image'}>대체 이미지</label>
          <input type={'radio'} id={'document'} name={'substitute'}/>
          <label htmlFor={'document'}>없음</label>
          <input type={'radio'} id={'jsonData'} name={'substitute'}/>
          <label htmlFor={'jsonData'}>JSON DATA</label>
          <input type={'radio'} id={'URL'} name={'substitute'}/>
          <label htmlFor={'URL'}>URL</label>
          <input type={'radio'} id={'script'} name={'substitute'}/>
          <label htmlFor={'script'}>script</label>
        </ListBody>
      </li>
      <li>
        <ListHead></ListHead>
        <ListBody>
          <SubstituteImageContainer>
            <FileBoard>
              <FileUploadButton>
                <input type={'file'}/>
                대체 이미지 등록
              </FileUploadButton>
              <Subject>※대체 이미지 사이즈 가이드 내용 명시</Subject>
            </FileBoard>
          </SubstituteImageContainer>
        </ListBody>
      </li>
      <li>
        <ListHead>외부 연동 송출 여부</ListHead>
        <ListBody>
          <input type={'radio'} id={'unsent'} name={'send-out'}/>
          <label htmlFor={'unsent'}>미송출</label>
          <input type={'radio'} id={'sent'} name={'send-out'}/>
          <label htmlFor={'sent'}>송출</label>
        </ListBody>
      </li>
    </BoardBody>
  )
}

function MediaManage() {
  return (
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>지면 관리</h1>
          <Navigator/>
        </TitleContainer>
        <Board>
          <BoardHeader>지면 정보</BoardHeader>
          <MediaInfo/>
        </Board>
        <Board>
          <BoardHeader>광고 상품 정보</BoardHeader>
          <AdProductInfo/>
        </Board>
        <Board>
          <BoardHeader>매체 정산 정보</BoardHeader>
          <MediaAccount/>
        </Board>
        <Board>
          <BoardHeader>추가 정보 입력(선택)</BoardHeader>
          <AddInfo/>
        </Board>
        <RegistContainer>
          <CancelButton>취소</CancelButton>
          <RegisterButton>지면 등록</RegisterButton>
        </RegistContainer>
      </BoardContainer>
    </main>
  )
}

export default MediaManage

const BoardContainer = styled.div`
  padding: 30px;
  background-color: #f8f8f8;
`

const TitleContainer = styled.div`
  & h1 {
    font-size: 30px;
    font-weight: 700;
  }
`
const Board = styled.div`
  margin: 34px 0;
  width: 100%;
  background-color: #fff;
  padding: 0 40px 40px 40px;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
`

const BoardHeader = styled.div`
  padding: 21px 0;
  width: 100%;
  border-bottom: 1px solid #dddddd;
  font-size: 18px;
  font-weight: bold;
`

const Button = styled.button`
  width: 150px;
  height: 45px;
  border-radius: 5px;
  background-color: #777777;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    background-color: #535353;
  }
`
const InputWiden = styled.input`
  margin-right: 15px;
  padding: 0 20px;
  width: 100%;
  height: 45px;
  background-color: #f9fafb;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  vertical-align: bottom;
  outline: none;
`

const CustomRadio = styled.input`
  display: none;
  &[type='radio'] + label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 45px;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    color: #222;
    cursor: pointer;
  }
  &[type='radio']:checked + label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 45px;
    border-radius: 5px;
    background-color: #f5811f;
    color: #fff;
  }
`

const EventSet = styled.div`
  display: flex;
  align-items: center;
  padding: 0 30px;
  border: 1px solid #e5e5e5;
  height: 45px;
  border-radius: 5px;
`

const SelectBanner = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  width: 100%;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  & > div {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    width: 248px;
    height: 120px;
    border-radius: 2px;
    background-color: #f9f9f9;
    color: #777;
    font-size: 14px;
  }
`

const Box = styled.div`
  background-color: #ddd;
`

const Preview = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  bottom: 0;
  width: 100px;
  height: 33px;
  background-color: #f5811f;
  color: #fff;
`

const AddButton = styled.div`
  width: 24px;
  height: 24px;
  background-image: url("/assets/images/common/btn_calculate_plus.png");
`

const CustomDatePicker = styled(DatePicker)`
  border: none !important;
  color: #a2aab2;
  font-size: 14px;
`

const Date = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
`

const CalendarBox = styled.div`
  display: flex;
  width: 55px;
  border-right: 1px solid #ddd;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
`

const CalendarIcon = styled.div`
  width: 18px;
  height: 20px;
  background-image: url("/assets/images/common/icon_calendar.png");
`
const SubstituteImageContainer = styled.div`
  padding: 20px;
  width: 100%;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
`

const FileBoard = styled.div`
  padding: 10px;
  width: 100%;
  border: 1px solid #e5e5e5;
  background-color: #f9fafb;
  border-radius: 2px;
`
const FileUploadButton = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 126px;
  height: 40px;
  border: 1px solid #e5e5e5;
  background-color: #fff;
  border-radius: 5px;
  font-size: 14px;
  & input[type='file'] {
    display: none;
  }
`

const Subject = styled.div`
  margin-top:27px;
  font-size: 13px;
  color: #777777;
`
const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 20px;
  border:1px solid #e5e5e5;
  background-color: #f9fafb;
  border-radius: 5px;
  outline: none;
  font-size: 14px;
  line-height: 18px;
  color: #a2aab2;
  font-weight: 300;
`

const RegistContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  width: 100%;
  & button {
    margin: 8px;
    width: 200px;
    height: 60px;
    font-size: 16px;
    cursor: pointer;
  }
`
const CancelButton = styled.button`
  border: 1px solid #535353;
  background-color: #fff;
`

const RegisterButton = styled.button`
  background-color: #535353;
  color: #fff;
`

const MediaSearchColumn = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  width: 100%;
  background-color: #f9f9f9;
  & > div:first-child{
    min-width: 70px;
  }
  & > div:last-child{
    width: 100%;
  }
`

const InputGroup = styled.div`
  display: flex;
  & input[type='text'] {
    padding:0 20px;
    width: 80%;
    border: 1px solid #e5e5e5;
    height: 45px;
    border-radius: 10px 0 0 10px;
  }
  & button {
    width: 20%;
    border-radius: 0 10px 10px 0;
    background-color: #777;
    color: #fff;
  }
`

const MediaSearchResult = styled.div`
  font-size: 13px;
  & table {
    margin-top: 18px;
    width: 100%;
    & th {
      padding: 12px;
      background-color: #fafafa;
      color: #b2b2b2;
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
    }
    & td {
      text-align: center;
      padding: 12px;
      border-bottom: 1px solid #e5e5e5;
      cursor: pointer;
    }
  }
`

const MediaSelectedButton = styled.button`
  display: block;
  margin: 15px auto 0;
  padding: 13px 0;
  width: 200px;
  background-color: #535353;
  color: #fff;
`

const GuideButton = styled.button`
  margin-left: auto;
  padding:15px 27px;
  border: 1px solid #ddd;
  background-color: #fff;
  transition-duration: 0.5s;
  &:hover {
    color: #f5811f
  }
`

const  GuideContainer = styled.div`
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
      content:"실제 배너 표출 사이즈"
    }
  }
`