import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
	Box,
	Typography,
	Paper
} from '@mui/material';

const ClubNoticeDetailPage = () => {
	const { noticeId } = useParams();
	const [notice, setNotice] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchNoticeDetail();
	}, []);

	const fetchNoticeDetail = async () => {
		try {
			const token = localStorage.getItem('token');
			const response = await axios.get(`http://localhost:8080/api/post/notification/${noticeId}`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			setNotice(response.data);
		} catch (error) {
			if (error.response && error.response.status === 403) {
				setError('해당 동아리 회원만 열람이 가능합니다.');
			} else {
				console.error('Error fetching notice detail', error);
			}
		}
	};

	return (
		<Box sx={{ mt: 3, px: 2 }}>
			{error ? (
				<Typography variant="body1" sx={{ mt: 3, color: 'red', fontSize: '1.5rem' }}>
					{error}
				</Typography>
			) : notice ? (
				<Paper sx={{ p: 3 }}>
					<Typography variant="h4" gutterBottom>{notice.title}</Typography>
					<Typography variant="h6" color="textSecondary">{notice.clubName}</Typography>
					<Typography variant="body2" sx={{ mt: 1, color: notice.isAccount ? 'green' : 'blue' }}>
						{notice.isAccount ? '전체 공지' : '회원 공지'}
					</Typography>
					{notice.image && (
						<Box sx={{ mt: 2 }}>
							<img
								src={`data:image/jpeg;base64,${notice.image}`}
								alt="공지 이미지"
								style={{ maxWidth: '100%', height: 'auto' }}
							/>
						</Box>
					)}
					<Typography variant="body1" sx={{ mt: 2 }} dangerouslySetInnerHTML={{ __html: notice.content }}></Typography>
				</Paper>
			) : (
				<Typography variant="body1" sx={{ mt: 3 }}>
					공지사항을 불러오는 중입니다...
				</Typography>
			)}
		</Box>
	);
};

export default ClubNoticeDetailPage;
