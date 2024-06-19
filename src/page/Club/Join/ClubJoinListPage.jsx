import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MenuItem, Select, InputLabel, FormControl, Button } from '@mui/material';

const ClubJoinListPage = () => {
	const token = localStorage.getItem('token');
	const [clubId, setClubId] = useState('');
	const [clubs, setClubs] = useState([]);
	const [clubJoinRequests, setClubJoinRequests] = useState([]);

	const fetchClubJoinRequests = async (clubId) => {
		const response = await axios.get(`http://localhost:8080/api/club-members/applications/${clubId}`, {
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
					const data = await fetchClubJoinRequests(clubId);
					setClubJoinRequests(data);
				} catch (err) {
					console.log(err);
				}
			};

			getData();
		}
	}, [clubId]);

	const downloadFile = (data, fileName) => {
		const blob = b64toBlob(data, 'application/octet-stream');

		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	};

	const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
		const byteCharacters = atob(b64Data);
		const byteArrays = [];

		for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			const slice = byteCharacters.slice(offset, offset + sliceSize);

			const byteNumbers = new Array(slice.length);
			for (let i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}

			const byteArray = new Uint8Array(byteNumbers);
			byteArrays.push(byteArray);
		}

		const blob = new Blob(byteArrays, { type: contentType });
		return blob;
	};

	const handleApprove = async (id) => {
		try {
			await axios.put(`http://localhost:8080/api/club-members/approve/${id}`, {}, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});

			// Fetch updated requests after approval
			const updatedRequests = await fetchClubJoinRequests(clubId);
			setClubJoinRequests(updatedRequests);

			console.log(`Approved member with ID ${id}`);
		} catch (error) {
			console.error('Error approving member', error);
		}
	};

	const handleReject = async (id) => {
		try {
			await axios.put(`http://localhost:8080/api/club-members/reject/${id}`, {}, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});

			// Fetch updated requests after rejection
			const updatedRequests = await fetchClubJoinRequests(clubId);
			setClubJoinRequests(updatedRequests);

			console.log(`Rejected member with ID ${id}`);
		} catch (error) {
			console.error('Error rejecting member', error);
		}
	};

	return (
		<div style={styles.container}>
			<h1>동아리 가입 신청 목록</h1>
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
			{clubJoinRequests.map(request => (
				<div key={request.id} style={styles.requestCard}>
					<p><strong>이름:</strong> {request.memberName}</p>
					<p><strong>학과:</strong> {request.department}</p>
					<p><strong>학번:</strong> {request.studentId}</p>
					<p>
						<strong>업로드한 파일:</strong>
						<button onClick={() => downloadFile(request.data, request.fileName)}>다운로드</button>
					</p>
					<div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
						<Button variant="contained" color="primary" onClick={() => handleApprove(request.id)}>승인</Button>
						<Button variant="contained" color="secondary" onClick={() => handleReject(request.id)}>거절</Button>
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
	requestCardHover: {
		transform: 'scale(1.02)',
	},
};

export default ClubJoinListPage;
