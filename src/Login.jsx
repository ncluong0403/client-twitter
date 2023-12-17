import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link } from "react-router-dom";

const getGoogleAuthUrl = () => {
  const url = "https://accounts.google.com/o/oauth2/v2/auth";
  const { VITE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URI } = import.meta.env;
  console.log(import.meta.env);
  const query = {
    client_id: VITE_CLIENT_ID,
    redirect_uri: VITE_GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    prompt: "consent",
    access_type: "offline",
  };
  const queryString = new URLSearchParams(query).toString();
  return `${url}?${queryString}`;
};
const googleOauthURL = getGoogleAuthUrl();

function Login() {
  return (
    <>
      <div>
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Link to={googleOauthURL}>Login with Google</Link>
      </div>
    </>
  );
}

export default Login;
