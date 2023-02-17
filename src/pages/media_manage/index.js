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
import {
  adPreviewSize,
  calculationAllType,
  mediaCategoryOneDepthInfo,
  mediaResistInfo,
  mediaSearchInfo, productAllType,
} from "./entity";
import Select from "react-select";
import {
  Board,
  BoardContainer, BoardHeader,
  CalendarBox, CalendarIcon, CancelButton,
  ColSpan1,
  ColSpan2,
  ColTitle, CustomDatePicker,
  DateContainer,
  RowSpan, SubmitButton, SubmitContainer, TitleContainer, ValidationScript
} from "../../assets/GlobalStyles";
import {inputStyle} from "../../assets/GlobalStyles";
import {Controller, useForm} from "react-hook-form";


const MediaResistAtom = atom(mediaResistInfo)
const MediaSearchInfo = atom(mediaSearchInfo)

function ModalMediaResult(props) {
  const [mediaSearchInfo] = useAtom(MediaSearchInfo)
  const [selectedItem, setSelectedItem] = useState({})

  const handleSelect = (item) => {
    setSelectedItem(item)
  }

  const handleSubmit = () => {
    props.onSearch(selectedItem)
  }

  const handleOnSearchKeyword = (e) => {
    props.onSearchKeyword(e)
  }

  const handleSearch = () => {
    props.onResult()
  }
  return (
    <>
      <MediaSearchColumn>
        <div>매체명</div>
        <div>
          <InputGroup>
            <input type={'text'}
                   placeholder={"매체명을 입력해주세요."}
                   defaultValue={props.searchKeyword}
                   onChange={handleOnSearchKeyword}
            />
            <button type={'button'} onClick={handleSearch}>검색</button>
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
                return (
                  <tr key={key}
                      onClick={() => handleSelect(item)}
                      style={selectedItem.siteName === item.siteName ? {
                        backgroundColor: "#f5811f",
                        color: '#fff'
                      } : null}>
                    <td>{item.siteName}</td>
                    <td>{item.memberId}</td>
                    <td>{item.managerName}</td>
                  </tr>
                )
              })}
              </tbody>
            </table>
            <MediaSelectedButton onClick={handleSubmit}>선택 완료</MediaSelectedButton>
          </>
        }
      </MediaSearchResult>
    </>
  )
}

function MediaInfo(props) {
  const [mediaResistState, setMediaResistState] = useAtom(MediaResistAtom)
  const [mediaSearchInfo, setMediaSearchInfo] = useAtom(MediaSearchInfo)
  const [mediaCategoryOneDepthState] = useState(mediaCategoryOneDepthInfo)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [deviceType, setDeviceType] = useState('PC')
  const [, setModal] = useAtom(modalController)
  const {register, controls, setValue, setError, errors} = props
  useEffect(() => {
  }, [mediaResistState])
  /**
   * 모달안에 매체 검색 선택시
   */
  const handleSearchResult = (keyword) => {
    //매체 검색 api 호출
    setMediaSearchInfo(mediaSearchInfo)
  }

  const handleSearchKeyword = (event) => {
    console.log(event.target.value)
    setSearchKeyword(event.target.value)
  }

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
    setValue('siteName', item.siteName);
    setError('siteName','')
  }

  /**
   * 지면 등록 화면 에서 매체검색 버튼 클릭시
   */
  const handleModalComponent = () => {
    setModal({
      isShow: true,
      width: 600,
      modalComponent: () => componentModalMediaSearch()
    })
    setError('')
  }

  const componentModalMediaSearch = () => {
    return (
      <div>
        <ModalHeader title={"매체 검색"}/>
        <ModalBody>
          <ModalMediaResult searchKeyword={searchKeyword} onResult={handleSearchResult} onSearchKeyword={handleSearchKeyword} onSearch={handleMediaSearchSelected}/>
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

  /**
   * 카테고리 1Depth 선택
   * @param category
   */
  const handleMediaCategoryOneDepth = (category) => {
    setMediaResistState({
      ...mediaResistState,
      category: category
    })
    setValue('category', category);
    setError('category','')
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
  }

  /**
   * 에이전트 유형 선택
   * @param agentType
   */
  const handleAgentType = (agentType) => {
    setMediaResistState({
      ...mediaResistState,
      agentType: agentType
    })
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
    <BoardBody>
      <li>
        <ListHead>매체 검색</ListHead>
        <ListBody>
          <input type={'text'}
                 defaultValue={mediaResistState.siteName}
                 placeholder={"매체 검색 버튼을 눌러주세요"}
                 readOnly={true}
                 {...register('siteName',{
                   required: "매체명을 선택해주세요"
                 })}
          />
          <Button type={'button'} onClick={handleModalComponent}>매체 검색</Button>
          {errors.siteName && <ValidationScript>{errors.siteName?.message}</ValidationScript>}
        </ListBody>
      </li>

      <li>
        <ListHead>지면명</ListHead>
        <ListBody>
          <InputWiden type={'text'}
                      placeholder={'지면명을 입력해주세요.'}
                      defaultValue={mediaResistState.inventoryName || ""}
                      onChange={e => handleInventoryName(e)}
                      {...register("inventoryName", {
                        required: "지면명을 입력해주세요"
                      })}
          />
          {errors.inventoryName && <ValidationScript>{errors.inventoryName?.message}</ValidationScript>}
        </ListBody>
      </li>
      <li>
        <ListHead>지면 상세 설명</ListHead>
        <ListBody>
          <Textarea rows={5}
                    placeholder={'지면 상세 정보(최소 20자)'}
                    defaultValue={mediaResistState.description || ''}
                    onChange={(e) => handleDescription(e)}
                    {...register("description", {
                      minLength: {
                        value: 20,
                        message: "20자 이상 입력해주세요"
                      },
                      required: "상세정보를 입력해주세요"
                    })}
          />
          {errors.description && <ValidationScript>{errors.description?.message}</ValidationScript>}
        </ListBody>
      </li>
      <li>
        <ListHead>지면 카테고리</ListHead>
        <ListBody>
          <Controller
            name="category"
            control={controls}
            rules={{
              required: {
                value: mediaResistState.category.value === "",
                message: "카테고리를 선택해주세요"
              }
            }}
            render={({ field }) =>(
            <Select options={mediaCategoryOneDepthState}
                    placeholder={'선택하세요'}
                    {...field}
                    value={(mediaResistState.category !== undefined && mediaResistState.category.value !== '') ? mediaResistState.category : ''}
                    onChange={handleMediaCategoryOneDepth}
                    styles={{
                      input: (baseStyles, state) => (
                        {
                          ...baseStyles,
                          minWidth: "300px",
                        })
                    }}
            />
            )}
          />
          {errors.category && <ValidationScript>{errors.category?.message}</ValidationScript>}
        </ListBody>
      </li>

      <li>
        <ListHead>디바이스 유형</ListHead>
        <ListBody>
          <CustomRadio type={'radio'}
                       id={'pc'}
                       name={'device-type'}
                       onChange={() => handleDeviceType('PC')}
                       defaultChecked={true}
          />
          <label htmlFor={'pc'}>PC</label>
          <CustomRadio type={'radio'}
                       id={'mobile'}
                       name={'device-type'}
                       onChange={() => handleDeviceType('MOBILE')}
          />
          <label htmlFor={'mobile'}>MOBILE</label>
        </ListBody>
      </li>
      <li>
        <ListHead>에이전트 유형</ListHead>
        <ListBody>
          {deviceType === 'PC' &&
            <>
              <input type={'radio'}
                     id={'web'}
                     name={'agent-type'}
                     onChange={() => handleAgentType('WEB')}
                     defaultChecked={mediaResistState.agentType === 'WEB'}
              />
              <label htmlFor={'web'}>PC 웹</label>
              <input type={'radio'}
                     id={'application'}
                     name={'agent-type'}
                     onChange={() => handleAgentType('APPLICATION')}
              />
              <label htmlFor={'application'}>PC 어플리케이션</label>
              <input type={'radio'}
                     id={'responsive'}
                     name={'agent-type'}
                     onChange={() => handleAgentType('RESPONSIVE')}
              />
              <label htmlFor={'responsive'}>반응형 웹</label>
            </>
          }
          {deviceType === 'MOBILE' &&
            <>
              <input type={'radio'}
                     id={'mobileWeb'}
                     name={'agent-type'}
                     onChange={() => handleAgentType('MOBILE_WEB')}
              />
              <label htmlFor={'mobileWeb'}>MOBILE 웹</label>
              <input type={'radio'}
                     id={'app'}
                     name={'agent-type'}
                     onChange={() => handleAgentType('APP')}
              />
              <label htmlFor={'app'}>앱(APP)</label>
            </>
          }
        </ListBody>
      </li>
      <li>
        <ListHead>지면 url</ListHead>
        <ListBody>
          <InputWiden type={'text'}
                      placeholder={'https://'}
                      defaultValue={mediaResistState.mediaUrl || ""}
                      onChange={e => handleMediaUrl(e)}
                      {...register("mediaUrl", {
                        required: "사이트 URL 입력해주세요",
                        pattern:{
                          value:  /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi,
                          message: "http(s)://가 포함된 url 주소를 확인해주세요"
                        }
                      })}
          />
          {errors.mediaUrl && <ValidationScript>{errors.mediaUrl?.message}</ValidationScript>}
        </ListBody>
      </li>
    </BoardBody>
  )
}

const bannerSize = atom([])

function PreviewBanner() {
  const [size] = useAtom(bannerSize)
  return (
    <div style={size.length !== 0 ? {width: parseInt(size[0]), height: parseInt(size[1])} : null}></div>
  )
}

function BannerList(props) {
  const {previewList, selectBannerName} = props
  const [selectedItem, setSelectedItem] = useState({
    id: selectBannerName
  })
  const handleSelect = (item) => {
    props.onMethod(item)
    setSelectedItem(item)
  }
  return (
    <div>
      <PreviewTab>
        {previewList !== undefined && previewList.map((item, key) => {
          console.log(selectBannerName)
          return (
            <div key={key} id={item.id}
                 onClick={() => handleSelect(item)}
                 style={selectedItem.id === item.id ? {border: "1px solid #f5811f", color: "#f5811f"} : null}
            >{item.preview}</div>
          )
        })}
      </PreviewTab>
      <PreviewBody>
        <PreviewBanner/>
      </PreviewBody>
    </div>
  )
}

function AdProductInfo(props) {
  const [mediaResistState, setMediaResistState] = useAtom(MediaResistAtom)
  const [adPreviewSizeInfo] = useState(adPreviewSize)
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [selectBannerSizeName, setSelectBannerSizeName] = useState('1')
  const [, setPreviewBannerSize] = useAtom(bannerSize)
  const [modal, setModal] = useAtom(modalController)
  const [productTypeState] = useState(productAllType)
  const [checked, setChecked] = useState({
    SAW_THE_PRODUCT: true,
    CART_THE_PRODUCT: true,
    DOMAIN_MATCHING: true
  })
  const {register, controls, errors, setValue, setError} = props
  /**
   * 이벤트 유형
   */
  useEffect(() => {
    if (checked.SAW_THE_PRODUCT && checked.CART_THE_PRODUCT && checked.DOMAIN_MATCHING) {
      setIsCheckedAll(true)
    } else {
      setIsCheckedAll(false)
    }
  }, [checked, isCheckedAll]);
  /**
   * 이벤트 유형 전체선택
   * @param event
   */
  const handleChangeSelectAll = (event) => {
    if (event.target.checked) {
      setMediaResistState({
        ...mediaResistState,
        eventType: ['SAW_THE_PRODUCT', 'CART_THE_PRODUCT', 'DOMAIN_MATCHING']
      })
      setValue("eventChecked", "true")
      setError("eventChecked",false)
    }else{
      setMediaResistState({
        ...mediaResistState,
        eventType: []
      })
      setError("eventChecked",{ type: 'required', message: '하나 이상의 이베트를 체크해주세요' })
    }
    setIsCheckedAll(event.target.checked)
    setChecked({
      SAW_THE_PRODUCT: event.target.checked,
      CART_THE_PRODUCT: event.target.checked,
      DOMAIN_MATCHING: event.target.checked
    })
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
        eventType: [...mediaResistState.eventType, event.target.id]
      })
      setValue("eventChecked","true")
      setError("eventChecked",false)
    } else {
      //기존이 전체선택이 아닌경우
      setMediaResistState({
        ...mediaResistState,
        eventType: mediaResistState.eventType.filter((value) => value !== event.target.id)
      })
      setError("eventChecked",{ type: 'required', message: '하나 이상의 이베트를 체크해주세요' })
    }
    //체크박스 핸들링
    if (event.target.id === 'SAW_THE_PRODUCT') {
      setChecked({
        ...checked,
        SAW_THE_PRODUCT: event.target.checked,
      })
      setValue("eventChecked",[event.target.id])
    }
    if (event.target.id === 'CART_THE_PRODUCT') {
      setChecked({
        ...checked,
        CART_THE_PRODUCT: event.target.checked,
      })
      setValue("eventChecked",[event.target.id])
    }
    if (event.target.id === 'DOMAIN_MATCHING') {
      setChecked({
        ...checked,
        DOMAIN_MATCHING: event.target.checked,
      })
      setValue("eventChecked",[event.target.id])
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
    setPreviewBannerSize(item.value.replace('IMG', '').split('_'))
    setSelectBannerSizeName(item.id)
  }

  /**
   * 지면 미리보기 모달
   */
  const handleModalPreview = () => {
    setModal({
      isShow: true,
      width: 1320,
      modalComponent: () => componentModalPreview()
    })
  }

  const componentModalPreview = () => {
    return (
      <div>
        <ModalHeader title={'지면 미리보기'}/>
        <ModalBody>
          <PreviewTab>
            {adPreviewSize !== undefined && adPreviewSize.map((item, key) => {
              return (
                <div key={key} id={item.id}
                     onClick={() => handleSelectPreviewBanner(item)}
                     style={selectBannerSizeName === item.id ? {border: "1px solid #f5811f", color: "#f5811f"} : null}
                >{item.preview}</div>
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
    console.log(event.target.dataset.value)
    setMediaResistState({
      ...mediaResistState,
      bannerSize: event.target.dataset.value
    })
    if (event.target.dataset.name == undefined) {
      setSelectBannerSizeName(event.target.parentElement.dataset.name)
      adPreviewSizeInfo.filter(item => {
        if (item.id === event.target.parentElement.dataset.name) {
          setPreviewBannerSize(item.value.replace('IMG', '').split('_'))
        }
      })
    } else {
      setSelectBannerSizeName(event.target.dataset.name)
      adPreviewSizeInfo.filter(item => {
        if (item.id === event.target.dataset.name) {
          setPreviewBannerSize(item.value.replace('IMG', '').split('_'))
        }
      })
    }
  }

  const selectBannerHover = {
    border: '1px solid #f5811f'
  }

  useEffect(() => {
    if (modal.isShow) {
      handleModalPreview()
    }
  }, [selectBannerSizeName]);
  /**
   * 지면 유형 선택
   * @param productTypeInfo
   */
  const handleProductType = (productTypeInfo) => {
    setMediaResistState({
      ...mediaResistState,
      productType: productTypeInfo
    })
  }


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
            <Controller name={'eventChecked'}
                        control={controls}
                        render={({field}) =>
                          <Checkbox {...field} title={'전체'} type={'c'} id={'ALL'} isChecked={isCheckedAll}
                                    onMethod={handleChangeSelectAll} inputRef={field.ref}/>}/>

            <Controller name={'eventChecked'}
                        control={controls}
                        render={({field}) =>
                          <Checkbox title={'본상품'} type={'c'} id={'SAW_THE_PRODUCT'} isChecked={checked.SAW_THE_PRODUCT}
                                    onMethod={handleChangeChecked} inputRef={field.ref}/>}/>
            <Controller name={'eventChecked'}
                        control={controls}
                        render={({field}) =>
                          <Checkbox title={'장바구니'} type={'c'} id={'CART_THE_PRODUCT'} isChecked={checked.CART_THE_PRODUCT}
                                    onMethod={handleChangeChecked} inputRef={field.ref}/>}/>
            <Controller name={'eventChecked'}
                        control={controls}
                        render={({field}) =>
                          <Checkbox title={'리턴 매칭'} type={'c'} id={'DOMAIN_MATCHING'} isChecked={checked.DOMAIN_MATCHING}
                                    onMethod={handleChangeChecked} inputRef={field.ref}/>}/>
          </EventSet>
          {errors.eventChecked && <ValidationScript>{errors.eventChecked?.message}</ValidationScript>}
        </ListBody>
      </li>
      <li>
        <ListHead>지면 유형</ListHead>
        <ListBody>
          <Select options={productTypeState}
                  placeholder={'선택하세요'}
                  value={(mediaResistState.productType !== undefined && mediaResistState.productType.value !== '') ? mediaResistState.productType : ''}
                  onChange={handleProductType}
                  styles={{
                    input: (baseStyles, state) => (
                      {
                        ...baseStyles,
                        minWidth: "300px",
                      })
                  }}
          />
          {errors.productType && <ValidationScript>{errors.productType?.message}</ValidationScript>}
        </ListBody>
      </li>
      <li>
        <ListHead>지면 사이즈</ListHead>
        <ListBody>
          <SelectBanner>
            {adPreviewSize !== undefined && adPreviewSize.map((item, key) => {
              return (
                <div key={key} data-name={item.id} onClick={handleSelectBanner}
                     style={selectBannerSizeName === item.id ? selectBannerHover : null} data-value={item.value}>
                  <Box style={{
                    width: `${item.value.replace('IMG', '').split('_')[0] / 6}px`,
                    height: `${item.value.replace('IMG', '').split('[ _ | IMG]')[1] / 6}px`
                  }}/>
                  <div>{item.label}</div>
                  {selectBannerSizeName === item.id &&
                    <Preview onClick={() => handleModalPreview("300_150")}>지면미리보기</Preview>
                  }
                </div>
              )
            })}
          </SelectBanner>

          {errors.bannerSize && <ValidationScript>{errors.bannerSize?.message}</ValidationScript>}
        </ListBody>
      </li>
    </BoardBody>
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
    setMediaResistState({
      ...mediaResistState,
      contractStartDate: date
    })
  }
  /**
   * 정산방식 선택
   * @param calculationType
   */
  const handleCalculationType = (calculationType) => {
    setMediaResistState({
      ...mediaResistState,
      calculationType: calculationType
    })
    setValue('calculationType',calculationType)
    setError('calculationType','')
  }
  /**
   * 정산방식 값 입력
   * @param calculationTypeValue
   */
  const handleCalculationTypeValue = (event) => {
    setMediaResistState({
      ...mediaResistState,
      calculationTypeValue: event.target.value
    })
  }
  /**
   * 비고 입력
   * @param event
   */
  const handleCalculationEtc = (event) => {
    setMediaResistState({
      ...mediaResistState,
      calculationEtc: event.target.value
    })
  }

  return (
    <BoardBody>
      <li>
        <RowSpan style={{marginTop: 0, width: '100%', alignItems: 'center'}}>
          <ColSpan1>
            <ColTitle style={{textAlign: 'right'}}><span>시작 날짜</span></ColTitle>
            <div style={{position: "relative"}}>
              <DateContainer>
                <CalendarBox>
                  <CalendarIcon/>
                </CalendarBox>
                <CustomDatePicker
                  showIcon
                  selected={mediaResistState.contractStartDate}
                  onChange={(date) => handleContractDate(date)}
                  locale={ko}
                  dateFormat="yyyy-MM-dd"
                  isClearable={false}
                />
              </DateContainer>
              {errors.contractStartDate && <ValidationScript>{errors.contractStartDate?.message}</ValidationScript>}
            </div>
          </ColSpan1>
          <ColSpan1>
            <ColTitle><span>정산 유형</span></ColTitle>
            <div style={{position: "relative"}}>
              <Controller
                name="calculationType"
                control={controls}
                rules={{
                  required: {
                    value: mediaResistState.calculationType.value === "",
                    message: "정산 유형을 선택해주세요"
                  }
                }}
                render={({ field }) =>(
                  <Select options={calculationAllTypeState}
                          styles={inputStyle}
                          {...field}
                          components={{IndicatorSeparator: () => null}}
                          value={(mediaResistState.calculationType !== undefined && mediaResistState.calculationType.value !== '') ? mediaResistState.calculationType : ''}
                          onChange={handleCalculationType}
                          />
                )}
              />
              {errors.calculationType && <ValidationScript>{errors.calculationType?.message}</ValidationScript>}
            </div>
          </ColSpan1>
          <ColSpan1>
            <ColTitle><span>정산 금액</span></ColTitle>
            <div style={{position: "relative"}}>
              <Input type={'text'}
                     placeholder={'단위별 금액 입력'}
                     defaultValue={mediaResistState.calculationTypeValue}
                     onChange={(e) => handleCalculationTypeValue(e)}
                     {...register("calculationTypeValue", {
                       required: "정산 금액을 입력해주세요,",
                       pattern:{
                         value:  /^[0-9]+$/,
                         message: "숫자만 입력 가능합니다."
                       }
                     })}
              />
              {errors.calculationTypeValue && <ValidationScript>{errors.calculationTypeValue?.message}</ValidationScript>}
            </div>
          </ColSpan1>
          <ColSpan2 style={{textAlign: 'right'}}>
            <ColTitle><span>비고</span></ColTitle>
            <div>
              <Input type={'text'}
                     placeholder={'비고'}
                     value={mediaResistState.calculationEtc}
                     onChange={(e) => handleCalculationEtc(e)}
              />
            </div>
          </ColSpan2>
        </RowSpan>
      </li>
    </BoardBody>
  )
}

function AddInfo() {
  const [mediaResistState, setMediaResistState] = useAtom(MediaResistAtom)
  const [showNoExposedConfigTypeValue, setShowNoExposedConfigTypeValue] = useState(true)
  /**
   * 미송출시 타입 선택
   * @param noExposedConfigType
   */
  const handleNoExposedConfigType = (noExposedConfigType) => {
    if (noExposedConfigType === "DEFAULT_IMAGE") {
      setShowNoExposedConfigTypeValue(false)
    } else {
      setShowNoExposedConfigTypeValue(true)
    }
    setMediaResistState({
      ...mediaResistState,
      noExposedConfigType: noExposedConfigType
    })
  }

  /**
   * 미송출시 데이터 입력
   * @param event
   */
  const handleNoExposedConfigTypeValue = (event) => {
    setMediaResistState({
      ...mediaResistState,
      noExposedConfigTypeValue: event.target.value
    })
  }
  return (
    <BoardBody>
      <li>
        <ListHead>광고 미송출 대체 설정</ListHead>
        <ListBody>
          <input type={'radio'}
                 id={'defaultImage'}
                 name={'substitute'}
                 onChange={() => handleNoExposedConfigType('DEFAULT_IMAGE')}
          />
          <label htmlFor={'defaultImage'}>대체 이미지</label>
          <input type={'radio'}
                 id={'jsonData'}
                 name={'substitute'}
                 onChange={() => handleNoExposedConfigType('JSON_DATA')}
          />
          <label htmlFor={'jsonData'}>JSON DATA</label>
          <input type={'radio'}
                 id={'URL'}
                 name={'substitute'}
                 onChange={() => handleNoExposedConfigType('URL')}
          />
          <label htmlFor={'URL'}>URL</label>
          <input type={'radio'}
                 id={'script'}
                 name={'substitute'}
                 onChange={() => handleNoExposedConfigType('SCRIPT')}
          />
          <label htmlFor={'script'}>script</label>
        </ListBody>
      </li>
      <li>
        <ListHead></ListHead>
        <ListBody>
          {showNoExposedConfigTypeValue &&
            <Textarea rows={5}
                      placeholder={'미송출시 대체 광고 정보를 입력하세요'}
                      value={mediaResistState.noExposedConfigTypeValue}
                      onChange={(e) => handleNoExposedConfigTypeValue(e)}
            />
          }
        </ListBody>
      </li>
    </BoardBody>
  )
}

function MediaManage() {
  const [modal, setModal] = useAtom(modalController)
  const [mediaResistState, setMediaResistState] = useAtom(MediaResistAtom)

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
                <GuideHeader>스크립트 표출</GuideHeader>
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
              <PreviewSubmit onClick={() => setModal({isShow: false})}>확인</PreviewSubmit>
            </ModalFooter>
          </div>
        )
      }
    })
  }
  const { register, handleSubmit, control, setValue, setError, formState: { errors } } = useForm();
  const onError = (error) => console.log(error)
  const onSubmit = (data) => {
    console.log(data)
    handleModalRegistration()
  }
  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <BoardContainer>
          <TitleContainer>
            <h1>지면 관리</h1>
            <Navigator/>
          </TitleContainer>
          <Board>
            <BoardHeader>지면 정보</BoardHeader>
            <MediaInfo register={register} controls={control} setValue={setValue}  setError={setError}errors={errors}/>
          </Board>
          <Board>
            <BoardHeader>광고 상품 정보</BoardHeader>
            <AdProductInfo register={register} controls={control} errors={errors} setValue={setValue} setError={setError}/>
          </Board>
          <Board>
            <BoardHeader>매체 정산 정보</BoardHeader>
            <MediaAccount register={register} controls={control} setValue={setValue} setError={setError} errors={errors}/>
          </Board>
          <Board>
            <BoardHeader>추가 정보 입력(선택)</BoardHeader>
            <AddInfo register={register} errors={errors}/>
          </Board>
          <SubmitContainer>
            <CancelButton>취소</CancelButton>
            <SubmitButton type={'submit'}>지면 등록</SubmitButton>
          </SubmitContainer>
        </BoardContainer>
      </form>
    </main>
  )
}

export default MediaManage

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
const InputWiden = styled('input')`
  margin-right: 15px;
  padding: 0 20px;
  width: 100%;
  height: 45px;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  vertical-align: bottom;
  outline: none;
  &:read-only {
    background-color: #f9fafb;
  }
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
  margin: 0 10px;
  width: 34px;
  height: 24px;
  background-image: url("/assets/images/common/btn_calculate_plus.png");
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
  margin-top: 27px;
  font-size: 13px;
  color: #777777;
`
const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 20px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  outline: none;
  font-size: 14px;
  line-height: 18px;
  color: #a2aab2;
  font-weight: 300;
`

const MediaSearchColumn = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  width: 100%;
  background-color: #f9f9f9;

  & > div:first-child {
    min-width: 70px;
  }

  & > div:last-child {
    width: 100%;
  }
`

const InputGroup = styled.div`
  display: flex;

  & input[type='text'] {
    padding: 0 20px;
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