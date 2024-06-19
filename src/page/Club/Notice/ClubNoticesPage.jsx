import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
	Box,
	Typography,
	Paper,
	Grid,
	Button
} from '@mui/material';

const ClubNoticesPage = () => {
	const navigate = useNavigate();
	const [notices, setNotices] = useState([]);

	useEffect(() => {
		fetchNotices();
	}, []);

	const fetchNotices = async () => {
		try {
			const token = localStorage.getItem('token');
			const response = await axios.get('http://localhost:8080/api/post/notification', {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			setNotices(response.data.reverse());
		} catch (error) {
			console.error('Error fetching notices', error);
		}
	};

	const handleRegisterClick = () => {
		navigate('/club/notice/regist');
	};

	return (
		<Box sx={{ mt: 3, px: 2 }}>
			<div className='main-notice-top'>
				<Typography variant="h4" gutterBottom>동아리 공지</Typography>
				<Button
					variant="contained" color="primary"
					onClick={handleRegisterClick}
				>
					등록하기
				</Button>
			</div>
			{notices.length > 0 ? (
				notices.map(notice => (
					<Paper key={notice.id} sx={{ mt: 2, p: 2 }}>
						<Grid container spacing={2}>
							<Grid item xs={8}>
								<Typography variant="h6">{notice.title}</Typography>
								<div style={{ display: 'flex' }}>
									<Typography variant="body1" color="textSecondary">{notice.clubName} - </Typography>
									<Typography variant="body1" color="textSecondary"> {notice.isAccount ? ' 전체공개' : ' 부원공개'}</Typography>
								</div>
							</Grid>
							<Grid item xs={4} textAlign="right">
								<Link to={`/club/notice/${notice.id}`} style={{ textDecoration: 'none' }}>
									<Button variant="contained" color="primary">
										자세히 보기
									</Button>
								</Link>
							</Grid>
						</Grid>
					</Paper>
				))
			) : (
				<Typography variant="body1" sx={{ mt: 3 }}>
					공지사항이 없습니다.
				</Typography>
			)}
		</Box>
	);
};

export default ClubNoticesPage;
