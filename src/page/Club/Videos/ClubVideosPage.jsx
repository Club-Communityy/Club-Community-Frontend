import React from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardActions, Button, Typography, CardMedia } from '@mui/material';

const ClubVideoCards = styled.div`
	display: flex;
	gap: 0 46px;
	flex-flow: row wrap;

	.video-card {
		margin-top: 20px;
		max-width: 350px;
	}

`

const ClubVideosPage = () => {

	const navigate = useNavigate();

	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button variant="contained" color="primary" onClick={() => { navigate('/club/regist/videos') }}>
					등록하기
				</Button>
			</div>
			<ClubVideoCards>
				<Card className="video-card">
					<CardMedia
						component="iframe"
						src="https://www.youtube.com/embed/lJLirTAUTYY"
						title="YouTube video"
						allowFullScreen
					/>
					<CardContent>
						<Typography gutterBottom variant="h6" component="div">
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
			</ClubVideoCards>
		</div>
	);
};

export default ClubVideosPage;