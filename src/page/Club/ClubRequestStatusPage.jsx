import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs) {
	return { name, calories, fat, carbs };
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24),
	createData('Ice cream sandwich', 237, 9.0, 37),
	createData('Eclair', 262, 16.0, 24),
	createData('Cupcake', 305, 3.7, 67),
	createData('Gingerbread', 356, 16.0, 49),
];


const ClubRequestStatusPage = () => {
	return (
		<div>
			<h3>동아리 등록 현황 조회</h3>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>동아리명</TableCell>
							<TableCell>신청자</TableCell>
							<TableCell>신청현황</TableCell>
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

export default ClubRequestStatusPage;