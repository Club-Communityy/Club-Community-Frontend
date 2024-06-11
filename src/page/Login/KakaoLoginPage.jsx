import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { AppContext } from "../../utils/loginContext";
import axios from 'axios';

const KakaoLoginPage = () => {

	const { login } = useContext(AppContext);
	const navigate = useNavigate();
	const code = new URL(window.location.href).searchParams.get('code');

	const [signUpForm, setSignUpForm] = useState({
		username: '',
		birth: '',
		gender: '',
		department: '',
		studentId: '',
		phoneNumber: '',
		userType: 'ROLE_USER',
		code: code,
	});
	const { username, birth, gender, department, studentId, phoneNumber } = signUpForm;

	const onChange = (e) => {
		const userSignUpForm = {
			...signUpForm,
			[e.target.name]: e.target.value
		};
		setSignUpForm(userSignUpForm);
	}

	const handleKaKaoSignUp = async () => {
		console.log('signUpForm:', signUpForm);
		try {
			const response = await axios.post(
				'http://localhost:8080/api/auth/kakao-register', signUpForm,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			localStorage.setItem('token', response.data.token);
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	const handleKakaoLogin = async () => {
		try {
			const response = await axios.post(`http://localhost:8080/api/auth/kakao-login?code=${code}`, {}, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			localStorage.setItem('token', response.data.token);

			login();
			navigate('/');
		} catch (error) {
			console.log(error);
			if (error.response && error.response.status === 404) {

			} else {
				console.error('카카오 로그인 오류:', error);
			}
		}
	};

	useEffect(() => {
		handleKakaoLogin();
	}, []);

	return (
		<div className='auth-form-container'>
			<div className="auth-form">
				<div className='auth-form-title'>카카오 회원가입</div>
				<TextField
					id="standard-basic"
					label="이름"
					name='username'
					value={username}
					onChange={onChange}
					variant="standard"
					sx={{ minWidth: '100%', marginTop: '10px' }}
				/>
				<TextField
					id="standard-basic"
					label="생년월일(19990101)"
					name='birth'
					value={birth}
					onChange={onChange}
					variant="standard"
					sx={{ minWidth: '100%', marginTop: '10px' }}
				/>
				<FormControl variant="standard" sx={{ m: 1, minWidth: '100%' }}>
					<InputLabel id="demo-simple-select-standard-label">성별</InputLabel>
					<Select
						labelId="demo-simple-select-standard-label"
						id="demo-simple-select-standard"
						name='gender'
						value={gender}
						onChange={onChange}
						label="성별"
					>
						<MenuItem value={'MALE'}>남자</MenuItem>
						<MenuItem value={'FEMALE'}>여자</MenuItem>
					</Select>
				</FormControl>
				<TextField
					id="standard-basic"
					label="학과"
					name='department'
					value={department}
					onChange={onChange}
					variant="standard"
					sx={{ minWidth: '100%' }}
				/>
				<TextField
					id="standard-basic"
					label="학번"
					name='studentId'
					value={studentId}
					onChange={onChange}
					variant="standard"
					sx={{ minWidth: '100%', marginTop: '10px' }}
				/>
				<TextField
					id="standard-basic"
					label="전화번호"
					name='phoneNumber'
					value={phoneNumber}
					onChange={onChange}
					variant="standard"
					sx={{ minWidth: '100%', marginTop: '10px' }}
				/>
				<div className="auth-button" onClick={handleKaKaoSignUp}>
					회원가입
				</div>
			</div>
		</div>
	);
};

export default KakaoLoginPage;