import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  CalendarBox,
  CalendarIcon,
  CancelButton,
  ColSpan1,
  ColSpan2,
  ColSpan3,
  ColSpan4,
  ColTitle,
  CustomDatePicker,
  DateContainer,
  HandleButton,
  Input,
  inputStyle,
  RelativeDiv,
  RowSpan,
  Span2,
  Span4,
  SubmitButton,
  SubmitContainer,
  ValidationScript
} from "../../assets/GlobalStyles";
import {useForm} from "react-hook-form";
import Select from "react-select";
import {useEffect, useState} from "react";
import Checkbox from "../../components/common/Checkbox";
import {calculationAllType, exposedLimitType, mediaResistInfo} from "./entity/common";
import {atom, useAtom} from "jotai";
import ko from "date-fns/locale/ko";
import {useLocation, useNavigate} from "react-router-dom";
import {eventTypeList, selInventory, updateInventory} from "../../services/mediamanage/InventoryAxios";
import {compareDate, dateFormat} from "../../common/StringUtils";
import {CalculationManageContainer, CostManageContainer, EventSet, Textarea} from "./styles";
import {confirmAllType} from "./entity/medialistdetail";

const MediaInfoAtom = atom(mediaResistInfo)

function MediaListDetail(factory, deps) {
  const [mediaInfoState, setMediaInfoState] = useAtom(MediaInfoAtom);
  const [calculationAllTypeState] = useState(calculationAllType);
  const [examinationStatusState, setExaminationStatusState] = useState();
  const [feeCalculationState, setFeeCalculationState] = useState({
    id: '',
    calculationEtc: '',
    calculationType: '',
    calculationValue: '',
    contractStartDate: new Date(new Date().setDate(new Date().getDate()+1))
  });
  const {handleSubmit, formState: {errors}} = useForm()
  const [eventTypeState, setEventTypeState] = useState([])
  const [confirmAllTypeState] = useState(confirmAllType);
  const [exposedMinuteLimit] = useState(exposedLimitType)
  const [showNoExposedConfigValue, setShowNoExposedConfigValue] = useState(true)
  const [validation, setValidation] = useState({
    eventTypeMessage: '',
    calculationValueMessage:'정산 금액을 입력해주세요'
  })
  const onError = (error) => console.log(error)
  const {state} = useLocation();
  const navigate = useNavigate();
  const onSubmit = () => {
    if (validation.eventTypeMessage === '' && validation.eventTypeMessage !==0) {
      console.log(mediaInfoState)

      updateInventory(mediaInfoState.id,
          {...mediaInfoState,
            inventoryType:mediaInfoState.inventoryType.value,
            allowEvents: mediaInfoState.allowEvents.map(allowEvent => {return {eventType:allowEvent.eventType.value, exposureWeight: allowEvent.exposureWeight}}),
            exposedMinuteLimit: mediaInfoState.exposedMinuteLimit != null ? mediaInfoState.exposedMinuteLimit.value : null
          }
      ).then((response)=> {
        if(response != null){
          alert('지면 정보가 수정되었습니다.');
          navigate('/board/mediaList',{ state: {update:true}})
        }
      })
    } else {
      if(validation.eventTypeMessage ===0){
        setValidation({
          ...validation,
          calculationValueMessage: '정산 금액을 입력해주세요'
        })
      }
    }
    return null
  }
  useEffect(() => {
    selInventory(state).then(response => {
        setMediaInfoState(response);
        setShowNoExposedConfigValue(response.noExposedConfigType !== "DEFAULT_BANNER_IMAGE");
        setExaminationStatusState(response.examinationStatus)
    })
    eventTypeList().then(response =>
        setEventTypeState(response)
    )
  }, [setMediaInfoState,state])

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
  const handleExposeMinuteLimit = (exposedMinuteLimit) => {
    setMediaInfoState({
      ...mediaInfoState,
      exposedMinuteLimit: exposedMinuteLimit
    })
  }

  /**
   * 이벤트 유형 전체선택
   * @param event
   */
  const handleChangeSelectAll = (event) => {
    if(event.target.checked) {
      setMediaInfoState({
        ...mediaInfoState,
        allowEvents: eventTypeState.map(data => {return {eventType:data, exposureWeight:100}})
      });
      setValidation({eventTypeMessage: ''})
    }else {
      setMediaInfoState({
        ...mediaInfoState,
        allowEvents: []
      });
      setValidation({eventTypeMessage: '하나 이상의 이벤트를 체크해주세요'})
    }
  }
  /**
   * 이벤트 유형 선택
   * @param event
   */
  const handleChangeChecked = (event) => {
    //체크가 true일때
    if(event.target.checked){
      setMediaInfoState({
        ...mediaInfoState,
        allowEvents: mediaInfoState.allowEvents.concat({eventType: eventTypeState.find(eventType => eventType.value === event.target.id), exposureWeight:100})
      });
      setValidation({eventTypeMessage: ''})
    }
    else{
      setMediaInfoState({
        ...mediaInfoState,
        allowEvents: mediaInfoState.allowEvents.filter(data => data.eventType.value !== event.target.id)
      });
      if(mediaInfoState.allowEvents.length < 2) setValidation({eventTypeMessage: '하나 이상의 이벤트를 체크해주세요'})
    }
  }
  /**
   * 심사여부 설정
   */
  const handleSelectConfirmType = (examinationStatus) => {
    setMediaInfoState({
      ...mediaInfoState,
      examinationStatus: examinationStatus.value
    })
  }
  /**
   * 정산방식 선택날짜
   * @param date
   */
  const handleContractDate = (date) => {
    if(compareDate(new Date(), new Date(date))) {
      setFeeCalculationState({
        ...feeCalculationState,
        contractStartDate: date
      })
    }
  }
  const handleArrContractDate = (date, index) => {
    if(compareDate(new Date(), new Date(date))) {
      setMediaInfoState({
        ...mediaInfoState,
        feeCalculations: mediaInfoState.feeCalculations.map((e, i) => {
          return (i == index) ? {...e, contractStartDate: date} : e
        })
      })
    }
  }

  /**
   * 정산방식 선택
   * @param calculationType
   */
  const handleCalculationType = (calculationType) => {
    setFeeCalculationState({
      ...feeCalculationState,
      calculationType: calculationType.value
    })
  }

  /**
   * 정산방식 선택
   * @param calculationType
   */
  const handleArrCalculationType = (calculationType, index) => {
    setMediaInfoState({
      ...mediaInfoState,
      feeCalculations: mediaInfoState.feeCalculations.map((e, i) => {
        return (i == index) ? {...e, calculationType: calculationType.value} : e
      })
    })
  }
  /**
   * 정산방식 값 입력
   * @param calculationValue
   */
  const handleCalculationValue = (event) => {
    setValidation({
      ...validation,
      calculationValueMessage: ''
    })
    setFeeCalculationState({
      ...feeCalculationState,
      calculationValue: parseInt(event.target.value)
    })
  }
  /**
   * 정산방식 값 입력
   * @param calculationValue
   */
  const handleArrCalculationValue = (event, index) => {
    setMediaInfoState({
      ...mediaInfoState,
      feeCalculations: mediaInfoState.feeCalculations.map((e, i) => {
        return (i == index) ? {...e,  calculationValue: parseInt(event.target.value)} : e
      })
    })
  }
  /**
   * 비고 입력
   * @param event
   */
  const handleCalculationEtc = (event) => {
    setFeeCalculationState({
      ...feeCalculationState,
      calculationEtc: event.target.value
    })
  }

  /**
   * 비고 입력
   * @param event
   */
  const handleArrCalculationEtc = (event, index) => {
    setMediaInfoState({
      ...mediaInfoState,
      feeCalculations: mediaInfoState.feeCalculations.map((e, i) => {
        return (i == index) ? {...e, calculationEtc: event.target.value} : e
      })
    })
  }

  const handleAllowEvents = (event) => {
    setMediaInfoState({
      ...mediaInfoState,
      allowEvents: [
        ...mediaInfoState.allowEvents.map(allowEvent => (allowEvent.eventType.value === event.target.id) ? {eventType : allowEvent.eventType, exposureWeight: parseInt(event.target.value)} : allowEvent)
      ]
    })
  }

  const addFeeCalculation = () => {
    if(mediaInfoState.feeCalculations.some(data => dateFormat(data.contractStartDate,'YYYYMMDD') === dateFormat(feeCalculationState.contractStartDate,'YYYYMMDD') )) {
      alert('같은 날짜를 추가할수 없습니다.')
    }else{
      setMediaInfoState({
        ...mediaInfoState,
        feeCalculations: mediaInfoState.feeCalculations.concat(feeCalculationState)
      })

      setFeeCalculationState({
        id: '',
        calculationEtc: '',
        calculationType: '',
        calculationValue: 0,
        contractStartDate: new Date(new Date().setDate(new Date().getDate()+1)),
      })
    }
  }
  const removeFeeCalculation = (data, index) => {
    setMediaInfoState({
      ...mediaInfoState,
      feeCalculations: mediaInfoState.feeCalculations.filter((e, i) => i != index)
    })
  }

  /**
   * 미송출시 타입 선택
   * @param noExposedConfigType
   */
  const handleNoExposedConfigType = (noExposedConfigType) => {
    if (noExposedConfigType === "DEFAULT_BANNER_IMAGE") {
      setShowNoExposedConfigValue(false)
    } else {
      setShowNoExposedConfigValue(true)
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
  const handleNoExposedConfigValue = (event) => {
    setMediaInfoState({
      ...mediaInfoState,
      noExposedConfigValue: event.target.value
    })
  }

  return (
    <>
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
                        isDisabled={examinationStatusState !== 'CONFIRMING'}
                        components={{IndicatorSeparator: () => null}}
                        value={confirmAllType.find(data => data.value === mediaInfoState.examinationStatus)}
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
                          placeholder={'지면 상세 정보를 입력해주세요.'}
                          value={mediaInfoState.description || ''}
                          onChange={(e) => handleDescription(e)}

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
                       value={mediaInfoState.category1.label}
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
                       value={mediaInfoState.agentTypes.map(data => data.value).join(', ')}
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
                       value={mediaInfoState.productType === 'BANNER' ? '배너' : '팝언더'}
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
                       value={mediaInfoState.inventoryType.label}
                       readOnly={true}
                />
              </div>
            </ColSpan2>
          </RowSpan>

          {mediaInfoState.productType.value !== 'POP_UNDER' ?
            <RowSpan>
              <ColSpan2>
                <ColTitle><Span2>지면 사이즈</Span2></ColTitle>
                <div>
                  <Input type={'text'}
                         value={mediaInfoState.bannerSize.label}
                         readOnly={true}
                  />
                </div>
              </ColSpan2>
            </RowSpan>
              :
            <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>노출 간격</Span2></ColTitle>
                  <Select options={exposedMinuteLimit}
                          placeholder={'선택하세요'}
                          value={exposedMinuteLimit.find(type => type.value === mediaInfoState.exposedMinuteLimit)}
                          onChange={handleExposeMinuteLimit}
                          styles={inputStyle}
                  />
                </ColSpan2>
              </RowSpan>
          }

          <RowSpan>
            <ColSpan3>
              <ColTitle><Span2>이벤트 설정</Span2></ColTitle>
              <RelativeDiv>
                <EventSet>
                   <Checkbox label={'전체'}
                             type={'c'}
                             id={'ALL'}
                             isChecked={mediaInfoState.allowEvents.length === eventTypeState.length}
                             onChange={handleChangeSelectAll}/>
                  {
                    eventTypeState.map((data, index)=>{
                      return <Checkbox label={data.label}
                                       key={index}
                                       type={'c'}
                                       id={data.value}
                                       isChecked={mediaInfoState.allowEvents.find(event => event.eventType.value === data.value) !== undefined}
                                       onChange={handleChangeChecked}/>
                    })
                  }
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
                {eventTypeState.map((eventState, index) => {
                  return (<div key={index}>
                    <ColTitle>{eventState.label}</ColTitle>
                      <div>
                        <Input type={'number'}
                               maxLength={3}
                               placeholder={'가중치 입력해주세요'}
                               id={eventState.value}
                               disabled={mediaInfoState.allowEvents.find(allowEvent => allowEvent.eventType.value === eventState.value) === undefined}
                               onChange={(e) => handleAllowEvents(e)}
                               onInput={(e) => {
                                 if (e.target.value.length > e.target.maxLength)
                                   e.target.value = e.target.value.slice(0, e.target.maxLength);
                               }}
                        />
                      </div>
                    </div>)
                })}
              </CostManageContainer>
            </ColSpan3>
          </RowSpan>
        </BoardSearchDetail>
      </Board>

        {/*매체 정산 정보*/}
        <Board>
          <BoardHeader>매체 정산 정보</BoardHeader>
          <BoardSearchDetail>
            <CalculationManageContainer>
              <RowSpan>
                  <ColSpan1>
                    <ColTitle style={{textAlign: 'right'}}><span>시작 날짜</span></ColTitle>
                    <div>
                      <DateContainer>
                        <CalendarBox>
                          <CalendarIcon/>
                        </CalendarBox>
                        <CustomDatePicker
                            showIcon
                            selected={new Date(feeCalculationState.contractStartDate)}
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
                    <Select options={calculationAllTypeState.filter((data,i) => i !== 0)}
                            placeholder={'선택하세요'}
                            styles={inputStyle}
                            value={calculationAllType.find(data => data.value === feeCalculationState.calculationType)}
                            components={{IndicatorSeparator: () => null}}
                            onChange={handleCalculationType}
                    />
                  </ColSpan1>
                  <ColSpan1>
                    <ColTitle><span>정산 금액</span></ColTitle>
                    <div>
                      <Input type={'number'}
                             min={0}
                             style={{color:'#f5811f'}}
                             placeholder={0}
                             value={feeCalculationState.calculationValue || ''}
                             onChange={(e) => handleCalculationValue(e)}
액
                      />
                      {errors.calculationValue &&
                          <ValidationScript>{errors.calculationValue?.message}</ValidationScript>}
                    </div>
                  </ColSpan1>
                  <ColSpan1>
                    <ColTitle style={{textAlign: 'right'}}><span>비고</span></ColTitle>
                    <div>
                      <Input type={'text'}
                             placeholder={'비고'}
                             value={feeCalculationState.calculationEtc != null ? feeCalculationState.calculationEtc : ''}
                             onChange={(e) => handleCalculationEtc(e)}
                      />
                    </div>
                  </ColSpan1>
                  <ColSpan1 style={{width:'50px'}}>
                    <HandleButton onClick={()=>addFeeCalculation()}>+</HandleButton>
                  </ColSpan1>
              </RowSpan>
            </CalculationManageContainer>
            <RowSpan>
              <ColSpan4>
                <ColTitle><Span2>계약 기간</Span2></ColTitle>
                <div style={{flexDirection:'column'}}>
                {mediaInfoState.feeCalculations.sort((a,b) => {
                  if(a.contractStartDate>b.contractStartDate) return 1
                  else if (a.contractStartDate<b.contractStartDate) return -1
                  else return 0
                }).map((calculationData, index) =>
                  <RowSpan key={index} style={{width:'100%', padding: '5px', marginTop:0, backgroundColor: '#f9fafb'}}>
                    <ColSpan2>
                      <div style={{position: "relative"}}>
                        <DateContainer>
                          <CalendarBox>
                            <CalendarIcon/>
                          </CalendarBox>
                          <CustomDatePicker
                              showIcon
                              selected={new Date(calculationData.contractStartDate)}
                              onChange={(date) => handleArrContractDate(date, index)}
                              locale={ko}
                              disabled={compareDate(new Date(calculationData.contractStartDate), new Date())}
                              dateFormat="yyyy-MM-dd"
                              isClearable={false}
                          />
                        </DateContainer>
                      </div>
                    </ColSpan2>
                    <ColSpan2>
                      {/*<ColTitle><span>정산 유형</span></ColTitle>*/}
                      <div>
                        <Select options={calculationAllTypeState.filter((data, i) => i !== 0)}
                                styles={inputStyle}
                                components={{IndicatorSeparator: () => null}}
                                value={calculationAllType.find(data => data.value === calculationData.calculationType)}
                                onChange={(e) => handleArrCalculationType(e, index)}
                                isDisabled={compareDate(new Date(calculationData.contractStartDate), new Date())}
                        />
                      </div>
                    </ColSpan2>
                    <ColSpan2>
                      {/*<ColTitle><span>정산 금액</span></ColTitle>*/}
                      <div>
                        <Input type={'number'}
                               min={0}
                               style={{color:'#f5811f'}}
                               placeholder={'단위별 금액 입력'}
                               value={calculationData.calculationValue || ''}
                               onChange={(e) => handleArrCalculationValue(e, index)}
                               disabled={compareDate(new Date(calculationData.contractStartDate), new Date())}

                        />
                        {errors.calculationValue &&
                            <ValidationScript>{errors.calculationValue?.message}</ValidationScript>}
                      </div>
                    </ColSpan2>
                    <ColSpan2>
                      {/*<ColTitle><span>비고</span></ColTitle>*/}
                      <div>
                        <Input type={'text'}
                               placeholder={'비고'}
                               value={calculationData.calculationEtc != null ? calculationData.calculationEtc : ''}
                               onChange={(e) => handleArrCalculationEtc(e, index)}
                               disabled={compareDate(new Date(calculationData.contractStartDate), new Date())}
                        />
                      </div>
                    </ColSpan2>
                    <ColSpan1 style={{width:'40px'}}>
                      {(compareDate(new Date(), new Date(calculationData.contractStartDate))) &&
                        <HandleButton onClick={()=>removeFeeCalculation(calculationData, index)}>-</HandleButton>
                      }
                    </ColSpan1>
                  </RowSpan>
                )}
                </div>
              </ColSpan4>
            </RowSpan>
          </BoardSearchDetail>
        </Board>

      {/*추가 정보 입력*/}
      <Board>
        <BoardHeader>추가 정보 입력</BoardHeader>
        <BoardSearchDetail>
            <RowSpan>
              <ColSpan3>
                <ColTitle style={{marginRight: 10}}><Span4>광고 미송출 대체 설정</Span4></ColTitle>
                <ColSpan2>
                  <input type={'radio'}
                         checked={mediaInfoState.noExposedConfigType === 'DEFAULT_BANNER_IMAGE'}
                         id={'defaultImage'}
                         name={'substitute'}
                         onChange={() => handleNoExposedConfigType('DEFAULT_BANNER_IMAGE')}
                  />
                  <label>대체 이미지</label>
                  <input type={'radio'}
                         checked={mediaInfoState.noExposedConfigType === 'JSON'}
                         id={'jsonData'}
                         name={'substitute'}
                         onChange={() => handleNoExposedConfigType('JSON')}
                  />
                  <label >JSON DATA</label>
                  <input type={'radio'}
                         checked={mediaInfoState.noExposedConfigType === 'URL'}
                         id={'URL'}
                         name={'substitute'}
                         onChange={() => handleNoExposedConfigType('URL')}
                  />
                  <label >URL</label>
                  <input type={'radio'}
                         checked={mediaInfoState.noExposedConfigType === 'SCRIPT'}
                         id={'script'}
                         name={'substitute'}
                         onChange={() => handleNoExposedConfigType('SCRIPT')}
                  />
                  <label >script</label>
                </ColSpan2>
              </ColSpan3>
            </RowSpan>
            <RowSpan>
              <ColSpan4>
                <ColTitle><Span4></Span4></ColTitle>
                <RelativeDiv>
                  {showNoExposedConfigValue &&
                    <Textarea rows={5}
                              placeholder={'미송출시 대체 광고 정보를 입력하세요'}
                              value={mediaInfoState.noExposedConfigValue || ''}
                              onChange={(e) => handleNoExposedConfigValue(e)}
                    />
                  }
                </RelativeDiv>
              </ColSpan4>
            </RowSpan>
          </BoardSearchDetail>
      </Board>
      <SubmitContainer>
        {mediaInfoState.examinationStatus !== "REJECTED" &&
            <>
              <CancelButton onClick={() => navigate('/board/mediaList')}>취소</CancelButton>
              <SubmitButton type={'submit'} onClick={onSubmit}>정보 수정</SubmitButton>
            </>
        }
      </SubmitContainer>
    </>
  )
}

export default MediaListDetail