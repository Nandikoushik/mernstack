import "./rating.css";
import { useState } from "react";
const ShowRating = (props) => {
  const [rating, setRating] = useState(props.rating);
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
            }}
            disabled
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};
export default ShowRating;
