import {atom, useAtom, useSetAtom} from "jotai";
import {modalController} from "../../store";
import {ModalBody, ModalFooter, ModalHeader} from "../../components/modal/Modal";
import {AdSample, VerticalRule} from "../../components/common/Common";
import {Controller, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {
  bannerCategoryOneDepthList,
  bannerCategoryTwoDepthList,
  bannerSizeList,
  createInventory,
  eventTypeList,
  inventoryTypeList
} from "../../services/mediamanage/InventoryAxios";
import {
  Board,
  BoardHeader,
  CalendarBox,
  CalendarIcon,
  CancelButton,
  ColSpan1,
  ColTitle,
  CustomDatePicker,
  DateContainer,
  Input,
  inputStyle,
  RowSpan,
  SubmitButton,
  SubmitContainer,
  ValidationScript
} from "../../assets/GlobalStyles";
import {
  adPreviewSize,
  calculationAllType,
  exposureIntervalType,
  inventoryType,
  mediaResistInfo,
  productTypeInfo
} from "./entity/common";
import {useEffect, useState} from "react";
import {ListBody, ListHead} from "../../components/layout";
import {SearchUser} from "../../components/common/SearchUser";
import Select from "react-select";
import Checkbox from "../../components/common/Checkbox";
import {isOverToday} from "../../common/StringUtils";
import ko from "date-fns/locale/ko";
import {
  Box,
  CustomRadio,
  EventSet,
  GuideBody,
  GuideButton,
  GuideContainer,
  GuideHeader,
  GuideSubject,
  InputWiden,
  Preview,
  PreviewBody,
  PreviewSubmit,
  PreviewTab,
  ProductSet,
  ScriptSubject,
  SelectBanner,
  Textarea
} from "./styles";


const MediaResistAtom = atom(mediaResistInfo)

function MediaInfo(props) {
  const [mediaResistState, setMediaResistState] = useAtom(MediaResistAtom)
  const [mediaCategoryOneDepthState, setMediaCategoryOneDepthState] = useState([])
  const [mediaCategoryTwoDepthState, setMediaCategoryTwoDepthState] = useState([])
  const [, setDeviceType] = useState('PC')
  const [, setModal] = useAtom(modalController)
  const [checked, setChecked] = useState({
    WEB: false,
    WEB_APP: false,
    MOBILE_WEB: false,
    MOBILE_NATIVE_APP: false
  })
  const {register, controls, setValue, setError, errors} = props

  useEffect(()=>{
    setMediaResistState(mediaResistInfo);
    bannerCategoryOneDepthList().then(response =>
      setMediaCategoryOneDepthState(response)
    )
  },[])

  useEffect(()=>{
    if(mediaResistState.category1.value !== ''){
      bannerCategoryTwoDepthList(mediaResistState.category1.value).then(response =>
        setMediaCategoryTwoDepthState(response)
      )
      handleMediaCategoryTwoDepth('')
    }
  },[mediaResistState.category1])


  /**
   * 모달안에 선택완료 선택시
   */
  const handleMediaSearchSelected = (item) => {
    setModal({
      isShow: false,
      modalComponent: null
    })
    setMediaResistState({
      ...mediaResistState,
      siteName: item.siteName
    })
    setValue('userId', item.id)
    setValue('siteName', item.siteName);
    setError('siteName','')
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

  /**
   * 카테고리 1Depth 선택
   * @param category1
   */
  const handleMediaCategoryOneDepth = (category1) => {
    setMediaResistState({
      ...mediaResistState,
      category1: category1
    })
    setValue('category1', category1.value);
    setError('category1','')
  }

  /**
   * 카테고리 2Depth 선택
   * @param category1
   */
  const handleMediaCategoryTwoDepth = (category2) => {
    setMediaResistState({
      ...mediaResistState,
      category2: category2
    })
    setValue('category2', category2.value);
  }

  /**
   * 디바이스 선택
   * @param deviceType
   */
  const handleDeviceType = (deviceType) => {
    setMediaResistState({
      ...mediaResistState,
      deviceType: deviceType
    })
    setDeviceType(deviceType)
    setValue('deviceType', deviceType)
  }

  /**
   * 에이전트 유형 선택
   * @param agentType
   */
  const handleAgentType = (event) => {

    switch (event.target.id) {
      case 'WEB' : setChecked({...checked, WEB: event.target.checked});break;
      case 'WEB_APP' : setChecked({...checked, WEB_APP: event.target.checked});break;
      case 'MOBILE_WEB' : setChecked({...checked, MOBILE_WEB: event.target.checked});break;
      case 'MOBILE_NATIVE_APP' : setChecked({...checked, MOBILE_NATIVE_APP: event.target.checked});break;
      default : return null
    }

    if(event.target.checked){
      setMediaResistState({
        ...mediaResistState,
        agentTypes: mediaResistState.agentTypes.concat(event.target.id)
      })
      setValue('agentTypes', mediaResistState.agentTypes.concat(event.target.id))
    }else{
      setMediaResistState({
        ...mediaResistState,
        agentTypes: mediaResistState.agentTypes.filter(value => value !== event.target.id)
      })
      setValue('agentTypes', mediaResistState.agentTypes.filter(value => value !== event.target.id))
    }

  }
  /**
   * 지면 URL 입력
   * @param event
   */
  const handleMediaUrl = (event) => {
    setMediaResistState({
      ...mediaResistState,
      mediaUrl: event.target.value
    })
  }

  /**
   * 지면 상세 설명
   * @param event
   */
  const handleDescription = (event) => {
    setMediaResistState({
      ...mediaResistState,
      description: event.target.value
    })
  }

  return (
    <>
      <RowSpan>
        <ListHead>매체 검색</ListHead>
        <ListBody>
          <Input type={'text'}
                 style={{width:'30%'}}
                 value={mediaResistState.siteName || ""}
                 placeholder={"매체 검색 버튼을 눌러주세요."}
                 readOnly={true}
                 {...register('siteName',{
                   required: "매체명을 선택해주세요."
                 })}
          />
          <SearchUser title={'매체 검색'} onSubmit={handleMediaSearchSelected}/>
          {errors.siteName && <ValidationScript>{errors.siteName?.message}</ValidationScript>}
        </ListBody>
      </RowSpan>
      <RowSpan>
        <ListHead>지면명</ListHead>
        <ListBody>
          <InputWiden type={'text'}
                      placeholder={'지면명을 입력해주세요.'}
                      defaultValue={mediaResistState.inventoryName || ""}
                      onChange={e => handleInventoryName(e)}
                      {...register("inventoryName", {
                        required: "지면명을 입력해주세요."
                      })}
          />
          {errors.inventoryName && <ValidationScript>{errors.inventoryName?.message}</ValidationScript>}
        </ListBody>
      </RowSpan>
      <RowSpan>
        <ListHead>지면 상세 설명</ListHead>
        <ListBody>
          <Textarea rows={5}
                    placeholder={'지면 상세 정보(최소 20자)'}
                    value={mediaResistState.description || ''}
                    onChange={(e) => handleDescription(e)}
          />
          {errors.description && <ValidationScript>{errors.description?.message}</ValidationScript>}
        </ListBody>
      </RowSpan>
      <RowSpan>
        <ListHead>지면 카테고리</ListHead>
        <ListBody>
          <ColSpan1>
            <Controller
              name="category1"
              control={controls}
              rules={{
                required: {
                  value: mediaResistState.category1.value === "",
                  message: "카테고리를 선택해주세요."
                }
              }}
              render={({ field }) =>(
                <Select options={mediaCategoryOneDepthState}
                        placeholder={'카테고리 선택'}
                        {...field}
                        value={(mediaResistState.category1 !== undefined && mediaResistState.category1.value !== '') ? mediaResistState.category1 : ''}
                        onChange={handleMediaCategoryOneDepth}
                        components={{IndicatorSeparator: () => null}}
                        styles={inputStyle}
                />
              )}
            />
          </ColSpan1>
          <ColSpan1>
            <Controller
              name="category2"
              control={controls}
              render={({ field }) =>(
                <Select options={mediaCategoryTwoDepthState}
                        placeholder={'하위 카테고리 선택'}
                        {...field}
                        value={(mediaResistState.category2 !== undefined && mediaResistState.category2.value !== '') ? mediaResistState.category2 : ''}
                        onChange={handleMediaCategoryTwoDepth}
                        components={{IndicatorSeparator: () => null}}
                        styles={inputStyle}
                />
              )}
            />
          </ColSpan1>
          {errors.category1 && <ValidationScript>{errors.category1?.message}</ValidationScript>}
        </ListBody>
      </RowSpan>
      <RowSpan>
        <ListHead>디바이스 유형</ListHead>
        <ListBody>
          <CustomRadio type={'radio'}
                       id={'pc'}
                       name={'device-type'}
                       onChange={() => handleDeviceType('PC')}
          />
          <label htmlFor={'pc'}>PC</label>
          <CustomRadio type={'radio'}
                       id={'mobile'}
                       name={'device-type'}
                       onChange={() => handleDeviceType('MOBILE')}
          />
          <label htmlFor={'mobile'}>MOBILE</label>
          <CustomRadio type={'radio'}
                       id={'responsive_web'}
                       name={'device-type'}
                       onChange={() => handleDeviceType('RESPONSIVE_WEB')}
          />
          <label htmlFor={'responsive_web'}>반응형 웹</label>
        </ListBody>
      </RowSpan>
      <RowSpan>
        <ListHead>에이전트 유형</ListHead>
        <ListBody>
          <EventSet>
            <Controller name={'agentChecked'}
                        control={controls}
                        render={({field}) =>
                          <Checkbox {...field} label={'PC 웹'} type={'c'} id={'WEB'} isChecked={checked.WEB}
                                    onChange={handleAgentType} inputRef={field.ref}/>}/>

            <Controller name={'agentChecked'}
                        control={controls}
                        render={({field}) =>
                          <Checkbox label={'PC 어플리케이션'} type={'c'} id={'WEB_APP'} isChecked={checked.WEB_APP}
                                    onChange={handleAgentType} inputRef={field.ref}/>}/>
            <Controller name={'agentChecked'}
                        control={controls}
                        render={({field}) =>
                          <Checkbox label={'모바일 웹'} type={'c'} id={'MOBILE_WEB'} isChecked={checked.MOBILE_WEB}
                                    onChange={handleAgentType} inputRef={field.ref}/>}/>
            <Controller name={'agentChecked'}
                        control={controls}
                        render={({field}) =>
                          <Checkbox label={'모바일 APP'} type={'c'} id={'MOBILE_NATIVE_APP'} isChecked={checked.MOBILE_NATIVE_APP}
                                    onChange={handleAgentType} inputRef={field.ref}/>}/>
          </EventSet>
        </ListBody>
      </RowSpan>
      <RowSpan>
        <ListHead>지면 url<p>(app market url)</p></ListHead>
        <ListBody>
          <InputWiden type={'text'}
                      placeholder={'https://'}
                      defaultValue={mediaResistState.mediaUrl || ""}
                      onChange={e => handleMediaUrl(e)}
                      {...register("mediaUrl", {
                        required: "사이트 URL 입력해주세요.",
                        pattern:{
                          value:  /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi,
                          message: "http(s)://가 포함된 url 주소를 확인해주세요."
                        }
                      })}
          />
          {errors.mediaUrl && <ValidationScript>{errors.mediaUrl?.message}</ValidationScript>}
        </ListBody>
      </RowSpan>
    </>
  )
}

const bannerSize = atom([])

function PreviewBanner() {
  const [size] = useAtom(bannerSize)
  return (
    <div style={size.length !== 0 ? {width: parseInt(size[0]), height: parseInt(size[1])} : null}></div>
  )
}
function AdProductInfo(props) {
  const [mediaResistState, setMediaResistState] = useAtom(MediaResistAtom)
  const [adPreviewSizeInfo, setAdPreviewSizeInfo] = useState(adPreviewSize)
  const [selectBannerSizeName, setSelectBannerSizeName] = useState('')
  const [adType, setAdType] = useState('')
  const setPreviewBannerSize = useSetAtom(bannerSize)
  const setModal = useSetAtom(modalController)
  const [inventoryTypeState, setInventoryTypeState] = useState(inventoryType)
  const [eventTypeState, setEventTypeState] = useState([])
  const [exposureInterval] = useState(exposureIntervalType)

  const {controls, errors, setValue, setError} = props
  useEffect(()=>{
    bannerSizeList().then(response =>
      setAdPreviewSizeInfo(response)
    )
    inventoryTypeList().then(response =>
      setInventoryTypeState(response)
    )
    eventTypeList().then(response =>
      setEventTypeState(response)
    )
  },[])


  /**
   * 이벤트 유형 전체선택
   * @param event
   */
  const handleChangeSelectAll = (event) => {
    if (event.target.checked) {
      setMediaResistState({
        ...mediaResistState,
        allowEvents: eventTypeState
      })
      setValue("allowEvents", eventTypeState.map(eventState => {return {eventType: eventState.value, exposureWeight:100}}))
      setError("eventChecked",false)
    }else{
      setMediaResistState({
        ...mediaResistState,
        allowEvents: []
      })
      setValue("allowEvents", [])
      setError("eventChecked",{ type: 'required', message: '하나 이상의 이벤트를 체크해주세요' })
    }

  }
  /**
   * 이벤트 유형 선택
   * @param event
   */
  const handleChangeChecked = (event) => {
    //체크가 true일때
    if (event.target.checked) {
      setMediaResistState({
        ...mediaResistState,
        allowEvents: [...mediaResistState.allowEvents.concat(eventTypeState.find(eventType => eventType.value === event.target.id))]
      })
      setError("eventChecked",false)
      setValue("allowEvents", mediaResistState.allowEvents.map(allowEvent => {return {eventType: allowEvent.value, exposureWeight:100}}).concat({eventType: event.target.id, exposureWeight:100}))
    } else {
      //기존이 전체선택이 아닌경우
      setMediaResistState({
        ...mediaResistState,
        allowEvents: [...mediaResistState.allowEvents.filter(allowEvent => allowEvent.value !== event.target.id)]
      })

      if(mediaResistState.allowEvents.length < 2) setError("eventChecked",{ type: 'required', message: '하나 이상의 이벤트를 체크해주세요' })
      setValue("allowEvents", mediaResistState.allowEvents.map(allowEvent => {return {eventType: allowEvent.value, exposureWeight:100}}).filter(value => value.eventType !== event.target.id))
    }
  }

  /**
   * 광고유형가이드 선택
   */
  const handleModalAdTypeGuide = () => {
    setModal({
      isShow: true,
      width: 1320,
      modalComponent: () => componentModalAdTypeGuide()
    })
  }

  const componentModalAdTypeGuide = () => {
    return (
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

  /**
   * 모달 지면 선택 핸들링
   * @param item
   */
  const handleSelectPreviewBanner = (item) => {
    setPreviewBannerSize(item.value?.replace('IMG', '').split('_'))
    setSelectBannerSizeName(item.value)
    handleModalPreview(item.value)
  }

  /**
   * 지면 미리보기 모달
   */
  const handleModalPreview = (value) => {
    setModal({
      isShow: true,
      width: 1320,
      modalComponent: () => componentModalPreview(value !== undefined ? value : selectBannerSizeName)
    })
  }

  const componentModalPreview = (target) => {
    return (
      <div>
        <ModalHeader title={'지면 미리보기'}/>
        <ModalBody>
          <PreviewTab>
            {adPreviewSizeInfo !== null && adPreviewSizeInfo.map((item, key) => {
              return (
                <div key={key} id={item.value}
                     onClick={() => handleSelectPreviewBanner(item)}
                     style={target === item.value ? {border: "1px solid #f5811f", color: "#f5811f"} : null}
                >{item.label}</div>
              )
            })}
          </PreviewTab>
          <PreviewBody>
            <PreviewBanner/>
          </PreviewBody>
        </ModalBody>
        <ModalFooter>
          <PreviewSubmit onClick={() => setModal({isShow: false, modalComponent: null})}>확인</PreviewSubmit>
        </ModalFooter>
      </div>
    )
  }

  /**
   * 지면사이즈 선택 핸들링
   * @param event
   */
  const handleSelectBanner = (event) => {

    setMediaResistState({
      ...mediaResistState,
      bannerSize: event.target.dataset.value
    })
    if (event.target.dataset.name === undefined) {
      setSelectBannerSizeName(event.target.parentElement.dataset.value)
      setValue('bannerSize', event.target.parentElement.dataset.value)
      adPreviewSizeInfo.map((item) => {
        if (item.value === event.target.parentElement.dataset.value) {
          setPreviewBannerSize(item.value.replace('IMG', '').split('_'))
        }
        return null
      })
    } else {
      setSelectBannerSizeName(event.target.dataset.value)
      adPreviewSizeInfo.map((item)  => {
        if (item.value === event.target.dataset.value) {
          setPreviewBannerSize(item.value.replace('IMG', '').split('_'))
        }
      })
      setValue('bannerSize', event.target.dataset.value)
    }
  }

  const selectBannerHover = {
    border: '1px solid #f5811f'
  }

  /**
   * 광고 상품 선택
   * @param inventoryType
   */
  const handleProductType = (event) => {

    setMediaResistState({
      ...mediaResistState,
      productType: event.target.id
    })
    setAdType(event.target.id);
    setValue('productType',event.target.id);
  }

  /**
   * 지면 유형 선택
   * @param inventoryType
   */
  const handleInventoryType = (inventoryType) => {
    setMediaResistState({
      ...mediaResistState,
      inventoryType: inventoryType
    })
    setValue('inventoryType', inventoryType.value)
  }
  /**
   * 지면 노출 간격 선택(팝언더만 해당)
   * @param exposureInterval
   */
  const handleExposureInterval = (exposureInterval) => {
    setMediaResistState({
      ...mediaResistState,
      exposureInterval: exposureInterval
    })
    setValue('exposureInterval', exposureInterval.value)
  }


  return (
    <>
      <RowSpan>
        <ListHead>광고 상품</ListHead>
        <ListBody>
          <ProductSet>
            {productTypeInfo.map((data,index) => {
              return index !== 0 &&
                (<div key={index}>
                  <input type={'radio'} id={data.value} name={'product'}  onChange={handleProductType}/>
                  <label htmlFor={data.value}>{data.label}</label>
                </div>)
            })}
          </ProductSet>
          <GuideButton type={'button'} onClick={handleModalAdTypeGuide}>광고 유형 가이드</GuideButton>
        </ListBody>
      </RowSpan>
      <RowSpan>
        <ListHead>이벤트 설정</ListHead>
        <ListBody>
          <EventSet>
            <Controller name={'eventChecked'}
                        control={controls}
                        render={({field}) =>
                          <Checkbox {...field} label={'전체'} type={'c'} id={'ALL'} isChecked={eventTypeState != null && (mediaResistState.allowEvents.length === eventTypeState.length)}
                                    onChange={handleChangeSelectAll} inputRef={field.ref}/>}/>

            {
              eventTypeState != null && eventTypeState.map((data, key)=>{
                return <Controller name={'eventChecked'}
                                   control={controls}
                                   key={key}
                                   render={({field}) =>
                                     <Checkbox label={data.label} type={'c'} id={data.value} isChecked={mediaResistState.allowEvents.some(event => event.value === data.value)}
                                               onChange={handleChangeChecked} inputRef={field.ref}/>}/>
              })
            }
          </EventSet>
          {errors.eventChecked && <ValidationScript>{errors.eventChecked?.message}</ValidationScript>}
        </ListBody>
      </RowSpan>
      <RowSpan>
        <ListHead>지면 유형</ListHead>
        <ListBody>
          <ColSpan1>
            <Select options={mediaResistState.productType !== '' ? inventoryTypeState.filter(value => (value.value.indexOf(mediaResistState.productType)>-1)) : inventoryTypeState}
                    placeholder={'선택하세요'}
                    value={(mediaResistState.inventoryType !== undefined && mediaResistState.inventoryType.value !== '') ? mediaResistState.inventoryType : ''}
                    onChange={handleInventoryType}
                    components={{IndicatorSeparator: () => null}}
                    styles={inputStyle}
            />
          </ColSpan1>
          {errors.inventoryType && <ValidationScript>{errors.inventoryType?.message}</ValidationScript>}
        </ListBody>
      </RowSpan>
      {adType === 'BANNER' &&
        <RowSpan>
          <ListHead>지면 사이즈</ListHead>
          <ListBody>
            <SelectBanner>
              {adPreviewSizeInfo !== null && adPreviewSizeInfo.map((item, key) => {
                return (
                  <div key={key} data-name={item.label} onClick={handleSelectBanner}
                       style={selectBannerSizeName === item.value ? selectBannerHover : null} data-value={item.value}>
                    <Box style={{
                      width: `${item.value?.replace('IMG', '').split('_')[0] / 6}px`,
                      height: `${item.value?.replace('IMG', '').split('_')[1] / 6}px`
                    }}/>
                    <div>{item.label}</div>
                    {selectBannerSizeName === item.value &&
                      <Preview onClick={() => handleModalPreview()}>지면미리보기</Preview>
                    }
                  </div>
                )
              })}
            </SelectBanner>
            {errors.bannerSize && <ValidationScript>{errors.bannerSize?.message}</ValidationScript>}
          </ListBody>
        </RowSpan>
      }
      {adType === 'POP_UNDER' &&
        <RowSpan>
          <ListHead>노출 간격</ListHead>
          <ListBody>
            <ColSpan1>
              <Select options={exposureInterval}
                      placeholder={'선택하세요'}
                      value={(mediaResistState.exposureInterval !== undefined && mediaResistState.exposureInterval !== '') ? mediaResistState.exposureInterval : '0'}
                      onChange={handleExposureInterval}
                      components={{IndicatorSeparator: () => null}}
                      styles={inputStyle}
              />
            </ColSpan1>
          </ListBody>
        </RowSpan>
      }
    </>
  )
}

function MediaAccount(props) {
  const [mediaResistState, setMediaResistState] = useAtom(MediaResistAtom)
  const [calculationAllTypeState] = useState(calculationAllType)
  const {register, controls, setValue,setError, errors} = props

  /**
   * 정산방식 선택날짜
   * @param date
   */
  const handleContractDate = (date) => {
    if(isOverToday(new Date(), new Date(date))) {
      setMediaResistState({
        ...mediaResistState,
        feeCalculation: {
          ...mediaResistState.feeCalculation,
          contractStartDate: date
        }
      })
      setValue('feeCalculation.contractStartDate', date)
    }
  }
  /**
   * 정산방식 선택
   * @param calculationType
   */
  const handleCalculationType = (calculationType) => {
    setMediaResistState({
      ...mediaResistState,
      feeCalculation: {
        ...mediaResistState.feeCalculation,
        calculationType: calculationType
      }
    })
    setValue('feeCalculation.calculationType',  calculationType.value)
    setError('calculationType','')
  }
  /**
   * 정산방식 값 입력
   * @param calculationValue
   */
  const handlecalculationValue = (event) => {
    setMediaResistState({
      ...mediaResistState,
      feeCalculation: {
        ...mediaResistState.feeCalculation,
        calculationValue: parseInt(event.target.value)
      }
    })
    setValue('feeCalculation.calculationValue', parseInt(event.target.value))
    setError('calculationValue','')
  }
  /**
   * 비고 입력
   * @param event
   */
  const handleCalculationEtc = (event) => {
    setMediaResistState({
      ...mediaResistState,
      feeCalculation: {
        ...mediaResistState.feeCalculation,
        calculationEtc: event.target.value
      }
    })
    setValue('feeCalculation.calculationEtc', event.target.value)
  }

  function handlePlaceholder (type) {
    switch (type){
      case 'CPM' : case 'CPC' : return '단위별 금액을 입력해주세요.';
      case 'RS' : return '정산 비율을 입력해주세요.';
      case 'GT' : return '개런티 비용을 입력해주세요.';
      default : return '단위별 금액을 입력해주세요.';
    }
  }

  return (
    <>
      <RowSpan style={{width: '100%', alignItems: 'center'}}>
        <ColSpan1>
          <ColTitle style={{textAlign: 'right'}}><span>시작 날짜</span></ColTitle>
          <div style={{position: "relative"}}>
            <DateContainer>
              <CalendarBox>
                <CalendarIcon/>
              </CalendarBox>
              <CustomDatePicker
                showIcon
                selected={mediaResistState.feeCalculation.contractStartDate}
                onChange={(date) => handleContractDate(date)}
                locale={ko}
                dateFormat="yyyy-MM-dd"
                isClearable={false}
              />
            </DateContainer>
          </div>
        </ColSpan1>
        <ColSpan1>
          <ColTitle><span>정산 유형</span></ColTitle>
          <div>
            <Controller
              name="calculationType"
              control={controls}
              rules={{
                required: {
                  value: mediaResistState.feeCalculation.calculationType.value === '',
                  message: "정산 유형을 선택해주세요."
                }
              }}
              render={({ field }) =>(
                <Select options={calculationAllTypeState.filter((data,index) => index !== 0)}
                        placeholder={'선택하세요'}
                        styles={inputStyle}
                        components={{IndicatorSeparator: () => null}}
                        value={(mediaResistState.feeCalculation.calculationType !== undefined && mediaResistState.feeCalculation.calculationType.value !== '') ? mediaResistState.feeCalculation.calculationType : ''}
                        onChange={(e)=>handleCalculationType(e)}
                />
              )}
            />
            {errors.calculationType && <ValidationScript>{errors.calculationType?.message}</ValidationScript>}
          </div>

        </ColSpan1>
        <ColSpan1>
          <ColTitle><span>정산 금액</span></ColTitle>
          <div>
            <Controller
              name="calculationValue"
              control={controls}
              rules={{
                required: {
                  value: mediaResistState.feeCalculation.calculationValue === 0,
                  message: "정산 금액을 입력해주세요."
                }
              }}
              render={({ field }) =>(
                <Input type={'number'}
                       min={0}
                       placeholder={handlePlaceholder(mediaResistState.feeCalculation.calculationType.value)}
                       style={{color:'#f5811f'}}
                       value={mediaResistState.feeCalculation.calculationValue}
                       onChange={(e)=>handlecalculationValue(e)}
                /> )}
            />
            {errors.calculationValue && <ValidationScript>{errors.calculationValue?.message}</ValidationScript>}
          </div>
        </ColSpan1>
        <ColSpan1>
          <ColTitle style={{textAlign: 'right'}}><span>비고</span></ColTitle>
          <Input type={'text'}
                 placeholder={'비고'}
                 value={mediaResistState.feeCalculation.calculationEtc}
                 onChange={handleCalculationEtc}
          />
        </ColSpan1>
      </RowSpan>
    </>
  )
}

function AddInfo(props) {
  const [mediaResistState, setMediaResistState] = useAtom(MediaResistAtom)
  const [showNonExposureConfigValue, setShowNonExposureConfigValue] = useState(true)
  const {setValue} = props
  /**
   * 미송출시 타입 선택
   * @param nonExposureConfigType
   */
  const handleNonExposureConfigType = (nonExposureConfigType) => {
    if (nonExposureConfigType === "DEFAULT_BANNER_IMAGE" || nonExposureConfigType === 'NONE') {
      setShowNonExposureConfigValue(false)
    } else {
      setShowNonExposureConfigValue(true)
    }
    setMediaResistState({
      ...mediaResistState,
      nonExposureConfigType: nonExposureConfigType
    })
    setValue('nonExposureConfigType', nonExposureConfigType)
  }

  /**
   * 미송출시 데이터 입력
   * @param event
   */
  const handleNonExposureConfigValue = (event) => {
    setMediaResistState({
      ...mediaResistState,
      nonExposureConfigValue: event.target.value
    })
    setValue('nonExposureConfigValue', event.target.value)
  }

  function handlePlaceholder (type) {
    switch (type){
      case 'JSON' : case 'URL' : return '설정할 URL 정보를 입력해주세요.'; break;
      case 'SCRIPT' : return '설정할 SCRIPT 정보를 입력해주세요.';break;
      default : return '미송출시 대체 광고 정보를 입력하세요.';break;
    }
  }

  return (
    <>
      <RowSpan>
        <ListHead>광고 미송출 대체 설정</ListHead>
        <ListBody>
          {mediaResistState.productType === 'BANNER' ?
            <>
              <input type={'radio'}
                     id={'defaultImage'}
                     name={'substitute'}
                     onChange={() => handleNonExposureConfigType('DEFAULT_BANNER_IMAGE')}
              />
              <label htmlFor={'defaultImage'}>대체 이미지</label>
              <input type={'radio'}
                     id={'jsonData'}
                     name={'substitute'}
                     onChange={() => handleNonExposureConfigType('JSON')}
              />
              <label htmlFor={'jsonData'}>JSON DATA</label>
            </>
            :
            <>
              <input type={'radio'}
                     id={'jsonData'}
                     name={'substitute'}
                     onChange={() => handleNonExposureConfigType('NONE')}
              />
              <label htmlFor={'jsonData'}>없음</label>
            </>
          }
          <input type={'radio'}
                 id={'URL'}
                 name={'substitute'}
                 onChange={() => handleNonExposureConfigType('URL')}
          />
          <label htmlFor={'URL'}>URL</label>
          <input type={'radio'}
                 id={'script'}
                 name={'substitute'}
                 onChange={() => handleNonExposureConfigType('SCRIPT')}
          />
          <label htmlFor={'script'}>script</label>
        </ListBody>
      </RowSpan>
      <RowSpan>
        <ListHead></ListHead>
        <ListBody>
          {showNonExposureConfigValue &&
            <Textarea rows={5}
                      placeholder={handlePlaceholder(mediaResistState.nonExposureConfigType)}
                      value={mediaResistState.nonExposureConfigValue}
                      onChange={(e) => handleNonExposureConfigValue(e)}
            />
          }
        </ListBody>
      </RowSpan>
    </>
  )
}
export default function Media() {
  const [,setModal] = useAtom(modalController)

  const handleModalRegistration = () => {
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
                <GuideHeader>스크립트 표출

                </GuideHeader>
                <GuideBody>
                  <pre>스트립트 표출 영역</pre>
                </GuideBody>
              </GuideContainer>
              <VerticalRule style={{margin: "20px 0"}}/>
              <GuideContainer>
                <GuideHeader>지면 스크립트 삽입 가이드</GuideHeader>
                <GuideBody>
                  <pre>지면 스크립트 삽입 가이드</pre>
                </GuideBody>
              </GuideContainer>
            </ModalBody>
            <ModalFooter>
              <PreviewSubmit onClick={() => {
                setModal({isShow: false})
                alert('지면이 생성되었습니다.')
                navigate('/board/mediaList')
              }
              }>확인</PreviewSubmit>
            </ModalFooter>
          </div>
        )
      }
    })
  }
  const { register, handleSubmit, control, setValue, setError, formState: { errors } } = useForm();
  const onError = (error) => console.log(error)
  const navigate = useNavigate();
  const onSubmit = (data) => {

    if(data.contractStartDate === undefined) data.feeCalculation.contractStartDate = new Date(new Date().setDate(new Date().getDate()+1));

    console.log('createInventory :', data);

    createInventory(data).then((response) => {
      if(response !== null) {
        handleModalRegistration()
      }
    })
  }
  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Board>
            <BoardHeader>지면 정보</BoardHeader>
            <MediaInfo register={register} controls={control} setValue={setValue}  setError={setError} errors={errors}/>
          </Board>
          <Board>
            <BoardHeader>광고 상품 정보</BoardHeader>
            <AdProductInfo register={register} controls={control} setValue={setValue} setError={setError} errors={errors}/>
          </Board>
          <Board>
            <BoardHeader>매체 정산 정보</BoardHeader>
            <MediaAccount register={register} controls={control} setValue={setValue} setError={setError} errors={errors}/>
          </Board>
          <Board>
            <BoardHeader>추가 정보 입력(선택)</BoardHeader>
            <AddInfo register={register} setValue={setValue} errors={errors}/>
          </Board>
          <SubmitContainer>
            <CancelButton onClick={() => navigate('/board/mediaList')}>취소</CancelButton>
            <SubmitButton type={'submit'}>지면 등록</SubmitButton>
          </SubmitContainer>
      </form>
    </main>
  )
}
