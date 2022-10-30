import React, { useEffect } from "react";
import { userRequest } from "../requestMethods";

const Clock = ({ endAuction, timeCounter, setTimeCounter, product }) => {
  const TimeInMS = Date.parse(new Date());
  const endTimeInMS =
    TimeInMS < Date.parse(endAuction) ? Date.parse(endAuction) : endAuction;
  const timeLeft = endTimeInMS - TimeInMS;
  console.log(timeLeft); 

  useEffect(() => {
    setTimeout(() => {
      const timeleft = async () => {
        if (timeLeft) {
          if (timeLeft > 0) {
            let seconds = Math.floor(timeLeft / 1000);
            let minutes = Math.floor(seconds / 60);
            let hours = Math.floor(minutes / 60);
            let days = Math.floor(hours / 24);
            hours = hours % 24;
            seconds = seconds % 60;
            minutes = minutes % 60;
            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            setTimeCounter(
              days +
                " days  " +
                hours +
                ":" +
                minutes +
                ":" +
                seconds +
                "  hours"
            );
          } else {
            setTimeCounter("THE AUCTION HAS ENDED");
            try {
              await userRequest.put(`/products/${product._id}`, {
                status: "ENDED",
              });
            } catch (error) {}
          }
        }
      };
      timeleft();
    }, 1000);
  }, [timeCounter, setTimeCounter, timeLeft, product]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "15px",
      }}
    >
      <b>{timeCounter}</b>
    </div>
  );
};

export default Clock;
