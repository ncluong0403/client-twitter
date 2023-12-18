import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const getGoogleAuthUrl = () => {
    const url = "https://accounts.google.com/o/oauth2/v2/auth";
    const { VITE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URI } = import.meta.env;
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
  useEffect(() => {
    if(params) {
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      if (accessToken && refreshToken) {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        navigate('/')
      }
    }
  }, [params, navigate]);

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
