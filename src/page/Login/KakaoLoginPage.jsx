import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../../utils/loginContext";
import axios from 'axios';

const KakaoLoginPage = () => {
	const { login } = useContext(AppContext);
	const navigate = useNavigate();
	const code = new URL(window.location.href).searchParams.get('code');
	const [type, setType] = useState('');

	const handleKakaoLogin = async () => {
		try {
			const response = await axios.post(`http://localhost:8080/api/auth/kakao-login?code=${code}`);
			setType(response.data.type);

			if (response.data.type === 'ACCESS') {
				getKaKaoUserData(response.data.token)
			} else if (response.data.type === 'BEARER') {
				localStorage.setItem('token', response.data.token);
				login();
				navigate('/');
			}

		} catch (error) {
			console.error('카카오 로그인 오류:', error);
		}
	};

	const getKaKaoUserData = async token => {
		const kakaoUser = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		const email = kakaoUser.data.kakao_account.email;

		navigate('/kakao-signup', { state: { email } })
	}

	useEffect(() => {
		handleKakaoLogin();
	}, []);

	return (
		<div className='auth-form-container'>
			<div>카카오 로그인을 시도 중입니다...</div>
		</div>
	);
};

export default KakaoLoginPage;
