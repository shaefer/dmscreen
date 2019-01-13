import React, { Component } from 'react';
import DiceBag from '../../utils/DiceBag'
import {Overlay} from 'react-overlays'

import './ButtonMenu.css'

const overlayWrapperStyles = {
    position: 'relative',
    //display: 'inline'
}

const buttonContainerStyles = {
    backgroundColor: 'lightgray',
    borderRadius: '8px',
    padding: '5px',
}

class ButtonMenu extends Component {
    constructor() {
        super();
        this.diceBag = DiceBag(null);
        this.toggle = this.toggle.bind(this);
        this.hide = this.hide.bind(this);
        this.state = {
            showOverlay: true
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
        const isChecked = (this.state.showOverlay) 
            ? <input class="apple-switch" type="checkbox" checked="checked" onClick={this.toggle}/> 
            : <input class="apple-switch" type="checkbox" onClick={this.toggle}/>
        return (<div style={overlayWrapperStyles}>
            <span  ref="target">
                {isChecked}
            </span>
            <span>{hideShowLabel} {this.props.label}</span>

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