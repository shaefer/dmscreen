const examineField = (fieldName) => {
    return (line) => {
        const json = JSON.parse(line);
        const fieldInfo = json[fieldName];
        if (fieldInfo && fieldInfo.includes('<p'))
        console.log(json.name, fieldInfo);
        const result = JSON.stringify(json) + "\n";
        return {result: result, success: true, id: json.name};
    };
}

export default examineField;
