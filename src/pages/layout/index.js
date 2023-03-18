import Aside from "../../components/aside";
import {useNavigate, useParams} from "react-router-dom";
import DashBoard from "../dash_board";
import MediaManage from "../media_manage";
import PlatformManage from "../platform_manage";
import Reports from "../reports";
import AdExchange from "../ad_exchange";
import Account from "../account_manage";
import AccountHistory from "../account_manage/AccountHistory";
import AccountProfile from "../account_manage/AccountProfile";
import AccountConfirm from "../account_manage/AccountConfirm";
import AccountData from "../account_manage/AccountData";
import {useEffect, useState} from "react";
import styled from "styled-components";
import Modal from "../../components/modal/Modal";
import MediaList from "../media_manage/List";
import ReportsMedia from "../reports/Media";
import ReportsPage from "../reports/Page";
import ReportsReception from "../reports/AdExchange";
import PlatformAdmin from "../platform_manage/Admin";
import PlatformHistory from "../platform_manage/History";
import PlatformAdExchange from "../platform_manage/AdExchange";
import PlatformUserDetail from "../platform_manage/UserDetail";
import PlatformAdminDetail from "../platform_manage/AdminDetail";
import PlatformHistoryDetail from "../platform_manage/HistoryDetail";
import PlatformAdExchangeDetail from "../platform_manage/AdExchagneDetail";
import AdExchangeDetail from "../ad_exchange/AdExchangeDetail";
import MediaListDetail from "../media_manage/MediaListDetail";
import {useAtom,} from "jotai";
import {selUserByUserId} from "../../services/ManageUserAxios";
import {selAdminInfo} from "../../services/ManageAdminAxios";
import {atom} from "jotai/index";
import {adminInfo, userInfo} from "../login/entity";
import {logOutAdmin, logOutUser} from "../../services/AuthAxios";

const AdminInfo = atom(adminInfo)
const UserInfo = atom(userInfo)
function Layout(){
  const params = useParams()
  const navigate = useNavigate()
  const [adminInfoState,setAdminInfoState] = useAtom(AdminInfo)
  const [userInfoState,setUserInfoState] = useAtom(UserInfo)
  const [role,setRole] = useState(localStorage.getItem("role"))

  useEffect(() => {
    if(role==='NORMAL'){
      if(userInfoState.name ===''){
        selUserByUserId(localStorage.getItem("id")).then(response =>{
          setUserInfoState({
            name:response.managerName1
          })
          setRole('NORMAL')
        })
      }
    }else{
      if(adminInfoState.name ===''){
        selAdminInfo(localStorage.getItem("id")).then(response =>{
          setAdminInfoState({
            name:response.name
          })
          setRole('ADMIN')
        })
      }
    }
  }, []);
  const logOut = () => {
    const userInfo ={
      accessToken:localStorage.getItem("accessToken"),
      refreshToken:localStorage.getItem("refreshToken")
    }
    if(role==='NORMAL'){
      logOutUser(userInfo).then(response =>{
        if(response){
          localStorage.removeItem("refreshToken")
          localStorage.removeItem("accessToken")
          localStorage.removeItem("role")
          localStorage.removeItem("id")
        }
      })
    } else {
      logOutAdmin(userInfo).then(response =>{
        if(response){
          console.log(response)
          localStorage.removeItem("refreshToken")
          localStorage.removeItem("accessToken")
          localStorage.removeItem("role")
          localStorage.removeItem("id")
          localStorage.removeItem("userId")
        }
      })
    }
    navigate('/login')
  }
  return(
    <div id={'container'}>
      <Aside />
      <BoardBody>
        <BoardHeader>
          <UserName>
            <UserIcon/>
            <span>{role==='NORMAL'? userInfoState.name:adminInfoState.name}</span>
          </UserName>
          <MyPage>
            <span>마이페이지</span>
            <Arrow></Arrow>
          </MyPage>
          <Logout>
            <button type={'button'} onClick={() => logOut()}>로그아웃</button>
          </Logout>
        </BoardHeader>
        {/* 대시보드 */}
        {params.id === 'dashboard'  && <DashBoard />}
        {/* 지면관리 */}
        {params.id === 'media' && <MediaManage />}
        {params.id === 'media2' && params.detail !== 'detail' && <MediaList />}
        {params.id === 'media2' && params.detail === 'detail' && <MediaListDetail />}
        {/* 외부연동 */}
        {params.id === 'adExchange' && params.detail !== 'detail' && <AdExchange />}
        {params.id === 'adExchange' && params.detail === 'detail'  && <AdExchangeDetail />}
        {/* 보고서 */}
        {['reports','reports2','reports3','reports4'].includes(params.id) && <Reports />}
        {/* 정산관리 */}
        {params.id === 'account' && <Account />}
        {params.id === 'accountHistory' && <AccountHistory />}
        {params.id === 'accountProfile' && <AccountProfile />}
        {params.id === 'accountConfirm' && <AccountConfirm />}
        {params.id === 'accountData' && <AccountData />}
        {/* 플랫폼 관리 */}
        {params.id === 'platform' && params.detail !== 'detail' && <PlatformManage />}
        {params.id === 'platform2' && params.detail !== 'detail' && <PlatformAdmin />}
        {params.id === 'platform3' && params.detail !== 'detail' && <PlatformHistory />}
        {params.id === 'platform4' && params.detail !== 'detail' && <PlatformAdExchange />}

        {params.id === 'platform' && params.detail ==='detail' && <PlatformUserDetail/>}
        {params.id === 'platform2' && params.detail === 'detail' && <PlatformAdminDetail/>}
        {params.id === 'platform3' && params.detail === 'detail' && <PlatformHistoryDetail/>}
        {params.id === 'platform4' && params.detail === 'detail' && <PlatformAdExchangeDetail/>}

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
  height: 45px;
  border-bottom: 1px solid #eee;
`

const UserName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-left: 1px solid #eee;
  padding-right: 28px;
`

const UserIcon = styled.div`
  margin: 0 20px 0 25px;
  background-color: #cccccc;
  padding: 3px;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-image: url("/assets/images/common/icon_user.png");
  background-repeat: no-repeat;
  background-position: center;
`

const MyPage = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
    font-size: 13px;
    padding: 4px 28px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 28px;
  }
`