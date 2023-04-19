import Navigator from "../../components/common/Navigator";
import {
  BigPrice,
  BoardContainer,
  CenteredInfo,
  ChartContainer,
  ChartLabel,
  ColoredBox,
  DailyBoard,
  DashBoardBody,
  DashBoardBodyColSpan,
  DashBoardCard,
  DashBoardColSpan2,
  DashBoardHeader,
  DashBoardWrap,
  LastThirtyDaysItem,
  PieChart,
  PieChartCentered,
  PieChartContainer,
  PieChartTap,
  Price,
  RevenueBoard,
  Rating,
  RowSpan,
  TitleContainer
} from "../../assets/GlobalStyles";
import {ResponsivePie} from '@nivo/pie'
import {ResponsiveBar} from "@nivo/bar";
import React, {useEffect, useState} from "react";
import {VerticalRule} from "../../components/common/Common";
import {atom, useAtom, useAtomValue, useSetAtom} from "jotai";
import {mediaSearchInfo} from "../media_manage/entity/common";
import {SearchUser} from "../../components/common/SearchUser";
import {lastMonthAtom, revenuePeriodAtom, revenueAtom, revenueShareAtom, thisMonthAtom} from "./entity";
import {
  dashboardLastMonth,
  dashboardPeriodStatus,
  dashboardRevenue,
  dashboardRevenueShare,
  dashboardThisMonth
} from "../../services/dashboard/DashboardAdminAxios";
import {AdminInfo, UserInfo} from "../layout";
import {decimalFormat} from "../../common/StringUtils";
import {tokenResultAtom} from "../login/entity";
import {accountUserProfile} from "../../services/account/AccountAdminAxios";
import {
  dashboardUserLastMonth,
  dashboardUserPeriodStatus,
  dashboardUserRevenue,
  dashboardUserRevenueShare,
  dashboardUserThisMonth
} from "../../services/dashboard/DashboardUserAxios";

export const MediaSearchInfo = atom(mediaSearchInfo)
const percentage = (x,y) => {
  return x ? (((y / x) * 100) - 100).toFixed(2) : 0
}

const activeBottomStyle = {borderBottom:'4px solid #f5811f'}
const activeRightStyle = {borderRight: activeBottomStyle.borderBottom, color: '#f5811f'}
/** 수익금현황 **/
function RevenueStatus (props) {
  const {role, userId} = props
  const [revenue, setRevenue] = useAtom(revenueAtom)
  useEffect(() => {
    if(role === 'NORMAL'){
      console.log(role,userId)
      dashboardUserRevenue(userId).then(response => {
        if(response){
          setRevenue(response)
        }
      })
    } else {
      dashboardRevenue().then(response => {
        if(response){
          setRevenue(response)
        }
      })
    }

  }, [userId]);

  const getAmountRate =() => {
    if(revenue.todayAmount > revenue.yesterdayAmount) {
      return {transform: 'rotate(180deg)'}
    } else if (revenue.todayAmount === revenue.yesterdayAmount) {
      return {background: 'none'}
    }
  }

  const amountData = [
    {name:'어제',value:revenue.yesterdayAmount},
    {name:'지난7일',value:revenue.last7daysAmount},
    {name:'이번달',value:revenue.thisMonthAmount},
  ]

  return(
    <DashBoardCard>
      <DashBoardHeader>수익금 현황</DashBoardHeader>
      <DashBoardBody>
        <RevenueBoard>
          <div>오늘</div>
          <div>
            <div><span className={'won'}>{decimalFormat(revenue.todayAmount)}</span></div>
            <Rating className={'pct'} ><span style={getAmountRate()} />{percentage(revenue.yesterdayAmount, revenue.todayAmount)}</Rating>
          </div>
        </RevenueBoard>
        <DailyBoard>
          {amountData.map((item, key) => {
            return (
              <div key={key}>
                <div>{item.name}</div>
                <Price className={'won'}>{decimalFormat(item.value)}</Price>
              </div>
            )
          })}
        </DailyBoard>
      </DashBoardBody>
    </DashBoardCard>
  )
}
/** 이번달 현황 **/
function MonthStatus (props) {
  const {role, userId} = props
  const [thisMonth, setThisMonth] = useAtom(thisMonthAtom)
  useEffect(() => {
    if(role === 'NORMAL') {
      dashboardUserThisMonth(userId).then(response => {
        if (response) {
          setThisMonth(response)
        }
      })
    } else {
      dashboardThisMonth().then(response => {
        if (response) {
          setThisMonth(response)
        }
      })
    }
  }, [userId]);

  const thisMonthData = [
    {name:'요청 수',value:thisMonth.requestCount},
    {name:'노출 수',value:thisMonth.exposureCount},
    {name:'클릭수',value:thisMonth.clickCount}
  ]

  return (
    <DashBoardCard>
      <DashBoardHeader>이번달 현황</DashBoardHeader>
      <DashBoardBodyColSpan>
        {thisMonthData.map((item,key) => {
          return (
            <ColoredBox key={key}>
              <img src={`/assets/images/dashboard/img_dashboard_${key}.png`}/>
              <div>{item.name}</div>
              <Price>{decimalFormat(item.value)} 건</Price>
            </ColoredBox>
          )
        })}
      </DashBoardBodyColSpan>
    </DashBoardCard>
  )
}
/** 지난 30일 **/
function LastMonth (props) {
  const {role, userId} = props
  const [lastMonth, setLastMonth] = useAtom(lastMonthAtom)
  useEffect(() => {
    if(role === 'NORMAL') {
      dashboardUserLastMonth(userId).then(response => {
        if (response) {
          setLastMonth(response)
        }
      })
    } else {
      dashboardLastMonth().then(response => {
        if (response) {
          setLastMonth(response)
        }
      })
    }
  }, [userId]);
  const lastMonthData = [
    {name: "수익금", value:lastMonth.revenueAmount},
    {name: "요청 수", value:lastMonth.requestCount},
    {name: "노출 수", value:lastMonth.exposureCount},
    {name: "클릭 수", value:lastMonth.clickCount},
  ]
  return (
    <DashBoardCard>
      <DashBoardHeader>지난 30일 현황</DashBoardHeader>
      <DashBoardBody style={{height: '100%'}}>
        <DashBoardWrap>
          {lastMonthData.map((item, key) => {
            return (
              <LastThirtyDaysItem key={key}>
                <div>
                  <img src={`/assets/images/dashboard/icon_dashboard_main0${key + 1}.png`}/>
                </div>
                <div>
                  <div>{item.name}</div>
                  <BigPrice className={'won'}>{decimalFormat(item.value)}</BigPrice>
                </div>
              </LastThirtyDaysItem>
            )
          })}
        </DashBoardWrap>
      </DashBoardBody>
    </DashBoardCard>
  )
}
/** 수익금 점유율 **/
function RevenueShare (props) {
  const {role, userId} = props
  const setRevenueShare = useSetAtom(revenueShareAtom)
  const [requestType, setRequestType] = useState('PRODUCT')
  useEffect(() => {
    if(role === 'NORMAL') {
      dashboardUserRevenueShare(requestType, userId).then(response => {
        if (response) {
          setRevenueShare(response)
        }
      })
    } else {
      dashboardRevenueShare(requestType).then(response => {
        if (response) {
          setRevenueShare(response)
        }
      })
    }
  },[userId, requestType])

  const handleChangeRequestType = (type) => {
    setRequestType(type)
  }

  return (
    <DashBoardCard>
      <DashBoardHeader>수익금 점유율</DashBoardHeader>
      <DashBoardBody>
        <PieChartContainer>
          <PieChartTap>
            <div onClick={() => handleChangeRequestType('PRODUCT')} style={requestType==='PRODUCT' ? activeRightStyle : null}>광고상품</div>
            <div onClick={() => handleChangeRequestType('DEVICE')} style={requestType==='DEVICE' ? activeRightStyle : null}>디바이스</div>
          </PieChartTap>
          <PieChart>
            <MyResponsivePie/>
          </PieChart>
        </PieChartContainer>
      </DashBoardBody>
    </DashBoardCard>
  )
}
/** 일자별 차트 **/
function MyResponsiveBar(props) {
  const {dataType,userId, role} = props
  const [revenuePeriod, setRevenuePeriod] = useAtom(revenuePeriodAtom)
  useEffect(() => {
    if(role === 'NORMAL'){
      dashboardUserPeriodStatus(dataType, userId).then(response => {
        if (response) {
          setRevenuePeriod(response)
        }
      })
    } else {
      dashboardPeriodStatus(dataType).then(response => {
        if (response) {
          setRevenuePeriod(response)
        }
      })
    }
  }, [userId,dataType]);
  const getColor = () => {
    const color = {
      REVENUE: '#f5811f',
      REQUEST_COUNT: '#f25108',
      EXPOSURE_COUNT: '#ffd1af',
      CLICK_COUNT: '#fecfcf'
    }
    return color[dataType]
  }

  return (
    <ResponsiveBar
      data={revenuePeriod}
      keys={["count"]}
      indexBy={"date"}
      margin={{top: 40, right: 40, bottom: 130, left: 40}}
      padding={0.75}
      valueScale={{type: 'linear'}}
      indexScale={{type: 'band', round: true}}
      colors={[getColor()]}
      axisLeft={false}
      axisBottom={{
        tickSize: 0,
        tickPadding: 15,
        tickRotation: -45,
        legendOffset: 32,
      }}
      enableLabel={false}
      enableGridY={false}
    />
  )
}
/** 수익금 점유율 차트 **/
function MyResponsivePie(){
  const defaultData = useAtomValue(revenueShareAtom)
  const totalData= useAtomValue(revenueAtom)

  const pieData = defaultData.map(({selectedTypeName,shareByPer}) => ({
    id: selectedTypeName,
    value: shareByPer/100,
  }))

  return(
    <PieChartCentered>
      <CenteredInfo>
        <div>total</div>
        <div>{decimalFormat(totalData.todayAmount)}</div>
      </CenteredInfo>
      <ResponsivePie
        data={pieData}
        margin={{ top: 20, right: 60, bottom: 20, left: 20 }}
        innerRadius={0.5}
        colors={["#fff8e8","#ffd1af", "#f5811f"]}
        enableRadialLabels={false}
        enableSlicesLabels={false}
        isInteractive={false}
        enableArcLinkLabels={false}
        valueFormat={'.0%'}
        legends={[{
          anchor: 'right',
          direction: 'column',
          justify: false,
          translateX: 0,
          translateY: 0,
          itemsSpacing: 0,
          itemWidth: 50,
          itemHeight: 30,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
        }]}
      />
    </PieChartCentered>
  )
}
/** 대시보드 **/
export default function DashBoard(){
  const [dataType, setDataType] = useState('REVENUE_AMOUNT')
  const [mediaSearchInfo, setMediaSearchInfo] = useAtom(MediaSearchInfo)
  const userInfoState = useAtomValue(UserInfo)
  const [tokenUserInfo] = useAtom(tokenResultAtom)
  const [adminInfoState, setAdminInfoState] = useAtom(AdminInfo)

  const handleChangeChartKey = (type) => {
    setDataType(type)
  }
  /**
   * 모달안에 매체 검색 선택시
   */
  const handleSearchResult = (keyword) => {
    //매체 검색 api 호출
    setMediaSearchInfo(mediaSearchInfo)
    if(keyword.id !== undefined) {
      //userId 로 다시 조회 대시보드
      localStorage.setItem('mediaUsername',keyword.username)
      accountUserProfile(keyword.username).then(response => {
        setAdminInfoState({
          ...adminInfoState,
          convertedUser: keyword.username,
          id: keyword.id,
          accountProfile: response !== null
        })
      })
    }
  }

  return(
    <main>
      <BoardContainer style={{minWidth: 1200,}}>
        <TitleContainer>
          <div>
            <h1>대시보드</h1>
            <Navigator depth={2}/>
          </div>
          { tokenUserInfo.role !== 'NORMAL' &&
            adminInfoState.convertedUser === '' && <SearchUser title={'매체 계정 전환'} onSubmit={handleSearchResult} btnStyle={'AccountButton'}/>
          }
        </TitleContainer>
        <RowSpan style={{gap:30, marginTop:0, alignItems:'stretch'}}>
          <DashBoardColSpan2>
            {console.log(userInfoState)}
            <RevenueStatus role={tokenUserInfo.role} userId={userInfoState.id}/>
          </DashBoardColSpan2>
          <DashBoardColSpan2>
            <MonthStatus role={tokenUserInfo.role} userId={userInfoState.id}/>
          </DashBoardColSpan2>
        </RowSpan>
        <RowSpan style={{gap:30, marginTop:0, alignItems:'stretch'}}>
          <DashBoardColSpan2>
            <LastMonth role={tokenUserInfo.role} userId={userInfoState.id}/>
          </DashBoardColSpan2>
          <DashBoardColSpan2>
            <RevenueShare role={tokenUserInfo.role} userId={userInfoState.id}/>
          </DashBoardColSpan2>
        </RowSpan>
        <DashBoardCard>
          <DashBoardHeader>일자별 주요 현황</DashBoardHeader>
          <DashBoardBody>
            <ChartContainer style={{height:250}}>
              <ChartLabel>
                <div onClick={() => handleChangeChartKey('REVENUE_AMOUNT')} style={dataType==='REVENUE_AMOUNT' ? activeBottomStyle : null}>수익금</div>
                <div onClick={() => handleChangeChartKey('REQUEST_COUNT')} style={dataType==='REQUEST_COUNT' ? activeBottomStyle : null}>요청수</div>
                <div onClick={() => handleChangeChartKey('EXPOSURE_COUNT')} style={dataType==='EXPOSURE_COUNT' ? activeBottomStyle : null}>노출수</div>
                <div onClick={() => handleChangeChartKey('CLICK_COUNT')} style={dataType==='CLICK_COUNT' ? activeBottomStyle : null}>클릭수</div>
              </ChartLabel>
              <VerticalRule style={{backgroundColor:'#e5e5e5'}}/>
              <MyResponsiveBar dataType={dataType} userId={userInfoState.id} role={tokenUserInfo.role}/>
            </ChartContainer>
          </DashBoardBody>
        </DashBoardCard>
      </BoardContainer>
    </main>
  )
}