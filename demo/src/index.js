import React, { Component } from 'react';
import { render } from 'react-dom';

import SetSquare from '../../src';

class Demo extends Component {
    render() {
        return (
            <div>
                <h1>setsquare Demo</h1>
                <SetSquare />
            </div>
        );
    }
}

render(<Demo />, document.querySelector('#demo'));
