import React from "react";
import Star from "../StarRating/Star";
import { useState } from "react";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const starContainerStyle = {
  display: "flex",
};
 
/*
StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  message: PropTypes.array,
  defaultRating: PropTypes.number,
}
  */

const StarRating = ({
  maxRating = 5,
  color = "#f8e112",
  size = "48px",
  className = "",
  message = [],
  defaultRating = 0,
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleClick = (rating) => {
    setRating(rating);
  };

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onClick={() => handleClick(i + 1)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {message.length === maxRating
          ? message[tempRating - 1]
          : tempRating || rating || " "}
      </p>
    </div>
  );
};

export default StarRating;
