import React from 'react';
import TextButton from '@components/TextButton';


class FormInput extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };

    this.singleDecrease = this.singleDecrease.bind(this);
    this.singleIncrease = this.singleIncrease.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    this.refs.input.addEventListener('keydown', this.onKeyDown);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      value: newProps.value,
    });
  }

  componentWillUnmount() {
    this.refs.input.removeEventListener('keydown', this.onKeyDown);
  }

  singleDecrease() {
    this.props.callback(this.props.name, this.props.value - 1);
  }

  singleIncrease() {
    this.props.callback(this.props.name, this.props.value + 1);
  }

  onInputChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  onInputBlur() {
    this.props.callback(this.props.name, Number.parseInt(this.state.value, 10));
    this.setState({
      value: this.props.value,
    });
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      this.onInputBlur();
      this.props.confirm();
    }
    else if (e.keyCode === 109 || e.keyCode === 189) {
      this.singleDecrease();
    }
    else if (e.keyCode === 107 || e.keyCode === 187) {
      this.singleIncrease();
    }
    else {
      return;
    }

    e.preventDefault();
  }

  render() {
    const propsToPass = Object.assign({}, this.props);

    delete propsToPass.callback;
    delete propsToPass.confirm;

    return <div>
      <TextButton
        light
        onClick={this.singleDecrease} >
        -
      </TextButton>
      <input ref="input"
        {...propsToPass}
        className="new-game-dialog__form-input"
        value={this.state.value}
        onChange={this.onInputChange}
        onBlur={this.onInputBlur} />
      <TextButton
        light
        onClick={this.singleIncrease} >
        +
      </TextButton>
    </div>;
  }
}

FormInput.propTypes = {
  callback: React.PropTypes.func.isRequired,
  confirm: React.PropTypes.func.isRequired,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
};


export default FormInput;
