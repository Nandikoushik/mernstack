import "./rating.css";
import { useState } from "react";
import axios from "axios";
const StarRating = (props) => {
  const [rating, setRating] = useState(0);
  const feedback = () => {
    console.log("rating", rating);
    if (rating > 0) {
      axios
        .post("/feedback", {
          feedback: rating,
          email: props.email,
        })
        .then((res) => {
          console.log("FeedBack Given");
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .post("/feedbackstatus", { id: props.id })
        .then((res) => console.log("feedBack Status Update Success"))
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="submit"
            key={index}
            className={index <= rating ? "on" : "off"}
            onClick={() => {
              setRating(index);
              setInterval(() => {
                feedback();
              }, 1000);
            }}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};
export default StarRating;
