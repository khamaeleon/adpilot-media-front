import Aside from "../../components/aside";
import {Route, useNavigate, useParams, useSearchParams} from "react-router-dom";
import DashBoard from "../dash_board";
import MediaManage from "../media_manage";
import PlatformManage from "../platform_manage";
import Reports from "../reports";
import AdExchange from "../ad_exchange";
import Account from "../account_manage";
import {useEffect, useState} from "react";
import styled from "styled-components";
import Modal from "../../components/modal/Modal";
import MediaList from "../media_manage/List";
import ReportsMedia from "../reports/Media";
import ReportsPage from "../reports/Page";
import ReportsReception from "../reports/Reception";
import PlatformAdmin from "../platform_manage/Admin";
import PlatformHistory from "../platform_manage/History";
import PlatformAdExchange from "../platform_manage/AdExchange";
import PlatformUserDetail from "../platform_manage/UserDetail";
import PlatformAdminDetail from "../platform_manage/AdminDetail";
import PlatformHistoryDetail from "../platform_manage/HistoryDetail";
import PlatformAdExchangeDetail from "../platform_manage/AdExchagneDetail";
import AdExchangeDetail from "../ad_exchange/AdExchangeDetail";
import MediaListDetail from "../media_manage/MediaListDetail";
import AdProvide from "../ad_exchange/AdProvide";
import AdProvideDetail from "../ad_exchange/AdProvideDetail";

const pages = [
  "dashboard",
  "media",
  "media-list",
  "adExchange",
  "reports",
  "account",
  "platform",
]

function Layout(){
  const params = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('id')
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
        {params.id == 'media2' && params.detail !== 'detail' && <MediaList />}
        {params.id == 'media2' && params.detail == 'detail' && <MediaListDetail />}

        {params.id == 'adExchange' && params.detail !== 'detail' && <AdExchange />}
        {params.id == 'adExchange' && params.detail == 'detail'  && <AdExchangeDetail />}
        {params.id == 'adExchange2' && params.detail !== 'detail' && <AdProvide />}
        {params.id == 'adExchange2' && params.detail == 'detail'  && <AdProvideDetail />}

        {params.id == 'reports' && <Reports />}
        {params.id == 'reports2' && <ReportsMedia />}
        {params.id == 'reports3' && <ReportsPage />}
        {params.id == 'reports4' && <ReportsReception />}

        {params.id == 'account' && <Account />}

        {params.id == 'platform' && params.detail !== 'detail' && <PlatformManage />}
        {params.id == 'platform2' && params.detail !== 'detail' && <PlatformAdmin />}
        {params.id == 'platform3' && params.detail !== 'detail' && <PlatformHistory />}
        {params.id == 'platform4' && params.detail !== 'detail' && <PlatformAdExchange />}

        {params.id == 'platform' && params.detail == 'detail' && <PlatformUserDetail/>}
        {params.id == 'platform2' && params.detail == 'detail' && <PlatformAdminDetail/>}
        {params.id == 'platform3' && params.detail == 'detail' && <PlatformHistoryDetail/>}
        {params.id == 'platform4' && params.detail == 'detail' && <PlatformAdExchangeDetail/>}

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