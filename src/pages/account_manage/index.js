import styled from "styled-components";
import {
  BoardContainer,
  DashBoardHeader,
  DashBoardCard,
  RowSpan,
  TitleContainer,
  DashBoardColSpan2, BoardSearchResult, TextMainColor, SubmitButton, CancelButton
} from "../../assets/GlobalStyles";
import Navigator from "../../components/common/Navigator";
import {reportsAccountColumns, reportsAccount} from "./entity";
import Table from "../../components/table";
import React, {useState} from "react";
import {ModalBody, ModalFooter, ModalHeader} from "../../components/modal/Modal";
import {atom, useAtom} from "jotai";
import {modalController} from "../../store";
import {ModalMediaResult} from "../media_manage";
import {mediaResistInfo, mediaSearchInfo} from "../media_manage/entity";
import {Tooltip} from "../../components/common/Tooltip";

const MediaResistAtom = atom(mediaResistInfo)
const MediaSearchInfo = atom(mediaSearchInfo)

function Account(){
  const [modal, setModal] = useAtom(modalController)
  const [mediaResistState, setMediaResistState] = useAtom(MediaResistAtom)
  const [mediaSearchInfo, setMediaSearchInfo] = useAtom(MediaSearchInfo)
  const [searchKeyword, setSearchKeyword] = useState('')

  const handleSearchResult = (keyword) => {
    //매체 검색 api 호출
    setMediaSearchInfo(mediaSearchInfo)
    console.log(mediaResistState,mediaSearchInfo)
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
  }

  /**
   * 지면 등록 화면 에서 매체검색 버튼 클릭시
   */
  const handleModalComponent = () => {
    setModal({
      isShow: true,
      width: 600,
      modalComponent: () => {
        return <ModalMediaResult searchKeyword={searchKeyword} onResult={handleSearchResult} onSearchKeyword={handleSearchKeyword} onSearch={handleMediaSearchSelected}/>
      }
    })
  }
  const handleModalCalculate = () => {
    setModal({
      isShow: true,
      width: 700,
      modalComponent: () => componentModalCalculate()
    })
  }
  const componentModalCalculate = () => {
    return (
      <>
        <ModalHeader title={'정산 신청'}/>
        <ModalBody>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <CalculateScrollBox>
              <div>
                <p>수익금 최종 결산은 매월 5일까지의 통계 데이터를 기반으로 집계됩니다.</p>
                <p>수익금 정산 심사가 승인된 경우, 매월 10일 이전까지 세금계산서를 발행해주세요.</p>
                <p>정산 신청하지 않은 수익금은 자동으로 이월 처리됩니다.</p>
                <p>세금 계산서 발행은 지금 예정 금액으로 발행해주세요.</p>
              </div>
            </CalculateScrollBox>
            <CalculateBorderBox>
              <div className={'gray'}>
                <span>수익금</span>
                <p className={'won color-black'}>100,000,000</p>
              </div>
            </CalculateBorderBox>
            <p style={{marginTop: 10}}>정산 신청금 입력</p>
            <CalculateBorderBox>
              <div>
                <span>수익금</span>
                <div className={'flex-box'}>
                  <p className={'won color-black'}>100,000,000</p>
                  <button>전액 신청</button>
                </div>
              </div>
              <div className={'gray small'}>
                <span>VAT</span>
                <p className={'won'}>1,000,000</p>
              </div>
            </CalculateBorderBox>
            <CalculateBorderBox>
              <div>
                <span>지급 예정</span>
                <p className={'won'}><TextMainColor>110,000,000</TextMainColor></p>
              </div>
            </CalculateBorderBox>
          </div>
        </ModalBody>
        <ModalFooter style={{borderTop: 0, paddingTop: 0}}>
          <CancelButton>취소</CancelButton>
          <SubmitButton>정산 신청</SubmitButton>
        </ModalFooter>
      </>
    )
  }
  const columnSetting = {
    default: {
      textAlign: "center"
    },
    setColumns: [
      {
        target: 0,
        value: {
          defaultVisible: false,
          type: "date"
        },
      },
      {
        target: 1,
        value: {}
      }
    ]
  }
  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>정산관리</h1>
          <RowSpan style={{marginTop: 0}}>
            <Navigator/>
            <AccountButton style={{marginBottom: 15, backgroundColor: '#fff'}} onClick={handleModalComponent}>매체 계정 전환<span>></span></AccountButton>
          </RowSpan>
        </TitleContainer>
        <RowSpan style={{gap:30, marginTop: 0}}>
          <DashBoardColSpan2>
            <DashBoardCard style={{paddingBottom: 20}}>
              <DashBoardHeader>수익 현황</DashBoardHeader>
              <StatusBoard>
                <div>
                  <p>수익금</p>
                  <p className='won'>1,000,000</p>
                </div>
                <ul>
                  <li>
                    <p>정산 신청</p>
                    <p className='won'>1,000,000</p>
                  </li>
                  <li>
                    <p>잔여 정산금</p>
                    <p className='won'>1,000,000</p>
                  </li>
                  <li>
                    <p>총 이월</p>
                    <p className='won'>1,000,000</p>
                  </li>
                  <li>
                    <p>지급 예정</p>
                    <p className='won'>1,000,000</p>
                  </li>
                  <li>
                    <p>지급 완료</p>
                    <p className='won'>1,000,000</p>
                  </li>
                </ul>
              </StatusBoard>
              <div style={{display: "flex", justifyContent: "center"}}><AccountButton type={'button'} onClick={handleModalCalculate}>정산 신청</AccountButton></div>
            </DashBoardCard>
          </DashBoardColSpan2>
          <DashBoardColSpan2>
            <DashBoardCard>
              <DashBoardHeader>정산 프로필</DashBoardHeader>
              {/*<NoAccountBody>*/}
              {/*  <p><TextMainColor>매체 계정으로 전환</TextMainColor>하여 정산 프로필 정보를 확인해주세요.</p>*/}
              {/*  <AccountButton onClick={handleModalComponent}>매체 계정 전환</AccountButton>*/}
              {/*</NoAccountBody>*/}
              <AccountBody>
                <div>
                  <div className={'icon'}></div>
                  <span>사업자 정보</span>
                  <Tooltip text={'일이삼사오일이삼사오일이삼사오'} maxLength={14}/>
                  <div className={'border-box'}>
                    <span>(123-12-12345)</span>
                  </div>
                </div>
                <div>
                  <div className={'icon'}></div>
                  <span>담당자 정보</span>
                  <p>홍길동</p>
                  <div className={'border-box'}>
                    <span>010-1234-1234</span>
                    <span className={'line-clamp_2'}>gildong12gildong12gildong12gildong12@naver.com</span>
                  </div>
                </div>
                <div>
                  <div className={'icon'}></div>
                  <span>정산 정보</span>
                  <p>15353332112312</p>
                  <div className={'border-box'}>
                    <span>기업 은행</span>
                    <span>예금주 김홍도</span>
                  </div>
                </div>
              </AccountBody>
            </DashBoardCard>
          </DashBoardColSpan2>
        </RowSpan>
        <DashBoardCard>
          <DashBoardHeader style={{marginBottom: 0}}>월별 정산이력</DashBoardHeader>
          <BoardSearchResult style={{marginTop: 0}}>
            <Table columns={reportsAccountColumns}
                   data={reportsAccount}
                   titleTotal={false}
                   settings={columnSetting}/>
          </BoardSearchResult>
        </DashBoardCard>
      </BoardContainer>
    </main>
  )
}

export default Account

const profileHeight = '265px'

const AccountButton = styled.button`
  width: 175px; 
  height: 40px;
  border-radius: 5px;
  border: solid 1px #ddd;
  background-color: #f3f3f3;
  font-size: 15px;
  > span {
    padding-left: 10px;
  }
`
const NoAccountBody = styled.div`
  height: ${profileHeight};
  border: solid 1px #ddd;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > p {
    line-height: 23px;
    &:last-of-type {
      margin-bottom: 25px;
    }
  }
  > button {
    background-color: #fff;
  }
`
const AccountBody = styled.div`
  height: ${profileHeight};
  display: flex;
  > div {
    width: calc(100%/3 - 10px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    &:first-child {
      padding-right: 20px;
      .icon {
        background-image: url("/assets/images/common/img_profile_01.png");
      } 
    }
    &:nth-child(2) {
      width: calc(100%/3 + 20px);
      border: 1px solid #e9ebee;
      border-top: 0;
      border-bottom: 0;
      padding: 0 20px;
      .icon {
        background-image: url("/assets/images/common/img_profile_02.png");
      }
    }
    &:last-child {
      padding-left: 20px;
      .icon {
        background-image: url("/assets/images/common/img_profile_03.png");
      }
    }
    .icon {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: solid 1px #ddd;
      background-color: #f3f3f3;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 60%;
      margin: 20px 0 10px;
    }
    > p {
      width: 100%;
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      margin: 5px 0 10px;
    }
    
    .border-box {
      width: 100%;
      border-radius: 10px;
      border: solid 1px #e9ebee;
      padding: 0 10px;
      display: flex;
      flex-direction: column;
      text-align: center;
      span {
        width: 100%;
        padding: 5px 0;
        &:nth-child(2) {
          border-top: solid 1px #e9ebee;
        }
      }
    }
  }
`
const StatusBoard = styled.div`
  > div, > ul > li {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  > div {
    border-top: solid 1px #e9ebee;
    &:first-child {
      height: 40px;
      & p:first-child {
        font-weight:500;
        font-size: 15px;
      }
      & p.won {
        font-size: 18px;
        font-weight: 600;
        color: #f5811f;
      }
    }
  }
  > ul {
    height: 170px;
    border: solid 1px #e9ebee;
    border-left: 0;
    border-right: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-bottom: 15px;
  > li p.won {
    font-size: 16px;
    font-weight: 400;
  }
`
const CalculateBorderBox = styled.div`
  border: 1px solid #e5e5e5;
  margin: 10px 0;
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    font-size: 13px;
    color: #777;
    &.gray {
      background-color: #f9f9f9;
      .won {
        font-weight: 400;
      }
      &.small {
        border-top: 1px solid #e5e5e5;
        padding-top: 10px;
        padding-bottom: 10px;
        .won {
          font-size: 13px;
        }
      }
    }
    .won {
      font-size: 20px;
      font-weight: 600;
      &:after {
        font-size: 13px;
        font-weight: 400;
      }
    }
    .color-black {
      color: #222;
    }
    .flex-box {
      display: flex;
      align-items: center;
      button {
        height: 24px;
        padding: 0 20px;
        margin-left: 20px;
        font-size: 12px;
        border-radius: 3px;
        border: solid 1px #e5e5e5;
        background-color: #fafafa;
      }
    }
  }
  
`
const CalculateScrollBox = styled.div`
  height: 100px;
  background-color: #f9f9f9;
  padding: 10px 5px 10px 20px;
  margin-bottom: 5px;
  > div {
    height: 100%;
    overflow-x: auto;
    overflow-y: hidden;
  }
`

