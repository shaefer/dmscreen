const getCaptureGroups = (regex, text) => {
    let matches;
    let values = [];
    while((matches = regex.exec(text)) !== null) {
        if (matches.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        values.push(matches);
    }
    return values;
}

export default getCaptureGroups;