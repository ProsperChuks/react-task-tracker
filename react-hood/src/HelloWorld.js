import React, { Component } from 'react';
import './HelloWorld.css'


class HelloWorld extends Component {
    render() {
        return (
            <div className="hello-world" >
                <h1>{this.props.greeting} {this.props.object}!</h1>
            </div>
        )
    }
};

export default HelloWorld;