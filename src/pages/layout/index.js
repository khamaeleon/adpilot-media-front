import Aside from "../../components/aside";
import {Route, useNavigate, useParams} from "react-router-dom";
import DashBoard from "../dash_board";
import MediaManage from "../media_manage";
import PlatformManage from "../platform_manage";
import Reports from "../reports";
import AdExchange from "../ad_exchange";
import Service from "../service_manage";
import {useEffect, useState} from "react";

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
      {params.id == 'dashboard' && <DashBoard />}
      {params.id == 'media' && <MediaManage />}
      {params.id == 'platform' && <PlatformManage />}
      {params.id == 'reports' && <Reports />}
      {params.id == 'adExchange' && <AdExchange />}
      {params.id == 'service' && <Service />}
    </div>
  )
}

export default Layout