import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';


const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': 'pro-react-educational-api'
};


class KanbanBoardContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cards: []
        }
    }

    componentDidMount() {
        fetch(API_URL + '/cards', { headers: API_HEADERS })
            .then(response => response.json())
            .then(responseData => this.setState({ cards: responseData }))
            .catch(error => ("Error fetching and parsing data" + error));
    }

    render() {
        return <KanbanBoard cards={this.state.cards} />
    }
}

export default KanbanBoardContainer;