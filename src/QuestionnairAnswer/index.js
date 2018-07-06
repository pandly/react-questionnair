import React from 'react';

const QuestionnairAnswer = ({ answer }) => {
	return (
		<div style={{ minHeight: 60 }}>
			<div style={{ color: '#666' }}>{`${index + 1}.${answer.type === 'input' ? answer.completionForwards : answer.title + ':'}`}</div>
			<div style={{ paddingLeft: 12, color: '#151515' }}>{typeof answer.answer[answer.type] !== 'string' ? (
				typeof answer.answer[answer.type].optionValue !== 'string' ? (
					answer.answer[answer.type].optionValue.map((item, index) => {
						return (
							item && <span key={index} style={{ marginRight: 15 }}>{item}</span>
						)
					})
				) : answer.answer[answer.type].optionValue
			) : answer.answer[answer.type]}</div>
		</div>
	)
}

export default QuestionnairAnswer;