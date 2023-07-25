import {atom, useAtom, useSetAtom} from "jotai";
import {modalController} from "../../store";
import {ModalBody, ModalFooter, ModalHeader} from "../../components/modal/Modal";
import {VerticalRule} from "../../components/common/Common";
import {Controller, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {
  bannerCategoryOneDepthList,
  bannerCategoryTwoDepthList,
  bannerSizeList,
  createInventory,
  inventoryTypeList,
  targetingTypeList
} from "../../services/mediamanage/InventoryAxios";
import {
  Board,
  BoardHeader,
  CalendarBox,
  CalendarIcon,
  CancelButton,
  ColSpan1,
  ColTitle,
  CopyCode,
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
import {decimalFormat, isOverToday, removeStr} from "../../common/StringUtils";
import ko from "date-fns/locale/ko";
import {
  Box,
  CustomRadio,
  EventSet,
  GuideBody,
  GuideContainer,
  GuideHeader,
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
import {atomWithReset, useResetAtom} from "jotai/utils";

const MediaResistAtom = atomWithReset(mediaResistInfo)

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
    MOBILE_HYBRID_APP: false,
    MOBILE_NATIVE_APP: false
  })
  const {register, controls, setValue, errors, clearErrors} = props

  useEffect(()=>{
    setMediaResistState(mediaResistInfo);
    bannerCategoryOneDepthList().then(response =>
      setMediaCategoryOneDepthState(response)
    )
    handleDeviceType('PC')
  },[])

  useEffect(()=>{
    if(mediaResistState.category1 !== ''){
      bannerCategoryTwoDepthList(mediaResistState.category1).then(response =>
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
    clearErrors('siteName')
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
    clearErrors('category1')
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
  }

  /**
   * 디바이스 선택
   * @param deviceType
   */
  const handleDeviceType = (deviceType) => {
    setMediaResistState({
      ...mediaResistState,
      deviceType: deviceType,
      agentTypes: []
    })
    setChecked({
      WEB: false,
      WEB_APP: false,
      MOBILE_WEB: false,
      MOBILE_HYBRID_APP: false,
      MOBILE_NATIVE_APP: false
    });
    setDeviceType(deviceType)
    setValue('deviceType', deviceType)
    setValue('agentTypes', '')
    clearErrors('deviceType')
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
      case 'MOBILE_HYBRID_APP' : setChecked({...checked, MOBILE_HYBRID_APP: event.target.checked});break;
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
    clearErrors('agentChecked')
  }
  /**
   * 지면 URL 입력
   * @param event
   */
  const handleMediaUrl = (event) => {
    if(event.target.value !== ''){
      setMediaResistState({
        ...mediaResistState,
        mediaUrl: event.target.value
      })
    } else {
      setMediaResistState({
        ...mediaResistState,
        mediaUrl: 'https://'
      })
      setValue('mediaUrl','https://')
    }
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
        <ListHead>지면 카테고리</ListHead>
        <ListBody>
          <ColSpan1>
            <div>
              <Controller
                name="category1"
                control={controls}
                rules={{
                  required: {
                    value: mediaResistState.category1 === "",
                    message: "카테고리를 선택해주세요."
                  }
                }}
                render={({ field }) =>(
                  <Select options={mediaCategoryOneDepthState}
                          placeholder={'카테고리 선택'}
                          {...field}
                          value={(mediaResistState.category1 !== undefined && mediaResistState.category1.value !== '') ? mediaResistState.category1 : ''}
                          onChange={handleMediaCategoryOneDepth}
                          styles={inputStyle}
                  />
                )}
              />
              {errors.category1 && <ValidationScript>{errors.category1?.message}</ValidationScript>}
            </div>
          </ColSpan1>
          <ColSpan1>
            <div>
              <Select options={mediaCategoryTwoDepthState}
                      placeholder={'하위 카테고리 선택'}
                      isDisabled={mediaResistState.category1 === "" && true}
                      value={(mediaResistState.category2 !== undefined && mediaResistState.category2.value !== '') ? mediaResistState.category2 : ''}
                      onChange={handleMediaCategoryTwoDepth}
                      styles={inputStyle}
              />
            </div>
          </ColSpan1>
        </ListBody>
      </RowSpan>
      <RowSpan>
        <ListHead>디바이스</ListHead>
        <ListBody>
          <Controller name={'deviceType'}
                      control={controls}
                      rules={{
                        required: {
                          value: mediaResistState.deviceType === '',
                          message: "디바이스 유형을 선택해주세요."
                        }
                      }}
                      render={({field}) =>(
                          <>
                            <CustomRadio type={'radio'}
                                         {...field}
                                         id={'pc'}
                                         name={'deviceType'}
                                         checked={'PC' === mediaResistState.deviceType}
                                         onChange={() => handleDeviceType('PC')}
                            />
                            <label htmlFor={'pc'}>PC</label>
                            <CustomRadio type={'radio'}
                                         {...field}
                                         id={'mobile'}
                                         name={'deviceType'}
                                         onChange={() => handleDeviceType('MOBILE')}
                            />
                            <label htmlFor={'mobile'}>모바일 웹</label>
                            <CustomRadio type={'radio'}
                                         {...field}
                                         id={'responsive_web'}
                                         name={'deviceType'}
                                         onChange={() => handleDeviceType( 'RESPONSIVE_WEB')}
                            />
                            <label htmlFor={'responsive_web'}>반응형 웹</label>
                            <CustomRadio type={'radio'}
                                         {...field}
                                         id={'app'}
                                         name={'deviceType'}
                                         onChange={() => handleDeviceType('APP')}
                            />
                            <label htmlFor={'app'}>APP</label>
                          </>) }
          />

          {errors.deviceType && <ValidationScript>{errors.deviceType?.message}</ValidationScript>}
        </ListBody>
      </RowSpan>
      <RowSpan>
        <ListHead>에이전트</ListHead>
        <ListBody>
          <EventSet>
            {(mediaResistState.deviceType === '' || mediaResistState.deviceType === 'PC'|| mediaResistState.deviceType === 'RESPONSIVE_WEB') &&
                  <Controller name={'agentChecked'}
                              control={controls}
                              rules={{
                                required: {
                                  value: mediaResistState.agentTypes?.length === 0,
                                  message: "에이전트 유형을 선택해주세요."
                                }
                              }}
                              render={({field}) =>
                                <Checkbox {...field} label={'PC 웹'} type={'c'} id={'WEB'} isChecked={checked.WEB}
                                          onChange={handleAgentType} inputRef={field.ref}/>}/>
                  }

            {(mediaResistState.deviceType === '' || mediaResistState.deviceType === 'PC') &&
                  <Controller name={'agentChecked'}
                              control={controls}
                              rules={{
                                required: {
                                  value: mediaResistState.agentTypes?.length === 0,
                                  message: "에이전트 유형을 선택해주세요."
                                }
                              }}
                              render={({field}) =>
                                <Checkbox label={'PC 어플리케이션'} type={'c'} id={'WEB_APP'} isChecked={checked.WEB_APP}
                                          {...field}
                                          onChange={handleAgentType}/>}/>
            }

            {(mediaResistState.deviceType === '' || mediaResistState.deviceType === 'MOBILE' || mediaResistState.deviceType === 'RESPONSIVE_WEB') &&
                <Controller name={'agentChecked'}
                        control={controls}
                            rules={{
                              required: {
                                value: mediaResistState.agentTypes?.length === 0,
                                message: "에이전트 유형을 선택해주세요."
                              }
                            }}
                        render={({field}) =>
                          <Checkbox label={'모바일 웹'} type={'c'} id={'MOBILE_WEB'} isChecked={checked.MOBILE_WEB}
                                    {...field}
                                    onChange={handleAgentType}/>}/>
            }

            {(mediaResistState.deviceType === '' || mediaResistState.deviceType !== 'PC') &&
                <Controller name={'agentChecked'}
                            control={controls}
                            rules={{
                              required: {
                                value: mediaResistState.agentTypes?.length === 0,
                                message: "에이전트 유형을 선택해주세요."
                              }
                            }}
                            render={({field}) =>
                                <Checkbox label={'하이브리드 APP'} type={'c'}
                                          {...field}
                                          id={'MOBILE_HYBRID_APP'}
                                          isChecked={checked.MOBILE_HYBRID_APP}
                                          onChange={handleAgentType}/>}/>
            }

            {(mediaResistState.deviceType === '' || mediaResistState.deviceType === 'APP') &&
                <Controller name={'agentChecked'}
                            control={controls}
                            rules={{
                              required: {
                                value: mediaResistState.agentTypes?.length === 0,
                                message: "에이전트 유형을 선택해주세요."
                              }
                            }}
                            render={({field}) =>
                                <Checkbox label={'네이티브 APP'} type={'c'}
                                          {...field}
                                          id={'MOBILE_NATIVE_APP'}
                                          isChecked={checked.MOBILE_NATIVE_APP}
                                          onChange={handleAgentType}/>}/>
            }

          </EventSet>
          {errors.agentChecked && <ValidationScript>{errors.agentChecked?.message}</ValidationScript>}
        </ListBody>
      </RowSpan>
      <RowSpan>
        <ListHead>지면 url<p>(app market url)</p></ListHead>
        <ListBody>
          <InputWiden type={'text'}
                      placeholder={'https://'}
                      onFocus={(e)=> handleMediaUrl(e)}
                      defaultValue={mediaResistState.mediaUrl || ''}
                      {...register("mediaUrl", {
                        required: "사이트 URL 입력해주세요.",
                        pattern:{
                          value:  /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi,
                          message: "http(s)://가 포함된 url 주소를 확인해주세요."
                        },
                        onChange:(e) => handleMediaUrl(e)
                      })}
          />
          {errors.mediaUrl && <ValidationScript>{errors.mediaUrl?.message}</ValidationScript>}
        </ListBody>
      </RowSpan>
      <RowSpan>
        <ListHead>지면 상세 설명<p>(선택입력)</p></ListHead>
        <ListBody>
          <Textarea rows={5}
                    placeholder={''}
                    value={mediaResistState.description || ''}
                    onChange={(e) => handleDescription(e)}
                    onBlur={()=>{
                      setValue('description', mediaResistState.description)
                    }}
          />
          {errors.description && <ValidationScript>{errors.description?.message}</ValidationScript>}
        </ListBody>
      </RowSpan>
    </>
  )
}

const bannerSize = atom([])

function PreviewBanner() {
  const [size] = useAtom(bannerSize)
  return (
    <div style={size?.length !== 0 ? {width: parseInt(size[0]), height: parseInt(size[1])} : null}></div>
  )
}
function AdProductInfo(props) {
  const [mediaResistState, setMediaResistState] = useAtom(MediaResistAtom)
  const [adPreviewSizeInfo, setAdPreviewSizeInfo] = useState(adPreviewSize)
  const [selectBannerSizeName, setSelectBannerSizeName] = useState('')
  const setPreviewBannerSize = useSetAtom(bannerSize)
  const setModal = useSetAtom(modalController)
  const [inventoryTypeState, setInventoryTypeState] = useState(inventoryType)
  const [targetingTypeState, setTargetingTypeState] = useState(null)
  const [exposureInterval] = useState(exposureIntervalType)

  const {controls, errors, setValue, setError} = props
  useEffect(()=>{
    bannerSizeList().then(response => {
        if(response) setAdPreviewSizeInfo(response)
      }
    )
    inventoryTypeList().then(response => {
        if(response) setInventoryTypeState(response)
      }
    )
    targetingTypeList().then(response => {
      if (response) {
        setTargetingTypeState(response)
        setMediaResistState({
          ...mediaResistState,
          allowTargetings: response
        })
        setValue("allowTargetings", response?.map(targetingState => {return {targetingType: targetingState.value, exposureWeight:100}}))
      }
    })
    setValue('productType', mediaResistState.productType)
  },[])


  /**
   * 이벤트 유형 전체선택
   * @param event
   */
  const handleChangeSelectAll = (event) => {
    if (event.target.checked) {
      setMediaResistState({
        ...mediaResistState,
        allowTargetings: targetingTypeState
      })
      setValue("allowTargetings", targetingTypeState.map(targetingState => {return {targetingType: targetingState.value, exposureWeight:100}}))
      setError("targetingChecked",false)
    }else{
      setMediaResistState({
        ...mediaResistState,
        allowTargetings: []
      })
      setValue("allowTargetings", [])
      setError("targetingChecked",{ type: 'required', message: '하나 이상의 타겟팅을 체크해주세요' })
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
        allowTargetings: [...mediaResistState.allowTargetings.concat(targetingTypeState.find(targetingType => targetingType.value === event.target.id))]
      })
      setError("targetingChecked",false)
      setValue("allowTargetings", mediaResistState.allowTargetings.map(allowEvent => {return {targetingType: allowEvent.value, exposureWeight:100}}).concat({targetingType: event.target.id, exposureWeight:100}))
    } else {
      //기존이 전체선택이 아닌경우
      setMediaResistState({
        ...mediaResistState,
        allowTargetings: [...mediaResistState.allowTargetings.filter(allowEvent => allowEvent.value !== event.target.id)]
      })

      if(mediaResistState.allowTargetings?.length < 2) setError("targetingChecked",{ type: 'required', message: '하나 이상의 타겟팅을 체크해주세요' })
      setValue("allowTargetings", mediaResistState.allowTargetings.map(allowEvent => {return {targetingType: allowEvent.value, exposureWeight:100}}).filter(value => value.targetingType !== event.target.id))
    }
  }

  /**
   * 광고유형가이드 선택 (임시 닫음)
   */
  // const handleModalAdTypeGuide = () => {
  //   setModal({
  //     isShow: true,
  //     width: 1320,
  //     modalComponent: () => componentModalAdTypeGuide()
  //   })
  // }

  // const componentModalAdTypeGuide = () => {
  //   return (
  //     <div>
  //       <ModalHeader title={'광고 유형 가이드'}/>
  //       <ModalBody>
  //         <GuideContainer>
  //           <GuideHeader>배너 광고란?</GuideHeader>
  //           <GuideSubject>배너 광고 안내 내용</GuideSubject>
  //           <GuideBody>
  //             <div>
  //               <AdSample/>
  //               <p>광고 예시</p>
  //             </div>
  //           </GuideBody>
  //         </GuideContainer>
  //         <VerticalRule style={{margin: '20px 0'}}/>
  //         <GuideContainer>
  //           <GuideHeader>아이커버 광고란?</GuideHeader>
  //           <GuideSubject>아이커버 안내 내용</GuideSubject>
  //           <GuideBody>
  //             <div>
  //               <AdSample/>
  //               <p>광고 예시</p>
  //             </div>
  //           </GuideBody>
  //         </GuideContainer>
  //       </ModalBody>
  //     </div>
  //   )
  // }

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
                >{item.label.replace('w','').split('(')[0]}</div>
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
    setError('bannerSize', '')
  }

  const selectBannerHover = {
    border: '1px solid #f5811f'
  }

  /**
   * 광고 상품 선택
   * @param event
   */
  const handleProductType = (event) => {

    setMediaResistState({
      ...mediaResistState,
      productType: event.target.id,
      inventoryType: '',
    })
    setValue('productType',event.target.id);
  }

  /**
   * 지면 유형 선택
   * @param inventoryType
   */
  const handleInventoryType = (inventoryType) => {
    setMediaResistState({
      ...mediaResistState,
      inventoryType: inventoryType.value
    })
    setValue('inventoryType', inventoryType.value)
    setError('inventoryType', '')
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
    setError('exposureInterval', '')
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
                  <input type={'radio'} id={data.value} checked={mediaResistState.productType === data.value ? true : false} name={'product'} onChange={handleProductType}/>
                  <label htmlFor={data.value}>{data.label}</label>
                </div>)
            })}
          </ProductSet>
          {/*임시 닫음 <GuideButton type={'button'} onClick={handleModalAdTypeGuide}>광고 유형 가이드</GuideButton>*/}
        </ListBody>
      </RowSpan>
      <RowSpan>
        <ListHead>타겟팅 설정</ListHead>
        <ListBody>
          <EventSet>
            <Controller name={'targetingChecked'}
                        control={controls}
                        rules={{
                          required: {
                            value: mediaResistState.allowTargetings?.length === 0,
                            message: "타겟팅을 설정을 해주세요."
                          }
                        }}
                        render={({field}) =>
                          <Checkbox {...field} label={'전체'} type={'c'} id={'ALL'} isChecked={targetingTypeState != null && (mediaResistState.allowTargetings?.length === targetingTypeState?.length)}
                                    onChange={handleChangeSelectAll} inputRef={field.ref}/>}
            />
            {
              targetingTypeState != null && targetingTypeState.map((data, key)=>{
                return <Controller name={'targetingChecked'}
                                   control={controls}
                                   key={key}
                                   render={({field}) =>
                                     <Checkbox label={data.label} type={'c'} id={data.value} isChecked={mediaResistState.allowTargetings.some(event => event.value === data.value)}
                                               onChange={handleChangeChecked} inputRef={field.ref}/>}
                />
              })
            }
          </EventSet>
          {errors.targetingChecked && <ValidationScript>{errors.targetingChecked?.message}</ValidationScript>}
        </ListBody>
      </RowSpan>
      <RowSpan>
        <ListHead>지면 유형</ListHead>
        <ListBody>
          <ColSpan1>
            <Controller
              name="inventoryType"
              control={controls}
              rules={{
                required: {
                  value: mediaResistState.inventoryType === '',
                  message: "지면 유형을 선택해 주세요."
                }
              }}
              render={({ field }) =>(
                <Select options={(mediaResistState.productType !== undefined && mediaResistState.productType !== '') ? inventoryTypeState.filter(value => (value.value.indexOf(mediaResistState.productType)>-1)) : inventoryTypeState}
                        placeholder={'지면 유형을 선택해 주세요.'}
                        value={(mediaResistState.inventoryType !== undefined && mediaResistState.inventoryType !== '') ? inventoryTypeState.find(obj => obj.value === mediaResistState.inventoryType) : ''}
                        onChange={handleInventoryType}
                        isSearchable={false}
                        styles={inputStyle}
                />
              )}
            />
          </ColSpan1>
          {errors.inventoryType && <ValidationScript>{errors.inventoryType?.message}</ValidationScript>}
        </ListBody>
      </RowSpan>
      {mediaResistState.productType === 'BANNER' &&
        <RowSpan>
          <ListHead>지면 사이즈</ListHead>
          <ListBody>
            <Controller
              name="bannerSize"
              control={controls}
              rules={{
                required: {
                  value: mediaResistState.bannerSize === '',
                  message: "지면 사이즈를 선택해주세요."
                }
              }}
              render={({ field }) =>(
                <SelectBanner>
                  {adPreviewSizeInfo !== null && adPreviewSizeInfo.map((item, key) => {
                    return (
                      <div key={key} data-name={item.label} onClick={handleSelectBanner}
                           style={selectBannerSizeName === item.value ? selectBannerHover : null} data-value={item.value}>
                        <Box style={{
                          width: `${item.value?.replace('IMG', '').split('_')[0] / 6}px`,
                          height: `${item.value?.replace('IMG', '').split('_')[1] / 6}px`
                        }}/>
                        <div>{item.label.replace('w','').split('(')[0]}</div>
                        {selectBannerSizeName === item.value &&
                          <Preview onClick={() => handleModalPreview()}>지면미리보기</Preview>
                        }
                      </div>
                    )
                  })}
                </SelectBanner>
              )}
            />
            {errors.bannerSize && <ValidationScript>{errors.bannerSize?.message}</ValidationScript>}
          </ListBody>
        </RowSpan>
      }
      {mediaResistState.productType === 'POP_UNDER' &&
        <RowSpan>
          <ListHead>노출 간격</ListHead>
          <ListBody>
            <ColSpan1>
              <Controller
                name="exposureInterval"
                control={controls}
                rules={{
                  required: {
                    value: mediaResistState.exposureInterval === '',
                    message: "노출 간격을 선택해주세요."
                  }
                }}
                render={({ field }) =>(
                  <Select options={exposureInterval}
                          placeholder={'선택하세요'}
                          value={(mediaResistState.exposureInterval !== undefined && mediaResistState.exposureInterval !== '') ? mediaResistState.exposureInterval : '0'}
                          onChange={handleExposureInterval}
                          isSearchable={false}
                          styles={inputStyle}
                  />
                )}
              />
            </ColSpan1>
            {errors.exposureInterval && <ValidationScript>{errors.exposureInterval?.message}</ValidationScript>}
          </ListBody>
        </RowSpan>
      }
    </>
  )
}

function MediaAccount(props) {
  const [mediaResistState, setMediaResistState] = useAtom(MediaResistAtom)
  const [calculationAllTypeState] = useState(calculationAllType)
  const {controls, setValue,setError, errors} = props

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
        calculationType: calculationType.value
      }
    })
    setValue('feeCalculation.calculationType',  calculationType.value)
    setError('calculationType','')
  }
  /**
   * 정산방식 값 입력
   * @param calculationValue
   */
  const handleCalculationValue = (value) => {
    let num = removeStr(value)
    let numberNum = Number(num)
    setMediaResistState({
      ...mediaResistState,
      feeCalculation: {
        ...mediaResistState.feeCalculation,
        calculationValue: numberNum
      }
    })
    setValue('feeCalculation.calculationValue', numberNum)
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
          <ColTitle style={{paddingLeft: 0}}><span>계약 날짜</span></ColTitle>
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
                minDate={new Date()}
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
                  value: mediaResistState.feeCalculation.calculationType === '',
                  message: "정산 유형을 선택해주세요."
                }
              }}
              render={({ field }) =>(
                <Select options={calculationAllTypeState.filter((data,index) => index !== 0)}
                        placeholder={'선택하세요'}
                        styles={inputStyle}
                        isSearchable={false}
                        value={(mediaResistState.feeCalculation.calculationType !== undefined && mediaResistState.feeCalculation.calculationType !== '') ? calculationAllTypeState.find(obj => obj.value === mediaResistState.feeCalculation.calculationType) : ''}
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
                  message: handlePlaceholder(mediaResistState.feeCalculation.calculationType)
                }
              }}
              render={({ field }) =>(
                <Input type={'text'}
                       placeholder={handlePlaceholder(mediaResistState.feeCalculation.calculationType)}
                       maxLength={22}
                       style={{color:'#f5811f'}}
                       value={mediaResistState.feeCalculation.calculationValue !== 0 ? decimalFormat(mediaResistState.feeCalculation.calculationValue) : ''}
                       onChange={(e)=>handleCalculationValue(e.target.value)}
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
  const [showNonExposureConfigValue, setShowNonExposureConfigValue] = useState(false)
  const {setValue} = props
  useEffect(()=>{
    setValue('nonExposureConfigType', mediaResistState.nonExposureConfigType)
  },[])
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
          <>
            <input type={'radio'}
                   id={'none'}
                   name={'substitute'}
                   checked={mediaResistState.nonExposureConfigType === 'NONE'}
                   onChange={() => handleNonExposureConfigType('NONE')}
            />
            <label htmlFor={'none'}>없음</label>
          </>
          {mediaResistState.productType === 'BANNER' &&
            <>
              <input type={'radio'}
                     id={'defaultImage'}
                     name={'substitute'}
                     checked={mediaResistState.nonExposureConfigType === 'DEFAULT_BANNER_IMAGE'}
                     onChange={() => handleNonExposureConfigType('DEFAULT_BANNER_IMAGE')}
              />
              <label htmlFor={'defaultImage'}>대체 이미지</label>

              <input type={'radio'}
                     id={'jsonData'}
                     name={'substitute'}
                     checked={mediaResistState.nonExposureConfigType === 'JSON'}
                     onChange={() => handleNonExposureConfigType('JSON')}
              />
              <label htmlFor={'jsonData'}>JSON DATA</label>
            </>
          }
          <input type={'radio'}
                 id={'URL'}
                 name={'substitute'}
                 checked={mediaResistState.nonExposureConfigType === 'URL'}
                 onChange={() => handleNonExposureConfigType('URL')}
          />
          <label htmlFor={'URL'}>URL</label>

          <input type={'radio'}
                 id={'script'}
                 name={'substitute'}
                 checked={mediaResistState.nonExposureConfigType === 'SCRIPT'}
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
  const resetMediaResistAtom = useResetAtom(MediaResistAtom)

  useEffect(() => {
    return()=> {
      resetMediaResistAtom()
      setModal({isShow:false});
    }
  }, []);

  const handleCopyClipBoard = async (text) => {
    console.log(text)

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

  const handleModalRegistration = () => {
    setModal({
      isShow: true,
      width: 1320,
      modalComponent: () => {
        return (
          <div>
            <ModalHeader title={'지면 스크립트 발급 안내'} closeBtn={false} />
            <ModalBody>
              <ScriptSubject>
                <div>지면 등록이 완료되었습니다.<br/>
                  하단 발급된 광고 스크립트를 스크립트 삽인 가이드를 참고하여 표출할 광고 콘텐츠 HTML 영역에 삽입해주세요.
                </div>
                <div>※ 발급된 스크립트 정보는 지면 관리에서 확인 가능합니다.</div>
              </ScriptSubject>
              <GuideContainer>
                <GuideHeader>스크립트 표출</GuideHeader>
                <GuideBody style={{display: 'flex', alignItems: 'center'}}>
                  <pre>스트립트 표출 영역</pre>
                  <CopyCode onClick={() => handleCopyClipBoard('스크립트')}/>
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
  const { register, handleSubmit, control, setValue, setError, formState: { errors }, clearErrors } = useForm();
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
            <MediaInfo register={register} controls={control} setValue={setValue}  setError={setError} clearErrors={clearErrors} errors={errors}/>
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
            <CancelButton type={'button'} onClick={() => navigate('/board/mediaList')}>취소</CancelButton>
            <SubmitButton type={'submit'}>지면 등록</SubmitButton>
          </SubmitContainer>
      </form>
    </main>
  )
}
