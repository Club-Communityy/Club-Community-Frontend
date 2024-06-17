import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const ClubNoticeRegistPage = () => {
	const [content, setContent] = useState("");
	const [images, setImages] = useState([]);

	const customUploadAdapter = (loader) => {
		return {
			upload() {
				return new Promise((resolve, reject) => {
					loader.file.then((file) => {
						const reader = new FileReader();
						reader.onload = () => {
							const base64 = reader.result;
							setImages((prevImages) => [...prevImages, { file, base64 }]);
							resolve({ default: base64 });
						};
						reader.readAsDataURL(file);
					});
				});
			},
		};
	};

	function uploadPlugin(editor) {
		editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
			return customUploadAdapter(loader);
		};
	}

	const handleSubmit = () => {
		const formData = new FormData();
		images.forEach((image) => {
			formData.append("files", image.file);
		});

		axios.post("http://localhost:8080/api/v0/file/upload", formData)
			.then((res) => {
				if (res.status === 200) {
					const imageUrls = res.data.data.map((file) => file.uri);
					const updatedContent = content;

					// 이미지 URL을 실제 콘텐츠에 반영해야 한다면 이 부분에서 처리합니다.
					// updatedContent = ...

					const data = {
						content: updatedContent,
					};

					return axios.post("http://localhost:8080/api/v0/post", data);
				} else {
					throw new Error("Image upload failed");
				}
			})
			.then((res) => {
				if (res.status === 200) {
					// navigate("/", { replace: true });
					alert("공지사항이 성공적으로 등록되었습니다.");
				} else {
					alert("공지사항 등록 실패.");
				}
			})
			.catch((err) => {
				alert("업로드 실패: " + err.message);
			});
	};

	return (
		<div>
			<div>동아리 공지</div>
			<CKEditor
				editor={Editor}
				data=""
				config={{ extraPlugins: [uploadPlugin] }}
				onReady={(editor) => {
					console.log("Editor is ready to use!", editor);
				}}
				onChange={(event, editor) => {
					setContent(editor.getData());
					console.log({ event, editor, content });
				}}
				onBlur={(event, editor) => {
					console.log("Blur.", editor);
				}}
				onFocus={(event, editor) => {
					console.log("Focus.", editor);
				}}
			/>
			<button onClick={handleSubmit}>제출</button>
		</div>
	);
}

export default ClubNoticeRegistPage;
