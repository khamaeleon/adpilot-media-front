import styled from "styled-components";
import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {BoardSearchResult, ColSpan2, ColSpan4, inputStyle, SearchButton} from "../../assets/GlobalStyles";
import {HorizontalRule, VerticalRule} from "../../components/common/Common";
import ko from "date-fns/locale/ko";
import DatePicker from "react-datepicker";
import moment from "moment";
import React, {useEffect, useState} from "react";
import {
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail, CalendarBox, CalendarIcon,
  ColSpan1, ColSpan3,
  ColTitle, CustomDatePicker, DateContainer, RangePicker,
  RowSpan,
  TitleContainer,
  AgentType
} from "../../assets/GlobalStyles";
import Checkbox from "../../components/common/Checkbox";
import Table from "../../components/table";
import {
  defaultCondition,
  reportsMediaAtom, reportsStaticsAll,
  reportsStaticsInventoryByMedia,
  reportsStaticsInventoryByMediaColumn,
  reportsStaticsInventoryDetail,
  reportsStaticsInventoryDetailColumn,
  reportsStaticsMedia,
  reportsStaticsMediaColumn, reportsStaticsMediaDetail, reportsStaticsMediaDetailColumn
} from "./entity";
import {atom, useAtom} from "jotai/index";
import {
  getLastDay,
  getLastMonth, getLastNinetyDay,
  getLastThirtyDay,
  getLastWeekDay,
  getThisMonth,
  getToDay
} from "../../common/DateUtils";
import {modalController} from "../../store";
import {selectReportsStaticsAll, selectReportsStaticsMedia} from "../../services/ReportsAxios";
import TableDetail from "../../components/table/TableDetail";
import {ModalBody, ModalFooter, ModalHeader} from "../../components/modal/Modal";
import {ReportsDetail} from "./Page";

export function ReportsMediaModal(){
  const today = moment().toDate()
  const tomorrow = moment().add(1, 'd').toDate();
  const [dateRange, setDateRange] = useState([today, tomorrow]);
  const [startDate, endDate] = dateRange;
  const [modal, setModal] = useAtom(modalController)
  const [data, setData] = useState()

  const handleClick = () => {
    console.log('click')
    setModal({
      isShow: true,
      width: 1320,
      modalComponent: () => {
        return (
          <div>
            <ModalHeader title={'일자별 통계'}/>
            <ModalBody>
              <ModalContainer>
                <BoardSearchDetail>
                  {/*line1*/}
                  <RowSpan>
                    <ColSpan1>
                      <ColTitle><span>광고상품</span></ColTitle>
                      <div><Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/></div>
                    </ColSpan1>
                    <ColSpan1>
                      <ColTitle><span>이벤트</span></ColTitle>
                      <div><Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/></div>
                    </ColSpan1>
                    <ColSpan1>
                      <ColTitle><span>외부연동 유무</span></ColTitle>
                      <div><Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/></div>
                    </ColSpan1>
                    <ColSpan1/>
                  </RowSpan>
                  {/*line2*/}
                  <RowSpan>
                    <ColSpan1>
                      <ColTitle><span>디바이스</span></ColTitle>
                      <div><Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/></div>
                    </ColSpan1>
                    <ColSpan3>
                      <ColTitle><span>에이전트 유형</span></ColTitle>
                      <div>
                        <AgentType>
                          <Checkbox label={'전체'} type={'c'} id={'all'} onChange={() => { return null }}/>
                          <Checkbox label={'PC 웹'} type={'c'} id={'pc'} onChange={() => { return null }}/>
                          <Checkbox label={'PC 어플리케이션'} type={'c'} id={'pc-app'} onChange={() => { return null }}/>
                          <Checkbox label={'반응형웹'} type={'c'} id={'responsive'} onChange={() => { return null }}/>
                          <Checkbox label={'MOBILE 웹'} type={'c'} id={'mobile'} onChange={() => { return null }}/>
                          <Checkbox label={'Native App'} type={'c'} id={'native'} onChange={() => { return null }}/>
                          <Checkbox label={'WebApp'} type={'c'} id={'webapp'} onChange={() => { return null }}/>
                        </AgentType>
                      </div>
                    </ColSpan3>
                  </RowSpan>
                  {/*line3*/}
                  <RowSpan>
                    <ColSpan1>
                      <ColTitle><span>기간</span></ColTitle>
                      <div style={{width:'100%'}}>
                        <DateContainer>
                          <CalendarBox>
                            <CalendarIcon/>
                          </CalendarBox>
                          <CustomDatePicker
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(date) => setDateRange(date)}
                            dateFormat="MM월 dd일"
                            locale={ko}
                            isClearable={false}
                          />
                        </DateContainer>
                      </div>
                    </ColSpan1>
                    <ColSpan3>
                      <div>
                        <RangePicker>
                          <div>이번달</div>
                          <HorizontalRule style={{margin: "0 10px"}}/>
                          <div>지난달</div>
                          <HorizontalRule style={{margin: "0 10px"}}/>
                          <div>오늘</div>
                          <HorizontalRule style={{margin: "0 10px"}}/>
                          <div>어제</div>
                          <HorizontalRule style={{margin: "0 10px"}}/>
                          <div>지난7일</div>
                          <HorizontalRule style={{margin: "0 10px"}}/>
                          <div>지난30일</div>
                          <HorizontalRule style={{margin: "0 10px"}}/>
                          <div>지난90일</div>
                          <HorizontalRule style={{margin: "0 10px"}}/>
                          <div>지난 180일</div>
                        </RangePicker>
                      </div>
                    </ColSpan3>
                  </RowSpan>
                </BoardSearchDetail>
                {/*<Table columns={reportsStaticsMediaDetailColumn}*/}
                {/*       data={data}/>*/}
              </ModalContainer>
            </ModalBody>
          </div>
        )
      }
    })
  }

  return (
    <ReportsDetail onClick={(e) => {
      e.stopPropagation()
      handleClick()
    }}/>
  )
}


function ReportsMedia(){
  const [searchCondition, setSearchCondition] = useAtom(reportsMediaAtom)
  const [dataStaticsMedia, setDataStaticsMedia] = useAtom(reportsStaticsMedia)
  const [dateRange, setDateRange] = useState([new Date(getToDay()), new Date(getToDay())]);
  const [startDate, endDate] = dateRange
  const [isCheckedAll, setIsCheckedAll] = useState(false)

  useEffect(() => {
    /* 초기값 fetching */
    async function fetchAndGetList() {
      const data = await selectReportsStaticsMedia(searchCondition);
      console.log(data)
      if(data !== undefined){
        setDataStaticsMedia(data)
      }
    }
    fetchAndGetList()
  }, []);

  useEffect(() => {
    if(searchCondition.agentType.length == 4) {
      setIsCheckedAll(true)
    } else {
      setIsCheckedAll(false)
    }
  }, [searchCondition]);

  /**
   * 에이전트 타입 전체 체크
   * @param event
   */
  const handleChangeCheckAll = (event) => {
    if(event.target.checked){
      setSearchCondition({
        ...searchCondition,
        agentType: ['WEB','WEB_APP','MOBILE_WEB','MOBILE_NATIVE_APP']
      })
    } else{
      setSearchCondition({
        ...searchCondition,
        agentType: []
      })
    }
    setIsCheckedAll(event.target.checked)
    console.log(searchCondition.agentType)
  }
  /**
   * 이벤트 타입 체크
   * @param event
   */
  const handleChangeCheck = (event) => {
    if(event.currentTarget.checked){
      setSearchCondition({
        ...searchCondition,
        agentType: searchCondition.agentType.concat(event.currentTarget.id)
      })
    }else{
      setSearchCondition({
        ...searchCondition,
        agentType: searchCondition.agentType.filter(id => id !== event.currentTarget.id)
      })
    }
  }

  const handleSearchCondition = async() => {
    const result = await selectReportsStaticsMedia()
    console.log(searchCondition)
  }

  /**
   * 날짜 기간 선택
   * @param event
   */
  const handleRangeDate = (rangeType) => {
    if (rangeType === 'thisMonth') {
      setSearchCondition({
        ...searchCondition,
        searchStartDay: getThisMonth().startDay,
        searchEndDay: getThisMonth().endDay
      })
      setDateRange([new Date(getThisMonth().startDay), new Date(getThisMonth().endDay)])
    } else if (rangeType === 'lastMonth') {
      setSearchCondition({
        ...searchCondition,
        searchStartDay: getLastMonth().startDay,
        searchEndDay: getLastMonth().endDay
      })
      setDateRange([new Date(getLastMonth().startDay), new Date(getLastMonth().endDay)])
    } else if (rangeType === 'today') {
      setSearchCondition({
        ...searchCondition,
        searchStartDay: getToDay(),
        searchEndDay: getToDay()
      })
      setDateRange([new Date(), new Date()])
    } else if (rangeType === 'lastDay') {
      setSearchCondition({
        ...searchCondition,
        searchStartDay: getLastDay(),
        searchEndDay: getLastDay()
      })
      setDateRange([new Date(getLastDay()), new Date(getLastDay())])
    } else if (rangeType === 'lastWeekDay') {
      setSearchCondition({
        ...searchCondition,
        searchStartDay: getLastWeekDay().startDay,
        searchEndDay: getLastWeekDay().endDay
      })
      setDateRange([new Date(getLastWeekDay().startDay), new Date(getLastWeekDay().endDay)])
    } else if (rangeType === 'lastThirtyDay') {
      setSearchCondition({
        ...searchCondition,
        searchStartDay: getLastThirtyDay().startDay,
        searchEndDay: getLastThirtyDay().endDay
      })
      setDateRange([new Date(getLastThirtyDay().startDay), new Date(getLastThirtyDay().endDay)])
    } else if (rangeType === 'lastNinetyDay') {
      setSearchCondition({
        ...searchCondition,
        searchStartDay: getLastNinetyDay().startDay,
        searchEndDay: getLastNinetyDay().endDay
      })
      setDateRange([new Date(getLastNinetyDay().startDay), new Date(getLastNinetyDay().endDay)])
    }
    //call 때려
  }
  /**
   * 광고 상품 선택
   * @param event
   */
  const handleChangeProductType = (type) => {
    setSearchCondition({
      ...searchCondition,
      productType: type
    })
  }

  /**
   * 이벤트 타입 선택
   * @param event
   */
  const handleChangeEventType = (type) => {
    setSearchCondition({
      ...searchCondition,
      eventType: type
    })
  }

  /**
   * 외부 연동 유무 선택
   * @param event
   */
  const handleChangeIsAdExchange = (type) => {
    setSearchCondition({
      ...searchCondition,
      isAdExchange: type
    })
  }

  /**
   * 디바이스 타입 선택
   * @param event
   */
  const handleChangeDeviceType = (type) => {
    setSearchCondition({
      ...searchCondition,
      deviceType: type
    })
  }

  /**
   * 아코디언 데이타 페칭
   * @param event
   */
  const handleFetchDetailData = ({accountId}) => {

  }

  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>보고서</h1>
          <Navigator/>
        </TitleContainer>
        <Board>
          <BoardHeader>매체별 보고서</BoardHeader>
          <BoardSearchDetail>
            {/*line1*/}
            <RowSpan>
              <ColSpan1>
                <ColTitle><span>광고상품</span></ColTitle>
                <div>
                  <Select styles={inputStyle}
                          placeholder={'선택하세요'}
                          value={searchCondition.productType}
                          options={defaultCondition.productType}
                          onChange={handleChangeProductType}
                          components={{IndicatorSeparator: () => null}}/>
                </div>
              </ColSpan1>
              <ColSpan1>
                <ColTitle><span>이벤트</span></ColTitle>
                <div>
                  <Select styles={inputStyle}
                          placeholder={'선택하세요'}
                          value={searchCondition.eventType}
                          options={defaultCondition.eventType}
                          onChange={handleChangeEventType}
                          components={{IndicatorSeparator: () => null}}/>
                </div>
              </ColSpan1>
              <ColSpan1>
                <ColTitle><span>외부연동 유무</span></ColTitle>
                <div>
                  <Select styles={inputStyle}
                          placeholder={'선택하세요'}
                          value={searchCondition.isAdExchange}
                          options={defaultCondition.isAdExchange}
                          onChange={handleChangeIsAdExchange}
                          components={{IndicatorSeparator: () => null}}/>
                </div>
              </ColSpan1>
              <ColSpan1/>
            </RowSpan>
            {/*line2*/}
            <RowSpan>
              <ColSpan1>
                <ColTitle><span>디바이스</span></ColTitle>
                <div>
                  <Select styles={inputStyle}
                          placeholder={'선택하세요'}
                          value={searchCondition.deviceType}
                          options={defaultCondition.deviceType}
                          onChange={handleChangeDeviceType}
                          components={{IndicatorSeparator: () => null}}/>
                </div>
              </ColSpan1>
              <ColSpan3>
                <ColTitle><span>에이전트 유형</span></ColTitle>
                <div>
                  <AgentType>
                    <Checkbox label={'전체'}
                              type={'c'}
                              id={'all'}
                              isChecked={isCheckedAll}
                              onChange={handleChangeCheckAll}
                    />
                    <Checkbox label={'PC 웹'}
                              type={'c'}
                              id={'WEB'}
                              isChecked={searchCondition.agentType.includes('WEB') ? true : false}
                              onChange={handleChangeCheck}/>
                    <Checkbox label={'PC 어플리케이션'}
                              type={'c'}
                              id={'WEB_APP'}
                              isChecked={searchCondition.agentType.includes('WEB_APP') ? true : false}
                              onChange={handleChangeCheck}/>
                    <Checkbox label={'모바일 웹'}
                              type={'c'}
                              id={'MOBILE_WEB'}
                              isChecked={searchCondition.agentType.includes('MOBILE_WEB') ? true : false}
                              onChange={handleChangeCheck}/>
                    <Checkbox label={'모바일 어플리케이션'}
                              type={'c'}
                              id={'MOBILE_NATIVE_APP'}
                              isChecked={searchCondition.agentType.includes('MOBILE_NATIVE_APP') ? true : false}
                              onChange={handleChangeCheck}/>
                  </AgentType>
                </div>
              </ColSpan3>
            </RowSpan>
            {/*line3*/}
            <RowSpan>
              <ColSpan2>
                <ColTitle><span>기간</span></ColTitle>
                <div style={{width:'100%'}}>
                  <DateContainer>
                    <CalendarBox>
                      <CalendarIcon/>
                    </CalendarBox>
                    <CustomDatePicker
                      selectsRange={true}
                      startDate={startDate}
                      endDate={endDate}
                      onChange={(date) => setDateRange(date)}
                      dateFormat="yyyy-MM-dd"
                      locale={ko}
                      isClearable={false}
                    />
                  </DateContainer>
                </div>
              </ColSpan2>
              <ColSpan4>
                <div>
                  <RangePicker>
                    <div onClick={() => handleRangeDate('thisMonth')}>이번달</div>
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div onClick={() => handleRangeDate('lastMonth')}>지난달</div>
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div onClick={() => handleRangeDate('today')}>오늘</div>
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div onClick={() => handleRangeDate('lastDay')}>어제</div>
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div onClick={() => handleRangeDate('lastWeekDay')}>지난7일</div>
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div onClick={() => handleRangeDate('lastThirtyDay')}>지난30일</div>
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div onClick={() => handleRangeDate('lastNinetyDay')}>지난90일</div>
                  </RangePicker>
                </div>
              </ColSpan4>
              <ColSpan1/>
            </RowSpan>
          </BoardSearchDetail>
          <BoardSearchResult>
            <TableDetail columns={reportsStaticsMediaColumn}
                         data={dataStaticsMedia.rows}
                         detailData={handleFetchDetailData}
                         detailColumn={reportsStaticsInventoryByMediaColumn}
                         idProperty={'accountId'}
                         footer={dataStaticsMedia}/>
          </BoardSearchResult>
        </Board>
      </BoardContainer>
    </main>
  )
}

export default ReportsMedia

const ModalContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
`