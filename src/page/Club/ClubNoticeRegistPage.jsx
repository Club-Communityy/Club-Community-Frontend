import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const ClubNoticeRegistPage = () => {

	const [content, setContent] = useState("");

	const customUploadAdapter = (loader) => {
		return {
			upload() {
				return new Promise((resolve, reject) => {
					const formData = new FormData();
					loader.file.then((file) => {
						formData.append("file", file);

						axios
							.post("http://localhost:8080/api/v0/file/upload", formData)
							.then((res) => {
								resolve({
									default: res.data.data.uri,
								});
							})
							.catch((err) => reject(err));
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
		const data = {
			content,
		};

		axios.post("http://localhost:8080/api/v0/post", data).then((res) => {
			if (res.status === 200) {
				// navigate("/", { replace: true });
				return;
			} else {
				alert("업로드 실패.");
				return;
			}
		});
	};

	return (
		<div>
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
		</div>
	);
}

export default ClubNoticeRegistPage;
