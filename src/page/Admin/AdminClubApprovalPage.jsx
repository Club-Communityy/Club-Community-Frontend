import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Checkbox, FormControlLabel, TextField, Button, FormGroup, Box } from '@mui/material';

const AdminClubApprovalPage = () => {
	const [clubs, setClubs] = useState([]);
	const [selectedClubs, setSelectedClubs] = useState([]);
	const [rejectionReasons, setRejectionReasons] = useState({});

	useEffect(() => {
		fetchPendingClubs();
	}, []);

	const fetchPendingClubs = async () => {
		try {
			const token = localStorage.getItem('token');
			const response = await axios.get('http://localhost:8080/api/clubs/applications/pending', {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			setClubs(response.data);
		} catch (error) {
			console.error('Error fetching pending clubs', error);
		}
	};

	const handleCheckboxChange = (id) => {
		setSelectedClubs((prevSelectedClubs) =>
			prevSelectedClubs.includes(id)
				? prevSelectedClubs.filter((clubId) => clubId !== id)
				: [...prevSelectedClubs, id]
		);
	};

	const handleRejectionReasonChange = (id, reason) => {
		setRejectionReasons((prevReasons) => ({
			...prevReasons,
			[id]: reason
		}));
	};

	const handleApprove = async () => {
		try {
			const token = localStorage.getItem('token');
			await axios.put('http://localhost:8080/api/clubs/approve', { ids: selectedClubs }, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			alert('선택한 동아리가 승인되었습니다.');
			fetchPendingClubs();
		} catch (error) {
			console.error('Error approving clubs', error);
		}
	};

	const handleReject = async () => {
		const rejections = selectedClubs.map((id) => ({
			id,
			reason: rejectionReasons[id] || ''
		}));
		try {
			const token = localStorage.getItem('token');
			await axios.put('http://localhost:8080/api/clubs/reject', rejections, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			alert('선택한 동아리가 거절되었습니다.');
			fetchPendingClubs();
		} catch (error) {
			console.error('Error rejecting clubs', error);
		}
	};

	return (
		<div>
			<h1>검토 중인 동아리 신청</h1>
			<FormGroup>
				{clubs.length > 0 ? (
					clubs.map((club) => (
						<Box key={club.id} sx={{ marginBottom: 2, padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>

							<FormControlLabel
								control={
									<Checkbox
										checked={selectedClubs.includes(club.id)}
										onChange={() => handleCheckboxChange(club.id)}
									/>
								}
								label={
									<div>
										<div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{club.name}</div>
										<div>신청자: {club.applicantName}</div>
										<div>신청자 소속: {club.applicantDepartment}</div>
										<div>신청자 학번: {club.applicantStudentId}</div>
										<div>신청자 연락처: {club.applicantContact}</div>
										<div>지도교수: {club.advisorName}</div>
										<div>지도교수 전공: {club.advisorMajor}</div>
										<div>지도교수 연락처: {club.advisorContact}</div>
									</div>
								}
							/>
							{selectedClubs.includes(club.id) && (
								<TextField
									label="거절 사유"
									variant="outlined"
									fullWidth
									value={rejectionReasons[club.id] || ''}
									onChange={(e) => handleRejectionReasonChange(club.id, e.target.value)}
									style={{ marginTop: '10px' }}
								/>
							)}
						</Box>
					))
				) : (
					<p>검토 중인 동아리 신청이 없습니다</p>
				)}
			</FormGroup>
			<Button variant="contained" color="primary" onClick={handleApprove} style={{ marginRight: '10px' }}>
				승인
			</Button>
			<Button variant="contained" color="secondary" onClick={handleReject}>
				거절
			</Button>
		</div>
	);
};

export default AdminClubApprovalPage;
