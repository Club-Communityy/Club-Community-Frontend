import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Button, Typography, CardMedia } from '@mui/material';
import axios from 'axios';

const DetailCard = styled(Card)`
  max-width: 600px;
  margin: 20px auto;
`;

const ClubPhotoDetailPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [photoDetail, setPhotoDetail] = useState(null);

	const fetchPhotoDetail = async () => {
		try {
			const response = await axios.get(`http://localhost:8080/api/post/photo/${id}`);
			setPhotoDetail(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchPhotoDetail();
	}, [id]);

	if (!photoDetail) {
		return <Typography>Loading...</Typography>;
	}

	return (
		<DetailCard>
			<CardMedia
				component="img"
				src={`data:image/png;base64,${photoDetail.image}`}
				title={photoDetail.title}
				sx={{ height: '400px' }}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{photoDetail.title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{photoDetail.clubName}
				</Typography>
			</CardContent>
			<CardContent>
				<Button variant="contained" color="primary" onClick={() => navigate(-1)}>
					뒤로가기
				</Button>
			</CardContent>
		</DetailCard>
	);
};

export default ClubPhotoDetailPage;
