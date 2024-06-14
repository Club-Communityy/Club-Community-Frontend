import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../utils/loginContext';

import './Header.css';

const Header = () => {

	const navigate = useNavigate();
	const { isAuthenticated, logout } = useContext(AppContext);
	const token = localStorage.getItem('token');

	const [login, setLogin] = useState(false);

	const goToMain = () => { navigate('/'); }

	const goToLogin = () => { navigate('/login'); }

	const goToSignUp = () => { navigate('/signup'); }

	const handleLogout = () => {
		logout();
		navigate('/');
	}
	return (
		<header>
			<div className='header'>
				<h2 onClick={goToMain}>동아리 커뮤니티</h2>
				{
					isAuthenticated ? (
						<div className='header-nav'>
							<div onClick={() => { navigate('/club/regist'); }}>동아리등록</div>
							<div onClick={() => { navigate('/club/request/status'); }}>신청현황</div>
							<div onClick={() => { navigate('/club/details'); }}>동아리관리</div>
							<div onClick={handleLogout}>로그아웃</div>
						</div>
					) : (
						<div className='header-nav'>
							<div onClick={goToLogin}>로그인</div>
							<div onClick={goToSignUp}>회원가입</div>
						</div>
					)
				}
			</div>
			<div className='header-nav-bar'>
				<div onClick={() => { navigate('/club/view'); }}>동아리 조회</div>
				<div onClick={() => { navigate('/club/events'); }}>동아리 행사</div>
				<div onClick={() => { navigate('/club/videos'); }}>동영상</div>
				<div onClick={() => { navigate('/club/photos'); }}>사진</div>
			</div>
		</header>
	);
};

export default Header;