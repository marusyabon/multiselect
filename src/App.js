import React from "react";
import CustomSelect from "./CustomSelect"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      list: [],
      isPopupsVisible: false
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  composeOption(val, index) {
    const id = val.split(" ").join("_").toLowerCase();
    return {
      id,
      index,
      key: `option_${id}`,
      label: val,
      value: val.toLowerCase(),
      isSelected: val.isSelected || false
    }
  }

  composeList() {
    return this.state.list.map(item => (
      <li className="list_item flex bordered" key={ `item_${item.id}` }>
        <span>
          { item.label }
        </span>
        <button
          className="btn__close"
          onClick={() => this.removeItem(item.id)}
          area-label="Remove"
          >&times;
        </button>
      </li>
    ))
  }

  handleSelect(val) {
    const selectionState = val.isSelected;
    val.isSelected = !selectionState;
    const list = selectionState
      ? this.state.list.filter(item => item.id !== val.id)
      : this.state.list.concat(val);
    const data = this.state.data.map(item => item.id === val.id ? val : item);
    this.setState({ list, data });
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

  componentDidMount() {
    const headers = new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });

    fetch("./data.json", {
      headers,
    })
      .then(response => {
        return response.json();
      })
      .then(dataObj => {
        this.setState({ data: dataObj.data.map((el, index) => this.composeOption(el, index)) });
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
        <div className="flex align_start">
          <CustomSelect
            options={ this.state.data }
            onChange={ (val) => this.handleSelect(val) }
          />
          <button
            className="btn__clear"
            onClick = {() => this.clearAll()}
            >Clear selection
          </button>
        </div>
      </div>
    );
  }
}

export default App;
