import React, { Component } from 'react';
import './RuleRow.css';
import { threeOfKind } from './Rules';

class RuleRow extends Component {
    render() {
        const { score, name, description, doScore } = this.props;
        const disabled = Number.isInteger(score);
        return (
            <tr className={!disabled ? "RuleRow RuleRow-active" : "RuleRow RuleRow-disabled"}
                onClick={!disabled ? this.props.doScore : null}>
                <td className="RuleRow-name">{this.props.name}</td>
                <td className="RuleRow-score">{disabled ? score : description}</td>
            </tr>
        );
    }
}

export default RuleRow;