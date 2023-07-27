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
  InputLabel,
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
import {calculationAllType, exposureIntervalType, mediaResistInfo} from "./entity/common";
import {atom, useAtom} from "jotai";
import ko from "date-fns/locale/ko";
import {useLocation, useNavigate} from "react-router-dom";
import {
  bannerCategoryOneDepthList,
  bannerCategoryTwoDepthList,
  selInventory,
  targetingTypeList,
  updateInventory
} from "../../services/mediamanage/InventoryAxios";
import {compareDate, dateFormat} from "../../common/StringUtils";
import {CalculationManageContainer, CostManageContainer, EventSet, Textarea} from "./styles";
import {confirmAllType} from "./entity/medialistdetail";
import {defaultEnumerates} from "../../components/common/enumerate";

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
  const [targetingTypeState, setTargetingTypeState] = useState([])
  const [confirmAllTypeState] = useState(confirmAllType);
  const [exposureInterval] = useState(exposureIntervalType)
  const [mediaCategoryOneDepthState, setMediaCategoryOneDepthState] = useState([])
  const [mediaCategoryTwoDepthState, setMediaCategoryTwoDepthState] = useState([])
  const [showNonExposureConfigValue, setShowNonExposureConfigValue] = useState(true)
  const [validation, setValidation] = useState({
    targetingTypeMessage: '',
    calculationValueMessage:'정산 금액을 입력해주세요'
  })
  const onError = (error) => console.log(error)
  const {state} = useLocation();
  const navigate = useNavigate();
  const onSubmit = () => {
    if (validation.targetingTypeMessage === '' && validation.targetingTypeMessage !==0) {
      updateInventory(mediaInfoState.id,
          {...mediaInfoState,
            examinationStatus: examinationStatusState,
            inventoryType:mediaInfoState.inventoryType.value,
            allowTargetings: mediaInfoState.allowTargetings.map(allowTargetings => {return {targetingType: allowTargetings.targetingType, exposureWeight: allowTargetings.exposureWeight}}),
            exposureInterval: mediaInfoState.exposureInterval != null ? mediaInfoState.exposureInterval.value : null
          }
      ).then((response)=> {
        if(response != null){
          alert('지면 정보가 수정되었습니다.');
          navigate('/board/mediaList',{ state: {update:true}})
        }
      })
    } else {
      if(validation.targetingTypeMessage ===0){
        setValidation({
          ...validation,
          calculationValueMessage: '정산 금액을 입력해주세요'
        })
      }
    }
    return null
  }

  useEffect(() => {
    if(state === null){
      navigate('/board/mediaList',{ state: {update:true}});
    } else {
      selInventory(state).then(response => {
        setMediaInfoState(response);
        setShowNonExposureConfigValue(response.nonExposureConfigType !== "DEFAULT_BANNER_IMAGE" && response.nonExposureConfigType !== "NONE");
        setExaminationStatusState(response.examinationStatus)
        bannerCategoryOneDepthList().then(r =>
            setMediaCategoryOneDepthState(r)
        )

      })
      targetingTypeList().then(response =>
          setTargetingTypeState(response)
      )
    }
  }, [setMediaInfoState,state])

  useEffect(()=>{
    let category1 = mediaCategoryOneDepthState.find(d=>d.value === mediaInfoState.category1);
    if(category1 != '' && category1 != undefined) {
      bannerCategoryTwoDepthList(category1).then(r=>
        setMediaCategoryTwoDepthState(r)
      )
    }
  },[mediaCategoryOneDepthState])
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
  const handleExposeMinuteLimit = (exposureInterval) => {
    setMediaInfoState({
      ...mediaInfoState,
      exposureInterval: exposureInterval
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
        allowTargetings: targetingTypeState.map(data => {return {targetingType:data.value, exposureWeight:100}})
      });
      setValidation({targetingTypeMessage: ''})
    }else {
      setMediaInfoState({
        ...mediaInfoState,
        allowTargetings: []
      });
      setValidation({targetingTypeMessage: '하나 이상의 타겟팅을 체크해주세요'})
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
        allowTargetings: mediaInfoState.allowTargetings.concat({targetingType: targetingTypeState.find(targetingType => targetingType.value === event.target.id).value, exposureWeight:100})
      });
      setValidation({targetingTypeMessage: ''})
    }
    else{
      setMediaInfoState({
        ...mediaInfoState,
        allowTargetings: mediaInfoState.allowTargetings.filter(data => data.targetingType !== event.target.id)
      });
      if(mediaInfoState.allowTargetings.length < 2) setValidation({targetingTypeMessage: '하나 이상의 타겟팅을 체크해주세요'})
    }
  }
  /**
   * 심사여부 설정
   */
  const handleSelectConfirmType = (examinationStatus) => {
    setExaminationStatusState(examinationStatus.value)
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
          return (i === index) ? {...e, contractStartDate: date} : e
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

  const handleAllowTargetings = (event) => {
    setMediaInfoState({
      ...mediaInfoState,
      allowTargetings: [
        ...mediaInfoState.allowTargetings.map(data => (data.targetingType === event.target.id) ? {targetingType : data.targetingType, exposureWeight: parseInt(event.target.value)} : data)
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
      feeCalculations: mediaInfoState.feeCalculations.filter((e, i) => i !== index)
    })
  }
  function handlePlaceholder (type) {
    switch (type){
      case 'CPM' : case 'CPC' : return '단위별 금액을 입력해주세요.';
      case 'RS' : return '정산 비율을 입력해주세요.';
      case 'GT' : return '개런티 비용을 입력해주세요.';
      default : return '단위별 금액을 입력해주세요.';
    }
  }

  /**
   * 미송출시 타입 선택
   * @param nonExposureConfigType
   */
  const handleNonExposureConfigType = (nonExposureConfigType) => {
    if (nonExposureConfigType === "DEFAULT_BANNER_IMAGE" || nonExposureConfigType === "NONE") {
      setShowNonExposureConfigValue(false)
    } else {
      setShowNonExposureConfigValue(true)
    }
    setMediaInfoState({
      ...mediaInfoState,
      nonExposureConfigType: nonExposureConfigType
    })
  }

  /**
   * 미송출시 데이터 입력
   * @param event
   */
  const handleNonExposureConfigValue = (event) => {
    setMediaInfoState({
      ...mediaInfoState,
      nonExposureConfigValue: event.target.value
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
                        isSearchable={false}
                        value={confirmAllType.find(data => data.value === examinationStatusState) || ""}
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
                       value={mediaInfoState.siteName || ""}
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
                       value={mediaInfoState.inventoryName || ""}
                       readOnly={true}
                />
              </div>
            </ColSpan2>
          </RowSpan>
          <RowSpan>
            <ColSpan2>
              <RowSpan style={{marginTop: 0}}>
                <ColTitle><Span2>지면 카테고리</Span2></ColTitle>
                <ColSpan2>
                  <Input type={'text'}
                         value={mediaCategoryOneDepthState?.find(d=>d.value === mediaInfoState.category1)?.label || ""}
                         readOnly={true}
                  />
                </ColSpan2>
                <ColSpan2>
                  <Input type={'text'}
                         value={mediaCategoryTwoDepthState?.find(d=>d.value === mediaInfoState.category2)?.label || ""}
                         readOnly={true}
                  />
                </ColSpan2>
              </RowSpan>
            </ColSpan2>
          </RowSpan>
          <RowSpan>
            <ColSpan2>
              <ColTitle><Span2>디바이스</Span2></ColTitle>
              <div>
                <Input type={'text'}
                       value={defaultEnumerates.deviceTypeInfo[mediaInfoState.deviceType] || ""}
                       readOnly={true}
                />
              </div>
            </ColSpan2>
          </RowSpan>
          <RowSpan>
            <ColSpan2>
              <ColTitle><Span2>에이전트</Span2></ColTitle>
              <div>
                <Input type={'text'}
                       value={mediaInfoState.agentTypes.map(item => defaultEnumerates.agentTypeInfo[item]).join(', ')}
                       readOnly={true}
                />
              </div>
            </ColSpan2>
          </RowSpan>
          <RowSpan>
            <ColSpan2>
              <ColTitle><Span2>URL</Span2><br/><small>(app market url)</small></ColTitle>
              <div>
                <Input type={'text'}
                       value={mediaInfoState.mediaUrl || ""}
                       readOnly={true}
                />
              </div>
            </ColSpan2>
          </RowSpan>
          <RowSpan>
            <ColSpan2>
              <ColTitle><Span2>지면 상세 설명</Span2><p>(선택입력)</p></ColTitle>
              <RelativeDiv>
                <Textarea rows={5}
                          maxLength={1000}
                          placeholder={''}
                          disabled={mediaInfoState.examinationStatus === "REJECTED"}
                          value={mediaInfoState.description || ''}
                          onChange={(e) => handleDescription(e)}

                />
                {errors.description && <ValidationScript>{errors.description?.message}</ValidationScript>}
              </RelativeDiv>
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
                       value={defaultEnumerates.productTypeInfo[mediaInfoState.productType] || ""}
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
                       value={defaultEnumerates.inventoryTypeInfo[mediaInfoState.inventoryType] || ""}
                       readOnly={true}
                />
              </div>
            </ColSpan2>
          </RowSpan>

          {mediaInfoState.productType !== 'POP_UNDER' ?
            <RowSpan>
              <ColSpan2>
                <ColTitle><Span2>지면 사이즈</Span2></ColTitle>
                <div>
                  <Input type={'text'}
                         value={defaultEnumerates.deleteIMG(mediaInfoState.bannerSize) || ""}
                         readOnly={true}
                  />
                </div>
              </ColSpan2>
            </RowSpan>
              :
            <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>노출 간격</Span2></ColTitle>
                  <Select options={exposureInterval}
                          placeholder={'선택하세요'}
                          value={exposureInterval.find(type => type.value === mediaInfoState.exposureInterval) || ""}
                          isSearchable={false}
                          onChange={handleExposeMinuteLimit}
                          styles={inputStyle}
                  />
                </ColSpan2>
              </RowSpan>
          }

          <RowSpan>
            <ColSpan3>
              <ColTitle><Span2>타겟팅 설정</Span2></ColTitle>
              <RelativeDiv>
                <EventSet>
                   <Checkbox label={'전체'}
                             type={'c'}
                             id={'ALL'}
                             disabled={mediaInfoState.examinationStatus === "REJECTED"}
                             isChecked={mediaInfoState.allowTargetings?.length === targetingTypeState?.length}
                             onChange={handleChangeSelectAll}/>
                  {
                    targetingTypeState.map((data, index)=>{
                      return <Checkbox label={data.label}
                                       key={index}
                                       type={'c'}
                                       disabled={mediaInfoState.examinationStatus === "REJECTED"}
                                       id={data.value}
                                       isChecked={mediaInfoState.allowTargetings.find(event => event?.targetingType === data.value) !== undefined}
                                       onChange={handleChangeChecked}/>
                    })
                  }
                </EventSet>
                {validation.targetingTypeMessage !== '' &&
                  <ValidationScript>{validation.targetingTypeMessage}</ValidationScript>}
              </RelativeDiv>
            </ColSpan3>
            <ColSpan1/>
          </RowSpan>
          <RowSpan>
            <ColSpan3>
              <ColTitle><Span2>타겟팅 가중치</Span2></ColTitle>
              <CostManageContainer>
                {targetingTypeState.map((targetingState, index) => {
                  return (
                    <div key={index}>
                      <Span2>{targetingState.label}</Span2>
                      <div>
                        <InputLabel label={'%'}>
                        <Input type={'number'}
                               maxLength={3}
                               placeholder={'-'}
                               id={targetingState.value}
                               disabled={mediaInfoState.allowTargetings.find(allowTargetings => allowTargetings.targetingType === targetingState.value) === undefined || mediaInfoState.examinationStatus === "REJECTED"}
                               value={mediaInfoState.allowTargetings.find(data => data.targetingType === targetingState.value) ? mediaInfoState.allowTargetings.find(allowTargetings => allowTargetings.targetingType === targetingState.value).exposureWeight: ''}
                               onChange={(e) => handleAllowTargetings(e)}
                               onInput={(e) => {
                                 if (e.target.value.length > e.target.maxLength)
                                   e.target.value = e.target.value.slice(0, e.target.maxLength);
                               }}
                        />
                        </InputLabel>
                      </div>
                    </div>
                  )
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
              {mediaInfoState.examinationStatus !== "REJECTED" &&
              <RowSpan>
                  <ColSpan1>
                    <ColTitle style={{textAlign: 'right'}}>시작 날짜</ColTitle>
                    <div>
                      <DateContainer>
                        <CalendarBox>
                          <CalendarIcon/>
                        </CalendarBox>
                        <CustomDatePicker
                            showIcon
                            selected={new Date(feeCalculationState.contractStartDate)}
                            minDate={new Date().setDate(new Date().getDate()+1)}
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
                            isSearchable={false}
                            onChange={handleCalculationType}
                    />
                  </ColSpan1>
                  <ColSpan1>
                    <ColTitle><span>정산 금액</span></ColTitle>
                    <div>
                      <Input type={'number'}
                             min={0}
                             style={{color:'#f5811f'}}
                             placeholder={handlePlaceholder(feeCalculationState.calculationType)}
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
              }
            </CalculationManageContainer>
            <RowSpan>
              <ColSpan4>
                <ColTitle><Span2>계약 날짜</Span2></ColTitle>
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
                                isSearchable={false}
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
                         id={'none'}
                         name={'substitute'}
                         disabled={mediaInfoState.examinationStatus === "REJECTED"}
                         checked={mediaInfoState.nonExposureConfigType === 'NONE'}
                         onChange={() => handleNonExposureConfigType('NONE')}
                  />
                  <label htmlFor={'none'}>없음</label>
                  <input type={'radio'}
                         checked={mediaInfoState.nonExposureConfigType === 'DEFAULT_BANNER_IMAGE'}
                         id={'defaultImage'}
                         name={'substitute'}
                         disabled={mediaInfoState.examinationStatus === "REJECTED"}
                         onChange={() => handleNonExposureConfigType('DEFAULT_BANNER_IMAGE')}
                  />
                  <label htmlFor={'defaultImage'}>대체 이미지</label>
                  <input type={'radio'}
                         checked={mediaInfoState.nonExposureConfigType === 'JSON'}
                         id={'jsonData'}
                         name={'substitute'}
                         disabled={mediaInfoState.examinationStatus === "REJECTED"}
                         onChange={() => handleNonExposureConfigType('JSON')}
                  />
                  <label htmlFor={'jsonData'}>JSON DATA</label>
                  <input type={'radio'}
                         checked={mediaInfoState.nonExposureConfigType === 'URL'}
                         id={'URL'}
                         name={'substitute'}
                         disabled={mediaInfoState.examinationStatus === "REJECTED"}
                         onChange={() => handleNonExposureConfigType('URL')}
                  />
                  <label htmlFor={'URL'}>URL</label>
                  <input type={'radio'}
                         checked={mediaInfoState.nonExposureConfigType === 'SCRIPT'}
                         id={'script'}
                         name={'substitute'}
                         disabled={mediaInfoState.examinationStatus === "REJECTED"}
                         onChange={() => handleNonExposureConfigType('SCRIPT')}
                  />
                  <label htmlFor={'script'}>script</label>
                </ColSpan2>
              </ColSpan3>
            </RowSpan>
            <RowSpan>
              <ColSpan4>
                <ColTitle><Span4></Span4></ColTitle>
                <RelativeDiv>
                  {showNonExposureConfigValue &&
                    <Textarea rows={5}
                              placeholder={'미송출시 대체 광고 정보를 입력하세요'}
                              value={mediaInfoState.nonExposureConfigValue || ''}
                              onChange={(e) => handleNonExposureConfigValue(e)}
                    />
                  }
                </RelativeDiv>
              </ColSpan4>
            </RowSpan>
          </BoardSearchDetail>
      </Board>
      <SubmitContainer>
        <CancelButton type={'button'} onClick={() => navigate('/board/mediaList')}>취소</CancelButton>
        {mediaInfoState.examinationStatus !== "REJECTED" &&
            <>
              <SubmitButton type={'submit'} onClick={onSubmit}>정보
                수정</SubmitButton>
            </>
        }
        </SubmitContainer>
    </>
  )
}

export default MediaListDetail