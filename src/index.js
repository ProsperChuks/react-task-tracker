import React from 'react';
import ReactDOM from 'react-dom';
import KanbanBoard from './components/KanbanBoard';
import './index.css';

let cardsList = [
    {
        id: 1,
        title: 'Read the Book',
        description: 'I should read the **whole** book',
        status: 'in-progress',
        tasks: []
    },

    {
        id: 2,
        title: 'Write some code',
        description: 'Code along with the samples in the book. The complete source can be found at [github](https://github.com/pro-react)',
        status: 'todo',
        tasks: [
            {
                id: 1,
                name: 'ContactList Example',
                done: true
            },

            {
                id: 2,
                name: 'kanban Example',
                done: false
            },

            {
                id: 3,
                name: 'My own experiments',
                done: false
            }
        ]
    }
];

ReactDOM.render(
    <KanbanBoard cards={cardsList} />, document.getElementById("root")
);