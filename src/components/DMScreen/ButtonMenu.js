import React, { Component } from 'react';
import DiceBag from '../../utils/DiceBag'
import {Overlay} from 'react-overlays'
import DiceButton from './DiceButton'
import StatsButton from './StatsButton'

const overlayWrapperStyles = {
    position: 'relative',
    display: 'inline'
}

const buttonContainerStyles = {
    marginTop: '5px',
    backgroundColor: 'lightgray',
    borderRadius: '8px',
    padding: '5px',
    display: 'inline-block'
}

class ButtonMenu extends Component {
    constructor() {
        super();
        this.diceBag = DiceBag(null);
        this.toggle = this.toggle.bind(this);
        this.hide = this.hide.bind(this);
        this.state = {
            showOverlay: false
        }
    }

    toggle() {
        this.setState({ showOverlay: !this.state.showOverlay });
    }

    hide() {
        this.setState({ showOverlay: false });
    }

    render() {
        const hideShowLabel = (this.state.showOverlay) ? "Hide" : "Show";
        return (<div style={overlayWrapperStyles}>
            <button ref="target" onClick={this.toggle} className="tealAwesome">{hideShowLabel} {this.props.label}</button>
            <Overlay
                show={this.state.showOverlay}
                onHide={this.hide}
                placement="right"
                container={this}
                target={this.refs.target}
            >
                <div style={buttonContainerStyles}>
                    {this.props.children}
                </div>
            </Overlay>
        </div>)
    }
}

export default ButtonMenu