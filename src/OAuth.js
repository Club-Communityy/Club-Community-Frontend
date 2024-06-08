const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL;

console.log(CLIENT_ID);
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code`;