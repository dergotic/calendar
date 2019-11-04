import React from "react";
import Calendar from "../calendar/component";
import "./styles.css";

export default () => {
    return (
      <div className="app">
        <header>
          <div id="logo">
              <span>August 2025</span>
          </div>
        </header>
        <main>
          <Calendar />
        </main>
      </div>
    );
  }
