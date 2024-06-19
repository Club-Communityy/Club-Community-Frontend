import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Button, Typography, CardMedia } from '@mui/material';
import axios from 'axios';

const ClubVideoDetailPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [video, setVideo] = useState(null);

	const fetchVideoDetail = async () => {
		try {
			const response = await axios.get(`http://localhost:8080/api/post/video/${id}`);
			const modifiedData = {
				...response.data,
				videoUrl: response.data.videoUrl.replace("watch?v=", "embed/")
			};
			setVideo(modifiedData);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchVideoDetail();
	}, [id]);

	if (!video) {
		return <div>Loading...</div>;
	}

	return (
		<Card>
			<CardMedia
				component="iframe"
				src={video.videoUrl}
				title="YouTube video"
				allowFullScreen
				sx={{ height: '450px' }}
			/>
			<CardContent>
				<Typography gutterBottom variant="h6" component="div">
					{video.title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{video.clubName}
				</Typography>
			</CardContent>
			<CardContent>
				<Button variant="contained" color="primary" onClick={() => navigate(-1)}>
					뒤로가기
				</Button>
			</CardContent>
		</Card>
	);
};

export default ClubVideoDetailPage;
