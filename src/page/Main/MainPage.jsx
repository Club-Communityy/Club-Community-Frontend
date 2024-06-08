import React from 'react';
import './MainPage.css';
import ActivityVideo from './components/ActivityVideo';
import ActivityPhotos from './components/ActivityPhotos';
import EventNotice from './components/EventNotice';
import RecruitBoard from './components/RecruitBoard';

const MainPage = () => {
	return (
		<>
			<div className='main-club-notice'>
				<div><EventNotice /></div>
				<div><RecruitBoard /></div>
			</div>
			<div><ActivityPhotos /></div>
			<div><ActivityVideo /></div>
		</>
	);
};

export default MainPage;