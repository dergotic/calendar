import React from "react";
import "./styles.scss";

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      showPendingRegistrations: true,
      eventStatus: ''
    };
  }

  componentDidMount() {
    const event = [
      {
        start_date: "2025-08-3",
        end_date: "2025-08-4",
        name: "test event",
        status: "active"
      },

      {
        start_date: "2025-08-10",
        end_date: "2025-08-12",
        name: "test event",
        status: "active"
      },

      {
        start_date: "2025-08-15",
        end_date: "2025-08-16",
        name: "test event",
        status: "pending"
      }
    ];

    this.setState({
      events: event
    });
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
            name: events[j].name,
            status: events[j].status
          });
          break;
        }
      }

      freeDays.push({
        date: new Date("2025-08-" + i),
        start_date: "",
        end_date: "",
        name: "",
        status: ""
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

    console.log(byDate);

    //  style={{'backgroundColor': status === 'approved' ? 'blue' : status === 'pending' ? 'black' : 'red'}}>

    let className;

    for (let i = 0; i < byDate.length; i++) {
      if (
        byDate[i].start_date !== "" &&
        !this.state.showPendingRegistrations &&
        byDate[i].status === "active"
      ) {
        className = "occupied";
      } else if (
        byDate[i].start_date !== "" &&
        this.state.showPendingRegistrations &&
        byDate[i].status === "pending"
      ) {
        className = "pending";
      } else {
        className = "";
      }

      days.push(
        <button key={i} className={className}>
          <time dateTime={"2025-08-" + i + 1}>{i + 1}</time>
        </button>
      );
    }

    return days;
  };

  handleChangeChk = () => {
    this.setState({
      showPendingRegistrations: true
    });
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
