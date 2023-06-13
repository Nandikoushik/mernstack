import { useEffect } from "react";
import { useNavigate } from "react-router";

function ProtectedUserRoute({ Component }) {
  const Navigate = useNavigate();
  useEffect(() => {
    let logindata = sessionStorage.getItem("user-loginData");
    if (!logindata) {
      Navigate("/login");
    }
  });

  return (
    <>
      <Component />
    </>
  );
}
export default ProtectedUserRoute;
