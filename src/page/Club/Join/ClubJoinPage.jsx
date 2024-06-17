import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';

const TitleContainer = styled.div`
	display: flex;
	justify-content: space-between;
`

const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`

const ClubJoinPage = () => {
	const location = useLocation();
	const token = localStorage.getItem('token');
	const memberId = localStorage.getItem('memberId');
	const { clubId, applicationFormUrl } = location.state || {};
	const [clubDetails, setClubDetails] = useState({
		clubId: clubId,
		memberId: memberId,
		file: null,
		memberName: '',
		department: '',
		studentId: '',
	});

	const [applicationForm, setApplicationForm] = useState(null);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setClubDetails((prevDetails) => ({
			...prevDetails,
			[name]: value,
		}));
	};

	const handleGetMyInfo = async () => {
		try {
			const response = await axios.get('http://localhost:8080/api/auth/me', {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			const userInfo = response.data;

			setClubDetails(prevState => ({
				...prevState,
				memberName: userInfo.username,
				department: userInfo.department,
				studentId: userInfo.studentId,
			}))
		} catch (err) {
			console.log(err);
		}
	};


	const handleDownloadJoinForm = async () => {
		try {
			const token = localStorage.getItem('token');
			const response = await axios.get('http://localhost:8080' + applicationFormUrl, {
				headers: {
					'Authorization': `Bearer ${token}`
				},
				responseType: 'blob'
			});

			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', '동아리 가입 신청서 양식.hwp');
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (error) {
			console.error('신청서 다운로드 오류:', error);
		}
	}

	const handleApplicationFormChange = (e) => {
		setApplicationForm(e.target.files[0]);
	};

	const handleJoinForm = async () => {
		try {
			const formData = new FormData();
			formData.append('clubId', clubDetails.clubId);
			formData.append('memberId', clubDetails.memberId);
			formData.append('file', applicationForm);
			formData.append('memberName', clubDetails.memberName);
			formData.append('department', clubDetails.department);
			formData.append('studentId', clubDetails.studentId);

			const response = await axios.post('http://localhost:8080/api/club-members/apply', formData, {
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			});

			alert('가입 신청이 제출되었습니다!');

		} catch (error) {
			console.error('가입 신청 제출 오류:', error);
		}
	};

	useEffect(() => {
		handleGetMyInfo();
	}, [])

	return (
		<div>
			<Box component="form" sx={{ mt: 3 }}>
				<TitleContainer>
					<Typography variant="h4" gutterBottom>동아리 가입 신청</Typography>
					<Button onClick={handleDownloadJoinForm}>신청서 다운로드</Button>
				</TitleContainer>
				<TextField
					name="memberName"
					label="이름"
					value={clubDetails.memberName}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
				<TextField
					name="department"
					label="학과"
					value={clubDetails.department}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
				<TextField
					name="studentId"
					label="학번"
					value={clubDetails.studentId}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
				<Typography variant="body1" gutterBottom>
					동아리 가입 신청서:
				</Typography>
				<input
					type="file"
					accept=".hwp"
					onChange={handleApplicationFormChange}
					style={{ margin: '10px 0' }}
				/>
				<ButtonContainer>
					<Button variant="contained" color="primary" onClick={handleJoinForm}>등록</Button>
				</ButtonContainer>
			</Box>
		</div >
	);
};

export default ClubJoinPage;
