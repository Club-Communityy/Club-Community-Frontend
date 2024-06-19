import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MenuItem, Select, InputLabel, FormControl, Button } from '@mui/material';

const ClubMemberList = () => {
	const token = localStorage.getItem('token');
	const [clubId, setClubId] = useState('');
	const [clubs, setClubs] = useState([]);
	const [clubMemberRequests, setClubMemberRequests] = useState([]);

	const fetchClubMemberRequests = async (clubId) => {
		const response = await axios.get(`http://localhost:8080/api/club-members/members/${clubId}`, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});

		return response.data;
	};

	const fetchClubs = async () => {
		try {
			const response = await axios.get('http://localhost:8080/api/clubs/my-applications/approved', {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			setClubs(response.data);
		} catch (error) {
			console.error('Error fetching clubs', error);
		}
	};

	useEffect(() => {
		fetchClubs();
	}, []);

	useEffect(() => {
		if (clubId) {
			const getData = async () => {
				try {
					const data = await fetchClubMemberRequests(clubId);
					setClubMemberRequests(data);
				} catch (err) {
					console.log(err);
				}
			};

			getData();
		}
	}, [clubId]);

	const handleWithdraw = async (memberId) => {
		try {
			await axios.put(`http://localhost:8080/api/club-members/withdraw?memberId=${memberId}`, null, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});

			setClubMemberRequests(prevRequests => prevRequests.filter(request => request.id !== memberId));
		} catch (error) {
			console.error('Error withdrawing member', error);
		}
	};

	return (
		<div style={styles.container}>
			<h1>동아리 부원 목록</h1>
			<FormControl fullWidth margin="normal">
				<InputLabel id="club-select-label">동아리 선택</InputLabel>
				<Select
					labelId="club-select-label"
					value={clubId}
					onChange={(e) => {
						setClubId(e.target.value);
					}}
				>
					{clubs.map((club) => (
						<MenuItem key={club.id} value={club.id}>
							{club.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			{clubMemberRequests.reverse().map(request => (
				<div key={request.id} style={styles.requestCard}>
					<p><strong>이름:</strong> {request.memberName}</p>
					<p><strong>학과:</strong> {request.department}</p>
					<p><strong>학번:</strong> {request.studentId}</p>
					<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Button variant="contained" color="primary" onClick={() => handleWithdraw(request.id)}>탈퇴</Button>
					</div>
				</div>
			))}
		</div>
	);
};

const styles = {
	container: {
		padding: '20px',
		fontFamily: 'Arial, sans-serif',
		backgroundColor: '#f9f9f9',
		maxWidth: '800px',
		margin: '0 auto',
		borderRadius: '8px',
		boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
	},
	requestCard: {
		border: '1px solid #ddd',
		borderRadius: '8px',
		padding: '20px',
		marginBottom: '20px',
		backgroundColor: '#fff',
		boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
		transition: 'transform 0.2s',
	},
};

export default ClubMemberList;
