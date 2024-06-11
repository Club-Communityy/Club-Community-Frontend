import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const ClubRegistPage = () => {

	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	const [clubRegistForm, setClubRegistForm] = useState({
		type: '', name: '', advisorName: '', advisorMajor: '', advisorContact: '',
	});

	const { type, name, advisorName, advisorMajor, advisorContact } = clubRegistForm;

	const [myInfoForm, setMyInfoForm] = useState({
		username: '', department: '', studentId: '', phoneNumber: '',

	});

	const { username, department, studentId, phoneNumber } = myInfoForm;

	const onChange = (e) => {
		const userClubRegistForm = {
			...clubRegistForm,
			[e.target.name]: e.target.value
		}
		setClubRegistForm(userClubRegistForm);
	}

	const handleClubRegist = async () => {
		try {
			await axios.post('http://localhost:8080/api/clubs/apply', clubRegistForm, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})

			alert('동아리 등록 신청이 완료되었습니다!');
			navigate('/club/request/status');
		} catch (err) {
			console.log(err);
		}
	};


	const handleGetMyInfo = async () => {
		try {
			const response = await axios.get('http://localhost:8080/api/auth/me', {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			const userInfo = response.data;

			setMyInfoForm(prevState => ({
				...prevState,
				username: userInfo.username,
				department: userInfo.department,
				studentId: userInfo.studentId,
				phoneNumber: userInfo.phoneNumber,
			}))
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		handleGetMyInfo();
	}, []);

	return (
		<div className='auth-form-container'>
			<div className='auth-form'>
				<div className='auth-form-title'>동아리 등록</div>
				<FormControl variant="standard" sx={{ m: 1, minWidth: '100%' }}>
					<InputLabel id="demo-simple-select-standard-label">동아리 종류</InputLabel>
					<Select
						labelId="demo-simple-select-standard-label"
						id="demo-simple-select-standard"
						name='type'
						value={type}
						onChange={onChange}
						label="동아리 종류"
					>
						<MenuItem value={'CENTRAL'}>중앙</MenuItem>
						<MenuItem value={'DEPARTMENT'}>학과</MenuItem>
					</Select>
				</FormControl>
				<TextField
					id="standard-basic"
					label="동아리 이름"
					name='name'
					value={name}
					onChange={onChange}
					variant="standard"
					sx={{ minWidth: '100%' }}
				/>
				<TextField
					id="standard-basic"
					label="신청자 이름"
					name='username'
					value={username}
					onChange={onChange}
					variant="standard"
					sx={{ minWidth: '100%', marginTop: '10px' }}
					disabled
				/>
				<TextField
					id="standard-basic"
					label="신청자 소속"
					name='department'
					value={department}
					onChange={onChange}
					variant="standard"
					sx={{ minWidth: '100%', marginTop: '10px' }}
					disabled
				/>
				<TextField
					id="standard-basic"
					label="신청자 학번"
					name='userStudentId'
					value={studentId}
					onChange={onChange}
					variant="standard"
					sx={{ minWidth: '100%', marginTop: '10px' }}
					disabled
				/>
				<TextField
					id="standard-basic"
					label="신청자 연락처"
					name='userPhone'
					value={phoneNumber}
					onChange={onChange}
					variant="standard"
					sx={{ minWidth: '100%', marginTop: '10px' }}
					disabled
				/>
				<TextField
					id="standard-basic"
					label="지도교수 이름"
					name='advisorName'
					value={advisorName}
					onChange={onChange}
					variant="standard"
					sx={{ minWidth: '100%', marginTop: '10px' }}
				/>
				<TextField
					id="standard-basic"
					label="지도교수 전공"
					name='advisorMajor'
					value={advisorMajor}
					onChange={onChange}
					variant="standard"
					sx={{ minWidth: '100%', marginTop: '10px' }}
				/>
				<TextField
					id="standard-basic"
					label="지도교수 연락처"
					name='advisorContact'
					value={advisorContact}
					onChange={onChange}
					variant="standard"
					sx={{ minWidth: '100%', marginTop: '10px' }}
				/>
				<div className="auth-button" onClick={handleClubRegist}>
					확인
				</div>
			</div>
		</div>
	);
};

export default ClubRegistPage;