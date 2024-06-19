import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const RecruitBoard = () => {
	const [recruitmentPosts, setRecruitmentPosts] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('http://localhost:8080/api/post/recruitment');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				setRecruitmentPosts(data.reverse().slice(0, 5));
			} catch (error) {
				console.error('Error fetching recruitment posts:', error);
			}
		};

		fetchData();
	}, []);

	const handleRowClick = (postId) => {
		navigate(`/club/recruit/${postId}`);
	};

	return (
		<div>
			<div className='main-notice-top'>
				<div className='main-title'>부원 모집 게시판</div>
			</div>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 480 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>번호</TableCell>
							<TableCell>제목</TableCell>
							<TableCell>동아리명</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{recruitmentPosts.map((post, index) => (
							<TableRow key={post.id} onClick={() => handleRowClick(post.id)}>
								<TableCell>{index + 1}</TableCell>
								<TableCell>{post.title}</TableCell>
								<TableCell>{post.clubName}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default RecruitBoard;
