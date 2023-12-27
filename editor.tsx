import React, { Component } from "react";
import { Square, Path, get, replace, split, solid, Color } from './square';
import { SquareElem } from "./square_draw";
import { len, prefix } from "./list";
import { ChangeEvent } from "react";


interface EditorProps {
  /** Initial state of the file. */
  initialState: Square;
  onSave: (sq: Square) => void;
  onClose: () => void;
}


interface EditorState {
  /** The root square of all squares in the design */
  root: Square;

  /** Path to the square that is currently clicked on, if any */
  selected?: Path;
}


export class Editor extends Component<EditorProps, EditorState> {

  constructor(props: any) {
    super(props);

    this.state = { root: props.initialState, selected: undefined };
  }

  render = (): JSX.Element => {
    if (this.state.selected === undefined) {
      return (
        <div className="create-container">
          <SquareElem
            width={600}
            height={600}
            square={this.state.root}
            selected={this.state.selected}
            onClick={this.handleClick}
          />
          <div className="tool-container">
            <h2>Tools</h2>
            <button onClick={this.handleSave}>Save</button>
            <button onClick={this.handleClose}>Back</button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <SquareElem
            width={600}
            height={600}
            square={this.state.root}
            selected={this.state.selected}
            onClick={this.handleClick}
          />
          <h2>Tools</h2>
          <button type="button" onClick={this.handleSplit}>
            Split
          </button>
          <button type="button" onClick={this.handleMerge}>
            Merge
          </button>
          <label htmlFor="colors">Choose a Color:</label>
          <select id="colors" onChange={this.handleColorChange}>
            <option value="white">White</option>
            <option value="red">Red</option>
            <option value="orange">Orange</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="purple">Purple</option>
          </select>
          <div className="tool-container">
            <button onClick={this.handleSave}>Save</button>
            <button onClick={this.handleClose}>Back</button>
          </div>
        </div>
      );
    }
  };


  handleClick = (path: Path): void => {
    this.setState({ selected: path});
  }

  handleSplit = (): void => {
    if (this.state.selected === undefined) {
      return;
    }
    const square = get(this.state.root, this.state.selected);
    const newSquare = split(square, square, square, square);
    const splitSq = replace(this.state.root, this.state.selected, newSquare);
    this.setState({ root: splitSq})
  };

  handleMerge = (): void => {
    if (this.state.selected === undefined) {
      return;
    }

    const square = get(this.state.root, this.state.selected);
    const root = prefix(len(this.state.selected) - 1, this.state.selected);
    const update = replace(this.state.root, root, square);
    this.setState({ root: update });
  };

  handleColorChange = (color: ChangeEvent<HTMLSelectElement>): void => {
    if(this.state.selected === undefined) {
      return;
    }

    const clor = color.target.value;
    const newColor = solid(clor as Color);
    const newSquare = replace(this.state.root, this.state.selected, newColor);
    this.setState({ root: newSquare });
  };

  handleSave = (): void => {
    this.setState({selected: undefined});
    this.props.onSave(this.state.root);
  }

  handleClose = (): void => {
    this.setState({selected: undefined});
    this.props.onClose();
  }
}

