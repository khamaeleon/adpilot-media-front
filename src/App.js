import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from "./pages/login";
import Main from "./pages/main";
import SignUp from "./pages/signup";
import {atom, useAtom} from "jotai/index";
import Layout from "./pages/layout";
import Modal from "./components/modal/Modal";
import {modalController} from "./store";

function App() {
  const [modal] = useAtom(modalController)

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
        <Modal isShow={modal.isShow}></Modal>
      </BrowserRouter>
    </div>
  );
}

export default App;
