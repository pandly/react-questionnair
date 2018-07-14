import React from 'react';
import './index.less';

const stripNbsp = str => str.replace(/&nbsp;|\u202F|\u00A0/g, ' ');

export default class ContentEditable extends React.Component {
  shouldComponentUpdate(nextProps) {
    let {
      props,
      htmlEl
    } = this;
    if (JSON.stringify(this.props.style) === JSON.stringify(nextProps.style)) {
      return false;
    };
    // We need not rerender if the change of props simply reflects the user's edits.
    // Rerendering in this case would make the cursor/caret jump

    // Rerender if there is no element yet... (somehow?)
    if (!htmlEl) {
      return true;
    };
    // ...or if html really changed... (programmatically, not by user edit)
    if (
      stripNbsp(nextProps.html) !== stripNbsp(htmlEl.innerHTML) &&
      nextProps.html !== props.html
    ) {
      return true;
    };
    let optional = ['style', 'className', 'disabled', 'tagName'];
    // Handle additional properties
    return optional.some(name => props[name] !== nextProps[name]);
  }

  componentDidUpdate() {
    if (this.htmlEl && this.props.html !== this.htmlEl.innerHTML) {
      // Perhaps React (whose VDOM gets outdated because we often prevent
      // rerendering) did not update the DOM. So we update it manually now.
      this.htmlEl.innerHTML = this.props.html;
    };
  }

  emitChange = (evt) => {
    if (!this.htmlEl) return;
    var name = evt.target.dataset.name;
    var html = this.htmlEl.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      // Clone event with Object.assign to avoid 
      // "Cannot assign to read only property 'target' of object"
      var evt = Object.assign({}, evt, {
        target: {
          value: html,
          name: name,
        },
      });
      this.props.onChange(evt);
    }
    this.lastHtml = html;
  }

  render() {
    var {
      tagName,
      name,
      html,
      style,
      onKeyPress,
      ...otherProps,
    } = this.props;

    return (
      // React.createElement(
      //   tagName || 'div',
      //   {
      //     ...props,
      //     ref: (e) => this.htmlEl = e,
      //     onInput: this.emitChange,
      //     onBlur: this.props.onBlur || this.emitChange,
      //     contentEditable: !this.props.disabled,
      //     dangerouslySetInnerHTML: {__html: html}
      //   },
      //   this.props.children);
      <div {...otherProps}
        className="contentEditable"
        style={style}
        data-name={name} 
        ref={(e) => this.htmlEl = e}
        onInput={this.emitChange}
        onKeyPress={onKeyPress} 
        //onBlur={this.props.onBlur || this.emitChange}
        contentEditable={!this.props.disabled}
        dangerouslySetInnerHTML={{__html: html}}>
        {this.props.children}
      </div>
    );
  }
}