const condenseSavingThrows = (line) => {
    const json = JSON.parse(line);
    
    json.saving_throws = {
        fort: json.fortitude,
        ref: json.reflex,
        will: json.will
    }

    if (json.fortitude_details) json.saving_throws.fortitude_details = json.fortitude_details;
    if (json.reflex_details) json.saving_throws.reflex_details = json.reflex_details;
    if (json.will_details) json.saving_throws.will_details = json.will_details;

    json.fortitude = undefined;
    json.reflex = undefined;
    json.will = undefined;

    if (json.fortitude_details) json.fortitude_details = undefined;
    if (json.reflex_details) json.reflex_details = undefined;
    if (json.will_details) json.will_details = undefined;

    const result = JSON.stringify(json) + "\n";
    return {result: result, success: true, id: json.name};
}

export default condenseSavingThrows;