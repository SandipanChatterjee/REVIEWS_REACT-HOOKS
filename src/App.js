import React from "react";
import "./App.css";
import { RootRoutes } from "./Routes/index";
import Header from "./Dashboard/Header";

class App extends React.Component {
  componentDidMount() {
    console.log("COMPONENT -- AA");
  }
  render() {
    return (
      <React.Fragment>
        <Header />
        <RootRoutes />
      </React.Fragment>
    );
  }
}

export default App;
