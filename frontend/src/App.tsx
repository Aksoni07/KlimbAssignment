import React from "react";
import ExcelUpload from "./components/ExcelUpload";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="appContainer">
      <header className="appHeader">
        <h1 className="title">Candidate Database Integration </h1>
      </header>

      <main className="mainSection">
        <div className="uploadHeader">
          <center>
            <h3>Click below to add your Excel File</h3>
          </center>
        </div>
        <ExcelUpload/>
      </main>
    </div>
  );
};

export default App;
