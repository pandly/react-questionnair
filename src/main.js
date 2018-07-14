import React from 'react';
import {
  render,
} from 'react-dom';
import Questionnair from './index.js';

const index = require('./index');

const renderDom = (Component) => {
  render(
    <Component />,
    document.getElementById('app')
  );
};
renderDom(Questionnair);
if (module.hot) {
  module.hot.accept('./index', () => {
    const QuestionnairEl = index.default;
    renderDom(QuestionnairEl);
  });
}