import React from 'react';
import './index.less';

class Button extends React.PureComponent {
	static defaultProps = {
		disabled: false,
		type: '',
		size: '',
	}

	handleClick = (e) => {
		const {
			onClick,
		} = this.props;
		if (onClick) {
			onClick();
		};
	}

	render() {
		const {
			type,
			size,
			disabled,
			children,
			onClick,
			...otherProps,
		} = this.props;
		const buttonType = type ? `wowjoy-button__${type}` : '';
		const buttonSize = size ? `wowjoy-button__${size}` : '';
		return (
			<button 
          className={`wowjoy-button ${buttonType} ${buttonSize}`}
          disabled={disabled}
          onClick={this.handleClick}>
            {children}
        </button>
		);
	}
}

export default Button;