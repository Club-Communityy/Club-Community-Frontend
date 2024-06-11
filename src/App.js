import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './page/Header';
import MainPage from './page/Main/MainPage';
import SignUpPage from './page/SignUp/SignUpPage';
import LoginPage from './page/Login/LoginPage';
import ClubRegistPage from './page/Club/ClubRegistPage';
import ClubRegistListPage from './page/Club/ClubRegistListPage';
import KakaoSignUpPage from './page/SignUp/KakaoSignUpPage';
import ClubNoticeRegistPage from './page/Club/ClubNoticeRegistPage';
import ClubRequestStatusPage from './page/Club/ClubRequestStatusPage';
import KakaoLoginPage from './page/Login/KakaoLoginPage';
import AdminClubApprovalPage from './page/Admin/AdminClubApprovalPage'
import ClubDetailsPage from './page/Club/ClubDetailsPage';
import ClubDetailsViewPage from './page/Club/ClubDetailsViewPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className='contents'>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/signUp' element={<SignUpPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/api/auth/kakao-code' element={<KakaoLoginPage />} />
            <Route path='/kakao-signup' element={<KakaoSignUpPage />} />

            {/* 동아리 등록 페이지 */}
            <Route path='/club/regist' element={<ClubRegistPage />} />
            {/* 동아리 신청 현황 페이지 */}
            <Route path='/club/request/status' element={<ClubRequestStatusPage />} />

            {/* 동아리 신청 현황 관리자용 페이지 */}
            <Route path='/club/regist/list' element={<ClubRegistListPage />} />

            {/* 마스터 회원의 동아리 공지 페이지 */}
            <Route path='/club/notice/regist' element={<ClubNoticeRegistPage />} />

            {/* 마스터 관리자의 승인/거절 페이지 */}
            <Route path='/admin/club/approval' element={<AdminClubApprovalPage />} />

            {/* 동아리 관리자의 동아리 기본 정보 관리 페이지 */}
            <Route path='/club/details' element={<ClubDetailsPage />} />

            {/* 동아리별 동아리 소개 페이지 */}
            <Route path='/club/view' element={<ClubDetailsViewPage />} />

          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
