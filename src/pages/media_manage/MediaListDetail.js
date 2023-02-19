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
import {Controller, useForm} from "react-hook-form";
import styled from "styled-components";
import Select from "react-select";
import {useState} from "react";
import Checkbox from "../../components/common/Checkbox";
import {adPreviewSize} from "./entity";
import {atom, useAtom} from "jotai/index";
import {modalController} from "../../store";
import {ModalBody, ModalFooter, ModalHeader} from "../../components/modal/Modal";
import {HorizontalRule} from "../../components/common/Common";
import ko from "date-fns/locale/ko";

const bannerSize = atom([])

function PreviewBanner() {
  const [size] = useAtom(bannerSize)
  return (
    <div style={size.length !== 0 ? {width: parseInt(size[0]), height: parseInt(size[1])} : null}></div>
  )
}

function MediaListDetail(){
  const {register ,control, setValue, setError, handleSubmit, formState: { errors }} = useForm()
  const [modal, setModal] = useAtom(modalController)
  const [deviceType, setDeviceType] = useState('PC')
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [checked, setChecked] = useState({
    SAW_THE_PRODUCT: true,
    CART_THE_PRODUCT: true,
    DOMAIN_MATCHING: true
  })
  const [adPreviewSizeInfo] = useState(adPreviewSize)
  const [selectBannerSizeName, setSelectBannerSizeName] = useState('1')
  const [, setPreviewBannerSize] = useAtom(bannerSize)
  const onError = (error) => console.log(error)
  const onSubmit = (data) => {
    console.log(data)
    return null
  }
  const handleDeviceType = (deviceType) => {
    setDeviceType(deviceType)
  }

  /**
   * 이벤트 유형 전체선택
   * @param event
   */
  const handleChangeSelectAll = (event) => {
    if (event.target.checked) {

      setValue("eventChecked", "true")
      setError("eventChecked",false)
    }else{
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

      setValue("eventChecked","true")
      setError("eventChecked",false)
    } else {
      //기존이 전체선택이 아닌경우

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
   * 모달 지면 선택 핸들링
   * @param item
   */
  const handleSelectPreviewBanner = (item) => {
    setPreviewBannerSize(item.value.replace('IMG', '').split('_'))
    setSelectBannerSizeName(item.id)
  }
  /**
   * 지면사이즈 선택 핸들링
   * @param event
   */
  const handleSelectBanner = (event) => {
    console.log(event.target.dataset.value)
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

  return(
    <main>
      <form onSubmit={handleSubmit(onSubmit,onError)}>
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
                    <Controller
                      name="name"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "선택해주세요"
                        }
                      }}
                      render={({ field }) =>(
                        <Select options={[{key:0,value:'value',label:'심사 중'},{key:1,value:'value1',label:'심사 완료'}]}
                                styles={inputStyle}
                                {...field}
                                components={{IndicatorSeparator: () => null}}
                        />
                      )}
                    />
                    {errors.name && <ValidationScript>{errors.name?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan2>
                <ColSpan2/>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>매체 설정</Span2></ColTitle>
                  <div>
                    <Input type={'text'}
                           defaultValue={`인사이트`}
                           {...register('name2',{
                             required:true
                           })}
                    />
                    {errors.name2 && <ValidationScript>{errors.name2?.message}</ValidationScript>}
                  </div>
                </ColSpan2>
                <ColSpan3/>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>지면명</Span2></ColTitle>
                  <div>
                    <Input type={'text'}
                           defaultValue={`인사이트_콘텐츠 플로팅 400*400`}
                           {...register('name3',{
                             required:true
                           })}
                    />
                    {errors.name3 && <ValidationScript>{errors.name3?.message}</ValidationScript>}
                  </div>
                </ColSpan2>
                <ColSpan3/>
              </RowSpan>
              <RowSpan>
                <ColSpan1>
                  <ColTitle><Span2>지면 카테고리</Span2></ColTitle>
                  <div>
                    <Controller
                      name="name"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "선택해주세요"
                        }
                      }}
                      render={({ field }) =>(
                        <Select options={[{key:0,value:'value',label:'카테고리1'},{key:1,value:'value1',label:'카테고리2'}]}
                                placeholder={'카테고리 선택'}
                                styles={inputStyle}
                                {...field}
                                components={{IndicatorSeparator: () => null}}
                        />
                      )}
                    />
                    {errors.select1 && <ValidationScript>{errors.select1?.message}</ValidationScript>}
                  </div>
                </ColSpan1>
                <ColSpan1>
                  <div>
                    <Controller
                      name="name"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "선택해주세요"
                        }
                      }}
                      render={({ field }) =>(
                        <Select options={[{key:0,value:'value',label:'하위 카테고리 1'},{key:1,value:'value1',label:'하위 카테고리 2'}]}
                                placeholder={'하위 카테고리 선택'}
                                styles={inputStyle}
                                {...field}
                                components={{IndicatorSeparator: () => null}}
                        />
                      )}
                    />
                    {errors.select1 && <ValidationScript>{errors.select1?.message}</ValidationScript>}
                  </div>
                </ColSpan1>
                <ColSpan2/>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>디바이스 유형</Span2></ColTitle>
                  <div>
                    <CustomRadio type={'radio'}
                                 id={'pc'}
                                 name={'device-type'}
                                 defaultChecked={true}
                                 onChange={() => handleDeviceType('PC')}
                    />
                    <label htmlFor={'pc'}>PC</label>
                    <CustomRadio type={'radio'}
                                 id={'mobile'}
                                 name={'device-type'}
                                 onChange={() => handleDeviceType('MOBILE')}
                    />
                    <label htmlFor={'mobile'}>MOBILE</label>
                  </div>
                </ColSpan2>
                <ColSpan2/>
              </RowSpan>
              <RowSpan>
                <ColSpan3>
                  <ColTitle><Span2>에이전트 유형</Span2></ColTitle>
                  <div>
                    {deviceType === 'PC' &&
                      <>
                        <input type={'radio'}
                               id={'web'}
                               name={'agent-type'}
                        />
                        <label htmlFor={'web'}>PC 웹</label>
                        <input type={'radio'}
                               id={'application'}
                               name={'agent-type'}
                        />
                        <label htmlFor={'application'}>PC 어플리케이션</label>
                        <input type={'radio'}
                               id={'responsive'}
                               name={'agent-type'}
                        />
                        <label htmlFor={'responsive'}>반응형 웹</label>
                      </>
                    }
                    {deviceType === 'MOBILE' &&
                      <>
                        <input type={'radio'}
                               id={'mobileWeb'}
                               name={'agent-type'}
                        />
                        <label htmlFor={'mobileWeb'}>MOBILE 웹</label>
                        <input type={'radio'}
                               id={'app'}
                               name={'agent-type'}
                        />
                        <label htmlFor={'app'}>앱(APP)</label>
                      </>
                    }
                  </div>
                </ColSpan3>
              </RowSpan>
              <RowSpan>
                <ColSpan4>
                  <ColTitle><Span2>지면 url</Span2><br/><small>(APP market url)</small></ColTitle>
                  <div>
                    <Input type={'text'}
                           defaultValue={`https://mcorpor.com/`}
                           {...register('name4',{
                             required:true
                           })}
                    />
                    {errors.name4 && <ValidationScript>{errors.name4?.message}</ValidationScript>}
                  </div>
                </ColSpan4>
              </RowSpan>
            </BoardSearchDetail>
          </Board>

          {/*광고 상품 정보*/}
          <Board>
            <BoardHeader>광고 상품 정보</BoardHeader>
            <BoardSearchDetail>
              <RowSpan>
                <ColSpan4>
                  <ColTitle><Span2>광고 상품</Span2></ColTitle>
                  <div>
                    <input type={'radio'} id={'banner'} name={'product'} defaultChecked={true}/>
                    <label htmlFor={'banner'}>배너</label>
                    <input type={'radio'} id={'pop'} name={'product'}/>
                    <label htmlFor={'pop'}>팝언더</label>
                    <GuideButton type={'button'}>광고 유형 가이드</GuideButton>
                  </div>
                </ColSpan4>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>이벤트 설정</Span2></ColTitle>
                  <div>
                    <EventSet>
                      <Controller name={'eventChecked'}
                                  control={control}
                                  render={({field}) =>
                                    <Checkbox {...field} title={'전체'} type={'c'} id={'ALL'} isChecked={isCheckedAll}
                                              onMethod={handleChangeSelectAll} inputRef={field.ref}/>}/>

                      <Controller name={'eventChecked'}
                                  control={control}
                                  render={({field}) =>
                                    <Checkbox title={'본상품'} type={'c'} id={'SAW_THE_PRODUCT'} isChecked={checked.SAW_THE_PRODUCT}
                                              onMethod={handleChangeChecked} inputRef={field.ref}/>}/>
                      <Controller name={'eventChecked'}
                                  control={control}품
                                  render={({field}) =>
                                    <Checkbox title={'장바구니'} type={'c'} id={'CART_THE_PRODUCT'} isChecked={checked.CART_THE_PRODUCT}
                                              onMethod={handleChangeChecked} inputRef={field.ref}/>}/>
                      <Controller name={'eventChecked'}
                                  control={control}
                                  render={({field}) =>
                                    <Checkbox title={'리턴 매칭'} type={'c'} id={'DOMAIN_MATCHING'} isChecked={checked.DOMAIN_MATCHING}
                                              onMethod={handleChangeChecked} inputRef={field.ref}/>}/>
                    </EventSet>
                  </div>
                </ColSpan2>
                <ColSpan3/>
              </RowSpan>
              <RowSpan>
                <ColSpan3>
                  <ColTitle><Span2>이벤트 단가 관리</Span2></ColTitle>
                  <CostManageContainer>
                    <ColSpan1>
                      <ColTitle>본상품</ColTitle>
                      <div>
                        <Input type={'text'} defaultValue={100}/>
                      </div>
                    </ColSpan1>
                    <HorizontalRule/>
                    <ColSpan1>
                      <ColTitle>장바구니</ColTitle>
                      <div>
                        <Input type={'text'} readOnly={true}/>
                      </div>
                    </ColSpan1>
                    <HorizontalRule/>
                    <ColSpan1>
                      <ColTitle>리턴매칭</ColTitle>
                      <div>
                        <Input type={'text'} defaultValue={100}/>
                      </div>
                    </ColSpan1>
                  </CostManageContainer>
                </ColSpan3>
              </RowSpan>
              <RowSpan>
                <ColSpan1>
                  <ColTitle><Span2>지면 유형</Span2></ColTitle>
                  <div>
                    <Select
                            placeholder={'선택하세요'}

                            styles={{
                              input: (baseStyles, state) => (
                                {
                                  ...baseStyles,
                                  minWidth: "300px",
                                })
                            }}
                    />
                    {errors.productType && <ValidationScript>{errors.productType?.message}</ValidationScript>}
                  </div>
                </ColSpan1>
                <ColSpan3/>
              </RowSpan>
              <RowSpan>
                <ColSpan4>
                  <ColTitle><Span2>지면 유형</Span2></ColTitle>
                  <div>
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
                  </div>
                </ColSpan4>
              </RowSpan>
            </BoardSearchDetail>
          </Board>

          {/*매체 정산 정보*/}
          <Board>
            <BoardHeader>매체 정산 정보</BoardHeader>
            <BoardSearchDetail>
              <RowSpan>
                <ColSpan4>
                  <ColTitle><Span2>계약 기간</Span2></ColTitle>
                  <div style={{justifyContent: 'space-between'}}>
                    <RelativeDiv>
                      <DateContainer>
                        <CalendarBox>
                          <CalendarIcon/>
                        </CalendarBox>
                        <CustomDatePicker
                          showIcon
                          locale={ko}
                          dateFormat="yyyy-MM-dd"
                          isClearable={false}
                        />
                      </DateContainer>
                    </RelativeDiv>
                    <RelativeDiv>
                      <Controller
                        name="calculationType"
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "정산 유형을 선택해주세요"
                          }
                        }}
                        render={({ field }) =>(
                          <Select styles={inputStyle}
                                  {...field}
                                  components={{IndicatorSeparator: () => null}}
                          />
                        )}
                      />
                    </RelativeDiv>
                    <RelativeDiv style={{position: "relative"}}>
                      <Input type={'text'}
                             placeholder={'단위별 금액 입력'}
                             {...register("calculationTypeValue", {
                               required: "정산 금액을 입력해주세요,",
                               pattern:{
                                 value:  /^[0-9]+$/,
                                 message: "숫자만 입력 가능합니다."
                               }
                             })}
                      />
                      {errors.calculationTypeValue && <ValidationScript>{errors.calculationTypeValue?.message}</ValidationScript>}
                    </RelativeDiv>
                    <RelativeDiv>
                      <Input type={'text'}
                             placeholder={'비고'}
                      />
                    </RelativeDiv>
                  </div>
                </ColSpan4>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>대행사 정산 여부</Span2></ColTitle>
                  <RelativeDiv>
                    <input type={'radio'} name={'isPaid'} id={'nopay'}/>
                    <label htmlFor={'nopay'}>미정산</label>
                    <input type={'radio'} name={'isPaid'} id={'pay'}/>
                    <label htmlFor={'pay'}>정산</label>
                  </RelativeDiv>
                </ColSpan2>
                <ColSpan3/>
              </RowSpan>
              <RowSpan>
                <ColSpan4>
                  <ColTitle><Span2>계약 기간</Span2></ColTitle>
                  <div style={{justifyContent: 'space-between'}}>
                    <RelativeDiv>
                      <DateContainer>
                        <CalendarBox>
                          <CalendarIcon/>
                        </CalendarBox>
                        <CustomDatePicker
                          showIcon
                          locale={ko}
                          dateFormat="yyyy-MM-dd"
                          isClearable={false}
                        />
                      </DateContainer>
                    </RelativeDiv>
                    <RelativeDiv>
                      <Controller
                        name="calculationType"
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "정산 유형을 선택해주세요"
                          }
                        }}
                        render={({ field }) =>(
                          <Select styles={inputStyle}
                                  {...field}
                                  components={{IndicatorSeparator: () => null}}
                          />
                        )}
                      />
                    </RelativeDiv>
                    <RelativeDiv style={{position: "relative"}}>
                      <Input type={'text'}
                             placeholder={'단위별 금액 입력'}
                             {...register("calculationTypeValue", {
                               required: "정산 금액을 입력해주세요,",
                               pattern:{
                                 value:  /^[0-9]+$/,
                                 message: "숫자만 입력 가능합니다."
                               }
                             })}
                      />
                      {errors.calculationTypeValue && <ValidationScript>{errors.calculationTypeValue?.message}</ValidationScript>}
                    </RelativeDiv>
                    <RelativeDiv>
                      <Input type={'text'}
                             placeholder={'비고'}
                      />
                    </RelativeDiv>
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
                <ColSpan2>
                  <ColTitle><Span4>광고 미송출 대체 설정</Span4></ColTitle>
                  <RelativeDiv>
                    <input type={'radio'}
                           id={'defaultImage'}
                           name={'substitute'}
                    />
                    <label htmlFor={'defaultImage'}>대체 이미지</label>
                    <input type={'radio'}
                           id={'jsonData'}
                           name={'substitute'}
                    />
                    <label htmlFor={'jsonData'}>JSON DATA</label>
                    <input type={'radio'}
                           id={'URL'}
                           name={'substitute'}
                    />
                    <label htmlFor={'URL'}>URL</label>
                    <input type={'radio'}
                           id={'script'}
                           name={'substitute'}
                    />
                    <label htmlFor={'script'}>script</label>
                  </RelativeDiv>
                </ColSpan2>
                <ColSpan3/>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>지면 상세 설명</Span4></ColTitle>
                  <RelativeDiv>
                    <Textarea rows={5}
                              placeholder={'미송출시 대체 광고 정보를 입력하세요'}
                    />
                  </RelativeDiv>
                </ColSpan2>
                <ColSpan2/>
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
  padding:5px 20px;
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
