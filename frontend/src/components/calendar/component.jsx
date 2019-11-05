import React from "react";
import moment from "moment";

import DayNames from "./dayNames";
import Week from "./week";

import "./styles.scss";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      month: moment('2025-08'),
      selected: moment().startOf("day")
    };
  }

  renderWeeks() {
    let weeks = [];
    let done = false;
    let date = this.state.month
      .clone()
      .startOf("month")
      .add("w" - 1)
      .day("Sunday");
    let count = 0;
    let monthIndex = date.month();

    const { selected, month } = this.state;

    while (!done) {
      weeks.push(
        <Week
          key={date}
          date={date.clone()}
          month={month}
          select={day => this.select(day)}
          selected={selected}
        />
      );

      date.add(1, "w");

      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }

    return weeks;
  }

  renderMonthLabel() {
    const { month } = this.state;

    return <span className="month-label">{month.format("MMMM YYYY")}</span>;
  }

  render() {
    return (
      <section className="calendar">
        <header className="header">
          <div className="month-display row">
            {this.renderMonthLabel()}
          </div>
          <DayNames />
        </header>
        {this.renderWeeks()}
      </section>
    );
  }
}
