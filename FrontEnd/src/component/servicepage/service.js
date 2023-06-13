import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import electrician from "./elec.png";
import driver from "./drive.png";
import swal from "sweetalert";
import ShowRating from "../StarRating/showRating";
function Service() {
  const Navigate = useNavigate();
  const sessionStorageData = sessionStorage.getItem("user-loginData");
  const [userdata] = useState(JSON.parse(sessionStorageData));

  const [type, setType] = useState(null);
  const [data, setData] = useState([]);

  function setitem(event) {
    const url = "/proflist/" + type;
    event.preventDefault();
    if (type !== null) {
      axios
        .get(url)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      swal({
        icon: "error",
        title: "Oops...",
        text: "No result Found ",
        footer: "Try Again !",
      });
    }
  }
  async function Booking(profdata) {
    const url = "/booking";
    const data = {
      ProfDetails: profdata,
      UserDetails: {
        Name: userdata.Name,
        email: userdata.email,
        contact: userdata.contact,
        address: userdata.address,
      },
      PendingBooking: true,
      Complete: false,
      Cancel: false,
      Accept: false,
      feedbackStatus: false,
    };
    axios
      .post(url, data)
      .then((res) => {
        if (res.data.success === true) {
          let emaildata = {
            email: profdata.email,
            Name: profdata.Name,
            type: userdata.type,
            action: "Book",
            customeraddress: userdata.address,
            customerName: userdata.Name,
          };
          Navigate("/addtocart");
          axios
            .post("/sendMail", emaildata)
            .then((res) => {
              if (res.success) {
                console.log("Email Send success");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="App">
      {data.length === 0 ? (
        <>
          {" "}
          <h1> Services For You </h1>
          <table
            align="center"
            style={{
              width: "400px",
              height: "200px",
              "margin-left": "550px",
              "margin-top": "140px",
            }}
          >
            <tr>
              <td>
                {" "}
                <img src={electrician} alt="BigCo Inc. logo" height="150" />
              </td>
              <td>
                {" "}
                <img src={driver} alt="BigCo Inc. logo" height="150" />
              </td>
            </tr>
            <tr>
              <td>
                <Form onSubmit={setitem}>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => {
                      setType("electrician");
                    }}
                  >
                    Electrician
                  </Button>
                </Form>
              </td>
              <td>
                <Form onSubmit={setitem}>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => {
                      setType("driver");
                    }}
                  >
                    Driver
                  </Button>
                  {/* <Button variant="primary" type="submit" onClick={()=>{setType('coocker')}}>Coocker</Button> */}
                </Form>
              </td>
            </tr>
          </table>
        </>
      ) : (
        <div className="tbl">
          <Table responsive className="table">
            <tbody id="table">
              <tr>
                {data.map((item) => (
                  <td key={item._id}>
                    <tr>
                      <td><b>Name:-</b></td>
                      <td> {item.Name}</td>
                    </tr>
                    <tr>
                    <td> <b>Contact:</b></td>
                    <td> {item.contact}</td>
                    </tr>
                    <tr>
                    <td> <b>Pin-</b></td>
                    <td> {item.pin}</td>
                    </tr>
                    <tr>
                    <td> <b>Rating :- </b></td>
                    <td> <ShowRating rating={item.feedback}></ShowRating></td>
                    </tr>
                    <tr>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          Booking({
                            Name: item.Name,
                            email: item.email,
                            contact: item.contact,
                            feedback: item.feedback,
                          });
                        }}
                      >
                        Book
                      </Button>
                    </tr>
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
          <Button
            type="submit"
            onClick={(e) => {
              setData([]);
            }}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
export default Service;
