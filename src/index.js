require("file-loader?name=[name].[ext]!./index.html");
import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "./App.css";

ReactDOM.render(<App />, document.getElementById("app"));
