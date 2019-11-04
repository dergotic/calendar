// import React from "react";
// import {
//   format,
//   startOfWeek,
//   addDays,
//   startOfMonth,
//   endOfMonth,
//   endOfWeek,
//   isSameMonth,
//   isSameDay
// } from "date-fns";

// import "./styles.css";

// class Calendar extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       error: null,
//       isLoaded: false,
//       reserved: []
//     };
//   }

//   componentDidMount() {
//     fetch(
//       "https://demo14.secure.retreat.guru/api/v1/registrations?token=ef061e1a717568ee5ca5c76a94cf5842"
//     )
//       .then(res => res.json())
//       .then(
//         result => {
//           const reservedDays = result.filter(item => {
//             return item.room === 'Room 5';
//           });

//           this.setState({
//             reserved: reservedDays
//           });
//         },
//         // Note: it's important to handle errors here
//         // instead of a catch() block so that we don't swallow
//         // exceptions from actual bugs in components.
//         error => {
//           this.setState({
//             isLoaded: true,
//             error
//           });
//         }
//       );
//   }

//   renderDays = () => {
//     const dateFormat = "E";
//     const days = [];
//     const startDate = startOfWeek(new Date("August 2025"));

//     for (let i = 0; i < 7; i++) {
//       days.push(
//         <div className="col col-center" key={i}>
//           {format(addDays(startDate, i), dateFormat)}
//         </div>
//       );
//     }

//     return <div className="days row">{days}</div>;
//   };

//   renderCells = () => {

//     const { reserved } = this.state;
//     const monthStart = startOfMonth(new Date("August 2025"));
//     const monthEnd = endOfMonth(monthStart);
//     const startDate = startOfWeek(monthStart);
//     const endDate = endOfWeek(monthEnd);

//     const dateFormat = "d";
//     const rows = [];

//     let days = [];
//     let day = startDate;
//     let formattedDate = "";

//     while (day <= endDate) {
//       for (let i = 0; i < 7; i++) {
//         formattedDate = format(day, dateFormat);

//         reserved.map( (item, index) => {
//           console.log(item);

//           days.push(
//           <div
//             className={`col cell ${
//               !isSameMonth(day, monthStart) ? "hidden" : ""
//             }`}
//             key={day} // onMouseEnter={() => this.onDateHover()}
//           >
//             <span className="number">{formattedDate}</span>
//             {/* <span className="bg">{formattedDate}</span> */}
//           </div>
//         );
//         })

        

//         day = addDays(day, 1);
//       }

//       rows.push(
//         <div className="row" key={day}>
//           {days}
//         </div>
//       );

//       days = [];
//     }

//     return <div className="body">{rows}</div>;
//   };

//   // onDateHover = () => {
//   //   alert('hover');
//   // }

//   render() {
//     return (
//       <div className="calendar">
//         {this.renderDays()}
//         {this.renderCells()}
//       </div>
//     );
//   }
// }

// export default Calendar;


import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export default function Example() {
  return (
    <DayPicker
      initialMonth={new Date(2025, 7)}
      selectedDays={[
        new Date(2025, 7, 12),
        new Date(2025, 7, 2),
        {
          after: new Date(2025, 7, 20),
          before: new Date(2025, 7, 25),
        },
      ]}
    />
  );
}

