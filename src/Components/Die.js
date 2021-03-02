import React, { Component } from 'react';
import './Die.css';

class Die extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    numToTxt = {
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six"
    }

    handleClick() {
        this.props.handleClick(this.props.idx);
    }

    render() {
        return (
            <div
                className={!this.props.locked && this.props.rolling ? "Die Die-spin" : "Die"}
                style={{
                    opacity: this.props.locked ? 0.5 : 1,
                    textShadow: this.props.locked ? "none" : "0 19px 38px rgb(0 0 0 / 30%), 0 15px 12px rgb(0 0 0 / 10%)",
                    cursor: this.props.disabled ? "not-allowed" : "pointer"
                }}
                onClick={this.handleClick}
            >
                <i className={`fas fa-dice-${this.numToTxt[this.props.val]} fa-4x`} disabled={this.props.disabled}></i>
            </div>
        );
    }
}

export default Die;