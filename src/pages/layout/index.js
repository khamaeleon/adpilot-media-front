import Aside from "../../components/aside";
import {Route, useNavigate, useParams} from "react-router-dom";
import DashBoard from "../dash_board";
import MediaManage from "../media_manage";
import PlatformManage from "../platform_manage";
import Reports from "../reports";
import AdExchange from "../ad_exchange";
import Service from "../service_manage";
import {useEffect, useState} from "react";
import styled from "styled-components";
import Modal from "../../components/modal/Modal";

const pages = [
  "dashboard",
  "media",
  "platform",
  "reports",
  "adExchange",
  "service"
]

function Layout(){
  const params = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    if(!pages.includes(params.id)){
      navigate("/")
    }
  }, []);

  return(
    <div id={'container'}>
      <Aside />
      <BoardBody>
        <BoardHeader>
          <UserName>
            <UserIcon/>
            <span>홍길동님</span>
          </UserName>
          <MyPage>
            <span>마이페이지</span>
            <Arrow></Arrow>
          </MyPage>
          <Logout>
            <button type={'button'}>로그아웃</button>
          </Logout>
        </BoardHeader>
        {params.id == 'dashboard' && <DashBoard />}
        {params.id == 'media' && <MediaManage />}
        {params.id == 'platform' && <PlatformManage />}
        {params.id == 'reports' && <Reports />}
        {params.id == 'adExchange' && <AdExchange />}
        {params.id == 'service' && <Service />}
      </BoardBody>
      <Modal></Modal>
    </div>
  )
}

export default Layout

const BoardBody = styled.div`
  width: 100%;
`
const BoardHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #eee;
`

const UserName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  border-left: 1px solid #eee;
  padding-right: 28px;
`

const UserIcon = styled.div`
  margin: 0 28px;
  background-color: #cccccc;
  padding: 3px;
  width: 36px;
  height: 36px;
  border-radius: 100%;
  background-image: url("/assets/images/common/icon_user.png");
  background-repeat: no-repeat;
  background-position: center;
`

const MyPage = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  border-left: 1px solid #eee;
  padding-left: 28px;
  margin-right: 28px;
`

const Arrow = styled.div`
  margin-left: 10px;
  width: 16px;
  height: 10px;
  background-image: url("/assets/images/common/icon_mypag.png");
`

const Logout = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  border-left: 1px solid #eee;
  padding-left: 28px;
  margin-right: 28px;
  & button {
    padding: 6px 28px;
    font-size: 16px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 28px;
  }
`