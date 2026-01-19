import styled, {css} from "styled-components";
import {Link, useNavigate, useParams} from "react-router-dom";
import {menuList, narrowStyle, selectedIcon, widenStyle} from "./entity";
import {useEffect, useState} from "react";
import {AdminInfo} from "../../pages/layout";
import {useAtom, useAtomValue} from "jotai";
import {tokenResultAtom} from "../../pages/login/entity";
import {logo_inline_w} from "../../constants/GlobalConst";
const mainColor = css`${props => props.theme.color.mainColor}`
const subColor = css`${props => props.theme.color.subColor}`
const textColor = css`${props => props.theme.color.textColor}`
function AsideList (props) {
  const {id, mode, role} = props
  const [userName, setUserName] = useState('')
  const adminInfoState = useAtomValue(AdminInfo)
  const params = useParams()
  const navigate = useNavigate()

  /**
   * ...정해진 주소 이외 접근 시 홈으로
   */
  useEffect(() => {
    if(params?.id === undefined) {
      navigate('/')
    }
  }, []);

  /**
   * 매체 전환시 리렌더링 일으키게 didupdate
   */
  useEffect(()=>{
    setUserName(adminInfoState.convertedUser)
    if(params.id === 'accountProfile'&& adminInfoState.convertedUser === '') navigate('/board/account')

  },[adminInfoState.convertedUser])
  /**
   * 대메뉴 권한 체크
   * @param item
   * @returns {boolean}
   */
  const checkPermissions = (item) => {
    if(role === 'NORMAL' && ['reports','dashboard','account'].includes(item.name)) {
      return true;
    }
    if(['ADMIN','SUPER_ADMIN'].includes(role)) {
      return true;
    }
  }
  /**
   * 소메뉴 권한 체크
   * @param child
   * @returns {boolean}
   */
  const checkPermission = (child) => {
    if(role === 'SUPER_ADMIN') {
      if(userName !== ''){ //매체 전환
        return true;
      } else {
        if(child.name !== 'accountProfile') {
          return true;
        }
      }
    } else {
      if(role === 'ADMIN' ) {
        if(userName !== ''){
          if(child.name !== 'reportsMedia' && child.name !== 'platformAdmin' && child.name !== 'platformTerm' ) {
            return true;
          }
        } else {
          if(child.name !== 'accountProfile' && child.name !== 'platformAdmin' && child.name !== 'platformTerm') {
            return true;
          }
        }
      } else {
        if(role === 'NORMAL' && ['reports','reportsInventory','reportsAdExchange','account','accountHistory'].includes(child.name)) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  return (
    <>
      {menuList.map((item,key) => {
        return(
          <div key={key}>
            {params.id !== undefined && checkPermissions(item)&&
              <li className={item.include.includes(id) ? "active" : null} style={mode? narrowStyle.li : widenStyle.li}>
                <Link to={`/board/${item.name}`} className={mode? "icon-mode" : "list-mode"}>
                  <Icon style={id.indexOf(item.name) > -1? {backgroundImage: `url(${selectedIcon[item.name]})`, opacity: 1}: {backgroundImage: `url(${selectedIcon[item.name]})`, opacity: .5}}/>
                  <span className={mode? "fadeOut" : "fadeIn"}>{item.header}</span>
                  {item.child.length > 0 && <DropIcon className={mode? "fadeOut" : "fadeIn"} style={id.indexOf(item.name) > -1 ? narrowStyle.button : null}/>}
                </Link>
                {item.child.length > 0 && <SubMenu active={item.include.includes(id)} length={item.child.length}>
                  {item.child.map((child,key) => {
                    return (
                      <div key={key} style={checkPermission(child) ? null : {padding: 0}}>
                        {checkPermission(child)&&
                          <Link to={`/board/${child.name}`} style={id === child.name || id === child.detail ? {color:'#fff'}:null}>{child.header}</Link>
                        }
                      </div>
                    )
                  })}
                </SubMenu>}
              </li>
            }
          </div>
        )
      })
      }
    </>
  )
}

function Aside() {
  const params = useParams()
  const [asideWidth, setAsideWidth] = useState(false)
  const [tokenUserInfo] = useAtom(tokenResultAtom)
  /**
   * 가로 길이 변경
   */
  const handleChangeWidth = () => {
    setAsideWidth(!asideWidth)
  }

  return (
    <aside>
      <AsideContainer style={asideWidth ? {width: 84} : {width: 220}}>
        <Logo style={asideWidth ? narrowStyle.icon : widenStyle.icon}/>
        <Menu>
          <AsideList id={params.id} mode={asideWidth} role={tokenUserInfo.role}/>
        </Menu>
        <Narrow>
          <button type={'button'} onClick={handleChangeWidth}>
            <BtnNarrow style={asideWidth ? narrowStyle.button : null}/>
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
  background-image: linear-gradient(to left, ${textColor}, ${mainColor});
  overflow: hidden;
  transition-duration: 0.5s;
`

const Logo = styled.div`
  margin-left: ${menuPL};
  height: 56px;
  background-image: url(${logo_inline_w});
  background-size: contain;
  background-repeat: no-repeat;
  transition-duration: 0.3s;
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
        background-color: ${mainColor};
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
  margin: 18px 10px;
`

const DropIcon = styled.div`
  float: right;
  width: 10px;
  height: 6px;
  margin: -11px 18px;
  background-image: url("/assets/images/common/icon_dropup.png");
  background-repeat: no-repeat;
`

const Narrow = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  padding: 14px;
  //border-top: 1px solid #7e7e7e;

  & button {
    background-color: rgba(0, 0, 0, 0);
  }
`

const BtnNarrow = styled.div`
  width: 30px;
  height: 30px;
  background-image: url("/assets/images/aside/btn_close.png");
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  transition-duration: .5s;
`

const SubMenu = styled.div`
  background-color: ${textColor};
  transition-duration: .5s;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left:52px;
  max-height: ${({active,length}) => active ? `${(length * 36)+20}px` : 0};
  & > div {
    &:first-child {
      padding: ${({length}) => length > 1 ? '18px 0 8px' : '18px 0'}
    }
    &:last-child {
      padding: ${({length}) => length > 1 ? '8px 0 18px' : '18px 0'}
    }
    color: #cccccc;
    font-size: 13px;
    padding: 8px 0;
    > a {
      padding-right: 5px;
      display: block;
      height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`
