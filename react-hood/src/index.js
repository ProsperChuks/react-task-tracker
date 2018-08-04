import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from './HelloWorld';
import './index.css';

ReactDOM.render(
    < HelloWorld greeting="GoodMorning" object="Prince" />,
    document.getElementById('root')
);