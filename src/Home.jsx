import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <div>Home</div>
      <button onClick={logout}>Log out</button>
    </>
  );
}
