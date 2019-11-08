import React from "react";
import "./styles.scss";

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      showPendingRegistrations: false,
      eventStatus: ""
    };
  }

  componentDidMount() {
    fetch(
      "https://demo14.secure.retreat.guru/api/v1/registrations?token=ef061e1a717568ee5ca5c76a94cf5842"
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            events: result
          });
        },
        error => {
          console.log("handle error");
        }
      );
  }

  renderDays = () => {
    const numberOfDays = new Date(2025, 8, 0).getDate();
    let days = [];

    const events = this.state.events;

    let freeDays = [];
    let ocupiedDays = [];

    for (let i = 1; i <= numberOfDays; i++) {
      for (let j = 0; j < events.length; j++) {
        if (events[j].start_date === "2025-08-" + i) {
          ocupiedDays.push({
            date: new Date("2025-08-" + i),
            start_date: events[j].start_date,
            end_date: events[j].end_date,
            full_name: events[j].full_name,
            status: events[j].status,
            room_id: events[j].room_id
          });
          break;
        }
      }

      freeDays.push({
        date: new Date("2025-08-" + i),
        start_date: "",
        end_date: "",
        full_name: "",
        status: "",
        room_id: ""
      });
    }

    const allDays = freeDays.concat(ocupiedDays);

    for (let i = 0; i < allDays.length; i++) {
      for (var j = i + 1; j < allDays.length; j++) {
        if (allDays[i].date.toString() === allDays[j].date.toString()) {
          allDays.splice(i--, 1);
        }
      }
    }

    let byDate = allDays.slice(0);
    byDate.sort((a, b) => {
      return a.date - b.date;
    });

    let className;

    console.log('by date: ',byDate);

    for (let i = 0; i < byDate.length; i++) {
      if (byDate[i].start_date !== "" && byDate[i].status === "reserved") {
        className = "reserved";
      } else if (
        byDate[i].start_date !== "" &&
        this.state.showPendingRegistrations === true &&
        byDate[i].status === "pending"
      ) {
        className = "pending";
      } else {
        className = "";
      }

      days.push(
        <button key={i} className={className + " tooltip"}>
          {i + 1}
          <time
            dateTime={"2025-08-" + i + 1}
            className={byDate[i].start_date ? "tooltiptext" : ""}
          >
            <span style={{ display: className ? "block" : "none" }}>
              <strong>Start Date: </strong> {byDate[i].start_date} <br />
              <strong>End Date:</strong> {byDate[i].end_date} <br />
              <strong>Name: </strong> {byDate[i].full_name} <br />
              <strong>Status: </strong> {byDate[i].status}
            </span>
          </time>
        </button>
      );
    }
    return days;
  };

  handleChangeChk = () => {
    if (this.state.showPendingRegistrations) {
      this.setState({
        showPendingRegistrations: false
      });
    } else {
      this.setState({
        showPendingRegistrations: true
      });
    }
  };

  render() {
    const { showPendingRegistrations } = this.state;
    return (
      <main>
        <label>
          <input
            type="checkbox"
            defaultChecked={showPendingRegistrations}
            onChange={this.handleChangeChk}
          />
          Show Pending Registrations
        </label>
        <div className="calendar">
          <div className="month-indicator">
            <time dateTime="2025-08"> August 2025 </time>
          </div>
          <div className="day-of-week">
            <div>Su</div>
            <div>Mo</div>
            <div>Tu</div>
            <div>We</div>
            <div>Th</div>
            <div>Fr</div>
            <div>Sa</div>
          </div>
          <div className="date-grid">{this.renderDays()}</div>
        </div>
      </main>
    );
  }
}

export default Calendar;
