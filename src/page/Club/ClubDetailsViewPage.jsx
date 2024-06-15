import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
	Box,
	Typography,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Paper,
	Divider,
	Grid,
	Button
} from '@mui/material';

const ClubDetailsViewPage = () => {

	const navigate = useNavigate('');

	const [clubId, setClubId] = useState('');
	const [clubDetails, setClubDetails] = useState(null);
	const [clubs, setClubs] = useState([]);

	useEffect(() => {
		fetchClubs();
	}, []);

	const fetchClubs = async () => {
		try {
			const token = localStorage.getItem('token');
			const response = await axios.get('http://localhost:8080/api/clubs/approved', {
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
			if (error.response && error.response.status === 404) {
				setClubDetails(null);
			} else {
				console.error('Error fetching club details', error);
			}
		}
	};

	const handleClubChange = (e) => {
		const id = e.target.value;
		setClubId(id);
		fetchClubDetails(id);
	};

	const handleDownload = async () => {
		try {
			const token = localStorage.getItem('token');
			const response = await axios.get(clubDetails.applicationFormUrl, {
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
			console.error('Error downloading application form', error);
		}
	};

	return (
		<Box sx={{ mt: 3, px: 2 }}>
			<Typography variant="h4" gutterBottom>동아리 소개</Typography>
			<FormControl fullWidth margin="normal">
				<InputLabel id="club-select-label">동아리 선택</InputLabel>
				<Select
					labelId="club-select-label"
					value={clubId}
					onChange={handleClubChange}
				>
					{clubs.map((club) => (
						<MenuItem key={club.id} value={club.id}>
							{club.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			{clubId && (
				clubDetails ? (
					<Paper sx={{ mt: 3, p: 2 }}>
						<Grid container spacing={2}>
							<Grid item xs={12} md={8}>
								<Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>동아리 소개</Typography>
								<Divider sx={{ mb: 2 }} />
								<Typography variant="body1" paragraph>{clubDetails.introduction}</Typography>

								<Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>정기 모임 시간</Typography>
								<Divider sx={{ mb: 2 }} />
								<Typography variant="body1" paragraph>{clubDetails.regularMeetingTime}</Typography>

								<Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>회장</Typography>
								<Divider sx={{ mb: 2 }} />
								<Typography variant="body1" paragraph>{clubDetails.presidentName}</Typography>

								<Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>부회장</Typography>
								<Divider sx={{ mb: 2 }} />
								<Typography variant="body1" paragraph>{clubDetails.vicePresidentName}</Typography>

								<Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>총무</Typography>
								<Divider sx={{ mb: 2 }} />
								<Typography variant="body1" paragraph>{clubDetails.treasurerName}</Typography>

								<Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>동아리 가입 신청서</Typography>
								<Divider sx={{ mb: 2 }} />
								{clubDetails.applicationFormUrl && (
									<Button variant="contained" color="primary" onClick={handleDownload}>
										신청서 다운로드
									</Button>
								)}
							</Grid>
							<Grid item xs={12} md={4}>
								{clubDetails.mainImage && (
									<Box sx={{ mt: 2 }}>
										<Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>대표 이미지</Typography>
										<Divider sx={{ mb: 2 }} />
										<img
											src={`data:image/jpeg;base64,${clubDetails.mainImage}`}
											alt="동아리 대표 이미지"
											style={{ maxWidth: '100%', height: 'auto' }}
										/>
									</Box>
								)}
							</Grid>
						</Grid>
						<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
							<Button
								variant="contained"
								color="primary"
								onClick={() => {
									navigate('/club/join', {
										state: {
											clubId: clubId,
											applicationFormUrl: clubDetails.applicationFormUrl
										}
									})
								}}>
								가입신청
							</Button>
						</div>
					</Paper>
				) : (
					<Typography variant="body1" sx={{ mt: 3, color: 'red', fontWeight: 'bold' }}>
						동아리 기본 설명이 아직 생성되지 않았습니다.
					</Typography>
				)
			)}
		</Box>
	);
};

export default ClubDetailsViewPage;
