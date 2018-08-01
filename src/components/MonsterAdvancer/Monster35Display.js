import React from 'react'
const MonsterDisplay = (monster) => {
    const conditions = "";
    console.log(monster.feats);
    //return <div>{monster.name}</div>;
    return (
        <section>
            <div><span>{monster.name}</span></div>
            <div><span className="co-bold">{monster.size} {monster.creatureType}</span></div>
            {conditions}
            <div><span className="co-bold">Hit Dice: </span><span>{monster.racialHd}d{monster.hdType}{monster.racialHitPonts}{monster.classHitPoints} ({monster.averageHitPointsTotal})</span></div>
            <div><span className="co-bold">Initiative: </span><span>{monster.initiative}</span></div>
            <div><span className="co-bold">Speed: </span><span>{monster.speed}</span></div>
            <div><span className="co-bold">Armor Class: </span><span dangerouslySetInnerHTML={{__html:monster.armorClass}}/><span> ({monster.armorClassBonuses})</span></div>
            <div><span className="co-bold">Base Attack/Grapple: </span><span>{monster.baseAttack}/{monster.grapple}</span></div>
            <div><span dangerouslySetInnerHTML={{__html:monster.attacks}}/></div>
            <div><span className="co-bold">Space/Reach: </span><span>{monster.space} ft./{monster.reach} ft.</span></div>
            <div>
                <span className="co-bold">Abilities: </span>
                <span>Str {monster.str}</span>
                <span>Dex {monster.dex}</span>
                <span>Con {monster.con}</span>
                <span>Int {monster.intel}</span>
                <span>Wis {monster.wis}</span>
                <span>Cha {monster.cha}</span>
            </div>
            <div>
                <span className="co-bold">Fort: </span><span>{monster.fort} </span>
                <span className="co-bold">Ref: </span><span>{monster.ref} </span>
                <span className="co-bold">Will: </span><span>{monster.will}</span>
            </div>
            <div><span className="co-bold">Skills: </span><span dangerouslySetInnerHTML={{__html:monster.skills}}/></div>
            <div><span className="co-bold">Feats: {monster.feats}</span></div>
            <div><span className="co-bold">Environment: {monster.environment}</span></div>
            <div><span className="co-bold">Organization: {monster.organization}</span></div>
            <div><span className="co-bold">Challenge Rating: {monster.challengeRating}</span></div>
            <div><span className="co-bold">Treasure: {monster.treasure}</span></div>
            <div><span className="co-bold">Alignment: {monster.alignmentText}</span></div>
            <div><span className="co-bold">Advancement: {monster.advancement}</span></div>
            <div><span className="co-bold">Level Adjustment: {monster.levelAdjustment}</span></div>
            <div><span dangerouslySetInnerHTML={{__html:monster.specialAbilities}}/></div>
            <div><span dangerouslySetInnerHTML={{__html:monster.gear}}/></div>
        </section>
    );
}
export default MonsterDisplay;