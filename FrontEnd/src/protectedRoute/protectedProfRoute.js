import { useEffect } from "react";
import { useNavigate } from "react-router";

function ProtectedProfRoute({ Component }) {
  const Navigate = useNavigate();
  useEffect(() => {
    let logindata = sessionStorage.getItem("professional-loginData");
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
export default ProtectedProfRoute;
