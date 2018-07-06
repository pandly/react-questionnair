import React from 'react'
import Button from 'libs/Button'

import styles from './index.less'

class Dialog extends React.PureComponent {
    
    state = {
    	visible: this.props.visible
    }
    
    componentWillReceiveProps(nextProps) {
    	if(nextProps.visible !== this.props.visible) {
    		this.setState({
				visible: nextProps.visible
			})
    	}
    }

    confirm = () => {
    	const { onConfirm } = this.props;
    	if(onConfirm) {
    		onConfirm()
    	}
    }

    cancel = () => {
    	const { onCancel } = this.props;
    	if(onCancel) {
    		onCancel()
    	}
    }

	render() {
		const { title, children, onCancel, onConfirm } = this.props;
		const { visible } = this.state;
		const fade = visible ? 'wowjoy-dialog__fadeIn' : '';
		//const slideDown = visible ? 'wowjoy-dialog__slideDown' : '';
		return (
			<div 
			  className={`wowjoy-dialog ${fade}`}
			  >
			    <div className={`wowjoy-dialog__inner`}>
					<div className="wowjoy-dialog__header">
						{title}
					</div>
	            	<div className="wowjoy-dialog__body">
						{children}
	            	</div>
	            	<div className="wowjoy-dialog__footer">
						<Button type="primary" onClick={this.confirm}>确定</Button>
						<Button type="cancel" onClick={this.cancel}>取消</Button>
	            	</div>
			    </div>
			</div>
		)
	}
}

export default Dialog