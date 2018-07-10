import React, {Component} from 'react'

import OGL from './OGL'
import './License.css'

import ReactGA from 'react-ga';

class License extends Component {

    componentDidMount() {
        const title = "License (OGL) - by Clever Orc Games";
        document.title=title;
        ReactGA.pageview(window.location.pathname + window.location.search, undefined, title);
    }

    render() {
        return <div>{OGL}</div>
    }
}

export default License;