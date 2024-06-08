import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const SignUpPage = () => {

	const [signUpForm, setSignUpForm] = useState({
		name: '',
		birth: '',
		gender: '',
		department: '',
		studentId: '',
		phone: '',
		email: '',
	});

	const { name, birth, gender, department, studentId, phone, email } = signUpForm;

	const onChange = (e) => {
		const userSignUpForm = {
			...signUpForm,
			[e.target.name]: e.target.value
		};
		setSignUpForm(userSignUpForm);
	}

	const handleSignUp = () => {
		console.log(signUpForm);
	}


	return (
		<div className='auth-form-container'>
			<div className="auth-form">
				<div className='auth-form-title'>회원가입</div>
				<TextField
					id="standard-basic"
					label="이름"
					name='name'
					value={name}
					onChange={onChange}
					variant="standard"
					sx={{ minWidth: '100%', marginTop: '10px' }}
				/>
				<TextField
					id="standard-basic"
					label="생년월일"
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
						<MenuItem value={'남자'}>남자</MenuItem>
						<MenuItem value={'여자'}>여자</MenuItem>
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
					name='phone'
					value={phone}
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