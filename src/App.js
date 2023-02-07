import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from "./pages/login";
import Main from "./pages/main";
import Terms from "./pages/terms";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'login'} element={<Login match={'login'}/>}/>
          <Route path={'findId'} element={<Login match={'findId'}/>}/>
          <Route path={'findPassword'} element={<Login match={'findPassword'}/>}/>
          {/* 대시보드 */}
          <Route path={'/'} element={<Main />}/>
          <Route path={'terms'} element={<Terms/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
