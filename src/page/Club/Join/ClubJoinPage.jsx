import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';

const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`

const ClubJoinPage = () => {
	const location = useLocation();
	const { clubId } = location.state;
	const [memberId, setMemberId] = useState();

	const handleDownloadJoinForm = async () => {
		try {
			const token = localStorage.getItem('token');
			const response = await axios.get(`http://localhost:8080/api/club-application-forms/download/${clubId}`, {
				headers: {
					'Authorization': `Bearer ${token}`
				},
				responseType: 'blob'
			});

			const contentDisposition = response.headers['content-disposition'];
			let fileName = 'downloaded_file.hwp';
			if (contentDisposition) {
				const fileNameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
				if (fileNameMatch && fileNameMatch.length > 1) {
					fileName = decodeURIComponent(fileNameMatch[1].replace(/['"]/g, ''));
				}
			}

			const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = downloadUrl;
			link.setAttribute('download', fileName);
			document.body.appendChild(link);
			link.click();
			link.remove();
		} catch (error) {
			console.error('신청서 다운로드 오류:', error);
		}
	}

	const handleJoinForm = async () => {

	};

	return (
		<div>
			<ButtonContainer>
				<Button onClick={handleDownloadJoinForm}>신청서 다운로드</Button>
			</ButtonContainer>
			<div>

			</div>
			<ButtonContainer>
				<Button onClick={handleJoinForm}>등록</Button>
			</ButtonContainer>
		</div >
	);
};

export default ClubJoinPage;