import "./homestyle.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
function Home() {
  const Navigate = useNavigate();
  return (
    <div className="home">
      <div className="img"></div>
      <div className="center">
        <div className="sub_title">
          <div className="btns2">
            <Button variant="secondary">
              <h2>Services</h2>
            </Button>
          </div>
          <div className="title2">
            <table align="center">
              <tr>
                <td>
                  <Button
                    className="button"
                    variant="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      Navigate("/service");
                    }}
                  >
                    <pre>
                      {" "}
                      <b>Electrician</b>{" "}
                    </pre>
                  </Button>
                </td>
                <td>
                  <Button
                    className="button"
                    variant="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      Navigate("/service");
                    }}
                  >
                    <pre>
                      <b> DRIVER </b>
                    </pre>
                  </Button>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="btns">
          <button>Learn More</button>
          <button>Subscribe</button>
        </div>
        <div className="title">We are Providing Home Service</div>
      </div>
    </div>
  );
}
export default Home;
