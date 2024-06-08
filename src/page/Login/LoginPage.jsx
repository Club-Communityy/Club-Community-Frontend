import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/AuthForm.css';
import TextField from '@mui/material/TextField';
import { KAKAO_AUTH_URL } from './../../OAuth';

const LoginPage = () => {

	const navigate = useNavigate();

	const [loginForm, setLoginForm] = useState({
		id: '',
		password: '',
	});

	const { id, password } = loginForm;

	const onChange = (e) => {
		const userLoginForm = {
			...loginForm,
			[e.target.name]: e.target.value
		};
		setLoginForm(userLoginForm);
	}

	// const handleLogin = async () => {
	// 	setIsLoginAttempted(true);

	// 	try {
	// 		const response = await defaultBackInstance.post(BACKEND_SERVER_URL + '/usermanagement/login', {
	// 			accountId: account_id,
	// 			password: password
	// 		});

	// 		const responseData = response.data;

	// 		localStorage.setItem('accessToken', responseData.accessToken);
	// 		localStorage.setItem('refreshToken', responseData.refreshToken);
	// 		login();
	// 		navigate(-1);
	// 	} catch (error) {
	// 		alert('아이디나 비밀번호가 잘못되었습니다. 다시 시도해주세요.')
	// 		console.log(error);
	// 	}
	// }

	const handleKakaoLogin = () => {
		window.location.href = KAKAO_AUTH_URL;
	}

	return (
		<div className='auth-form-container'>
			<div className="auth-form">
				<TextField
					id="standard-basic"
					label="아이디"
					name='id'
					value={id}
					onChange={onChange}
					variant="standard"
					sx={{ minWidth: '100%', marginTop: '10px' }}
				/>
				<TextField
					id="standard-basic"
					type='password'
					label="비밀번호"
					name='password'
					value={password}
					onChange={onChange}
					variant="standard"
					sx={{ minWidth: '100%', marginTop: '10px' }}
				/>
				<div className="auth-button">
					로그인
				</div>
				<div className="kakao-button" onClick={handleKakaoLogin}>
					<img src="./kakao_login_btn.png" alt="카카오 로그인" />
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
