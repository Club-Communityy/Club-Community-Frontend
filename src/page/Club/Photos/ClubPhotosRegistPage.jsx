import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const ClubPhotosRegistPage = () => {

	const navigate = useNavigate();
	const [clubId, setClubId] = useState();
	const [clubs, setClubs] = useState([]);
	const [clubVideosInfo, setClubVideosInfo] = useState({
		clubId: '',
		image: null,
		title: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setClubVideosInfo((prevState) => ({
			...prevState,
			[name]: value
		}))
	};

	const handleImageChange = (e) => {
		setClubVideosInfo((prevState) => ({
			...prevState,
			image: e.target.files[0]
		}));
	};

	const fetchClubs = async () => {
		try {
			const token = localStorage.getItem('token');
			const response = await axios.get('http://localhost:8080/api/clubs/my-applications/approved', {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			setClubs(response.data);
		} catch (error) {
			console.error('Error fetching clubs', error);
		}
	};

	const handleSubmit = async () => {
		try {
			await axios.post('http://localhost:8080/api/post/photo/regist', clubVideosInfo, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			navigate('/club/photos');
		} catch (error) {
			console.error('Error submitting photo', error);
		}
	};

	useEffect(() => {
		fetchClubs();
	}, [])

	return (
		<div>
			<Box component="form" sx={{ mt: 3 }}>
				<Typography variant="h4" gutterBottom>동아리 활동 사진 관리</Typography>
				<FormControl fullWidth margin="normal">
					<InputLabel id="club-select-label">동아리 선택</InputLabel>
					<Select
						labelId="club-select-label"
						value={clubId}
						onChange={(e) => {
							setClubVideosInfo((prevState) => ({
								...prevState,
								clubId: e.target.value,
							}));
						}}
					>
						{clubs.map((club) => (
							<MenuItem key={club.id} value={club.id}>
								{club.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<input
					accept="image/*"
					type="file"
					name="image"
					onChange={handleImageChange}
					style={{ display: 'block', marginBottom: '16px' }}
				/>
				<TextField
					name="title"
					label="사진 제목"
					value={clubVideosInfo.title}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
					<Button variant="contained" color="primary" onClick={handleSubmit}>
						등록
					</Button>
				</Box>
			</Box>
		</div>
	);
};

export default ClubPhotosRegistPage;