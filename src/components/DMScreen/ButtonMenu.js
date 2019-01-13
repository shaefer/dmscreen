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
        const id = Math.random() + "_toggle";
        const isChecked = (this.state.showOverlay) 
            ? <input className="apple-switch tgl tgl-light" type="checkbox" checked="checked" onClick={this.toggle} id={id}/> 
            : <input className="apple-switch tgl tgl-light" type="checkbox" onClick={this.toggle} id={id}/>
        return (<div style={overlayWrapperStyles}>
            <span style={{display:"inline-block"}} ref="target">
                {isChecked}
                <label htmlFor={id} className="tgl-btn"></label>
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