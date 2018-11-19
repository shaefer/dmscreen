import React, {Component} from 'react'

import OGL from './OGL'
import './License.css'

import PageViewRecorder from '../../components/PageViewRecorder';

class License extends Component {

    componentDidMount() {
        const title = "License (OGL) - by Clever Orc Games";
        document.title=title;
        PageViewRecorder.recordPageView(window.location.pathname + window.location.search, undefined, title);
    }

    render() {
        return <div>{OGL}</div>
    }
}

export default License;