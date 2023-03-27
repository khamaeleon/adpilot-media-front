import styled from "styled-components";
import {BoardContainer, RowSpan, TitleContainer} from "../../assets/GlobalStyles";
import Navigator from "../../components/common/Navigator";
import {accountProfile,} from "./entity";
import React, {useEffect} from "react";
import {useAtom} from "jotai";
import {accountUserProfile} from "../../services/AccountAdminAxios";
import {AdminInfo} from "../layout";
import {tokenResultAtom} from "../login/entity";
import {useParams} from "react-router-dom";
import AccountHistory from "./AccountHistory";
import AccountProfile from "./AccountProfile";
import AccountConfirm from "./AccountConfirm";
import AccountData from "./AccountData";
import AccountInfo from "./AccountInfo";

function Account(){
  const params = useParams()
  const [tokenUserInfo] = useAtom(tokenResultAtom)
  const [adminInfoState,setAdminInfoState] = useAtom(AdminInfo) //매체 전환 계정 정보

  useEffect(() => {
    if(tokenUserInfo.role !== 'NORMAL') { // 어드민 계정
      if(localStorage.getItem('mediaUsername')!==null){
        accountUserProfile(localStorage.getItem('mediaUsername')).then(response => { //정산 프로필 조회
          setAdminInfoState({
            ...adminInfoState,
            name: tokenUserInfo.name,
            convertedUser: localStorage.getItem('mediaUsername'),
          })
        })
      } else {

        setAdminInfoState({
          ...adminInfoState,
          convertedUser: '',
          id: '',
        })
      }
    }

  }, [tokenUserInfo,adminInfoState.convertedUser]);

  return(

    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>정산 관리</h1>
        </TitleContainer>
        {/* 정산 정보 */}
        {params.id === 'account' && <AccountInfo />}
        {params.id === 'accountHistory' && <AccountHistory />}
        {params.id === 'accountProfile' && <AccountProfile />}
        {params.id === 'accountConfirm' && <AccountConfirm />}
        {params.id === 'accountData' && <AccountData />}
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
const RevenueBorderBox = styled.div`
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
      input {
        font-size: 20px;
        font-weight: 600;
        border: 1px solid #ddd;
        border-radius: 5px;
        text-align: right;
        padding: 3px 8px;
      }
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
const RevenueScrollBox = styled.div`
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

