import React, { ChangeEvent, Component } from "react";
import { solid, Path, Square, toJson, fromJson } from './square';
import { Editor } from "./editor";

type Page = "main" | "editor";

interface AppState {
  file: string;
  page: Page;
  list: string[];
  currentSquare: Square;
}

export class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      file: "",
      page: "main",
      list: [],
      currentSquare: solid("yellow"),
    };
  }

  render = (): JSX.Element => {
    if (this.state.page === "main") {
      this.listFiles();
      const files = this.state.list;
      return (
        <div>
          <h1>Files</h1>
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                <a href="#" onClick={() => this.handleSelect(file)}>
                  {file}
                </a>
              </li>
            ))}
          </ul>
          <label>Name: </label>
          <span>
            <input value={this.state.file} onChange={this.changeText}></input>{" "}
          </span>
          <button onClick={this.handlRemain}>main</button>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <span>File Name: {this.state.file}</span>
          </div>
          <Editor
            initialState={this.state.currentSquare}
            onSave={this.handleSave}
            onClose={this.handleClose}
          ></Editor>
        </div>
      );
    }
  };

  handleClick = (path: Path): void => {
    console.log(path);
    alert("Stop that!");
  };

  listFiles = () => {
    const url = "/api/list"
    fetch(url)
      .then((Response) => Response.json())
      .then((files) => this.setState({list: files}))
      .catch((error) => console.error("Retrieve files fail", error))
  }

  changeText = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({file: event.target.value});
  }

  // case save
  handleSave = (square: Square): void => {
    const jSonSquare = toJson(square);
    const string = JSON.stringify(jSonSquare);
    const url = "/api/save?name=" + this.state.file;
    fetch(url, 
      { method: "POST", body: JSON.stringify({"content": string}),
              headers: {"Content-Type": "application/json"}})
      .then(response => console.log(response))
      .catch(this.handleError);
  }

  // case close 
  handleClose = (): void => {
    this.setState({page: "main", file: ""});
  }

  // case select
  handleSelect = (file: string): void => {
    const url = "/api/load?name=" + file;
    fetch(url).then(response => response.json())
    .then(data => 
      {this.setState({page: "editor", file: file, currentSquare: fromJson(JSON.parse(data))
      })});
  }

  // case remain
  handlRemain = (): void => {
    this.setState({page: "editor", currentSquare: solid("blue")})
  }

  // case error
  handleError = (): void => {
    console.error(`Error happened`);
  }
}
