import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoRedirect = () => {

	const navigate = useNavigate();
	const code = new URL(window.location.href).searchParams.get('code');

	console.log(code);
	return (
		<div>

		</div>
	);
};

export default KakaoRedirect;