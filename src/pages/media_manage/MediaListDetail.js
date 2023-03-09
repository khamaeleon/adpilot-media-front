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
import {
  calculationAllType,
  confirmAllType,
  exposedLimitType,
  mediaResistInfo
} from "./entity";
import {atom, useAtom} from "jotai/index";
import ko from "date-fns/locale/ko";
import {useLocation, useNavigate} from "react-router-dom";
import {
  selInventory,
  updateInventory
} from "../../services/InventoryAxios";

const MediaInfoAtom = atom(mediaResistInfo)

function MediaListDetail(factory, deps) {
  const [mediaInfoState, setMediaInfoState] = useAtom(MediaInfoAtom);
  const [calculationAllTypeState] = useState(calculationAllType);
  const {register, control, setValue, setError, reset, handleSubmit, formState: {errors}} = useForm()
  const [isCheckedAll, setIsCheckedAll] = useState(true);
  const [confirmAllTypeState] = useState(confirmAllType);
  const [exposedMinuteLimit] = useState(exposedLimitType)
  const [shownoExposedConfigValue, setShownoExposedConfigValue] = useState(true)
  const [checked, setChecked] = useState({
    SAW_THE_PRODUCT: false,
    CART_THE_PRODUCT: false,
    DOMAIN_MATCHING: false
  })
  const [validation, setValidation] = useState({
    eventTypeMessage: '',
    calculationValueMessage:'정산 금액을 입력해주세요'
  })
  const onError = (error) => console.log(error)
  const {state} = useLocation();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    //저장이야
    console.log(validation.eventTypeMessage);
    if (validation.eventTypeMessage === '' && validation.eventTypeMessage !==0) {
      // 저장
      updateInventory(mediaInfoState.id, {...mediaInfoState, inventoryType:mediaInfoState.inventoryType.value}).then(()=> {
          alert('지면 정보가 수정되었습니다.');
          navigate('/board/media2')
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
          setMediaInfoState(response.data);
          setChecked({
            SAW_THE_PRODUCT: response.data.allowEvents.find(data => data.eventType === 'SAW_THE_PRODUCT') !== undefined,
            CART_THE_PRODUCT: response.data.allowEvents.find(data => data.eventType === 'CART_THE_PRODUCT') !== undefined,
            DOMAIN_MATCHING: response.data.allowEvents.find(data => data.eventType === 'DOMAIN_MATCHING') !== undefined
          });
          setShownoExposedConfigValue(response.data.noExposedConfigType !== "DEFAULT_BANNER_IMAGE")
    }
    )
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
  const handleExposeMinuteLimit = (exposedMinuteLimit) => {
    console.log(exposedMinuteLimit)
    setMediaInfoState({
      ...mediaInfoState,
      exposedMinuteLimit: exposedMinuteLimit
    })
    setValue('exposedMinuteLimit', exposedMinuteLimit.value)
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
    setIsCheckedAll(event.target.checked)
    setChecked({
      SAW_THE_PRODUCT: event.target.checked,
      CART_THE_PRODUCT: event.target.checked,
      DOMAIN_MATCHING: event.target.checked
    })
    setMediaInfoState({
      ...mediaInfoState,
      allowEvents: event.target.checked ? [{eventType :'SAW_THE_PRODUCT', exposureWeight: 100},{eventType :'CART_THE_PRODUCT', exposureWeight: 100},{eventType :'DOMAIN_MATCHING', exposureWeight: 100}] : []
    });
  }
  /**
   * 이벤트 유형 선택
   * @param event
   */
  const handleChangeChecked = (event) => {
    //체크가 true일때


    switch (event.target.id) {
      case 'SAW_THE_PRODUCT':
        setChecked({
          ...checked,
          SAW_THE_PRODUCT: event.target.checked,
        })
        setMediaInfoState({
          ...mediaInfoState,
          allowEvents: !event.target.checked ?
              mediaInfoState.allowEvents.filter(data => data.eventType !== 'SAW_THE_PRODUCT'):
              mediaInfoState.allowEvents.concat({eventType :'SAW_THE_PRODUCT', exposureWeight: 100})
        });
        break;
      case 'CART_THE_PRODUCT':
        setChecked({
          ...checked,
          CART_THE_PRODUCT: event.target.checked,
        })
        setMediaInfoState({
          ...mediaInfoState,
          allowEvents: !event.target.checked ?
              mediaInfoState.allowEvents.filter(data => data.eventType !== 'CART_THE_PRODUCT'):
              mediaInfoState.allowEvents.concat({eventType :'CART_THE_PRODUCT', exposureWeight: 100})
        });
        break;
      case 'DOMAIN_MATCHING':
        setChecked({
          ...checked,
          DOMAIN_MATCHING: event.target.checked,
        })
        setMediaInfoState({
          ...mediaInfoState,
          allowEvents: !event.target.checked ?
              mediaInfoState.allowEvents.filter(data => data.eventType !== 'DOMAIN_MATCHING'):
              mediaInfoState.allowEvents.concat({eventType :'DOMAIN_MATCHING', exposureWeight: 100})
        });
        break;
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
      calculationType: calculationType.label
    })
    setValue('calculationType', calculationType)
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
    setMediaInfoState({
      ...mediaInfoState,
      calculationValue: parseInt(event.target.value )
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
      allowEvents: [
        ...mediaInfoState.allowEvents.map(data => data.eventType === "SAW_THE_PRODUCT" ?  {eventType : data.eventType, exposureWeight: parseInt(event.target.value)}: data)
      ]
    })

  }

  const handleCartTheProduct = (event) => {
    setMediaInfoState({
      ...mediaInfoState,
      allowEvents: [
        ...mediaInfoState.allowEvents.map(data => data.eventType === "CART_THE_PRODUCT" ?  {eventType : data.eventType, exposureWeight: parseInt(event.target.value)}: data)
      ]
    })
  }

  const handleDomainMatching = (event) => {
    setMediaInfoState({
      ...mediaInfoState,
      allowEvents: [
        ...mediaInfoState.allowEvents.map(data => data.eventType === "DOMAIN_MATCHING" ?  {eventType : data.eventType, exposureWeight: parseInt(event.target.value)}: data)
      ]
    })
  }


  /**
   * 미송출시 타입 선택
   * @param noExposedConfigType
   */
  const handleNoExposedConfigType = (noExposedConfigType) => {
    if (noExposedConfigType === "DEFAULT_BANNER_IMAGE") {
      setShownoExposedConfigValue(false)
    } else {
      setShownoExposedConfigValue(true)
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
                            isDisabled={mediaInfoState.examinationStatus !== 'CONFIRMING'}
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

              {mediaInfoState.productType !== 'POP_UNDER' ?
                <RowSpan>
                  <ColSpan2>
                    <ColTitle><Span2>지면 사이즈</Span2></ColTitle>
                    <div>
                      <Input type={'text'}
                             value={mediaInfoState.bannerSize.value}
                             readOnly={true}
                      />
                    </div>
                  </ColSpan2>
                </RowSpan> :
                  <RowSpan>
                    <ColSpan2>
                      <ColTitle><Span2>노출 간격</Span2></ColTitle>
                      <Select options={exposedMinuteLimit}
                              placeholder={'선택하세요'}
                              value={exposedMinuteLimit.find(type => type.value === mediaInfoState.exposedMinuteLimit)}
                              onChange={handleExposeMinuteLimit}
                              styles={{
                                input: (baseStyles, state) => (
                                    {
                                      ...baseStyles,
                                      minWidth: "300px",
                                    })
                              }}
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
                             disabled={!checked.SAW_THE_PRODUCT}
                             value={checked.SAW_THE_PRODUCT ? mediaInfoState.allowEvents.find(value => value.eventType === "SAW_THE_PRODUCT").exposureWeight:''}
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
                             disabled={!checked.CART_THE_PRODUCT}
                             value={checked.CART_THE_PRODUCT ? mediaInfoState.allowEvents.find(value => value.eventType === "CART_THE_PRODUCT").exposureWeight :'' }
                             onChange={(e) => handleCartTheProduct(e)}
                             onInput={(e) => {
                               if (e.target.value.length > e.target.maxLength)
                                 e.target.value = e.target.value.slice(0, e.target.maxLength);
                             }}
                      />
                    </div>
                    <ColTitle>리턴매칭</ColTitle>
                    <div>
                      <Input type={'number'}정
                             maxLength={3}
                             placeholder={'가중치 입력해주세요'}
                             disabled={!checked.DOMAIN_MATCHING}
                             value={checked.DOMAIN_MATCHING ? mediaInfoState.allowEvents.find(value => value.eventType === "DOMAIN_MATCHING").exposureWeight:''}
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
                        selected={new Date(mediaInfoState.contractStartDate)}
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
                            value={calculationAllType.find(data => data.label === mediaInfoState.calculationType)}
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
                           value={mediaInfoState.calculationValue}
                           onChange={(e) => handleCalculationValue(e)}

                    />
                    {errors.calculationValue &&
                      <ValidationScript>{errors.calculationValue?.message}</ValidationScript>}
                  </div>
                </ColSpan1>
                <ColSpan2 style={{textAlign: 'right'}}>
                  <ColTitle><span>비고</span></ColTitle>
                  <div>
                    <Input type={'text'}
                           placeholder={'비고'}
                           value={mediaInfoState.calculationEtc != null ? mediaInfoState.calculationEtc : ''}
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
                  </RelativeDiv>
                </ColSpan3>
              </RowSpan>
              <RowSpan>
                <ColSpan4>
                  <ColTitle><Span4></Span4></ColTitle>
                  <RelativeDiv>
                    {shownoExposedConfigValue &&
                      <Textarea rows={5}
                                placeholder={'미송출시 대체 광고 정보를 입력하세요'}
                                value={mediaInfoState.noExposedConfigValue}
                                onChange={(e) => handleNoExposedConfigValue(e)}
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
