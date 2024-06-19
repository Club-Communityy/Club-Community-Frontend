import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardActions, Button, Typography, CardMedia } from '@mui/material';
import axios from 'axios';

const ClubVideoCards = styled.div`
	display: flex;
	gap: 0 40px;
	flex-flow: row wrap;

	.video-card {
		margin-top: 20px;
		max-width: 340px;
	}

`

const ClubVideosPage = () => {

	const navigate = useNavigate();
	const [clubVideoList, setClubVideoList] = useState([]);

	const fetchClubVideo = async () => {
		try {
			const response = await axios.get('http://localhost:8080/api/post/video');
			const modifiedData = response.data.map(video => ({
				...video,
				videoUrl: video.videoUrl.replace("watch?v=", "embed/")
			}));
			setClubVideoList(modifiedData.reverse());
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchClubVideo();
	}, [])

	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button variant="contained" color="primary" onClick={() => { navigate('/club/regist/videos') }}>
					등록하기
				</Button>
			</div>
			<ClubVideoCards>
				{clubVideoList.map(video => (
					<Card key={video.id} className="video-card" onClick={() => navigate(`/club/videos/${video.id}`)}>
						<CardMedia
							component="iframe"
							src={video.videoUrl}
							title="YouTube video"
							allowFullScreen
						/>
						<CardContent>
							<Typography gutterBottom variant="h6" component="div">
								{video.title}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								{video.clubName}
							</Typography>
						</CardContent>
						<CardActions>
							<Button size="small">수정</Button>
							<Button size="small">삭제</Button>
						</CardActions>
					</Card>
				))}
			</ClubVideoCards>
		</div>
	);
};

export default ClubVideosPage;