import React from 'react';
import './ActivityVideo.css';

const ActivityVideo = () => {
	return (
		<div>
			<div className='main-title'>활동영상</div>
			<div className='activity-videos'>
				<div className='activity-video'>
					<iframe
						src="https://www.youtube.com/embed/lJLirTAUTYY"
						title="활동 영상 제목"
						width="300"
						height="200"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen>
					</iframe>
					<div>활동 영상 제목</div>
				</div>
				<div className='activity-video'>
					<video
						src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
						controls
						width="300"
						height="200">
					</video>
					<div>활동 영상 제목</div>
				</div>
				<div className='activity-video'>
					<video
						src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
						controls
						width="300"
						height="200">
					</video>
					<div>활동 영상 제목</div>
				</div>
			</div>
		</div>
	);
};

export default ActivityVideo;