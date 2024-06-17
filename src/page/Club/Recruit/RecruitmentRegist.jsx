import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Quill from 'quill'; // Quill 라이브러리 불러오기
import 'quill/dist/quill.snow.css'; // Quill의 스타일 시트 불러오기
import {
	TextField,
	Button,
	Box,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';

const RecruitmentRegist = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [clubId, setClubId] = useState('');
	const [clubs, setClubs] = useState([]);
	const [image, setImage] = useState(null); // 단일 이미지 상태 설정
	const quillRef = useRef(null); // Quill 인스턴스를 참조하기 위한 useRef

	useEffect(() => {
		fetchClubs();
	}, []);

	const fetchClubs = async () => {
		try {
			const token = localStorage.getItem('token');
			const response = await axios.get('http://localhost:8080/api/clubs/my-applications', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setClubs(response.data);
		} catch (error) {
			console.error('Error fetching clubs', error);
		}
	};

	useEffect(() => {
		let quill = null;

		if (quillRef.current) {
			quill = new Quill(quillRef.current, {
				theme: 'snow',
				modules: {
					toolbar: [
						[{ header: [1, 2, 3, 4, 5, 6, false] }],
						['bold', 'italic', 'underline'],
						['link', 'image'],
						[{ list: 'ordered' }, { list: 'bullet' }],
						['clean'],
					],
				},
			});

			quill.on('text-change', () => {
				setContent(quill.root.innerHTML);
			});
		}

		// 초기 content 설정
		if (quill && content) {
			quill.clipboard.dangerouslyPasteHTML(content);
		}

		return () => {
			if (quill !== null) {
				quill.off('text-change');
				quill = null;
			}
		};
	}, [content]);

	const readImageFile = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => {
				resolve(reader.result);
			};
			reader.readAsDataURL(file);
		});
	};

	const handleSubmit = () => {
		const formData = new FormData();
		if (image) {
			formData.append('image', image); // 이미지 추가
		}
		formData.append('title', title);
		formData.append('content', content);
		formData.append('clubId', clubId);

		for (let pair of formData.entries()) {
			console.log(pair[0] + ', ' + pair[1]);
		}

		axios
			.post('http://localhost:8080/api/post/recruitment/regist', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((res) => {
				if (res.status === 200) {
					alert('공지사항이 성공적으로 등록되었습니다.');
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

	return (
		<Box>
			<Typography variant="h5" gutterBottom>
				동아리 공지 등록
			</Typography>
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
			<div ref={quillRef} style={{ height: '400px' }} />
			<Button variant="contained" color="primary" onClick={handleSubmit}>
				제출
			</Button>
		</Box>
	);
};

export default RecruitmentRegist;
