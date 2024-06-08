import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
const ClubRegistPage = () => {

	const [clubRegistForm, setClubRegistForm] = useState({
		clubType: '', clubName: '',
		userName: '', userDepartment: '', userStudentId: '', userPhone: '',
		professorName: '', professorDepartment: '', professorPhone: '',
	});

	const { clubType, clubName, userName, userDepartment, userStudentId, userPhone,
		professorName, professorDepartment, professorPhone } = clubRegistForm;

	const onChange = (e) => {
		const userClubRegistForm = {
			...clubRegistForm,
			[e.target.name]: e.target.value
		}
		setClubRegistForm(userClubRegistForm);
	}

	const handleClubRegist = () => {
		console.log(clubRegistForm);
	}

	return (
		<div className='auth-form-container'>
			<div className='auth-form'>
				<div className='auth-form-title'>동아리 등록</div>
				<FormControl variant="standard" sx={{ m: 1, minWidth: '100%' }}>
					<InputLabel id="demo-simple-select-standard-label">동아리 종류</InputLabel>
					<Select
						labelId="demo-simple-select-standard-label"
						id="demo-simple-select-standard"
						name='clubType'
						value={clubType}
						onChange={onChange}
						label="동아리 종류"
					>
						<MenuItem value={'중앙'}>중앙</MenuItem>
						<MenuItem value={'학과'}>학과</MenuItem>
					</Select>
				</FormControl>
				<TextField
					id="standard-basic"
					label="동아리 이름"
					name='clubName'
					value={clubName}
					onChange={onChange}
					variant="standard"
					sx={{ minWidth: '100%' }}
				/>
				<TextField
					id="standard-basic"
					label="신청자 이름"
					name='userName'
					value={userName}
					onChange={onChange}
					variant="standard"
					sx={{ minWidth: '100%', marginTop: '10px' }}
				/>
				<TextField
					id="standard-basic"
					label="신청자 소속"
					name='userDepartment'
					value={userDepartment}
					onChange={onChange}
					variant="standard"
					sx={{ minWidth: '100%', marginTop: '10px' }}
				/>
				<TextField
					id="standard-basic"
					label="신청자 학번"
					name='userStudentId'
					value={userStudentId}
					onChange={onChange}
					variant="standard"
					sx={{ minWidth: '100%', marginTop: '10px' }}
				/>
				<TextField
					id="standard-basic"
					label="신청자 연락처"
					name='userPhone'
					value={userPhone}
					onChange={onChange}
					variant="standard"
					sx={{ minWidth: '100%', marginTop: '10px' }}
				/>
				<TextField
					id="standard-basic"
					label="지도교수 이름"
					name='professorName'
					value={professorName}
					onChange={onChange}
					variant="standard"
					sx={{ minWidth: '100%', marginTop: '10px' }}
				/>
				<TextField
					id="standard-basic"
					label="지도교수 전공"
					name='professorDepartment'
					value={professorDepartment}
					onChange={onChange}
					variant="standard"
					sx={{ minWidth: '100%', marginTop: '10px' }}
				/>
				<TextField
					id="standard-basic"
					label="지도교수 연락처"
					name='professorPhone'
					value={professorPhone}
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