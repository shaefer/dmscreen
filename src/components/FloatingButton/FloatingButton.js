import React from 'react'
import './floatingButton.css'

const FloatingButton = (props) => {
    const handleClick = props.onClick;
    const visible = props.visible;
    const symbol = (visible) ? "close.png" : "pencil.png";
    return (
        <div className="floatingButton mobileOnly" onClick={(e) => handleClick(visible)}>
            <button>
                <img src={`/images/${symbol}`} style={{width:'2em'}}/>
            </button>
        </div>
    );
}
export default FloatingButton;