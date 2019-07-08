import React, { Component } from 'react';
import './Card.css';

export default class Card extends Component {
	constructor(props) {
		super(props);
		let rotation = Math.random() * 90 - 45;
		let xPos = Math.random() * 40 - 20;
		let yPos = Math.random() * 40 - 20;
		this._transform = `translate(${xPos}px, ${yPos}px) rotate(${rotation}deg)`;
	}

	render() {
		const { key, name, image } = this.props;
		return (
			<div className="Card">
				<img src={image} alt={name} id={key} style={{ transform: this._transform }} />
			</div>
		);
	}
}
