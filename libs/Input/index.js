import React from 'react'
import './index.less'

class Input extends React.PureComponent {
  static defaultProps = {
    disabled: false,
    type: 'text',
  }

  handleChange = (e) => {
    const {
      onChange,
      index,
    } = this.props;
    if (onChange) {
      onChange(e, index);
    };
  }

  handleBlur = (e) => {
    const {
      onBlur,
      index,
    } = this.props;
    if (onBlur) {
      onBlur(e, index);
    };
  }

  fixControlledValue = (value) => {
    if (typeof value === 'undefined' || value === null) {
      return '';
    };
    return value;
  }

  render() {
    const {
      type,
      name,
      width,
      margin,
      style,
      maxLength,
      rows,
      disabled,
      ...otherProps
    } = this.props;
    /*
     * defaultValue只会在第一次渲染有效
     * defaultValue和value尽量不共存，如果共存的话value将会覆盖defaultValue
     * 在共存的情况下，如果value值为undefined或者null，会被defaultValue覆盖
     */
    if ('value' in otherProps) {
      otherProps.value = this.fixControlledValue(otherProps.value);
      delete otherProps.defaultValue;
    };
    return (
      <div
        className="wowjoy-input"
        style={{ width, margin }}>
          {type === 'textarea' ? (
            <textarea {...otherProps}
              rows={rows}
              name={name}
              disabled={disabled}
              onChange={this.handleChange}
              style={style}
              className="wowjoy-textarea__inner"
            />
          ) : (
            <input {...otherProps}
              type={type || 'text'}
              name={name}
              maxLength={maxLength}
              disabled={disabled}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              style={style}
              className="wowjoy-input__inner"
            />
          )}
      </div>
    );
  }
}

export default Input;