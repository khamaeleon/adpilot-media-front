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
  TitleContainer, Input, ResetButton
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
import styled from "styled-components";

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
      dashboardUserRevenue(userId).then(response => {
        if(response){
          setRevenue(response)
        }
      })
    } else {
      dashboardRevenue(userId).then(response => {
        if(response){
          setRevenue(response)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId,role]);

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
      dashboardThisMonth(userId).then(response => {
        if (response) {
          setThisMonth(response)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId,role]);

  const thisMonthData = [
    {name:'요청 수',value:thisMonth.requestCount},
    {name:'노출 수',value:thisMonth.exposureCount},
    {name:'클릭수',value:thisMonth.validClickCount}
  ]

  return (
    <DashBoardCard>
      <DashBoardHeader>이번달 현황</DashBoardHeader>
      <DashBoardBodyColSpan>
        {thisMonthData.map((item,key) => {
          return (
            <ColoredBox key={key}>
              <img src={`/assets/images/dashboard/img_dashboard_${key}.png`} alt={'icon'} />
              <div>{item.name}</div>
              <Price className={'count'}>{decimalFormat(item.value)}</Price>
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
      dashboardLastMonth(userId).then(response => {
        if (response) {
          setLastMonth(response)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId,role]);
  const lastMonthData = [
    {name: "수익금", value:lastMonth.revenueAmount},
    {name: "요청 수", value:lastMonth.requestCount},
    {name: "노출 수", value:lastMonth.exposureCount},
    {name: "클릭 수", value:lastMonth.validClickCount},
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
                  <img src={`/assets/images/dashboard/icon_dashboard_main0${key + 1}.png`} alt={'icon'}/>
                </div>
                <div>
                  <div>{item.name}</div>
                  <BigPrice className={item.name !== '수익금' ? 'count' :'won'}>{decimalFormat(item.value)}</BigPrice>
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
  const {role, userId, convertedUser} = props
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
      dashboardRevenueShare(requestType, userId).then(response => {
        if (response) {
          setRevenueShare(response)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[userId, requestType, role])

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
  const {role, dataType, userId} = props
  const [revenuePeriod, setRevenuePeriod] = useAtom(revenuePeriodAtom)

  useEffect(() => {
    if(role === 'NORMAL'){
      dashboardUserPeriodStatus(dataType, userId).then(response => {
        if (response) {
          setRevenuePeriod(response)
        }
      })
    } else {
      dashboardPeriodStatus(dataType, userId).then(response => {
        if (response) {
          setRevenuePeriod(response)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, dataType, role]);
  const getColor = () => {
    const color = {
      REVENUE_AMOUNT: '#f5811f',
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
        axisLeft={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 15,
          tickRotation: -45,
          legendOffset: 32,
        }}
        enableLabel={false}
        enableGridY={false}
        tooltip={(props) => {
          return (
            <ChartTooltip>
              <p className={'date'}>{props.data.date}</p>
              <p className={dataType !== 'REVENUE_AMOUNT' ? 'count' : 'won'}>{decimalFormat(props.data.count)}</p>
            </ChartTooltip>
          )
        }}
      />
  )
}
/** 수익금 점유율 차트 **/
function MyResponsivePie(){
  const defaultData = useAtomValue(revenueShareAtom)
  const totalData = useAtomValue(lastMonthAtom)

  const pieData = defaultData.map(({selectedTypeName,shareByPer}) => ({
    id: selectedTypeName,
    value: shareByPer/100,
  }))

  return(
    <PieChartCentered>
      <CenteredInfo>
        <div>total</div>
        <div>{decimalFormat(totalData.revenueAmount)}</div>
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
  const handleClickReset = () => {
    localStorage.removeItem("mediaUsername")
    setAdminInfoState({
      ...adminInfoState,
      convertedUser: '',
      id: '',
    })
  }
  return(
    <main>
      <BoardContainer style={{minWidth: 1200}}>
        <TitleContainer>
          <div>
            <h1>대시보드</h1>
            <Navigator depth={2}/>
          </div>
          { tokenUserInfo.role !== 'NORMAL' &&
            <RowSpan style={{marginTop: 0}}>
              <Input
                type={'text'}
                style={{width: 300}}
                value={adminInfoState.convertedUser || "매체 전체"}
                readOnly={true}
              />
              <SearchUser title={'매체 계정 검색'} onSubmit={handleSearchResult} btnStyle={'SearchUser'}/>
              <ResetButton onClick={handleClickReset}>매체 전체</ResetButton>
            </RowSpan>
          }
        </TitleContainer>
        <RowSpan style={{gap:30, marginTop:0, alignItems:'stretch'}}>
          <DashBoardColSpan2>
            <RevenueStatus role={tokenUserInfo.role} userId={tokenUserInfo.role === 'NORMAL' ? tokenUserInfo.id : adminInfoState.id} />
          </DashBoardColSpan2>
          <DashBoardColSpan2>
            <MonthStatus role={tokenUserInfo.role} userId={tokenUserInfo.role === 'NORMAL' ? tokenUserInfo.id : adminInfoState.id}/>
          </DashBoardColSpan2>
        </RowSpan>
        <RowSpan style={{gap:30, marginTop:0, alignItems:'stretch'}}>
          <DashBoardColSpan2>
            <LastMonth role={tokenUserInfo.role} userId={tokenUserInfo.role === 'NORMAL' ? tokenUserInfo.id : adminInfoState.id}/>
          </DashBoardColSpan2>
          <DashBoardColSpan2>
            <RevenueShare role={tokenUserInfo.role} userId={tokenUserInfo.role === 'NORMAL' ? tokenUserInfo.id : adminInfoState.id}/>
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
              <MyResponsiveBar role={tokenUserInfo.role} dataType={dataType} userId={tokenUserInfo.role === 'NORMAL' ? userInfoState.id : adminInfoState.id} convertedUser={adminInfoState.convertedUser}/>
            </ChartContainer>
          </DashBoardBody>
        </DashBoardCard>
      </BoardContainer>
    </main>
  )
}
const ChartTooltip = styled.div`
  background: #fff;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  text-align: center;
  & .date {
    color: #444;
    font-weight: 600;
    margin-bottom: 3px;
  }
`