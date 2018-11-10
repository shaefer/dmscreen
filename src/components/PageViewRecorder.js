//Component to record google analytics page views but also wrap that with something to prevent localhost page views. 
import ReactGA from 'react-ga';
const RecordPageView = (path, trackerNames, title) => {
    ReactGA.pageview(path, trackerNames, title);
}

const RecordEvent = (category, action, label) => {
    let event = {
        category: category,
        action: action,
    }
    //TODO: Verify that just sending label as undefined does the same thing. If so, this code becomes much simpler.
    if (label)
        event.label = label;
    ReactGA.event(event);
}

const PageViewRecorder = {
    recordPageView: RecordPageView,
    recordEvent: RecordEvent
};

export default PageViewRecorder;