import React from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardActions, Button, Typography, CardMedia } from '@mui/material';

const ClubPhotoCards = styled.div`
	display: flex;
	gap: 0 46px;
	flex-flow: row wrap;

	.photo-card {
		margin-top: 20px;
		width: 350px;
		max-width: 350px;
	}

`

const ClubPhotosPage = () => {

	const navigate = useNavigate();

	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button variant="contained" color="primary" onClick={() => { navigate('/club/regist/photos') }}>
					등록하기
				</Button>
			</div>
			<ClubPhotoCards>
				<Card className="photo-card">
					<CardMedia
						component="img"
						src="https://www.youtube.com/embed/lJLirTAUTYY"
						title="이미지제목"
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
			</ClubPhotoCards>
		</div>
	);
};

export default ClubPhotosPage;