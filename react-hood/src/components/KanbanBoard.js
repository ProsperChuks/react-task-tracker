import React, { Component } from 'react';
import List from './List';

class KanbanBoard extends Component {
    render() {
        return (
            <div className="app">
                {/* 
                In each of the List Component, we'll filter the
                cards prop and use it to sectionize our display
                into todo, in-progress, and done.

                cards prop of list component should be an object
            */}

                {/* ToDO */}
                <List id="todo" title="To Do" cards={

                    this.props.cards.filter((card) => card.status === "todo")
                } />

                {/* In Progress */}
                <List id="in-progress" title="In Progress" cards={

                    this.props.cards.filter((card) => card.status === "in-progress")
                } />

                {/* Done */}
                <List id="done" title="Done" cards={
                    this.props.cards.filter((card) => card.status === "done")
                } />

            </div>
        );
    }
}

export default KanbanBoard;