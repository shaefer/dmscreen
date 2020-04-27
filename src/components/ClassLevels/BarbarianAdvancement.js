import barbarian from "../../data/Classes/Barbarian";

//swim 40 ft.
//40 ft., climb 20 ft.

//TODO: Parse monster.speed into speed_details
const fastMovement = ({monster}) => {
    const speeds = monster.speed.split(",").map(x => x.trim()).slice(0);
    //swim, fly, climb, burrow
    const landSpeedIndex = speeds.findIndex(x => x.match(/^\d/)); //special speeds list the type of speed first...thus land speed starts with digit.
    
    if (landSpeedIndex === -1)
        return monster.speed;

    const landSpeed = speeds[landSpeedIndex]
    const landSpeedInt = parseInt(landSpeed);
    const newSpeed = landSpeedInt + 10;
    speeds[landSpeedIndex] = landSpeed.replace(landSpeedInt, newSpeed);

    return speeds.join(", ");
}
const replaceDr = (details, type, newAmount) => {  
    const idx = details.findIndex(x => x.endsWith(type));
    if (idx !== -1) {
        const detailStr = details[idx];
        const amount = parseInt(detailStr.match(/\d+/));
        if (newAmount > amount) {
            const regex = new RegExp(`\\d+\/${type}`);
            details[idx] = detailStr.replace(regex, `${newAmount}/${type}`);
        }
    } else {
        details.push(`${newAmount}/${type}`);
    }
}
const addDrDetails = (detailsOrig, type, newAmount, suffix) => {
    const details = detailsOrig.slice(0);
    const idx = details.findIndex(x => x.endsWith(type));
    if (idx !== -1) {
        const detailStr = details[idx];
        const amount = parseInt(detailStr.match(/\d+/));
        details[idx] = detailStr + ` (${(newAmount + amount)}/${type} ${suffix})`
    }
    return details
}
const damageReduction = ({monster, level: barbarianLevel}) => {
    const drFromBarbarianLevels = Math.min(5, Math.floor((barbarianLevel - 4) / 3)); //bbnLevel - 4 / 3
    const dr = monster.dr;
    const drDetails = (dr) ? dr.split(', ') : [];
    replaceDr(drDetails, "-", drFromBarbarianLevels); //might be nice to make this return the change rather than mutate.
    const sortedDetails = drDetails.sort((a, b) => {
        if (a.indexOf("-") !== -1) return -1;
        if (b.indexOf("-") !== -1) return 1;
        return a - b;
    });
    const newDr = sortedDetails.join(', '); 
    return newDr;
}

const increasedDamageReduction = ({monster, classAbilities}) => {
    const increasedDrCount = classAbilities.filter(x => x.name === 'Increased Damage Reduction').length
    const dr = monster.dr;
    const drDetails = (dr) ? dr.split(', ') : [];
    const newDrWithDetails = addDrDetails(drDetails, "-", increasedDrCount, "while raging");
    return newDrWithDetails.join(", ");
}

const BarbarianAdvancement = {
    fastMovement,
    'Fast Movement': fastMovement,
    damageReduction,
    'Damage Reduction': damageReduction,
    increasedDamageReduction,
    'Increased Damage Reduction': increasedDamageReduction,
}
export default BarbarianAdvancement;