const rollTimeString = () => {
    const rollTime = new Date();
    const rollTimeMillis = ('00' + rollTime.getMilliseconds()).slice(-3);
    const rollTimeStr = `${rollTime.toLocaleTimeString('en-US', { hour12: false })}.${rollTimeMillis}`;
    return rollTimeStr;
}
export default rollTimeString;