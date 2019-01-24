const examineField = (fieldName) => {
    return (line) => {
        const json = JSON.parse(line);
        console.log(json[fieldName]);
        const result = JSON.stringify(json) + "\n";
        return {result: result, success: true, id: json.name};
    };
}

export default examineField;
