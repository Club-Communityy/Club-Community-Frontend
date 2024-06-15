import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';

function createData(name, calories, fat, carbs) {
	return { name, calories, fat, carbs };
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24),
	createData('Ice cream sandwich', 237, 9.0, 3),
	createData('Eclair', 262, 16.0, 24),
	createData('Cupcake', 305, 3.7, 67),
	createData('Gingerbread', 356, 16.0, 49),
];

const RecruitBoard = () => {
	return (
		<div>
			<div className='main-notice-top'>
				<div className='main-title'>부원 모집 게시판</div>
			</div>
			<TableContainer>
				<Table sx={{ minWidth: 480 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>제목</TableCell>
							<TableCell>동아리명</TableCell>
							<TableCell>작성자</TableCell>
							<TableCell>작성일</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow
								key={row.name}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell>{row.name}</TableCell>
								<TableCell>{row.calories}</TableCell>
								<TableCell>{row.fat}</TableCell>
								<TableCell>{row.carbs}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default RecruitBoard;