import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from "./pages/login";
import Main from "./pages/main";
import SignUp from "./pages/signup";
import DashBoard from "./pages/dash_board";
import {atom} from "jotai/index";
import {UserToken} from "./pages/login/entity";
import Reports from "./pages/reports";
import PlatformManage from "./pages/platform_manage";
import MediaManage from "./pages/media_manage";
import AdExchange from "./pages/ad_exchange";
import Service from "./pages/service_manage";
import Layout from "./pages/layout";
export const initialState = atom(null)
export const mediaManage = atom({
  media:'',
  mediaName:''
})
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'/login'} element={<Login match={'login'}/>}/>
          <Route path={'/findId'} element={<Login match={'findId'}/>}/>
          <Route path={'/findPassword'} element={<Login match={'findPassword'}/>}/>
          <Route path={'/board/:id'} element={<Layout />}/>
          <Route path={'/'} element={<Main />}/>
          <Route path={'/signup'} element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
