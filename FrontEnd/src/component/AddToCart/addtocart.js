import { useEffect, useState } from "react";
import StarRating from "../StarRating/rating";
import axios from "axios";
import { Button } from "react-bootstrap";
import "../../App.css";
import { useNavigate } from "react-router";
import ShowRating from "../StarRating/showRating";

function Addtocart() {
  const [data, setData] = useState([]);

  const Navigate = useNavigate();

  useEffect(() => {
    const sessionStorageData = JSON.parse(
      sessionStorage.getItem("user-loginData")
    );
    if (sessionStorageData) {
      const data = {
        email: sessionStorageData.email,
        type: sessionStorageData.type,
      };
      const url = "/pending";
      axios
        .post(url, data)
        .then((res) => {
          res.data.reverse();
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Navigate("/login");
    }
  });

  return (
    <>
      <div className="App">
        {data.length !== 0 ? (
          <>
            <table>
              {data.map((item) => (
                <td key={item._id}>
                  <table border="2px">
                    <tr>
                      <td>
                        <b>Name:- </b>
                      </td>
                      <td> {item.ProfDetails.Name}</td>
                    </tr>
                    {item.Accept ? (
                      <tr>
                        <td>
                          {" "}
                          <b>Contact:- </b>
                        </td>
                        <td> {item.ProfDetails.contact}</td>
                      </tr>
                    ) : null}
                    <tr>
                      <td>
                        <b>Email:- </b>
                      </td>
                      <td> {item.ProfDetails.email}</td>
                    </tr>
                    <tr>
                      <td>
                        {" "}
                        <b>Rating :- </b>
                      </td>
                      <td>
                        <ShowRating
                          rating={item.ProfDetails.feedback}
                        ></ShowRating>
                      </td>
                    </tr>
                    <tr>
                      <pre></pre>
                    </tr>

                    {item.PendingBooking ? (
                      <tr>
                        <Button variant="info" disabled>
                          Pending....
                        </Button>
                      </tr>
                    ) : item.Cancel ? (
                      <tr>
                        <Button variant="danger" disabled>
                          Cancel
                        </Button>
                      </tr>
                    ) : item.Accept ? (
                      <tr>
                        <Button variant="warning" disabled>
                          Accept
                        </Button>
                      </tr>
                    ) : item.Complete ? (
                      <>
                        <tr>
                          {!item.feedbackStatus ? (
                            <StarRating
                              id={item._id}
                              email={item.ProfDetails.email}
                            ></StarRating>
                          ) : null}
                        </tr>
                        <tr>
                          <Button variant="success" disabled>
                            Completed
                          </Button>
                        </tr>
                      </>
                    ) : null}
                  </table>
                </td>
              ))}
            </table>
          </>
        ) : (
          <>
            <h3>Your Cart Is Empty</h3>
          </>
        )}
      </div>
    </>
  );
}
export default Addtocart;
