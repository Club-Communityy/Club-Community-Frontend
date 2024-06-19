import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	TextField,
	Button,
	Box,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Switch,
	FormControlLabel,
} from '@mui/material';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ClubNoticeRegistPage = () => {
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [clubId, setClubId] = useState('');
	const [clubs, setClubs] = useState([]);
	const [image, setImage] = useState(null);
	const [isAccount, setIsAccount] = useState(true);

	useEffect(() => {
		fetchClubs();
	}, [isAccount]);

	const fetchClubs = async () => {
		try {
			const token = localStorage.getItem('token');
			const response = await axios.get('http://localhost:8080/api/clubs/my-applications/approved', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setClubs(response.data);
		} catch (error) {
			console.error('Error fetching clubs', error);
		}
	};

	const handleSubmit = () => {
		const formData = new FormData();
		if (image) {
			formData.append('image', image); // 이미지 추가
		}
		formData.append('title', title);
		formData.append('content', content);
		formData.append('clubId', clubId);
		formData.append('isAccount', isAccount);

		axios
			.post('http://localhost:8080/api/post/notification/regist', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((res) => {
				if (res.status === 200) {
					alert('공지사항이 성공적으로 등록되었습니다.');
					navigate('/club/notices');
				} else {
					alert('공지사항 등록 실패.');
				}
			})
			.catch((err) => {
				console.error('등록 실패:', err);
				if (err.response) {
					console.error('서버 응답:', err.response.data);
				}
			});
	};

	const quillRef = React.useRef();

	const modules = {
		toolbar: {
			container: [
				[{ header: [1, 2, 3, 4, 5, false] }],
				["bold", "underline"],
				["image"],
			],
		},
	};

	return (
		<Box>
			<Typography variant="h5" gutterBottom>
				동아리 공지 등록
			</Typography>
			<FormControlLabel
				control={
					<Switch
						checked={isAccount}
						onChange={(e) => setIsAccount(e.target.checked)}
					/>
				}
				label="전체보기"
			/>
			<FormControl fullWidth margin="normal">
				<InputLabel id="club-select-label">동아리 선택</InputLabel>
				<Select
					labelId="club-select-label"
					value={clubId}
					onChange={(e) => setClubId(e.target.value)}
				>
					{clubs.map((club) => (
						<MenuItem key={club.id} value={club.id}>
							{club.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<TextField
				label="제목"
				variant="outlined"
				fullWidth
				margin="normal"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<ReactQuill
				ref={quillRef}
				value={content}
				onChange={setContent}
				modules={modules}
				style={{ height: '350px' }}
			/>
			<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '50px' }}>
				<Button variant="contained" color="primary" onClick={handleSubmit}>
					제출
				</Button>
			</div>
		</Box>
	);
}

export default ClubNoticeRegistPage;
