import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const ClubVideosRegistPage = () => {

	const [clubVideosInfo, setClubVideosInfo] = useState({
		url: '',
		title: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setClubVideosInfo((prevState) => ({
			...prevState,
			[name]: value
		}))
	};

	const handleSubmit = () => {

	};

	return (
		<div>
			<Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
				<Typography variant="h4" gutterBottom>동아리 활동 영상 관리</Typography>
				<TextField
					name="url"
					label="유튜브 URL"
					value={clubVideosInfo.url}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
				<TextField
					name="title"
					label="영상 제목"
					value={clubVideosInfo.title}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
					<Button type="submit" variant="contained" color="primary">
						등록
					</Button>
				</Box>
			</Box>
		</div>
	);
};

export default ClubVideosRegistPage;