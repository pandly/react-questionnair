import React from 'react';
import './index.less';

class Checkbox extends React.PureComponent {
	static defaultProps = {
		value: '',
		name: '',
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

	render() {
		const {
			defaultChecked,
			value,
			name,
			index,
			label,
			style,
		} = this.props;
		return (
			<label className="wowjoy-checkbox" style={style}>
				<input 
				  type="checkbox"
				  name={name}
				  value={value}
				  data-index={index}
				  defaultChecked={defaultChecked}
				  onChange={this.handleChange}
				  style={{ display: 'none' }}/>
						<span className="wowjoy-checkbox__inner"></span>
			    	<span className="wowjoy-checkbox__text">{label}</span>
			</label>
		);
	}
}

export default Checkbox;