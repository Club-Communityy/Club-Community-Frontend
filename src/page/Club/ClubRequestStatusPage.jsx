import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const ClubRequestStatusPage = () => {
	const [clubRequestList, setClubRequestList] = useState([]);

	const handleGetClubRequests = async () => {
		const token = localStorage.getItem('token');
		try {
			const response = await axios.get('http://localhost:8080/api/clubs/my-applications', {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			setClubRequestList(response.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		handleGetClubRequests();
	}, []);

	return (
		<div>
			<h3>동아리 등록 현황 조회</h3>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell sx={{ fontWeight: 'bold' }}>동아리명</TableCell>
							<TableCell sx={{ fontWeight: 'bold' }}>종류</TableCell>
							<TableCell sx={{ fontWeight: 'bold' }}>신청자</TableCell>
							<TableCell sx={{ fontWeight: 'bold' }}>신청자소속</TableCell>
							<TableCell sx={{ fontWeight: 'bold' }}>지도교수</TableCell>
							<TableCell sx={{ fontWeight: 'bold' }}>지도교수전공</TableCell>
							<TableCell sx={{ fontWeight: 'bold' }}>신청현황</TableCell>
							<TableCell sx={{ fontWeight: 'bold' }}>거절사유</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{clubRequestList.map((request) => (
							<TableRow key={request.id}>
								<TableCell>{request.name}</TableCell>
								<TableCell>{request.type == 'CENTRAL' ? '중앙' : '학과'}</TableCell>
								<TableCell>{request.applicantName}</TableCell>
								<TableCell>{request.applicantDepartment}</TableCell>
								<TableCell>{request.advisorName}</TableCell>
								<TableCell>{request.advisorMajor}</TableCell>
								<TableCell>{request.status}</TableCell>
								<TableCell>{request.status === 'REJECTED' ? request.rejectionReason : '-'}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default ClubRequestStatusPage;
