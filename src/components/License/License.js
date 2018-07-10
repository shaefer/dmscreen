import React, {Component} from 'react'

import OGL from './OGL'
import './License.css'

import ReactGA from 'react-ga';

class License extends Component {

    componentDidMount() {
        document.title="License (OGL) - by Clever Orc Games";
        ReactGA.pageview({path: window.location.pathname + window.location.search, title: document.title});
    }

    render() {
        return <div>{OGL}</div>
    }
}

export default License;