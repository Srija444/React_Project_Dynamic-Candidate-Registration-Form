import logo from "./logo.svg";
import { Link } from "react-router-dom";
import "./App.css";
import Task1 from "./Task1";
import { Redirect, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

function App() {
  const nav = useNavigate();
  const navigate = () => {
    nav("/task1");
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button onClick={navigate}>Go To task1</Button>
      </header>
    </div>
  );
}

export default App;
