import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RecruitmentPostDetail.css';

const RecruitmentPostDetail = () => {
	const { postId } = useParams();
	const [post, setPost] = useState(null);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await fetch(`http://localhost:8080/api/post/recruitment/${postId}`);
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				setPost(data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchPost();
	}, [postId]);

	if (!post) {
		return <div>Loading...</div>; // Display a loading message or spinner while fetching data
	}


	return (
		<div className="post-detail-container">
			<h2 className="post-title">{post.title}</h2>
			<p className="post-metadata"><strong>동아리명 </strong> {post.clubName}</p>
			<div
				className="post-content"
				dangerouslySetInnerHTML={{ __html: post.content }}
			></div>
		</div>
	);
};

export default RecruitmentPostDetail;
