import React from "react";
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay
} from "date-fns";

import "./styles.css";

class Calendar extends React.Component {
  renderDays = () => {
    const dateFormat = "E";
    const days = [];
    const startDate = startOfWeek(new Date("August 2025"));

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  };

  renderCells = () => {
    const selectedDate = new Date();

    const monthStart = startOfMonth(new Date("August 2025"));
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
            }`}
            key={day}
            // onMouseEnter={() => this.onDateHover()}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );

      days = [];
    }

    return <div className="body">{rows}</div>;
  };

  // onDateHover = () => {
  //   alert('hover');
  // }

  render() {
    return (
      <div className="calendar">
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default Calendar;
