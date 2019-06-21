import React, { Component } from "react";
import PropTypes from "prop-types";
import List from "./List";

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
        <List
          id="todo"
          title="To do"
          taskCallbacks={this.props.taskCallbacks}
          cards={this.props.cards.filter(card => card.status === "todo")}
        />

        {/* In Progress */}
        <List
          id="in-progress"
          title="In Progress"
          taskCallbacks={this.props.taskCallbacks}
          cards={this.props.cards.filter(card => card.status === "in-progress")}
        />

        {/* Done */}
        <List
          id="done"
          title="Done"
          taskCallbacks={this.props.taskCallbacks}
          cards={this.props.cards.filter(card => card.status === "done")}
        />
      </div>
    );
  }
}

KanbanBoard.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object
};

export default KanbanBoard;
