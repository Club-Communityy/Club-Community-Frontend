import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './page/Header';
import MainPage from './page/Main/MainPage';
import SignUpPage from './page/SignUp/SignUpPage';
import LoginPage from './page/Login/LoginPage';
import ClubRegistPage from './page/Club/ClubRegistPage';
import ClubRegistListPage from './page/Club/ClubRegistListPage';
import KakaoRedirect from './page/Login/KakaoRedirect';
import ClubNoticeRegistPage from './page/Club/ClubNoticeRegistPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className='contents'>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='sign-up' element={<SignUpPage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='/oauth' element={<KakaoRedirect />} />

            <Route path='club-regist' element={<ClubRegistPage />} />
            <Route path='club-regist-list' element={<ClubRegistListPage />} />
            <Route path='club-notice-regist' element={<ClubNoticeRegistPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
