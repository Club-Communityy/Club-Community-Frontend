import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const ClubDetailsUpdatePage = () => {
	const [clubId, setClubId] = useState('');
	const [clubDetails, setClubDetails] = useState({
		introduction: '',
		history: '',
		mainImage: null,
		regularMeetingTime: '',
		presidentName: '',
		vicePresidentName: '',
		treasurerName: '',
	});
	const [clubs, setClubs] = useState([]);

	useEffect(() => {
		fetchClubs();
	}, []);

	const fetchClubs = async () => {
		try {
			const token = localStorage.getItem('token');
			const response = await axios.get('http://localhost:8080/api/clubs/my-applications', {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			setClubs(response.data);
		} catch (error) {
			console.error('Error fetching clubs', error);
		}
	};

	const fetchClubDetails = async (id) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axios.get(`http://localhost:8080/api/club-details/${id}`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			setClubDetails(response.data);
		} catch (error) {
			console.error('Error fetching club details', error);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setClubDetails((prevDetails) => ({
			...prevDetails,
			[name]: value,
		}));
	};

	const handleImageChange = (e) => {
		setClubDetails((prevDetails) => ({
			...prevDetails,
			mainImage: e.target.files[0],
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem('token');
			const formData = new FormData();
			formData.append('clubId', clubId);
			for (const key in clubDetails) {
				formData.append(key, clubDetails[key]);
			}
			await axios.post('http://localhost:8080/api/club-details', formData, {
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				}
			});
			alert('동아리 정보가 성공적으로 업데이트되었습니다.');
		} catch (error) {
			console.error('Error updating club details', error);
		}
	};

	return (
		<Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
			<Typography variant="h4" gutterBottom>동아리 기본 정보 관리</Typography>
			<FormControl fullWidth margin="normal">
				<InputLabel id="club-select-label">동아리 선택</InputLabel>
				<Select
					labelId="club-select-label"
					value={clubId}
					onChange={(e) => {
						setClubId(e.target.value);
						fetchClubDetails(e.target.value);
					}}
				>
					{clubs.map((club) => (
						<MenuItem key={club.id} value={club.id}>
							{club.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<TextField
				name="introduction"
				label="동아리 소개"
				value={clubDetails.introduction}
				onChange={handleChange}
				fullWidth
				multiline
				rows={4}
				margin="normal"
			/>
			<TextField
				name="history"
				label="동아리 역사"
				value={clubDetails.history}
				onChange={handleChange}
				fullWidth
				multiline
				rows={4}
				margin="normal"
			/>
			<TextField
				name="regularMeetingTime"
				label="정기 모임 시간"
				value={clubDetails.regularMeetingTime}
				onChange={handleChange}
				fullWidth
				margin="normal"
			/>
			<TextField
				name="presidentName"
				label="회장 이름"
				value={clubDetails.presidentName}
				onChange={handleChange}
				fullWidth
				margin="normal"
			/>
			<TextField
				name="vicePresidentName"
				label="부회장 이름"
				value={clubDetails.vicePresidentName}
				onChange={handleChange}
				fullWidth
				margin="normal"
			/>
			<TextField
				name="treasurerName"
				label="총무 이름"
				value={clubDetails.treasurerName}
				onChange={handleChange}
				fullWidth
				margin="normal"
			/>
			<Typography variant="body1" gutterBottom>
				동아리 대표 이미지:
			</Typography>
			<input
				type="file"
				accept="image/*"
				onChange={handleImageChange}
				style={{ margin: '20px 0' }}
			/>
			<Button type="submit" variant="contained" color="primary">
				등록하기
			</Button>
		</Box>
	);
};

export default ClubDetailsPage;
