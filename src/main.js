import React, { Component } from 'react';
import { render } from 'react-dom';
import Questionnair from './index.js';
import iconfonts from 'assets/iconfonts/iconfont.css';

const renderDom = Component => {
    render(
        <Component />,
        document.getElementById('app')
    );
}
renderDom(Questionnair);

if (module.hot) {
    module.hot.accept('./index', () => {
        const Questionnair = require('./index').default;
        renderDom(Questionnair);
    })
} 