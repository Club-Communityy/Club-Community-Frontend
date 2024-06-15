import React, { useState, useEffect } from 'react';
import './ActivityVideo.css';
import axios from 'axios';

const ActivityVideo = () => {

	const [clubVideoList, setClubVideoList] = useState([]);

	const fetchClubVideo = async () => {
		try {
			const response = await axios.get('http://localhost:8080/api/post/video');
			const modifiedData = response.data.map(video => ({
				...video,
				videoUrl: video.videoUrl.replace('watch?v=', 'embed/')
			}));
			const reversedData = modifiedData.reverse().slice(0, 3);
			setClubVideoList(reversedData);
		} catch (error) {
			console.log(error);
		}
	};


	useEffect(() => {
		fetchClubVideo();
	}, []);

	return (
		<div>
			<div className='main-title'>활동영상</div>
			<div className='activity-videos'>
				{clubVideoList.map((video, index) => (
					<div key={index} className='activity-video'>
						{video.videoUrl.includes('youtube') ? (
							<iframe
								src={video.videoUrl}
								title={video.title}
								width="300"
								height="200"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen>
							</iframe>
						) : (
							<video
								src={video.videoUrl}
								controls
								width="300"
								height="200">
							</video>
						)}
						<div>{video.title}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ActivityVideo;