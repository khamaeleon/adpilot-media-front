import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from "./pages/login";
import Main from "./pages/main";
import SignUp from "./pages/signup";
import DashBoard from "./pages/dash_board";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'login'} element={<Login match={'login'}/>}/>
          <Route path={'findId'} element={<Login match={'findId'}/>}/>
          <Route path={'findPassword'} element={<Login match={'findPassword'}/>}/>
          <Route path={'dash-board'} element={<DashBoard match={'dashBoard'}/>}/>
          <Route path={'/'} element={<Main />}/>
          <Route path={'signup'} element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
