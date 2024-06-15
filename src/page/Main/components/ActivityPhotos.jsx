import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ActivityPhotos.css';
import axios from 'axios';

const ActivityPhotos = () => {

	const navigate = useNavigate();
	const [clubPhotoList, setClubPhotoList] = useState([]);
	const [displayedPhotos, setDisplayedPhotos] = useState([]);

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

	useEffect(() => {
		setDisplayedPhotos(clubPhotoList.reverse().slice(0, 3));
	}, [clubPhotoList]);

	return (
		<div>
			<div className='main-title'>활동사진</div>
			<div className="activity-photos">
				{displayedPhotos.map((photo) => (
					<div key={photo.id} className="activity-photo">
						<img src={`data:image/png;base64,${photo.image}`} alt={photo.title} />
						<div>{photo.title}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ActivityPhotos;