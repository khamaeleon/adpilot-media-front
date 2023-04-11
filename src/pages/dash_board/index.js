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
  ProceedBoard,
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
import {lastMonthAtom, proceedPeriodAtom, proceedsAtom, proceedShareAtom, thisMonthAtom} from "./entity";
import {
  dashboardLastMonth,
  dashboardPeriodStatus,
  dashboardProceeds,
  dashboardProceedShare,
  dashboardThisMonth
} from "../../services/dashboard/DashboardAxios";
import {AdminInfo, UserInfo} from "../layout";
import {decimalFormat} from "../../common/StringUtils";
import {tokenResultAtom} from "../login/entity";
import {accountUserProfile} from "../../services/account/AccountAdminAxios";

export const MediaSearchInfo = atom(mediaSearchInfo)

const percentage = (x,y) => {
  return x ? (((y / x) * 100) - 100).toFixed(2) : 0
}

const activeBottomStyle = {borderBottom:'4px solid #f5811f'}
const activeRightStyle = {borderRight: activeBottomStyle.borderBottom, color: '#f5811f'}
/** 수익금현황 **/
function ProceedStatus (props) {
  const {userId} = props
  const [proceeds, setProceeds] = useAtom(proceedsAtom)

  useEffect(() => {
    dashboardProceeds(userId).then(response => {
      if(response){
        setProceeds(response)
      }
    })
  }, [userId]);

  const getAmountRate =() => {
    if(proceeds.todayAmount > proceeds.yesterdayAmount) {
      return {transform: 'rotate(180deg)'}
    } else if (proceeds.todayAmount === proceeds.yesterdayAmount) {
      return {background: 'none'}
    }
  }

  const amountData = [
    {name:'어제',value:proceeds.yesterdayAmount},
    {name:'지난7일',value:proceeds.last7daysAmount},
    {name:'이번달',value:proceeds.thisMonthAmount},
  ]

  return(
    <DashBoardCard>
      <DashBoardHeader>수익금 현황</DashBoardHeader>
      <DashBoardBody>
        <ProceedBoard>
          <div>오늘</div>
          <div>
            <div><span className={'won'}>{decimalFormat(proceeds.todayAmount)}</span></div>
            <Rating className={'pct'} ><span style={getAmountRate()} />{percentage(proceeds.yesterdayAmount, proceeds.todayAmount)}</Rating>
          </div>
        </ProceedBoard>
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
  const {userId} = props
  const [thisMonth, setThisMonth] = useAtom(thisMonthAtom)
  useEffect(() => {
    dashboardThisMonth(userId).then(response => {
      if (response) {
        setThisMonth(response)
      }
    })
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
  const {userId} = props
  const [lastMonth, setLastMonth] = useAtom(lastMonthAtom)
  useEffect(() => {
    dashboardLastMonth(userId).then(response => {
      if (response) {
        setLastMonth(response)
      }
    })
  }, [userId]);
  const lastMonthData = [
    {name: "수익금", value:lastMonth.proceedsAmount},
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
function ProceedShare (props) {
  const {userId} = props
  const setProceedShare = useSetAtom(proceedShareAtom)
  const [requestType, setRequestType] = useState('PRODUCT')
  useEffect(() => {
    dashboardProceedShare(requestType, userId).then(response => {
      if (response) {
        setProceedShare(response)
      }
    })
  },[requestType])

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
  const {dataType,userId} = props
  const [proceedPeriod, setProceedPeriod] = useAtom(proceedPeriodAtom)

  useEffect(() => {
    dashboardPeriodStatus(dataType, userId).then(response => {
      if (response) {
        setProceedPeriod(response)
      }
    })
  }, [userId,dataType]);
  const getColor = () => {
    const color = {
      PROCEEDS: '#f5811f',
      REQUEST_COUNT: '#f25108',
      EXPOSURE_COUNT: '#ffd1af',
      CLICK_COUNT: '#fecfcf'
    }
    return color[dataType]
  }

  return (
    <ResponsiveBar
      data={proceedPeriod}
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
  const defaultData = useAtomValue(proceedShareAtom)
  const totalData= useAtomValue(proceedsAtom)

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
  const [dataType, setDataType] = useState('PROCEEDS')
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
          accountProfile: response !== null ? true : false
        })
      })
    }
  }

  return(
    <main>
      <BoardContainer>
        <RowSpan style={{alignItems:'center', marginTop: 0}}>
          <TitleContainer>
            <h1>대시보드</h1>
            <Navigator depth={2}/>
          </TitleContainer>
          {tokenUserInfo.role !== 'NORMAL' &&
            <div>
              <SearchUser title={'매체 계정 전환'} onSubmit={handleSearchResult} btnStyl={'SwitchUserButton'} />
            </div>
          }
        </RowSpan>
        <RowSpan style={{gap:30, marginTop:0}}>
          <DashBoardColSpan2>
            <ProceedStatus userId={userInfoState.id}/>
          </DashBoardColSpan2>
          <DashBoardColSpan2>
            <MonthStatus userId={userInfoState.id}/>
          </DashBoardColSpan2>
        </RowSpan>
        <RowSpan style={{gap:30, marginTop:0}}>
          <DashBoardColSpan2>
            <LastMonth userId={userInfoState.id}/>
          </DashBoardColSpan2>
          <DashBoardColSpan2>
            <ProceedShare userId={userInfoState.id}/>
          </DashBoardColSpan2>
        </RowSpan>
        <DashBoardCard>
          <DashBoardHeader>일자별 주요 현황</DashBoardHeader>
          <DashBoardBody>
            <ChartContainer style={{height:250}}>
              <ChartLabel>
                <div onClick={() => handleChangeChartKey('PROCEEDS')} style={dataType==='PROCEEDS' ? activeBottomStyle : null}>수익금</div>
                <div onClick={() => handleChangeChartKey('REQUEST_COUNT')} style={dataType==='REQUEST_COUNT' ? activeBottomStyle : null}>요청수</div>
                <div onClick={() => handleChangeChartKey('EXPOSURE_COUNT')} style={dataType==='EXPOSURE_COUNT' ? activeBottomStyle : null}>노출수</div>
                <div onClick={() => handleChangeChartKey('CLICK_COUNT')} style={dataType==='CLICK_COUNT' ? activeBottomStyle : null}>클릭수</div>
              </ChartLabel>
              <VerticalRule style={{backgroundColor:'#e5e5e5'}}/>
              <MyResponsiveBar dataType={dataType} userId={userInfoState.id}/>
            </ChartContainer>
          </DashBoardBody>
        </DashBoardCard>
      </BoardContainer>
    </main>
  )
}