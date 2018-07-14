import React from 'react';
import QuestionnairContent from '../QuestionnairContent';
import QuestionnairEditor from '../QuestionnairEditor';
import QuestionnairSiderbar from '../QuestionnairSiderbar';
import DragSort from 'libs/DragSort/index.js';
import ShakeTransition from 'libs/Shake';
import Input from 'libs/Input';
import uuid from 'utils/utils';
import './index.less';

class Questionnair extends React.PureComponent {
  constructor(props) {
    super(props);
    this.editorsEl = [];
    this.scaleId = '';
    this.sign = false;
  }

  state = {
    editors: [],
    questionnairTitle: '问卷标题',
    curMoveItem: null,
    drag: false,
    scrollTo: 0,
    newEditor: true,
  }

  updateEditors = (callback) => {
    this.state.editors.some((data, index) => {
      if (data.isFirst && data.isEditor) {
        this.state.editors.splice(index, 1)
        return true;
      } else if (!data.isFirst && data.isEditor) {
        data.isEditor = false;
        return true;
      };
    });
    callback(this.state.editors);
  }
  /*
   * 判断是否有处于编辑状态的题目, activeEditorIndex // -1,没有处于编辑状态的题目
   * 如果有处于编辑状态的题目，则激活该编辑器抖动
   */
  isThereEditor = () => {
    const activeEditorIndex = this.state.editors.findIndex(data => data.isEditor === true);
    if (activeEditorIndex !== -1) {
      let editors = JSON.parse(JSON.stringify(this.state.editors));
      editors[activeEditorIndex].editorShake = uuid();
      this.setState({
        editors,
      });
      return true;
    } else {
      return false;
    };
  }

  createEditor = (type) => {
    if (this.isThereEditor()) {
      return;
    }
    const editor = {
      questionId: uuid(), //id
      type: type, //类型
      title: '', //题目
      required: false, //是否必填
      remark: false, //是否有备注
      remarkText: '', //备注内容
      options: ['选项', '选项'], //选项(只有radio,checkbox,select有,其余尽量给个空数组)
      rows: 1, //选项占的行数
      textareaHeight: 3, //多行文本高度
      maxLength: 50, //单行文本限制的字数
      otherOption: false, //是否有其他选项
      otherOptionForwards: '其他', //”其他“项文本(前)
      otherOptionBackwards: '', //”其他“项文本(后)
      completionForwards: '题目：', //填空题文本(前)
      completionBackwards: '', //填空题文本(后)
      isEditor: true, //编辑状态还是已编辑状态
      isFirst: true, //是否是新创建的
      editorShake: '',
    };
    this.setState(prevState => ({
      editors: [...prevState.editors, editor],
    }));
  }

  dragEditorByOutline = (editors) => {
    const {
      onDrag,
    } = this.props;
    this.setState({
      editors,
    }, () => {
      if (onDrag) {
        this.updateEditors(onDrag);
      };
    });
  }

  locateEditor = (index) => {
    this.setState({
      scrollTo: this.editorsEl[index].offsetTop,
    });
  }

  cancelEdit = (index) => {
    let editors = JSON.parse(JSON.stringify(this.state.editors));
    editors[index].isFirst ? editors.splice(index, 1) : editors[index].isEditor = false;
    this.setState({
      editors,
    });
  }

  confirmEdit = (index, newEditor) => {
    const {
      onConfirm,
    } = this.props;
    let editors = JSON.parse(JSON.stringify(this.state.editors));
    editors.splice(index, 1, newEditor);
    this.setState({
      editors,
    }, () => {
      if (onConfirm) {
        this.updateEditors(onConfirm);
      };
    });
  }

  againEdit = (index) => {
    if (this.isThereEditor()) {
      return;
    }
    let editors = JSON.parse(JSON.stringify(this.state.editors));
    editors[index].isEditor = true;
    this.setState({
      editors,
    });
  }

  copyEdit = (index) => {
    const {
      onCopy,
    } = this.props;
    let editors = JSON.parse(JSON.stringify(this.state.editors));
    const copyEditor = {
      ...this.state.editors[index],
      questionId: uuid(),
    };
    editors.splice(index + 1, 0, copyEditor);
    this.setState({
      editors,
    }, () => {
      if (onCopy) {
        this.updateEditors(onCopy);
      };
    });
  }

  removeEdit = (index) => {
    const {
      onRemove,
    } = this.props;
    let editors = JSON.parse(JSON.stringify(this.state.editors));
    editors.splice(index, 1);
    this.setState({
      editors,
    }, () => {
      if (onRemove) {
        this.updateEditors(onRemove);
      };
    });
  }

  handleDragMove = (editors, from, to) => {
    this.setState({
      curMoveItem: to,
      editors,
      drag: true,
    });
  }

  handleDragEnd = () => {
    const {
      onDrag,
    } = this.props;
    this.setState({
      curMoveItem: null,
      drag: false,
    }, () => {
      if (onDrag) {
        this.updateEditors(onDrag);
      };
    });
  }
  //标记事件
  handleSgin = (sign) => {
    const {
      onSign,
    } = this.props;
    if (onSign) {
      onSign(sign);
    };
  }
  //问卷标题失焦事件
  blurTitle = (title) => {
    const {
      onSaveTitle,
    } = this.props;
    if (onSaveTitle) {
      onSaveTitle(title);
    };
  }

  render() {
    const {
      editors,
      drag,
      editorShake,
      scrollTo,
      questionnairTitle,
    } = this.state;
    //如果有编辑状态的题目则禁止拖动
    const hasEditor = editors.some(data => data.isEditor === true);
    const canDrag = hasEditor ? false : true;
    const isFirst = editors.length !== 0 && editors[editors.length - 1].isFirst;
    const editorsEl = editors.map((editor, index) => {
      return (
        <div
          className="drag-wrapper"
          ref={el => this.editorsEl[index] = el}
          key={editor.questionId}>
          <QuestionnairEditor
            index={index}
            curMoveItem={this.state.curMoveItem}
            editor={editor}
            drag={drag}
            handleConfirm={this.confirmEdit}
            handleCancel={this.cancelEdit}
            handleEdit={this.againEdit}
            handleRemove={this.removeEdit}
            handleCopy={this.copyEdit}
          />
        </div>
      );
    });
    return (
      <div className="questionnair">
        <QuestionnairSiderbar
          editors={editors}
          onSelectEditor={this.createEditor}
          onDragOutline={this.dragEditorByOutline}
          onClickOutline={this.locateEditor}
        />
        <QuestionnairContent
          isFirst={isFirst}
          scrollTo={scrollTo}
          questionnairSign={this.sign}
          questionnairTitle={questionnairTitle}
          onBlurTitle={this.blurTitle}
          onChangeSign={this.handleSgin}>
            {editorsEl.length !== 0 && (
              <DragSort
                draggable={canDrag}
                data={editors}
                onDragEnd={this.handleDragEnd}
                onDragMove={this.handleDragMove}>
                  {editorsEl}
              </DragSort>
            )}
        </QuestionnairContent>
      </div>
    );
  }
}

export default Questionnair;