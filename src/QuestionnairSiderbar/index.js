import React from 'react'
import styles from './index.less'
import DragSort from 'libs/DragSort'

const tabs = [
	{
		name: '题目控件'
	},
	{
		name: '问题大纲'
	}
]

const subjects = [
	{
		name: '单选题',
		type: 'radio',
		icon: 'icon-danxuanicon'
	},
	{
		name: '下拉题',
		type: 'dropdown',
		icon: 'icon-xialaicon'
	},
	{
		name: '多选题',
		type: 'checkbox',
		icon: 'icon-duoxuan-icon'
	},
	{
		name: '单行文本题',
		type: 'text',
		icon: 'icon-danhangicon'
	},
	{
		name: '多行文本题',
		type: 'textarea',
		icon: 'icon-duohangicon'
	},
	{
		name: '填空题',
		type: 'input',
		icon: 'icon-tiankongtiicon'
	}
]

class QuestionnairSiderbar extends React.PureComponent { 
    constructor(props) {
    	super(props)
    }
    
    state = {
		tabIndex: 0,
		curMoveItem: null,
		editors: []
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			editors: nextProps.editors
		})
	}

    toggleTab = (index) => {
		this.setState({
			tabIndex: index
		})
    }
    
    switchIcon = (type) => {
		switch(type) {
			case 'radio': return 'icon-danxuanicon';
			case 'dropdown': return 'icon-xialaicon';
			case 'checkbox': return 'icon-duoxuan-icon';
			case 'textarea': return 'icon-duohangicon';
			case 'text': return 'icon-danhangicon';
			case 'input': return 'icon-tiankongtiicon';
		}
    }
    
    handleDragMove = (editors, from, to) => {
    	const { onDragOutline } = this.props;
    	if(onDragOutline) {
    		onDragOutline(editors)
    	}
	    this.setState({
	      curMoveItem: to,
	      editors
	    })
	}

	handleDragEnd = ()=>{
	    this.setState({
	      curMoveItem: null
	    })
	}
    
    clickOutline = (index) => {
    	const { onClickOutline } = this.props;
    	if(onClickOutline) {
    		onClickOutline(index)
    	}
    }
	render () {
		this.tabs = [];
		const { onSelectEditor } = this.props;
		const { tabIndex, editors, curMoveItem } = this.state;
		return (
			<div className='questionnair-siderbar'>
				<div className='siderbar-tab'>
				    {tabs.map((data, index) => {
				    	return (
							<div
							  key={data.name}
							  className={`tab-item ${tabIndex === index && 'tab-item-active'}`} 
							  onClick={() => this.toggleTab(index)}
							  ref={(tab) => tab && this.tabs.push(tab)}>
							    {data.name}
							</div>
				    	)
				    })}
				</div>
				<div className='siderbar-menu'>
				    <div className='siderbar-menu-content' style={{ display:  0 !== tabIndex && 'none' }}>
						{subjects.map((data, index) => {
							return (
								<div
								  key={data.name}
								  className='siderbar-menu-editors'
								  onClick={() => onSelectEditor(data.type)}>
								    <i className={ `iconfont ${data.icon} siderbar-menu-icon`}></i>
									<span>{data.name}</span>
								</div>
							)
						})}
				    </div>
					<div className='siderbar-menu-content' style={{ display:  1 !== tabIndex && 'none', paddingTop: 12 }}>
						<DragSort
						  draggable={true}
						  data={editors}
						  onDragEnd={this.handleDragEnd} 
			              onDragMove={this.handleDragMove}>
							{editors.map((data, index) => {
								return (
									<div 
									  className='siderbar-menu-summary'
									  onClick={() => this.clickOutline(index)}
									  style={{ 
									  	border: 'none',
									  	cursor: 'move'
									  }} 
									  key={data.questionId}>
										<i className={`iconfont ${this.switchIcon(data.type)} siderbar-menu-icon`}></i>
										{data.type === 'input' ? (
											<span className='summary-text'>{data.completionForwards}____{data.completionBackwards}</span>
										) : (
											<span className='summary-text'>{data.title}</span>
										)}
										<div 
										  className='summary-drag-mask'
										  style={{ 
										  	background: curMoveItem === index ? 'rgba(245,245,245,0.50)' : ''
										  }}>
										</div>
									</div>
							    )
							})}
						</DragSort>
					</div>
				</div>
			</div>
		)
	}
}

export default QuestionnairSiderbar