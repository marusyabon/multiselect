import React from "react";
import Icon from "@material-ui/core/Icon";

class CustomSelect extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      filteredList: [],
      isPopupVisible: false
    };
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  showPopup() {
    if (!this.state.isPopupVisible) {
      this.setState({ isPopupVisible: true })
    };
  }

  filterOptions(val) {
    const list = this.state.options.filter(opt => {
      return opt.label.toLowerCase().indexOf(val.toLowerCase()) !== -1
    });
    this.setState({
      filteredList: list
    })
  }

  componentWillReceiveProps() {
    this.setState((state, props) => ({
      options: props.options,
      filteredList: props.options
    }));
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
        this.setState({ isPopupVisible: false })
    }
}

  render() {
    return (
      <div className="flex" ref={this.wrapperRef}>
        <div className="select" onClick={ () => this.showPopup() }>
          <input onChange={ (e) => this.filterOptions(e.target.value) } />
          <div className="options_popup">
            <ul className={ `popup ${this.state.isPopupVisible ? "" : "hidden"}` }>
              { this.state.filteredList.map(opt => (
                <li
                  className={ opt.isSelected ? "selected" : ""}
                  key={ opt.key }
                  onClick={ (e)=>{ this.props.onChange(opt) } }
                >{ opt.label }
                </li>
              )) }
            </ul>
          </div>
        </div>
        <div className="btn" onClick={ () => this.setState({ isPopupVisible: !this.state.isPopupVisible }) }>
          <Icon>{ this.state.isPopupVisible ? "close" : "keyboard_arrow_down" }</Icon>
        </div>
      </div>
    )
  }
}

export default CustomSelect;
