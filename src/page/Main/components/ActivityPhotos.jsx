import React from 'react';
import './ActivityPhotos.css';

const ActivityPhotos = () => {
	// 활동사진 경로 배열
	const photoPaths = [
		"https://example.com/photo1.jpg",
		"https://example.com/photo2.jpg",
		"https://example.com/photo3.jpg",
		// 추가적인 사진 경로들을 필요에 따라 배열에 추가할 수 있습니다.
	];

	return (
		<div>
			<div className='main-title'>활동사진</div>
			<div className="activity-photos">
				{photoPaths.map((path, index) => (
					<div key={index} className="activity-photo">
						<img src={path} alt={`활동 사진 ${index + 1}`} />
						<div>활동 사진 제목</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ActivityPhotos;