import React, { useState } from 'react';
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
	const { clubId, applicationFormUrl } = location.state || {};
	const [clubDetails, setClubDetails] = useState({
		name: '',
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


	const handleDownloadJoinForm = async () => {
		try {
			const token = localStorage.getItem('token');
			const response = await axios.get(applicationFormUrl, {
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

	};

	return (
		<div>
			<Box component="form" sx={{ mt: 3 }}>
				<TitleContainer>
					<Typography variant="h4" gutterBottom>동아리 가입 신청</Typography>
					<Button onClick={handleDownloadJoinForm}>신청서 다운로드</Button>
				</TitleContainer>
				<TextField
					name="name"
					label="이름"
					value={clubDetails.name}
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
