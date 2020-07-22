import React from "react";
import Select from "react-select"
import { data } from "./data";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data.map((el, index) => this.composeOption(el, index)),
      list: []
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  composeSelect() {
    const colourStyles = {
      option: (styles, { data }) => ({
          ...styles,
          backgroundColor: data.isSelected ? "#96d1fb" : "#fff",
        })
    };

    return (
      <div className="flex">
        <Select
          isMulti
          value = { null }
          options = { this.getOptions() }
          onChange = { (val) => this.handleSelect(val) }
          styles = { colourStyles }
          className="select"
        />
        <button
          className="btn__clear"
          onClick = {() => this.clearAll()}
          >Clear selection
        </button>
      </div>
    )
  }

  composeOption(val, index) {
    return {
      id: `option_${index}`,
      index,
      key: `option_${index}`,
      label: val,
      value: val.toLowerCase(),
      isSelected: val.isSelected || false
    }
  }

  composeList() {
    return this.state.list.map(item => (
      <li className="list_item flex bordered" key={ `item_${item.index}` }>
        <span>
          { item.label }
        </span>
        <button
          className="btn__close"
          onClick={() => this.removeItem(item.id)}
          >&times;
        </button>
      </li>
    ))
  }

  handleSelect(val) {
    const selectionState = val[0].isSelected;
    val[0].isSelected = !selectionState;
    const list = selectionState
      ? this.state.list.filter(item => item.id !== val[0].id)
      : this.state.list.concat(val);
    this.setState({ list });
  }

  getOptions() {
    return this.state.data;
  }

  removeItem(id) {
    const list = this.state.list.filter(item => item.id !== id);
    const data = this.state.data.filter(item => item.id !== id);
    this.setState({ list, data });
  }

  clearAll() {
    this.setState({
      list: [],
      data: this.state.data.map(el => ({ ...el, isSelected: false }))
    });
  }

  render() {
    return (
      <div className = "main">
        <ul className = "list bordered">
          { this.state.list.length
            ? this.composeList()
            : <li className = "list_item flex bordered">All</li>
            }
        </ul>
        { this.composeSelect() }
      </div>
    );
  }
}

export default App;
