import styled from "styled-components";
import {Link, useParams} from "react-router-dom";
import {defaultIcon, paramUrl, selectedIcon} from "./entity";
import {useEffect, useState} from "react";
import {useAtomValue} from "jotai";
import {roleAtom} from "../../store";

function Aside(props) {
  const params = useParams()
  const [asideWidth, setAsideWidth] = useState(false)
  const role = useAtomValue(roleAtom)
  useEffect(() => {
  }, [params.id]);

  const handleChangeWidth = () => {
    setAsideWidth(!asideWidth)
  }

  const narrowStyle = {
    li: {
      marginLeft: 12,
      marginRight: 12,
      borderRadius: 15
    },
    icon: {
      backgroundImage: "-webkit-image-set(url('/assets/images/logos/logo_s.png') 1x, url('/assets/images/logos/logo_s@2x.png') 2x,url('/assets/images/logos/logo_s@3x.png') 3x)",
      width: 28,
    },
    button: {
      transform: "rotate(180deg)"
    }
  }
  const widenStyle = {
    li:{
      marginLeft: 0,
      marginRight: 0,
    },
    icon: {
      backgroundImage: "url(/assets/images/logos/logo_inline_w@3x.png)",
      width: 148,
    },

  }
  return (
    <aside>
      <AsideContainer style={asideWidth? {width: 84} : {width:220}}>
        <Link to={'/board/dashboard'}>
          <Logo style={asideWidth? narrowStyle.icon : widenStyle.icon}/>
        </Link>
        <Menu>
          {/** 대시보드 **/}
          <li className={params.id.indexOf('dashboard') > -1 ? "active" : null} style={asideWidth? narrowStyle.li : widenStyle.li}>
            <Link to={'/board/dashboard'} className={asideWidth? "icon-mode" : "list-mode"}>
              <Icon style={params.id.indexOf("dashboard") > -1? {backgroundImage: `url(${selectedIcon.dashboard})`, opacity: 1}: {backgroundImage: `url(${selectedIcon.dashboard})`, opacity: .5}}/>
              <span className={asideWidth? "fadeOut" : "fadeIn"}>대시보드</span>
              </Link>
          </li>
          {/** 지면관리 **/}
          {role !== 'NORMAL' &&
          <li className={params.id.indexOf('media') > -1 ? "active" : null} style={asideWidth? narrowStyle.li : widenStyle.li}>
            <Link to={'/board/media'} className={asideWidth? "icon-mode" : "list-mode"}>
              <Icon style={params.id.indexOf("media") > -1? {backgroundImage: `url(${selectedIcon.media})`, opacity: 1}: {backgroundImage: `url(${selectedIcon.media})`, opacity: .5}}/>
              <span className={asideWidth? "fadeOut" : "fadeIn"}>지면관리</span>
              <DropIcon className={asideWidth? "fadeOut" : "fadeIn"} style={params.id.indexOf('media') > -1 ? narrowStyle.button : widenStyle.button}/>
            </Link>
            <SubMenu className={params.id.indexOf('media') > -1  ? "slide-down-2" : null}>
              <div>
                <div>
                  <Link to={'/board/media'} style={params.id === "media" ? {color:'#fff'}:null}>지면등록</Link>
                </div>
                <div>
                  <Link to={'/board/media2'} style={params.id === "media2" ? {color:'#fff'}:null}>지면 리스트</Link>
                </div>
              </div>
            </SubMenu>
          </li>
          }
          {/** 애드 익스체인지 관리 **/}
          {role !== 'NORMAL' &&
          <li className={params.id.indexOf("adExchange") > -1 ? "active" : null} style={asideWidth? narrowStyle.li : widenStyle.li}>
            <Link to={'/board/adExchange'} className={asideWidth? "icon-mode" : "list-mode"}>
              <Icon style={params.id.indexOf("adExchange") > -1? {backgroundImage: `url(${selectedIcon.adExchange})`, opacity: 1}: {backgroundImage: `url(${selectedIcon.adExchange})`, opacity: .5}}/>
              <span className={asideWidth? "fadeOut" : "fadeIn"}>애드 익스체인지 관리</span>
              <DropIcon className={asideWidth? "fadeOut" : "fadeIn"} style={params.id.indexOf("adExchange") > -1? narrowStyle.button : widenStyle.button}/>
            </Link>
            <SubMenu className={params.id.indexOf('adExchange') > -1 ? "slide-down-1" : null}>
              <div>
                <div><Link to={'/board/adExchange'} style={params.id === "adExchange" ? {color:'#fff'}:null}>서비스 수신 연동</Link></div>
              </div>
            </SubMenu>
          </li>
          }
          {/** 보고서 **/}
          <li className={params.id.indexOf('reports') > -1 ? "active" : null} style={asideWidth? narrowStyle.li : widenStyle.li}>
            <Link to={'/board/reports'} className={asideWidth? "icon-mode" : "list-mode"}>
              <Icon style={params.id.indexOf("reports") > -1? {backgroundImage: `url(${selectedIcon.reports})`, opacity: 1}: {backgroundImage: `url(${selectedIcon.reports})`, opacity: .5}}/>
              <span className={asideWidth? "fadeOut" : "fadeIn"}>보고서</span>
              <DropIcon className={asideWidth? "fadeOut" : "fadeIn"} style={params.id.indexOf('reports') > -1 || params.id === "reports-media" ? narrowStyle.button : widenStyle.button}/>
            </Link>
            <SubMenu className={params.id.indexOf('reports') > -1 ? "slide-down-4" : null}>
              <div>
                <div><Link to={'/board/reports'} style={params.id === "reports" ? {color:'#fff'}:null}>기간별 보고서</Link></div>
                <div><Link to={'/board/reports2'} style={params.id === "reports2" ? {color:'#fff'}:null}>매체별 보고서</Link></div>
                <div><Link to={'/board/reports3'} style={params.id === "reports3" ? {color:'#fff'}:null}>지면별 보고서</Link></div>
                <div><Link to={'/board/reports4'} style={params.id === "reports4" ? {color:'#fff'}:null}>외부 연동 수신 보고서</Link></div>
              </div>
            </SubMenu>
          </li>
          {/** 정산관리 **/}
          {role !== 'NORMAL' &&
          <li className={params.id.indexOf('account') > -1 ? "active" : null} style={asideWidth? narrowStyle.li : widenStyle.li}>
            <Link to={'/board/account'} className={asideWidth? "icon-mode" : "list-mode"}>
              <Icon style={params.id.indexOf("account") > -1? {backgroundImage: `url(${selectedIcon.account})`, opacity: 1}: {backgroundImage: `url(${selectedIcon.account})`, opacity: .5}}/>
              <span className={asideWidth? "fadeOut" : "fadeIn"}>정산 관리</span>
              <DropIcon className={asideWidth? "fadeOut" : "fadeIn"} style={params.id.indexOf('account') > -1 ? narrowStyle.button : widenStyle.button}/>
            </Link>
            <SubMenu className={params.id.indexOf('account') > -1 ? "slide-down-5" : null}>
              <div>
                <div><Link to={'/board/account'} style={params.id === "account" ? {color:'#fff'}:null}>정산 정보</Link></div>
                <div><Link to={'/board/accountHistory'} style={params.id === "accountHistory" ? {color:'#fff'}:null}>정산 이력</Link></div>
                <div><Link to={'/board/accountProfile'} style={params.id === "accountProfile" ? {color:'#fff'}:null}>정산 프로필 관리</Link></div>
                <div><Link to={'/board/accountConfirm'} style={params.id === "accountConfirm" ? {color:'#fff'}:null}>정산 심사</Link></div>
                <div><Link to={'/board/accountData'} style={params.id === "accountData" ? {color:'#fff'}:null}>데이터 관리</Link></div>
              </div>
            </SubMenu>
          </li>
          }
          {/** 플랫폼 관리 **/}
          {role !== 'NORMAL' &&
          <li className={params.id.indexOf('platform') > -1 ? "active" : null} style={asideWidth? narrowStyle.li : widenStyle.li}>
            <Link to={'/board/platform'} className={asideWidth? "icon-mode" : "list-mode"}>
              <Icon style={params.id.indexOf("platform") > -1? {backgroundImage: `url(${selectedIcon.platform})`, opacity: 1}: {backgroundImage: `url(${selectedIcon.platform})`, opacity: .5}}/>
              <span className={asideWidth? "fadeOut" : "fadeIn"}>플랫폼 관리</span>
              <DropIcon className={asideWidth? "fadeOut" : "fadeIn"} style={params.id.indexOf('platform') > -1 ? narrowStyle.button : widenStyle.button}/>
            </Link>
            <SubMenu className={params.id.indexOf('platform') > -1 ? "slide-down-4" : null}>
              <div>
                <div><Link to={'/board/platform'} style={params.id === "platform" ? {color:'#fff'} : null}>사용자 관리</Link></div>
                <div><Link to={'/board/platform2'} style={params.id === "platform2" ? {color:'#fff'} : null}>어드민 관리</Link></div>
                <div><Link to={'/board/platform3'} style={params.id === "platform3" ? {color:'#fff'} : null}>지면 이력 관리</Link></div>
                <div><Link to={'/board/platform4'} style={params.id === "platform4" ? {color:'#fff'} : null}>애드 익스체인지 이력 관리</Link></div>
              </div>
            </SubMenu>
          </li>
          }
        </Menu>
        <Narrow>
          <button type={'button'} onClick={handleChangeWidth}>
            <BtnNarrow style={asideWidth? narrowStyle.button : widenStyle.button}/>
          </button>
        </Narrow>
      </AsideContainer>
    </aside>
  )
}

export default Aside
const menuPL = '20px'

const AsideContainer = styled.div`
  position: relative;
  padding: 20px 0;
  height: 100vh;
  background-color: #141414;
  overflow: hidden;
  transition-duration: 0.5s;
`

const Logo = styled.div`
  margin-left: ${menuPL};
  height: 28px;
  background-image: url("/assets/images/logos/logo_inline_w@3x.png");
  background-size: contain;
  background-repeat: no-repeat;
`

const Menu = styled.ul`
  margin-top: 20px;
  width: 100%;
  & li {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition-duration: 0.5s;
    & > a {
      display: inline-block;
      padding-left: ${menuPL};
      width: 100%;
      height: 60px;
      color: #ccc;
      margin-left: 0px;
      transition-duration: 0.5s;
      &:hover {
        background-color: #f5811f;
      }
      & span {
        display: inline-block;
        margin-top: 19px;
        margin-left: 8px;
        vertical-align: middle;
        transition-duration: 0.5s;
        white-space: nowrap;
        font-size: 14px;
      }
    } 
  }
`

const Icon = styled.div`
  float: left;
  width: 24px;
  height: 24px;
  background-size: 24px;
  background-repeat: no-repeat;
  margin: 18px 0;
`

const DropIcon = styled.div`
  float:right;
  width: 10px;
  height: 6px;
  margin: 27px 18px;
  background-image: url("/assets/images/common/icon_dropup.png");
  background-repeat: no-repeat;
`

const  Narrow = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  padding: 14px;
  border-top: 1px solid #7e7e7e;
  & button {
    background-color: rgba(0,0,0,0);
  }
`

const BtnNarrow = styled.div`
  width: 40px;
  height: 40px;
  background-image: url("/assets/images/aside/btn_close.png");
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  transition-duration: .5s;
`

const SubMenu = styled.div`
  background-color: #212020;
  transition-duration: 0.5s;
  transition-delay: 0.5s;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left:52px;
  height: 0;
  & > div {
    color: #cccccc;
    & div {
      font-size: 13px;
      margin: 12px 0
    }
  }
`
