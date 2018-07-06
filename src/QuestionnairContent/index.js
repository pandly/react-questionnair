import React from 'react'
import styles from './index.less'
import Input from 'libs/Input'
import Default from 'assets/scale_default.png'
 
class QuestionnairContent extends React.PureComponent {
    state = {
    	questionnairSign: false,
    	questionnairTitle: '问卷标题'
    }
    //新增题目时内容页滚动到底部
    componentDidUpdate() {
    	if(this.scrollBottom) {
    		const scrollHeight = this.content.scrollHeight;
			this.page.scrollTo(0, scrollHeight)
    	}

    	if(this.scrollTo) {
    		this.page.scrollTo(0, this.scrollTo)
    	}
    }
    
    componentWillReceiveProps(nextProps) {
		if(nextProps.isFirst) {
			this.scrollBottom = true;
		}else {
			this.scrollBottom = false;
		}

		if(nextProps.scrollTo !== this.props.scrollTo) {
			this.scrollTo = nextProps.scrollTo;
		}else {
			this.scrollTo = false;
		}
		this.setState({
			questionnairSign: nextProps.questionnairSign,
			questionnairTitle: nextProps.questionnairTitle
		})
    }

	handleSign = () => {
	   const { onChangeSign } = this.props;
       this.setState(prevState => ({
       	 questionnairSign: !prevState.questionnairSign
       }), () => {
       	onChangeSign(this.state.questionnairSign)
       })
	}
    
    handleChange = (e) => {
		this.setState({
			questionnairTitle: e.target.value
		})
    }
    
    handleBlur = () => {
		const  { onBlurTitle } = this.props;
		if(onBlurTitle) {
			onBlurTitle(this.state.questionnairTitle)
		}
    }

	render () {
		const { questionnairSign, questionnairTitle } = this.state;
		const questionnairtitleEl = (
			<div className='title-inner'>
				<Input
                  value={questionnairTitle}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  style={{
                  	height: 45,
                  	borderColor: 'transparent',
                  	textAlign: 'center',
                  	fontSize: 18,
                  	color: '#666',
                  	fontFamily: 'PingFangSC-Medium'
                  }}
				  className='title-input' />
			</div>
	    );
		return (
			<div className='questionnair-page' ref={el => this.page = el}>
				<div className='questionnair-page-banner'>
					<div className='banner-text' onClick={this.handleSign} style={{ color: questionnairSign ? '#FFBF47' : '' }}>
					  <i className="iconfont icon-dengpao"></i>
					  <span style={{ marginLeft: 6 }}>{questionnairSign ? '取消标记' : '标记'}</span>
					</div>
				</div>
				<div className='questionnair-page-title'>
					{questionnairtitleEl}
				</div>
				<div className='questionnair-page-content' ref={el => this.content = el}>
					{/*如果组件没有子节点，this.props.children返回false*/}
					{this.props.children || (
						<div className='questionnair-page-default'>
							<img src={Default} style={{ width: 130 }}/>
							<div className='page-default-text'>您还没有添加题目哦，请点击左侧控件开始出题吧</div>
						</div>
					)}
				</div>
			</div>
		)
	}
}

export default QuestionnairContent