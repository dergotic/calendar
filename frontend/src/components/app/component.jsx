import React from "react";
import Calendar from "../calendar/component";
import "./styles.css";

export default () => {
    return (
      <div className="app">
        <header>
          <div id="logo">
            <span>
              react<b>calendar</b>
            </span>
          </div>
        </header>
        <main>
          <Calendar />
        </main>
      </div>
    );
  }
