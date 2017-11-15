import React, { Component } from 'react';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resizing: false,
            mouse: {
                x: this.props.width || 300,
                y: this.props.height || 300
            },
            offset: {
                x: 0,
                y: 0
            },
            style: {
                color: '#b4d455',
                grey: '#cccccc'
            }
        };
    }

    addListeners() {
        window.addEventListener('mousemove', this.resizeHandler.bind(this));
        window.addEventListener('mouseup', e => {
            this.setState({
                resizing: false
            });
        });
    }

    resizeHandler({ pageX, pageY }) {
        if (pageX > window.innerWidth) {
            pageX = window.innerWidth;
        }
        if (pageY > window.innerHeight) {
            pageY = window.innerHeight;
        }
        switch (this.state.resizing) {
            case 'x':
                this.setState({
                    mouse: {
                        ...this.state.mouse,
                        x: pageX - this.state.offset.x
                    }
                });
                break;
            case 'y':
                this.setState({
                    mouse: {
                        ...this.state.mouse,
                        y: pageY - this.state.offset.y
                    }
                });
                break;
            case 'both':
                this.setState({
                    mouse: {
                        x: pageX - this.state.offset.x,
                        y: pageY - this.state.offset.y
                    }
                });
                break;
            default:
                return;
        }
    }

    componentDidMount() {
        this.setState({
            offset: {
                x: this.ref.offsetLeft,
                y: this.ref.offsetTop
            }
        });
        this.addListeners();
    }

    render() {
        let { mouse, resizing, style } = this.state;
        return (
            <div
                style={{
                    width: (mouse.x || 100) + 30,
                    height: 'auto',
                    display: 'block',
                    pointerEvents: resizing ? 'none' : 'all',
                    position: 'relative'
                }}
            >
                <iframe
                    style={{
                        width: mouse.x - 10 || 100,
                        height: mouse.y - 10 || 100,
                        float: 'left',
                        border: 0,
                        display: 'block',
                        pointerEvents: resizing ? 'none' : 'all'
                    }}
                    scrolling="no"
                    src="http://getbootstrap.com/docs/4.0/examples/jumbotron/"
                    ref={ref => (this.ref = ref)}
                />
                <span
                    style={{
                        width: resizing === 'x' ? 20 : 10,
                        cursor: 'ew-resize',
                        height: mouse.y - 10,
                        float: 'left',
                        backgroundColor: resizing === 'x' ? style.color : style.grey,
                        display: 'block',
                        transition: 'width .2s ease'
                    }}
                    onMouseDown={() => {
                        this.setState({
                            resizing: 'x'
                        });
                    }}
                />
                <span
                    style={{
                        height: resizing === 'y' ? 20 : 10,
                        cursor: 'ns-resize',
                        width: mouse.x - 10,
                        float: 'left',
                        backgroundColor: resizing === 'y' ? style.color : style.grey,
                        display: 'block',
                        transition: 'height .2s ease'
                    }}
                    onMouseDown={() => {
                        this.setState({
                            resizing: 'y'
                        });
                    }}
                />
                <span
                    style={{
                        width: resizing === 'both' ? 20 : 10,
                        height: resizing === 'both' ? 20 : 10,
                        marginRight: resizing === 'both' ? 20 : 30,
                        float: 'right',
                        backgroundColor: resizing === 'both' ? style.color : style.grey,
                        display: 'block',
                        cursor: 'nwse-resize',
                        transition: '.2s ease'
                    }}
                    onMouseDown={() => {
                        this.setState({
                            resizing: 'both'
                        });
                    }}
                />

                <div
                    style={{
                        backgroundColor: style.grey,
                        width: 50,
                        position: 'absolute',
                        height: 20,
                        top: '100%',
                        right: 0,
                        padding: 10,
                        opacity: resizing ? 1 : 0,
                        transition: 'opacity .2s ease'
                    }}
                >
                    {`${mouse.x} x ${mouse.y}`}
                </div>
            </div>
        );
    }
}
