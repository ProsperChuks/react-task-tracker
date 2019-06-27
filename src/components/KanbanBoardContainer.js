import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';
import update from 'immutability-helper';


const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': 'pro-react-educational-api'        // this can be any string
};


class KanbanBoardContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cards: []
        }
    }

    addTask(cardId, taskName) {
        // Keep a reference to the original state prior to the mutations
        // in case need be to revert the optimistic changes in the UI
        let prevState = this.state;

        // find the index of the card
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

        // create a new task with the given name and a temporary id
        let newTask = { id: Date.now(), name: taskName, done: false };

        // create a new state including the new created task 
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: { $push: [newTask] }
            }
        })

        // set new state to the mutated object
        this.setState({ cards: nextState })

        // call the API to add the task to the server
        fetch(`${API_URL}/cards/${cardId}/tasks`, {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newTask)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    // Throw an error if server response wasn't 'ok'
                    // so revert can be made to the optimistic changes
                    // made to the UI
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
                // when the server returns the definitive id for the new task on the
                // server, update it on our local reactful state
                newTask.id = responseData.id;
                this.setState({ id: nextState })
            })
            .catch((error) => {
                this.setState(prevState);
            });
    }

    deleteTask(cardId, taskId, taskIndex) {
        // find the index of the card
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

        // Keep a reference to the original state prior to the mutations
        // in case need be to revert the optimistic changes in the UI
        let prevState = this.state;

        // create a new object without the task
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: { $splice: [[taskIndex, 1]] }
            }
        });

        // set the component state to the mutated object
        this.setState({ cards: nextState });

        // call the api to remove the task on the server
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`,
            { method: 'delete', headers: API_HEADERS }
        )
            .then(res => {
                if (!res.ok) {
                    // Throw an error if server response wasn't 'ok'
                    // so revert can be made to the optimistic changes
                    // made to the UI
                    throw new Error("Server response wasn't ok");
                }
            })
            .catch(error => {
                console.log("Fetch Error: ", error);
                this.setState(prevState);
            })
    }

    toggleTask(cardId, taskId, taskIndex) {
        // find the index of the card
        console.log(cardId)
        let cardIndex = this.state.cards.findIndex(card => card.id === cardId);

        // Keep a reference to the original state prior to the mutations
        // in case need be to revert the optimistic changes in the UI
        let prevState = this.state;

        // Save a reference to the task's done value
        let newDoneValue;

        // Using the &apply command, you'll change the done value to its opposite
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    [taskIndex]: {
                        done: {
                            $apply: (done) => {
                                newDoneValue = !done;
                                return newDoneValue
                            }
                        }
                    }
                }
            }
        });

        // set the component state to the mutated object
        this.setState({ cards: nextState });

        // call the API to toggle the task on the server
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({ done: newDoneValue })
        })
            .then(res => {
                if (!res.ok) {
                    // Throw an error if server response wasn't 'ok'
                    // so revert can be made to the optimistic changes
                    // made to the UI
                    throw new Error("Server response wasn't ok");
                }
            })
            .catch(error => {
                console.log("Fetch error: ", error);
                this.setState(prevState);
            })
    }

    componentDidMount() {
        fetch(API_URL + '/cards', { headers: API_HEADERS })
            .then(response => response.json())
            .then(responseData => this.setState({ cards: responseData }))
            .catch(error => ("Error fetching and parsing data" + error));
    }

    render() {
        return (
            <KanbanBoard
                cards={this.state.cards}
                taskCallbacks={{
                    add: this.addTask.bind(this),
                    delete: this.deleteTask.bind(this),
                    toggle: this.toggleTask.bind(this)
                }} />
        )
    }
}

export default KanbanBoardContainer;