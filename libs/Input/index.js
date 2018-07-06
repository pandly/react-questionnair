import React from 'react'

import styles from './index.less'

class Input extends React.PureComponent {
    static defaultProps = {
		disabled: false,
		type: 'text'
    }

	handleChange = (e) => {
		const { onChange, index } = this.props;
		if(onChange) {
			onChange(e, index)
		}
	}
    
    handleBlur = (e) => {
		const { onBlur, index } = this.props;
		if(onBlur) {
			onBlur(e, index)
		}
    }

	render() {
		const { type, name, value, width, margin, style, maxLength, rows, disabled, ...otherProps } = this.props;
		return (
			<div 
			  className="wowjoy-input"
			  style={{ width, margin }}>
			    {type === 'textarea' ? (
					<textarea {...otherProps}
					  rows={rows}
					  name={name}
					  value={value}
					  disabled={disabled}
					  onChange={this.handleChange}
					  style={style}
					  className="wowjoy-textarea__inner"
					/>
			    ) : (
					<input {...otherProps}
					  type={type || 'text'}
					  maxLength={maxLength}
					  name={name}
					  value={value}
					  disabled={disabled}
					  onChange={this.handleChange}
					  onBlur={this.handleBlur}
					  style={style}
					  className="wowjoy-input__inner"
					/>
			    )}
				
			</div>
		)
	}
}

export default Input