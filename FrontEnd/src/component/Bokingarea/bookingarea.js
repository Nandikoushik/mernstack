import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
//import Popup from "reactjs-popup";
import './bookingarea.css';
import Loading from "../../presentation/loadingWindow/loading";
function Bookingarea() {
  const [data, setData] = useState([]);
  const Navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [randomNo, setRandomNo] = useState(
    parseInt(1001 + Math.random() * (9000 - 1001))
  );
  useEffect(() => {
    const sessionStorageData = JSON.parse(
      sessionStorage.getItem("professional-loginData")
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

  function complete(id, email, Name) {
    var min = 1001;
    var max = 9999;
    setRandomNo(parseInt(min + Math.random() * (max - min)));
    const emaildata = {
      email: email,
      OTP: randomNo,
      action: "otp",
      Name: Name,
    };
    axios
      .post("/sendMail", emaildata)
      .then((res) => {
        console.log("Email Send Success");
      })
      .catch((err) => {
        console.log(err);
      });
    const enterpin = parseInt(
      prompt("Please Enter Completed Pin Collect From Customer ")
    );
    if (enterpin === randomNo) {
      axios
        .put("/complete", { id: id })
        .then(() => {
          setLoading(false);
          console.log(" Job Success");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }

  function handleChange(id, value) {
    const data = { id: id, action: value };
    const url = "/pendingupdate";
    setLoading(true);
    axios
      .put(url, data)
      .then((res) => {
        setLoading(false);
        window.location.reload();
      })
      .catch((err) => {setLoading(false);
        console.log(err)});
  }

  return (
    <>
      <div className="bookingarea">
        {loading?<Loading></Loading>:null}
      <h2> Professionals Booking Counter</h2>
      {data.length !== 0 ? (
        <>
          {data.map((item) => (
            <td key={item._id}>
              <table border="2px">
                <tr>
                 <td><b>Name:-</b></td>
                 <td>{item.UserDetails.Name}</td>
                </tr>
                {item.Accept?(<tr>
                  <td><b>Contact:- </b></td>
                  <td>{item.UserDetails.contact}</td>
                </tr>):null}
                <tr>
                <td> <b>Address:-</b></td>
                <td> {item.UserDetails.address}</td>
                </tr>
                <tr>
                  <pre></pre>
                </tr>
                {item.PendingBooking ? (
                  <tr>
                    <Button
                      variant="danger"
                      value={"Cancel"}
                      onClick={(e) => {
                        e.preventDefault();
                        handleChange(item._id, e.target.value);
                      }}
                    >
                      Cancel..
                    </Button>
                    <span>------</span>
                    <Button
                      variant="info"
                      value={"Accept"}
                      onClick={(e) => {
                        e.preventDefault();
                        handleChange(item._id, e.target.value);
                      }}
                    >
                      Accept..
                    </Button>
                  </tr>
                ) : item.Accept ? (
                  <tr>
                    <Button
                      variant="warning"
                      onClick={(e) => {
                        e.preventDefault();
                        complete(
                          item._id,
                          item.UserDetails.email,
                          item.UserDetails.Name
                        );
                      }}
                    >
                      click To complete
                    </Button>
                  </tr>
                ) : item.Complete ? (
                  <tr>
                    <Button variant="success" disabled>
                      Completed
                    </Button>
                  </tr>
                ) : item.Cancel ? (
                  <tr>
                    <Button variant="danger" disabled>
                      Cancel
                    </Button>
                  </tr>
                ) : null}
              </table>
            </td>
          ))}
        </>
      ) : (
        <>
          <h3>Your Cart Is Empty</h3>
          
        </>
      )}
      {/* {<Popup >
                     <div className='modal'>
                            <div className='content'>
                                Welcome to GFG!!!
                            </div>
                            <div>
                               <input type='text'></input>
                            </div>
                        </div>
      
                    
            </Popup>} */}
            </div>
    </>
  );
}

export default Bookingarea;
