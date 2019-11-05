import React from "react";

export default class Day extends React.Component {
  render() {
    const {
      day: { date, isCurrentMonth, number }
    } = this.props;

    return (
      <span
        key={date.toString()}
        className={"day" + (isCurrentMonth ? "" : " different-month")}>
        {number}
      </span>
    );
  }
}
