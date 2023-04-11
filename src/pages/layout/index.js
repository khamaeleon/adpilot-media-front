import Aside from "../../components/aside";
import {useNavigate, useParams} from "react-router-dom";
import DashBoard from "../dash_board";
import MediaManage from "../media_manage";
import PlatformManage from "../platform_manage";
import Reports from "../reports";
import AdExchange from "../ad_exchange";
import Account from "../account_manage";
import {useEffect} from "react";
import styled from "styled-components";
import Modal from "../../components/modal/Modal";
import PlatformUserDetail from "../platform_manage/UserDetail";
import {atom, useAtom,} from "jotai";
import {selUserByUserId} from "../../services/platform/ManageUserAxios";
import {selAdminInfo} from "../../services/platform/ManageAdminAxios";
import {adminInfo, tokenResultAtom, userInfo} from "../login/entity";
import {logOutAdmin, logOutUser} from "../../services/auth/AuthAxios";
import PlatformAdminDetail from "../platform_manage/AdminDetail";

export const AdminInfo = atom(adminInfo)
export const UserInfo = atom(userInfo)
function Layout(){
  const params = useParams()
  const navigate = useNavigate()
  const [adminInfoState,setAdminInfoState] = useAtom(AdminInfo)
  const [userInfoState,setUserInfoState] = useAtom(UserInfo)
  const [tokenUserInfo] = useAtom(tokenResultAtom)

  useEffect(() => {
    if(tokenUserInfo.role === 'NORMAL'){
      if(userInfoState.name ===''){
        selUserByUserId(tokenUserInfo.id).then(response =>{
          setUserInfoState({
            name:response.managerName1,
            id:response.id
          })
        })
      }
    }else{
      if(adminInfoState.name === ''){
        selAdminInfo().then(response =>{
          setAdminInfoState({
            ...adminInfoState,
            name:response.name,
          })
        })
      }
    }
  }, []);

  useEffect(() => {
    if(adminInfoState.convertedUser){
      selUserByUserId(adminInfoState.convertedUser).then(response =>{
        setUserInfoState({
          name:response.managerName1,
          id:response.id
        })
      })
    }
  }, [adminInfoState]);

  const myPage = () =>{
    if(tokenUserInfo.role==='NORMAL'){
      navigate('/board/myPage/user',{state:{id:userInfoState.id}})
    }else{
      navigate('/board/myPage/admin',{state:{id:tokenUserInfo.id}})
    }
  }

  const logOut = () => {
    const userInfo ={
      accessToken:tokenUserInfo.accessToken,
      refreshToken:localStorage.getItem("refreshToken")
    }
    if(tokenUserInfo.role==='NORMAL'){
      logOutUser(userInfo).then(response =>{
        if(response){
          localStorage.removeItem("refreshToken")
          localStorage.removeItem("mediaUsername")
        }
      }).then(() =>
        {
          // eslint-disable-next-line no-restricted-globals
          location.replace('/')
        }
      )
    } else {
      logOutAdmin(userInfo).then(response =>{
        if(response){
          localStorage.removeItem("refreshToken")
          localStorage.removeItem("mediaUsername")
          setUserInfoState({
            name: '',
            id:'',
          })
          setAdminInfoState({
            ...adminInfoState,
            convertedUser: '',
            id:'',
            accountProfile: ''
          })
        }
      }).then(() =>
        {
          // eslint-disable-next-line no-restricted-globals
          location.replace('/')
        }
      )
    }
  }

  const handleChangeConverted = () => {
    localStorage.removeItem('mediaUsername')
    setAdminInfoState({
      ...adminInfoState,
      convertedUser: '',
      id:'',
      accountProfile: ''
    })
    setUserInfoState({
      name: '',
      id: ''
    })
    navigate('/board/dashboard')
  }
  return(
    <div id={'container'}>
      {tokenUserInfo.role !== '' &&
        <>
          <Aside />
          <BoardBody>
            <BoardHeader>
              {/* eslint-disable-next-line no-mixed-operators */}
              {tokenUserInfo.role !== 'NORMAL' && adminInfoState.convertedUser !== '' &&
                <>
                  <MyPage>{adminInfoState.convertedUser}</MyPage>
                  <MyPage onClick={handleChangeConverted}>
                    <span>어드민 계정으로 전환</span>
                  </MyPage>
                </>
                // eslint-disable-next-line no-mixed-operators
                ||
                null
              }
              <UserName>
                <UserIcon/>
                <span>{tokenUserInfo.name}</span>
              </UserName>
              <MyPage onClick={myPage}>
                <span>마이페이지</span>
              </MyPage>
              <Logout>
                <button type={'button'} onClick={() => logOut()}>로그아웃</button>
              </Logout>
            </BoardHeader>
            {/* 대시보드 */}
            {params.id === 'dashboard'  && <DashBoard />}
            {/* 지면관리 */}
            {['media','mediaList','mediaListDetail','reportsAdExchange'].includes(params.id)&& <MediaManage />}
            {/* 외부연동 */}
            {['adExchange','adExchangeDetail'].includes(params.id)  && <AdExchange />}
            {/* 보고서 */}
            {['reports','reportsMedia','reportsInventory','reportsAdExchange'].includes(params.id) && <Reports />}
            {/* 정산관리 */}
            {['account','accountHistory','accountProfile','accountConfirm','accountData'].includes(params.id) && <Account />}
            {/* 플랫폼 관리 */}
            {['platform','platformUserDetail','platformHistory','platformAdExchange','platformHistoryDetail','platformAdExchangeDetail'].includes(params.id) && <PlatformManage/>}

            {params.id === 'myPage' && params.detail ==='user' && <PlatformUserDetail/>}
            {params.id === 'myPage' && params.detail === 'admin' && <PlatformAdminDetail/>}
          </BoardBody>
          <Modal></Modal>
        </>
      }
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
  cursor: pointer;
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