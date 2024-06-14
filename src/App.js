import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './page/Header';
import MainPage from './page/Main/MainPage';
import SignUpPage from './page/SignUp/SignUpPage';
import LoginPage from './page/Login/LoginPage';
import ClubRegistPage from './page/Club/ClubRegistPage';
import KakaoSignUpPage from './page/SignUp/KakaoSignUpPage';
import ClubNoticeRegistPage from './page/Club/ClubNoticeRegistPage';
import ClubRequestStatusPage from './page/Club/ClubRequestStatusPage';
import KakaoLoginPage from './page/Login/KakaoLoginPage';
import AdminClubApprovalPage from './page/Admin/AdminClubApprovalPage'
import ClubDetailsPage from './page/Club/ClubDetailsPage';
import ClubDetailsViewPage from './page/Club/ClubDetailsViewPage';
import ClubVideosPage from './page/Club/Videos/ClubVideosPage';
import ClubVideosRegistPage from './page/Club/Videos/ClubVideosRegistPage';
import ClubPhotosPage from './page/Club/Photos/ClubPhotosPage';
import ClubJoinPage from './page/Club/Join/ClubJoinPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className='contents'>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/api/auth/kakao-code' element={<KakaoLoginPage />} />
            <Route path='/kakao-signup' element={<KakaoSignUpPage />} />

            {/* 2-1. 동아리 등록 페이지 */}
            <Route path='/club/regist' element={<ClubRegistPage />} />

            {/* 2-2. 동아리 신청 현황 페이지 */}
            <Route path='/club/request/status' element={<ClubRequestStatusPage />} />

            {/* 3. 마스터 관리자의 승인/거절 페이지 */}
            <Route path='/admin/club/approval' element={<AdminClubApprovalPage />} />

            {/* 4. 동아리 관리자의 동아리 기본 정보 관리 페이지 */}
            <Route path='/club/details' element={<ClubDetailsPage />} />

            {/* 동아리별 동아리 소개 페이지 */}
            <Route path='/club/view' element={<ClubDetailsViewPage />} />

            {/* 마스터 회원의 동아리 공지 등록 페이지 */}
            <Route path='/club/notice/regist' element={<ClubNoticeRegistPage />} />

            {/* 5. 일반 회원의 동아리 가입 신청 */}
            <Route path='/club/join' element={<ClubJoinPage />} />

            {/* 7. 마스터 회원의 활동 영상 페이지 */}
            <Route path='/club/videos' element={<ClubVideosPage />} />

            {/* 마스터 회원의 활동 영상 등록 페이지 */}
            <Route path='/club/regist/videos' element={<ClubVideosRegistPage />} />

            {/* 마스터 회원의 활동 사진 페이지 */}
            <Route path='/club/photos' element={<ClubPhotosPage />} />

            {/* 마스터 회원의 활동 영상 등록 페이지 */}
            <Route path='/club/regist/photos' element={<ClubVideosRegistPage />} />

          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
