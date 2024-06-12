import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardActions, Button, Typography, CardMedia } from '@mui/material';
const ClubVideosPage = () => {

	const navigate = useNavigate();

	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button variant="contained" color="primary" onClick={() => { navigate('/club/regist/videos') }}>
					등록하기
				</Button>
			</div>
			<div>
				<Card sx={{ maxWidth: 300 }}>
					<CardMedia
						component="iframe"
						src="https://www.youtube.com/embed/VIDEO_ID_HERE"
						title="YouTube video"
						allowFullScreen
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							제목
						</Typography>
						<Typography variant="body2" color="text.secondary">
							기타 정보
						</Typography>
					</CardContent>
					<CardActions>
						<Button size="small">수정</Button>
						<Button size="small">삭제</Button>
					</CardActions>
				</Card>
			</div>
		</div>
	);
};

export default ClubVideosPage;