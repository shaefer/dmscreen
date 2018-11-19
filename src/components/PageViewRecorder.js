//Component to record google analytics page views but also wrap that with something to prevent localhost page views. 
import ReactGA from 'react-ga';
const RecordPageView = (path, trackerNames, title) => {
    ReactGA.pageview(path, trackerNames, title);
}

const RecordEvent = (event) => {
    //Google analytics requires event to have at least a category field and an action field.
    //Google analytics allows a label field to be supplied optionally.
    console.log("Record event", event);
    ReactGA.event(event);
}

const PageViewRecorder = {
    recordPageView: RecordPageView,
    recordEvent: RecordEvent
};

export default PageViewRecorder;