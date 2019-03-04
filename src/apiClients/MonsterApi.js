export const convertCriteriaToHtmlParameters = (criteria) => {
    var searchParams = criteria;
    let searchFields = [];
    if (searchParams.cr) {
        const through = (searchParams.crOperator === 'btw') ? "-" + searchParams.crEnd : "";
        searchFields.push(`cr=${encodeURI(searchParams.crOperator)}${searchParams.cr}${through}`);
    }
    if (searchParams.str) {
        const through = (searchParams.strOperator === 'btw') ? "-" + searchParams.strEnd : "";
        searchFields.push(`str=${encodeURI(searchParams.strOperator)}${searchParams.str}${through}`);
    }
    if (searchParams.dex) {
        const through = (searchParams.dexOperator === 'btw') ? "-" + searchParams.dexEnd : "";
        searchFields.push(`dex=${encodeURI(searchParams.dexOperator)}${searchParams.dex}${through}`);
    }
    if (searchParams.ac) {
        const through = (searchParams.acOperator === 'btw') ? "-" + searchParams.acEnd : "";
        searchFields.push(`ac=${encodeURI(searchParams.acOperator)}${searchParams.ac}${through}`);
    }
    if (searchParams.environment) {
        searchFields.push(`environment=${searchParams.environmentOperator}${searchParams.environment}`)
    }
    if (searchParams.creature_type) {
        searchFields.push(`creature_type=${searchParams.creatureTypeOperator}${searchParams.creature_type}`)
    }
    
    return searchFields.join("&");
}

export const getMonstersByCriteria = (criteria) => {
    console.log("ABOUT TO SEARCH ON", criteria);

    const searchFieldsAsHtmlParams = convertCriteriaToHtmlParameters(criteria);

    //https://monstersearchapi.cleverorc.com/?
    const baseUri = 'https://99hy8krr49.execute-api.us-west-2.amazonaws.com/prod';
    const url = `${baseUri}?${searchFieldsAsHtmlParams}`;
    console.log("URL TO FETCH: ", url);
    const resultsPromise = fetch(url)
        .then(resp => resp.json())
        .then(json => {
            console.log("REAL RESPONSE FROM S3 Select URL");
            console.log(json);
            return json.results
        });
    return resultsPromise;
}

export const getMonsterByName = (monsterName) => {
    if (!monsterName) return;
    console.log("ABOUT TO GET: " + monsterName);

    // const baseKey = monsterKey.substring(0, nthIndexOf(monsterKey, "_", 3));
    // const baseMonster = (monsterKey.startsWith("dragon_")) ? Monsters[baseKey] : undefined;
    // const monster = Monsters[monsterKey];

    // if (baseMonster) {
    //     const mergedMonster = {
    //         ...baseMonster,
    //         ...monster
    //     }
    //     return dispatch(showMonster(mergedMonster));
    // }
    // return dispatch(showMonster(monster));

    const url = `https://api.cleverorc.com/monsters/${monsterName}`;
    return fetch(url)
        .then(resp => resp.json())
        .catch(err => console.log(err));
}

export const convertFieldsToHtmlParameters = (fields) => {
    let fieldsAsHtmlParams = [];
    for (var i = 0;i<fields.length; i++) {
        const field = fields[i];
        if (!field.isMulti)
            fieldsAsHtmlParams.push(field.name + "=" + field.value);
        else
            fieldsAsHtmlParams.push(field.name + "=" + field.value.join(","));
    }
    const uriParams = (fieldsAsHtmlParams.length > 0) ? fieldsAsHtmlParams.join("&") : "";
    return uriParams;
}

export const getMonsterWithCustomizations = (monsterName, fields) => {
    const baseUri = `https://monsteradvancerv2.mircloud.us/api/monster/${monsterName}`
    let fieldsAsHtmlParams = [];
    for (var i = 0;i<fields.length; i++) {
        const field = fields[i];
        if (!field.isMulti)
            fieldsAsHtmlParams.push(field.name + "=" + field.value);
        else
            fieldsAsHtmlParams.push(field.name + "=" + field.value.join(","));
    }
    const uriParams = convertFieldsToHtmlParameters(fields);
    return fetch(`${baseUri}?${uriParams}`)
        .then(resp => resp.json())
        .then(data => {console.log(data); return data;})
        .catch(err => console.log(err));
}

export default { 
    getMonstersByCriteria: getMonstersByCriteria, 
    convertCriteriaToHtmlParameters: convertCriteriaToHtmlParameters,
    getMonsterByName: getMonsterByName,
    getMonsterWithCustomizations: getMonsterWithCustomizations,
    convertFieldsToHtmlParameters: convertFieldsToHtmlParameters
};