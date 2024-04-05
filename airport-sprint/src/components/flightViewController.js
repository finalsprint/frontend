import { useEffect } from "react";

const flightStatusColor = () => {
  useEffect(() => {
    var cell = document.getElementsByClassName("status");
    for (var i = 0; i < cell.length; i++) {
      if (cell[i].textContent === "CANCELLED") {
        cell[i].style.color = "rgb(200, 0, 0)";
      }
      if (cell[i].textContent === "DELAYED") {
        cell[i].style.color = "rgb(230, 130, 0)";
      }
      if (cell[i].textContent === "ON TIME") {
        cell[i].style.color = "black";
      }
    }
  });
};

export { flightStatusColor };
