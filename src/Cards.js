import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import './Cards.css';

const API_URL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

class Cards extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deck: null,
			cards: []
		};
		this.handleClick = this.handleClick.bind(this);
	}

	async componentDidMount() {
		let deck = await axios.get(API_URL);
		this.setState({ deck: deck.data });
	}

	async handleClick() {
		try {
			const API_URL_DRAW = `https://deckofcardsapi.com/api/deck/${this.state.deck.deck_id}/draw/?count=1`;
			let newCard = await axios.get(API_URL_DRAW);
			if (!newCard.data.success) {
				throw new Error('No Cards Left!');
			}
			let card = newCard.data.cards[0];

			this.setState((st) => ({
				cards: [
					...st.cards,
					{
						id: card.code,
						image: card.image,
						name: `${card.value} of ${card.suit}`
					}
				]
			}));
		} catch (err) {
			alert(err);
		}

		console.log(this.state.cards);
	}

	render() {
		let cards = this.state.cards.map((card) => <Card name={card.name} image={card.image} key={card.id} />);
		return (
			<div className="Cards">
				<div>
					<h1 className="Cards-title">CARD DEALER</h1>
					<h2 className="Cards-title subtitle">A LITTLE DEMO MADE WITH REACT</h2>
					<button onClick={this.handleClick}>DEAL ME A CARD</button>
				</div>
				<div className="Cards-area">{cards}</div>
			</div>
		);
	}
}

export default Cards;
