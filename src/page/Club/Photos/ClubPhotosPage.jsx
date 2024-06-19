import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardActions, Button, Typography, CardMedia } from '@mui/material';
import axios from 'axios';

const ClubPhotoCards = styled.div`
	display: flex;
	gap: 0 40px;
	flex-flow: row wrap;

	.photo-card {
		margin-top: 20px;
		width: 300px;
		max-width: 300px;
	}

	img {
		width: 300px;
		height: 200px;
	}

`

const ClubPhotosPage = () => {

	const navigate = useNavigate();
	const [clubPhotoList, setClubPhotoList] = useState([]);
	const fetchClubPhoto = async () => {
		try {
			const response = await axios.get('http://localhost:8080/api/post/photo');
			setClubPhotoList(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchClubPhoto();
	}, [])

	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button variant="contained" color="primary" onClick={() => { navigate('/club/regist/photos') }}>
					등록하기
				</Button>
			</div>
			<ClubPhotoCards>
				{clubPhotoList.reverse().map((photo) => (
					<Card key={photo.id} className="photo-card" onClick={() => navigate(`/club/photos/${photo.id}`)}>
						<CardMedia component="img" src={`data:image/png;base64,${photo.image}`} title={photo.title} />
						<CardContent>
							<Typography gutterBottom variant="h6" component="div">
								{photo.title}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								{photo.clubName}
							</Typography>
						</CardContent>
						<CardActions>
							<Button size="small">
								수정
							</Button>
							<Button size="small">
								삭제
							</Button>
						</CardActions>
					</Card>
				))}
			</ClubPhotoCards>
		</div>
	);
};

export default ClubPhotosPage;