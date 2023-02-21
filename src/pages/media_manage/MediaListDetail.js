import Navigator from "../../components/common/Navigator";
import {
  Board,
  BoardContainer,
  BoardHeader, BoardSearchDetail, CalendarBox, CalendarIcon, CancelButton, ColSpan1, ColSpan2,
  ColSpan3, ColSpan4,
  ColTitle, CustomDatePicker, DateContainer, Input, inputStyle, RelativeDiv,
  RowSpan, Span2, Span4, SubmitButton, SubmitContainer,
  TitleContainer, ValidationScript
} from "../../assets/GlobalStyles";
import {useForm} from "react-hook-form";
import styled from "styled-components";
import Select from "react-select";
import {useEffect,  useState} from "react";
import Checkbox from "../../components/common/Checkbox";
import {calculationAllType, confirmAllType, mediaResistInfo} from "./entity";
import {atom, useAtom} from "jotai/index";
import ko from "date-fns/locale/ko";
import {useLocation} from "react-router-dom";
import {decimalFormat} from "../../common/StringUtils";

const MediaInfoAtom = atom(mediaResistInfo)

function MediaListDetail(factory, deps) {
  const [mediaInfoState, setMediaInfoState] = useAtom(MediaInfoAtom)
  const [calculationAllTypeState] = useState(calculationAllType)
  const {register, control, setValue, setError, reset, handleSubmit, formState: {errors}} = useForm()
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [confirmAllTypeState] = useState(confirmAllType)
  const [showNoExposedConfigTypeValue, setShowNoExposedConfigTypeValue] = useState(true)
  const [checked, setChecked] = useState({
    SAW_THE_PRODUCT: true,
    CART_THE_PRODUCT: true,
    DOMAIN_MATCHING: true
  })
  const [validation, setValidation] = useState({
    eventTypeMessage: '',
    calculationTypeValueMessage:'정산 금액을 입력해주세요'
  })
  const onError = (error) => console.log(error)
  const {state} = useLocation();
  const onSubmit = (data) => {
    //저장이야
    console.log(mediaInfoState)
    if (validation.eventTypeMessage !== '' && validation.eventTypeMessage !==0) {
      // 저장
    } else {
      if(validation.eventTypeMessage ===0){
        setValidation({
          ...validation,
          calculationTypeValueMessage: '정산 금액을 입력해주세요'
        })
      }
    }
    return null
  }
  useEffect(() => {
    //state 값 받아서 조회 한후 셋해줘
    setMediaInfoState({
      siteName: '디스패치',
      inventoryName: '디스패치_날개배너',
      mediaUrl: 'https://www.dispatch.co.kr/2239628',
      deviceType: 'PC',
      category: {value: 'media', label: '언론사'},
      description: '디스패치 상세 설명이야',
      agentType: 'WEB',
      memberId: 'dispatch',
      pType: 'BANNER',
      eventType: ['SAW_THE_PRODUCT', 'CART_THE_PRODUCT', 'DOMAIN_MATCHING'],
      productType: {value: 'basic', label: '기본'},
      bannerSize: 'IMG100_500',
      calculationType: {id: "1", value: "cpc", label: "CPC"},
      calculationTypeValue: '100',
      contractStartDate: new Date(),
      noExposedConfigType: "DEFAULT_IMAGE",
      noExposedConfigTypeValue: '',
      calculationEtc: '',
      confirmType: {value: 'confirming', label: '심사 중'},
      eventTypeWeight: {
        sawTheProduct: 100,
        cartTheProduct: 100,
        domainMatching: 100
      }
    })
    reset({
      description: '디스패치 상세 설명이야',
      eventType: ['SAW_THE_PRODUCT', 'CART_THE_PRODUCT', 'DOMAIN_MATCHING'],
      calculationTypeValue: '100',
    })
  }, [])

  /**
   * 지면 상세 설명
   * @param event
   */
  const handleDescription = (event) => {
    setMediaInfoState({
      ...mediaInfoState,
      description: event.target.value
    })
  }
  /**
   * 이벤트 유형
   */
  useEffect(() => {
    if (!checked.SAW_THE_PRODUCT && !checked.CART_THE_PRODUCT && !checked.DOMAIN_MATCHING) {
      setIsCheckedAll(false)
      setValidation({eventTypeMessage: '하나 이상의 이베트를 체크해주세요'})
    } else if (checked.SAW_THE_PRODUCT && checked.CART_THE_PRODUCT && checked.DOMAIN_MATCHING) {
      setIsCheckedAll(true)
      setValidation({eventTypeMessage: ''})
    } else {
      setIsCheckedAll(false)
      setValidation({eventTypeMessage: ''})
    }
  }, [checked, isCheckedAll]);

  /**
   * 이벤트 유형 전체선택
   * @param event
   */
  const handleChangeSelectAll = (event) => {
    if (event.target.checked) {
      setMediaInfoState({
        ...mediaInfoState,
        eventType: ['SAW_THE_PRODUCT', 'CART_THE_PRODUCT', 'DOMAIN_MATCHING']
      })
    } else {
      setMediaInfoState({
        ...mediaInfoState,
        eventType: []
      })
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
      setMediaInfoState({
        ...mediaInfoState,
        eventType: [...mediaInfoState.eventType, event.target.id]
      })
    } else {
      //기존이 전체선택이 아닌경우
      setMediaInfoState({
        ...mediaInfoState,
        eventType: mediaInfoState.eventType.filter((value) => value !== event.target.id)
      })
    }
    //체크박스 핸들링
    if (event.target.id === 'SAW_THE_PRODUCT') {
      setChecked({
        ...checked,
        SAW_THE_PRODUCT: event.target.checked,
      })
    }
    if (event.target.id === 'CART_THE_PRODUCT') {
      setChecked({
        ...checked,
        CART_THE_PRODUCT: event.target.checked,
      })

    }
    if (event.target.id === 'DOMAIN_MATCHING') {
      setChecked({
        ...checked,
        DOMAIN_MATCHING: event.target.checked,
      })
    }
  }
  /**
   * 심사여부 설정
   */
  const handleSelectConfirmType = (confirmType) => {
    setMediaInfoState({
      ...mediaInfoState,
      confirmType: confirmType
    })
  }
  /**
   * 정산방식 선택날짜
   * @param date
   */
  const handleContractDate = (date) => {
    setMediaInfoState({
      ...mediaInfoState,
      contractStartDate: date
    })
  }

  /**
   * 정산방식 선택
   * @param calculationType
   */
  const handleCalculationType = (calculationType) => {
    setMediaInfoState({
      ...mediaInfoState,
      calculationType: calculationType
    })
    setValue('calculationType', calculationType)
    setError('calculationType', '')
  }
  /**
   * 정산방식 값 입력
   * @param calculationTypeValue
   */
  const handleCalculationTypeValue = (event) => {
    setValidation({
      ...validation,
      calculationTypeValueMessage: ''
    })
    setMediaInfoState({
      ...mediaInfoState,
      calculationTypeValue: parseInt(event.target.value )
    })
  }
  /**
   * 비고 입력
   * @param event
   */
  const handleCalculationEtc = (event) => {
    setMediaInfoState({
      ...mediaInfoState,
      calculationEtc: event.target.value
    })
  }

  const handleSawTheProduct = (event) => {
    setMediaInfoState({
      ...mediaInfoState,
      eventTypeWeight: {
        ...mediaInfoState.eventTypeWeight,
        sawTheProduct: parseInt(event.target.value)
      }
    })

  }

  const handleCartTheProduct = (event) => {
    setMediaInfoState({
      ...mediaInfoState,
      eventTypeWeight: {
        ...mediaInfoState.eventTypeWeight,
        cartTheProduct: parseInt(event.target.value)
      }
    })
  }

  const handleDomainMatching = (event) => {
    setMediaInfoState({
      ...mediaInfoState,
      eventTypeWeight: {
        ...mediaInfoState.eventTypeWeight,
        domainMatching: parseInt(event.target.value)
      }
    })
  }


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
    setMediaInfoState({
      ...mediaInfoState,
      noExposedConfigType: noExposedConfigType
    })
  }

  /**
   * 미송출시 데이터 입력
   * @param event
   */
  const handleNoExposedConfigTypeValue = (event) => {
    setMediaInfoState({
      ...mediaInfoState,
      noExposedConfigTypeValue: event.target.value
    })
  }


  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <BoardContainer>
          <TitleContainer>
            <h1>지면 관리</h1>
            <Navigator/>
          </TitleContainer>
          {/*지면 정보*/}
          <Board>
            <BoardHeader>지면 정보</BoardHeader>
            <BoardSearchDetail>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>심사 상태</Span2></ColTitle>
                  <RelativeDiv>
                    <Select options={confirmAllTypeState}
                            styles={inputStyle}
                            components={{IndicatorSeparator: () => null}}
                            value={(mediaInfoState.confirmType !== undefined && mediaInfoState.confirmType.value !== '') ? mediaInfoState.confirmType : ''}
                            onChange={handleSelectConfirmType}
                    />
                  </RelativeDiv>
                </ColSpan2>
                <ColSpan2/>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>매체명</Span2></ColTitle>
                  <div>
                    <Input type={'text'}
                           value={mediaInfoState.siteName}
                           readOnly={true}
                    />
                  </div>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>지면명</Span2></ColTitle>
                  <div>
                    <Input type={'text'}
                           value={mediaInfoState.inventoryName}
                           readOnly={true}
                    />
                  </div>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>지면 상세 설명</Span2></ColTitle>
                  <RelativeDiv>
                    <Textarea rows={5}
                              placeholder={'지면 상세 정보(최소 20자)'}
                              defaultValue={mediaInfoState.description || ''}
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
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>지면 카테고리</Span2></ColTitle>
                  <div>
                    <Input type={'text'}
                           value={mediaInfoState.category.label}
                           readOnly={true}
                    />
                  </div>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>디바이스 유형</Span2></ColTitle>
                  <div>
                    <Input type={'text'}
                           value={mediaInfoState.deviceType}
                           readOnly={true}
                    />
                  </div>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>에이전트 유형</Span2></ColTitle>
                  <div>
                    <Input type={'text'}
                           value={mediaInfoState.agentType}
                           readOnly={true}
                    />
                  </div>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>URL</Span2><br/><small>(APP-URL)</small></ColTitle>
                  <div>
                    <Input type={'text'}
                           value={mediaInfoState.mediaUrl}
                           readOnly={true}
                    />
                  </div>
                </ColSpan2>
              </RowSpan>
            </BoardSearchDetail>
          </Board>
          {/*광고 상품 정보*/}
          <Board>
            <BoardHeader>광고 상품 정보</BoardHeader>
            <BoardSearchDetail>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>광고 상품</Span2></ColTitle>
                  <div>
                    <Input type={'text'}
                           value={mediaInfoState.pType === 'BANNER' ? '배너' : '팝언더'}
                           readOnly={true}
                    />
                  </div>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>지면 유형</Span2></ColTitle>
                  <div>
                    <Input type={'text'}
                           value={mediaInfoState.productType.label}
                           readOnly={true}
                    />
                  </div>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>지면 사이즈</Span2></ColTitle>
                  <div>
                    <Input type={'text'}
                           value={mediaInfoState.bannerSize.replace("IMG", '')}
                           readOnly={true}
                    />
                  </div>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan3>
                  <ColTitle><Span2>이벤트 설정</Span2></ColTitle>
                  <RelativeDiv>
                    <EventSet>
                      <Checkbox label={'전체'}
                                type={'c'}
                                id={'ALL'}
                                isChecked={isCheckedAll}
                                onChange={handleChangeSelectAll}
                      />
                      <Checkbox label={'본상품'}
                                type={'c'}
                                id={'SAW_THE_PRODUCT'}
                                isChecked={checked.SAW_THE_PRODUCT}
                                onChange={handleChangeChecked}/>
                      <Checkbox label={'장바구니'}
                                type={'c'}
                                id={'CART_THE_PRODUCT'}
                                isChecked={checked.CART_THE_PRODUCT}
                                onChange={handleChangeChecked}
                      />
                      <Checkbox label={'리턴 매칭'}
                                type={'c'}
                                id={'DOMAIN_MATCHING'}
                                isChecked={checked.DOMAIN_MATCHING}
                                onChange={handleChangeChecked}
                      />
                    </EventSet>
                    {validation.eventTypeMessage !== '' &&
                      <ValidationScript>{validation.eventTypeMessage}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan3>
                <ColSpan1/>
              </RowSpan>
              <RowSpan>
                <ColSpan3>
                  <ColTitle><Span2>이벤트 단가</Span2></ColTitle>
                  <CostManageContainer>
                    <ColTitle>본상품</ColTitle>
                    <div>
                      <Input type={'number'}
                             maxLength={3}
                             placeholder={'가중치 입력해주세요'}
                             value={mediaInfoState.eventTypeWeight.sawTheProduct}
                             onChange={(e) => handleSawTheProduct(e)}
                             onInput={(e) => {
                               if (e.target.value.length > e.target.maxLength)
                                 e.target.value = e.target.value.slice(0, e.target.maxLength);
                             }}
                      />
                    </div>
                    <ColTitle>장바구니</ColTitle>
                    <div>
                      <Input type={'number'}
                             maxLength={3}
                             placeholder={'가중치 입력해주세요'}
                             value={mediaInfoState.eventTypeWeight.cartTheProduct}
                             onChange={(e) => handleCartTheProduct(e)}
                             onInput={(e) => {
                               if (e.target.value.length > e.target.maxLength)
                                 e.target.value = e.target.value.slice(0, e.target.maxLength);
                             }}
                      />
                    </div>
                    <ColTitle>리턴매칭</ColTitle>
                    <div>
                      <Input type={'number'}
                             maxLength={3}
                             placeholder={'가중치 입력해주세요'}
                             value={mediaInfoState.eventTypeWeight.domainMatching}
                             onChange={(e) => handleDomainMatching(e)}
                             onInput={(e) => {
                               if (e.target.value.length > e.target.maxLength)
                                 e.target.value = e.target.value.slice(0, e.target.maxLength);
                             }}
                      />
                    </div>
                  </CostManageContainer>
                </ColSpan3>
              </RowSpan>
            </BoardSearchDetail>
          </Board>
          {/*매체 정산 정보*/}
          <Board>
            <BoardHeader>매체 정산 정보</BoardHeader>
            <BoardSearchDetail>
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
                        selected={mediaInfoState.contractStartDate}
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
                  <div style={{position: "relative"}}>
                    <Select options={calculationAllTypeState}
                            styles={inputStyle}
                            components={{IndicatorSeparator: () => null}}
                            value={(mediaInfoState.calculationType !== undefined && mediaInfoState.calculationType.value !== '') ? mediaInfoState.calculationType : ''}
                            onChange={handleCalculationType}
                    />
                  </div>
                </ColSpan1>
                <ColSpan1>
                  <ColTitle><span>정산 금액</span></ColTitle>
                  <div style={{position: "relative"}}>
                    <Input type={'number'}
                           min={0}
                           placeholder={'단위별 금액 입력'}
                           value={mediaInfoState.calculationTypeValue}
                           onChange={(e) => handleCalculationTypeValue(e)}

                    />
                    {errors.calculationTypeValue &&
                      <ValidationScript>{errors.calculationTypeValue?.message}</ValidationScript>}
                  </div>
                </ColSpan1>
                <ColSpan2 style={{textAlign: 'right'}}>
                  <ColTitle><span>비고</span></ColTitle>
                  <div>
                    <Input type={'text'}
                           placeholder={'비고'}
                           value={mediaInfoState.calculationEtc}
                           onChange={(e) => handleCalculationEtc(e)}
                    />
                  </div>
                </ColSpan2>
              </RowSpan>
            </BoardSearchDetail>
          </Board>

          {/*추가 정보 입력*/}
          <Board>
            <BoardHeader>추가 정보 입력</BoardHeader>
            <BoardSearchDetail>
              <RowSpan>
                <ColSpan3>
                  <ColTitle><Span4>광고 미송출 대체 설정</Span4></ColTitle>
                  <RelativeDiv>
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
                  </RelativeDiv>
                </ColSpan3>
              </RowSpan>
              <RowSpan>
                <ColSpan4>
                  <ColTitle><Span4></Span4></ColTitle>
                  <RelativeDiv>
                    {showNoExposedConfigTypeValue &&
                      <Textarea rows={5}
                                placeholder={'미송출시 대체 광고 정보를 입력하세요'}
                                value={mediaInfoState.noExposedConfigTypeValue}
                                onChange={(e) => handleNoExposedConfigTypeValue(e)}
                      />
                    }
                  </RelativeDiv>
                </ColSpan4>
              </RowSpan>
            </BoardSearchDetail>
          </Board>
          <SubmitContainer>
            <CancelButton>취소</CancelButton>
            <SubmitButton type={'submit'}>정보 수정</SubmitButton>
          </SubmitContainer>
        </BoardContainer>
      </form>
    </main>
  )
}

export default MediaListDetail

const CustomRadio = styled('input')`
  display: none;

  &[type='radio'] + label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 45px;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #ccc;
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

const CostManageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  border-radius: 5px;
  background-color: #f9fafb;

  & div:last-child {
    width: auto;
  }

  & input {
    min-width: 150px;
    color: #f5811f;
  }
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
