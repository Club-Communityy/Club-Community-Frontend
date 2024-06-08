import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
	const navigate = useNavigate();

	const goToMain = () => {
		navigate('/');
	}

	const goToLogin = () => {
		navigate('/login');
	}

	const goToSignUp = () => {
		navigate('/sign-up');
	}

	const goToClubList = () => {
		navigate('/clubL-list');
	};

	const goToClubEvents = () => {
		navigate('/club-events');
	};

	const goToVideos = () => {
		navigate('/videos');
	};

	const goToPhotos = () => {
		navigate('/photos');
	};

	return (
		<header>
			<div className='header'>
				<h2 onClick={goToMain}>동아리 커뮤니티</h2>
				<div className='header-nav'>
					<div onClick={goToLogin}>로그인</div>
					<div onClick={goToSignUp}>회원가입</div>
				</div>
			</div>
			<div className='header-nav-bar'>
				<div onClick={goToClubList}>동아리 조회</div>
				<div onClick={goToClubEvents}>동아리 행사</div>
				<div onClick={goToVideos}>동영상</div>
				<div onClick={goToPhotos}>사진</div>
			</div>
		</header>
	);
};

export default Header;