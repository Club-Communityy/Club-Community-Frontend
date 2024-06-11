import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { KAKAO_AUTH_URL } from '../../OAuth';
const SignUpPage = () => {

	const navigate = useNavigate();

	const [signUpForm, setSignUpForm] = useState({
		loginId: '',
		password: '',
		username: '',
		birth: '',
		gender: '',
		department: '',
		studentId: '',
		phoneNumber: '',
		email: '',
		userType: 'ROLE_USER',
	});
	const { loginId, password, username, birth, gender, department, studentId, phoneNumber, email, userType } = signUpForm;

	const onChange = (e) => {
		const userSignUpForm = {
			...signUpForm,
			[e.target.name]: e.target.value
		};
		setSignUpForm(userSignUpForm);
	}

	const handleSignUp = async () => {
		try {
			const response = await axios.post('http://localhost:8080/api/auth/register', signUpForm, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			alert('회원가입을 축하합니다!');
			navigate('/');
		} catch (error) {
			alert(error.response.data.message);
		}
	};

	const handleKakaoLogin = () => {
		window.location.href = KAKAO_AUTH_URL;
	}

	return (
		<div className='auth-form-container'>
			<div className="auth-form">
				<div className='auth-form-title'>회원가입</div>
				<TextField
					id="standard-basic"
					label="아이디"
					name='loginId'
					value={loginId}
					onChange={onChange}
					variant="standard"
					sx={{ minWidth: '100%', marginTop: '10px' }}
				/>
				<TextField
					id="standard-basic"
					label="비밀번호"
					type="password"
					name='password'
					value={password}
					onChange={onChange}
					variant="standard"
					sx={{ minWidth: '100%', marginTop: '10px' }}
				/>
				<div style={{ display: 'flex' }}>
					<TextField
						id="standard-basic"
						label="이름"
						name='username'
						value={username}
						onChange={onChange}
						variant="standard"
						sx={{ minWidth: '30%', marginTop: '10px', marginRight: '5px' }}
					/>
					<TextField
						id="standard-basic"
						label="생년월일(19990101)"
						name='birth'
						value={birth}
						onChange={onChange}
						variant="standard"
						sx={{ minWidth: '30%', marginTop: '10px' }}
					/>
				</div>
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
				<TextField
					id="standard-basic"
					label="이메일"
					name='email'
					value={email}
					onChange={onChange}
					variant="standard"
					sx={{ minWidth: '100%', marginTop: '10px' }}
				/>
				<div className="auth-button" onClick={handleSignUp}>
					회원가입
				</div>
			</div>
		</div>
	);
};

export default SignUpPage;