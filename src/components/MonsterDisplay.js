import React from 'react'
import './MonsterDisplay.css';

import {statBonusFromAbilityScore, withPlus} from '../components/PathfinderMonsterAdvancer/AdvancementUtils'

const StatBlockLine = (props) => {
    if (props.inline) return ((props.data && props.required) || !props.required) ? <span className="sbLine">{props.children}</span> : "";
    return ((props.data && props.required) || !props.required) ? <div className="sbLine">{props.children}</div> : "";
}

const StatSectionHeader = (props) => {
    return <div className="sbSectionHeader">{props.children}</div>;
}

const B = (props) => {
    return <span className="bLabel">{props.children}</span>;
}

const specialDefenses = (m) => {
    const defenses = [];
    if (m.defensive_abilities) defenses.push(<span><B>Defensive Abilities</B> {m.defensive_abilities}</span>);
    if (m.dr) defenses.push(<span><B>DR</B> {m.dr}</span>);
    if (m.immune) defenses.push(<span><B>Immune</B> {m.immune}</span>);
    if (m.resist) defenses.push(<span><B>Resist</B> {m.resist}</span>);
    if (m.sr) defenses.push(<span><B>SR</B> {m.sr}</span>);
    return defenses.map((sd, index) => {
        let sep = "";
        if (defenses.length > 1 && index !== defenses.length - 1)
            sep = "; ";
        return (<span key={"def" + index}>{sd}{sep}</span>)
    });
};

const spaceAndReach = (m) => {
    return (m.space && m.reach) ? <StatBlockLine><B>Space</B> {m.space}; <B>Reach</B> {m.reach}</StatBlockLine> : "";
}

const characterClassSection = (section) => {
    let raceSections = section.sections;
    if (!raceSections) raceSections = []; //TODO: Werewolf Hybrid form is the only entry currently requiring this check! Fix the data!
    return (
        <span key={"ccSection"}>
        <StatBlockLine><B>{section.name} Characters</B> <div><span className="sbRaceSection sbDescription" dangerouslySetInnerHTML={{__html: section.body}} ></span></div></StatBlockLine>
        {raceSections.map((sec, index) => {
            if (sec.name === 'See Also') return "";
            return <StatBlockLine key={"cc" + index}><B>{sec.name}</B> <span className="sbRaceSection sbDescription" dangerouslySetInnerHTML={{__html: sec.body}} ></span></StatBlockLine>
        })}
        </span>
    );
}

const animalCompanionSection = (section) => {
    const advancements = (section.sections) ? section.sections : [];
    return (
    <span>
        <StatBlockLine><B>{section.name} Companions</B></StatBlockLine>
        <StatBlockLine><B>Starting Statistics: </B> 
            <StatBlockLine inline required data={section.size}><B>Size</B> {section.size}; </StatBlockLine>
            <StatBlockLine inline required data={section.speed}><B>Speed</B> {section.speed}; </StatBlockLine>
            <StatBlockLine inline required data={section.ac}><B>AC</B> {section.ac}; </StatBlockLine>
            <StatBlockLine inline required data={section.attack}><B>Attack</B> {section.attack}; </StatBlockLine>
            <StatBlockLine inline required data={section.ability_scores}><B>Ability Scores</B> {section.ability_scores}; </StatBlockLine>
            <StatBlockLine inline required data={section.special_qualities}><B>Special Qualities</B> {section.special_qualities}</StatBlockLine>
        </StatBlockLine>
        {advancements.map((ad, index) => {
            return <StatBlockLine key={"ad"+index}><B>{ad.name}: </B> 
                <StatBlockLine inline required data={ad.size}><B>Size</B> {ad.size}; </StatBlockLine>
                <StatBlockLine inline required data={ad.ac}><B>AC</B> {ad.ac}; </StatBlockLine>
                <StatBlockLine inline required data={ad.attack}><B>Attack</B> {ad.attack}; </StatBlockLine>
                <StatBlockLine inline required data={ad.ability_scores}><B>Ability Scores</B> {ad.ability_scores}; </StatBlockLine>
                <StatBlockLine inline required data={ad.special_qualities}><B>Special Qualities</B> {ad.special_qualities}</StatBlockLine>
            </StatBlockLine>
        })}
    </span>
    );
}

const specialAbilitiesAndDescription = (m) => {
    const s1 = m.sections;
    if (!s1) return "";
    let allSections = [];
    const sections = s1.map((section, index) => {
        if (section.subtype === 'special_abilities') {
            return (
                section.sections.map((sa, saIndex) => {
                    if (!sa.ability_types) return "";
                    return <StatBlockLine key={"sa" + saIndex}><B>{sa.name} <span style={{textTransform: "capitalize"}}>({sa.ability_types.ability_type.substring(0, 2)})</span></B> {sa.body}</StatBlockLine>;
                })
            );
        }
        if (section.subtype === 'monster_race') return characterClassSection(section);
        if (section.type === 'animal_companion') return animalCompanionSection(section);
        if (!section.subtype) {
            return <span key={"descSec" + index} className="sbLine sbDescription" dangerouslySetInnerHTML={{__html: section.body}} ></span>;
        }
        console.log(s1);
        return "Parsing Error";
    }); 
    if (m.special_abilities) {
        const sa_sections = m.special_abilities.map((sa, saIndex) => {
            if (!sa.type) return "";
            return <StatBlockLine key={"sa" + saIndex}><B>{sa.name} <span style={{textTransform: "capitalize"}}>({sa.type.substring(0, 2)})</span></B> {sa.description}</StatBlockLine>;
        });
        allSections = allSections.concat(sa_sections)
    }
    return allSections.concat(sections);
}

const creatureSubType = (m) => {
    return (m.creature_subtype) ? <span>({m.creature_subtype})</span> : "";
}

const spells = (m) => {
    if (!m.spells) return "";
    return m.spells.map((sec, index) => {
        if (sec["spell-like abilities"]) {
            return <StatBlockLine key={"sla" + index}><B>Spell-Like Abilities</B> <span className="sbLine sbSpells" dangerouslySetInnerHTML={{__html: sec["spell-like abilities"]}} ></span></StatBlockLine>
        }
        if (sec["spells prepared"]) {
            return <StatBlockLine key={"sp" + index}><B>Spells Prepared</B> <span className="sbLine sbSpells" dangerouslySetInnerHTML={{__html: sec["spells prepared"]}} ></span></StatBlockLine>
        }

        try {
            const catLabel = Object.keys(sec)[0];
            const catVal = sec[catLabel];
            return <StatBlockLine key={"sp" + index}><B>{catLabel}</B> <span className="sbLine sbSpells" dangerouslySetInnerHTML={{__html: catVal}} ></span></StatBlockLine>
        } catch (ex) {
            console.error("Couldn't map m.spells some assumption about the data setup is incorrect.", m.spells);
            return "";
        }
    });
}

const reason = (reason) => (reason) ? `${reason} = ` : ''
const displayStatChanges = (statChanges) => {
    if (!statChanges) return [];
    return statChanges.map(x => {
        const stats = [];
        if (x.str) stats.push(`Str: ${withPlus(x.str)}`)
        if (x.dex) stats.push(`Dex: ${withPlus(x.dex)}`)
        if (x.con) stats.push(`Con: ${withPlus(x.con)}`)
        if (x.int) stats.push(`Int: ${withPlus(x.int)}`)
        if (x.wis) stats.push(`Wis: ${withPlus(x.wis)}`)
        if (x.cha) stats.push(`Cha: ${withPlus(x.cha)}`)
        return (stats.length === 0) ? '' : `[${reason(x.reason)}${stats.join(', ')}]`
    });
}

const displayConstitution = (con, showStatBonus, statBonus) => {
    const statBonusDisplay = (showStatBonus) ? `(${statBonus})` : '';
    return (con === 0) ? '-' : `${con}${statBonusDisplay}`;
}

export const displayFullAttack = (fullAttacks) => {
    if (!fullAttacks) return;
    const attackSequencesAsText = fullAttacks.map(attackSequences => {
        //console.log(attackSequences);
        const attacksAsText = attackSequences.map(attack => {
            return displayAttack(attack);
        });
        return attacksAsText.join(", ");
    });
    return attackSequencesAsText.join(" or ");
}

const displayToHitForMultipleAttacks = (attackBonusText, toHit, toHitAdjustments) => {
    if (!toHitAdjustments || toHitAdjustments.length === 1) {
        return (attackBonusText) ? withPlus(toHit) + " " : '';
    } else {
        return toHitAdjustments.map(x => withPlus(x + toHit)).join("/") + " ";
    }
}

const displayAttack = (x) => {
    const attackType = (x.attackType) ? x.attackType + ' ' : '';
    const attackBonus = displayToHitForMultipleAttacks(x.attackBonus, x.toHit, x.toHitAdjustments);
    const originalAttackDisplay = `${x.attackText}${attackBonus}${attackType}${x.damage}`;
    const damage = displayDamage(x.damage_details);
    const newAttackDisplay = `${x.attackText}${attackBonus}${attackType}(${damage})`;
    // if (originalAttackDisplay != newAttackDisplay) {
    //     throw `Attack Mismatch error ${originalAttackDisplay} VS ${newAttackDisplay}`;
    // }
    return newAttackDisplay;
}

const damageDice = (adjustment => {
    if (adjustment === 0) return "";
    return withPlus(adjustment);
});

const displayDamage = (damageDetails => {
    return damageDetails.map(detail => {
        const newDice = detail.dice.map(dice => {
            return (dice.numOfDice === 0) ? "" : `${dice.numOfDice}d${dice.numOfSides}${damageDice(dice.adjustment)}`
        });
        //3 options
        //no dice just damageType
        //someDice no damageType
        //someDice and damageType
        const hasNoDiceNotation = !newDice[0]; //rewrite as filter of detail.dice?
        const damageType = (hasNoDiceNotation) ? detail.damageType : (detail.damageType) ? " " + detail.damageType : "";

        //build critRange and critMultiplier
        const critRange = (detail.critRange) ? "/" + detail.critRange : "";
        const critMult = (detail.critMultiplier) ? "/" + detail.critMultiplier : "";
        const diceAndCrit = (critRange || critMult) ? newDice + critRange + critMult : newDice;
        return diceAndCrit + damageType;

    }).join(" plus ");
});

const MonsterDisplay = ({monster}) => {
    const m = monster.statBlock;
    if (!m.name)
        return <div>No Monster Currently Selected</div>;
    if (!monster.success) {
        return <div>A Monster named [{m.name}] was not found</div>;
    }

    const defaultDisplayOptions = {
        showFeatCount: true,
        showStatBonuses: false,
        showDetailedCR: false,
        showStatChanges: false,
    }
    const opts = {
        ...defaultDisplayOptions,
        ...m.displayOptions
    }

    const statChanges = displayStatChanges(m.abilityScoreChanges);
    const abilityScoreChanges = (statChanges.length > 0 && opts.showStatChanges) ? statChanges.filter(x => x).map(x => <StatBlockLine key={x}><span><B>Ability Score Adjustments: </B>{x}</span></StatBlockLine>) : '';
    const abilityScores = <span><B>Str</B> {m.strength}, <B>Dex</B> {m.dexterity}, <B>Con</B> {displayConstitution(m.constitution, opts.showStatBonuses)}, <B>Int</B> {m.intelligence}, <B>Wis</B> {m.wisdom}, <B>Cha</B> {m.charisma}</span>
    const abilityScoresWithBonuses = <span><B>Str</B> {m.strength}({withPlus(statBonusFromAbilityScore(m.strength))}), <B>Dex</B> {m.dexterity}({withPlus(statBonusFromAbilityScore(m.dexterity))}), <B>Con</B> {displayConstitution(m.constitution,  opts.showStatBonuses, withPlus(statBonusFromAbilityScore(m.constitution)))}, <B>Int</B> {m.intelligence}({withPlus(statBonusFromAbilityScore(m.intelligence))}), <B>Wis</B> {m.wisdom}({withPlus(statBonusFromAbilityScore(m.wisdom))}), <B>Cha</B> {m.charisma}({withPlus(statBonusFromAbilityScore(m.charisma))})</span>
    const abilityScoreDisplay = (opts.showStatBonuses) ? abilityScoresWithBonuses : abilityScores;
    const crDisplay = (opts.showCrChanges && m.crCalculation.crDiff) ? `${m.crCalculation.crAdjusted} (original CR ${m.cr})` : `${m.cr}`
    
    const origCr = m.crCalculation.originalCr;
    const originalCrDetails = `HP CR: ${origCr.hp}, AC CR: ${origCr.ac}, Attack CR: ${origCr.attack}, Damage CR: ${origCr.damage}, Saves CR: ${origCr.saves}`;
    const newCr = m.crCalculation.advancedCr;
    const advancedCrDetails = `HP CR: ${newCr.hp}, AC CR: ${newCr.ac}, Attack CR: ${newCr.attack}, Damage CR: ${newCr.damage}, Saves CR: ${newCr.saves}`;
    const crSection = (
        <section>
        <StatSectionHeader>challenge rating details</StatSectionHeader>
        <StatBlockLine><B>Original CR</B> {m.cr}</StatBlockLine>
        <StatBlockLine><B>Original Calculated CR</B> {origCr.total} <B>CR Details: </B>({originalCrDetails})</StatBlockLine>
        <StatBlockLine><B>Advanced Calculated CR</B> {newCr.total} <B>CR Details: </B>({advancedCrDetails})</StatBlockLine>
        <StatBlockLine><B>CR Difference</B> {m.crCalculation.crDiff}</StatBlockLine>
        <StatBlockLine><B>New Estimated CR</B> {m.crCalculation.crAdjusted}</StatBlockLine>
        </section>
    );
    const crSectionDisplay = (opts.showCrChanges && m.crCalculation.crDiff) ? crSection : '';
    const featCountStr = (m.featCount && opts.showFeatCount) ? ` (${m.featCount})` : ""; 
    const meleeAttackDisplay = (m.melee) ? displayFullAttack(m.melee_attacks) : m.melee;
    const rangedAttackDisplay = (m.ranged) ? displayFullAttack(m.ranged_attacks) : m.ranged;
    const perceptionSkill = m.skills.find(x => x.name.trim() === 'Perception');
    const perceptionDisplay = (perceptionSkill) ? perceptionSkill.name + ' '  + withPlus(perceptionSkill.value) : '';
    const senses = (m.senses) ? m.senses.replace(/Perception \+\d+/, perceptionDisplay) : m.senses;
    return (
        <div className="monsterDisplay">
            <div className="sbLine sbName">
                <B><span style={{textTransform: "uppercase"}}>{m.name}</span> </B>
                <span style={{float: "right"}}><B>CR</B><B> {crDisplay}</B></span>
            </div>
            <StatBlockLine><B>XP</B> {m.xp}</StatBlockLine>
            <StatBlockLine>{m.alignment} {m.size} <span style={{textTransform: "lowercase"}}>{m.creature_type}</span> {creatureSubType(m)}</StatBlockLine>
            <StatBlockLine><B>Init</B> {m.init}; <B>Senses</B> {senses}</StatBlockLine>
            <StatBlockLine data={m.aura} required><B>Aura</B> {m.aura}</StatBlockLine>

            <StatSectionHeader>defense</StatSectionHeader>
            <StatBlockLine><B>AC</B> {m.ac}</StatBlockLine>
            <StatBlockLine><B>hp</B> {m.hp}</StatBlockLine>
            <StatBlockLine><B>Fort</B> {m.fortitude}, <B>Ref</B> {m.reflex}, <B>Will</B> {m.will}</StatBlockLine>
            <StatBlockLine>{specialDefenses(m)}</StatBlockLine>

            <StatSectionHeader>offense</StatSectionHeader>
            <StatBlockLine><B>Speed</B> {m.speed}</StatBlockLine>
            <StatBlockLine data={meleeAttackDisplay} required><B>Melee</B> {meleeAttackDisplay}</StatBlockLine>
            <StatBlockLine data={rangedAttackDisplay} required><B>Ranged</B> {rangedAttackDisplay}</StatBlockLine>
            {spaceAndReach(m)}
            <StatBlockLine data={m.special_attacks} required><B>Special Attacks</B> {m.special_attacks}</StatBlockLine>
            {spells(m)}

            <StatSectionHeader>statistics</StatSectionHeader>
            <StatBlockLine>{abilityScoreDisplay}</StatBlockLine>
            {abilityScoreChanges}
            <StatBlockLine><B>Base Atk</B> {m.base_attack}; <B>CMB</B> {m.cmb}; <B>CMD</B> {m.cmd}</StatBlockLine>
            <StatBlockLine><B>Feats</B>{featCountStr} {m.feats}</StatBlockLine>
            <StatBlockLine><B>Skills</B> {m.skill_details}</StatBlockLine>
            <StatBlockLine><B>Languages</B> {m.languages}</StatBlockLine>
            <StatBlockLine data={m.special_qualities} required><B>SQ</B> {m.special_qualities}</StatBlockLine>

            <StatSectionHeader>ecology</StatSectionHeader>
            <StatBlockLine><B>Environment</B> {m.environment}</StatBlockLine>
            <StatBlockLine><B>Organization</B> {m.organization}</StatBlockLine>
            <StatBlockLine><B>Treasure</B> {m.treasure}</StatBlockLine>

            <StatSectionHeader>special abilities</StatSectionHeader>
            {specialAbilitiesAndDescription(m)}
            {crSectionDisplay}
        </div>
    );
}

export default MonsterDisplay

//<div id="mainCreatureEntryDisplay">
//    <span style="font-weight: bold;">${monster.displayName }</span>
//            <span style="">CR ${monster.calculatedChallengeRatingWithClassLevels }</span>
//    <div>${monster.alignmentForDisplay } ${monster.size.sizeString } ${monster.creatureTypeForDisplay}</div>
//            <div><b>Init</b> ${monster.initiativeDisplay }</div>
//            <div class="hr"></div>
//    <div>${monster.acForDisplay }</div>
//            <div>(${monster.acBonusesForDisplay })</div>
//    <div><b>HD:</b> ${monster.allHd }</div>
//    <div><b>HP:</b> ${monster.hitPoints } (${monster.racialHd }d${monster.hdType }${monster.racialHitPointsFromBonus }${monster.classHitPointsFromBonus })</div>
//    <div><b>Fort</b> ${monster.fortSave } <b>Ref</b> ${monster.reflexSave } <b>Will</b> ${monster.willSave }</div>
//    <div class="hr"></div>
//            <div><b>Speed</b> ${monster.speed }</div>
//            <div><b>Base Atk</b> ${monster.baseAttackBonusDisplay } <b>Grp</b> ${monster.grappleBonusDisplay }</div>
//    <div>${monster.attacksForDisplay }</div>
//            <div><b>Space</b> ${monster.space } ft. (${monster.spaceSquares } squares) <b>Reach</b> ${monster.reachValue } ft. (${monster.reachSquares } squares)</div>
//    <div class="hr"></div>
//            <div><b>Abilities</b> Str ${monster.strForDisplay } Dex ${monster.dexForDisplay} Con ${monster.conForDisplay} Int ${monster.intForDisplay} Wis ${monster.wisForDisplay} Cha ${monster.chaForDisplay}</div>
//            <c:if test="${monster.additionalStatPointsFromAdvancement != 0 }">
//                <div><b>Stat Points Gained From Advancement: </b>${monster.additionalStatPointsFromAdvancement }</div>
//            </c:if>
//    <div class="hr"></div>
//            <div><b>Total Feats: </b>${monster.numberOfFeats }<c:if test="${fn:length(monster.bonusFeats) > 0}"> + ${fn:length(monster.bonusFeats)}<sup>Bonus feat</sup></c:if></div>
//            <c:if test="${fn:length(monster.feats) > 0}">
//                <div><b>Feats: </b>${monster.featsForDisplay }</div>
//            </c:if>
//    <div class="hr"></div>
//            <c:if test="${monster.skillPoints > 0}">
//                <div><b>Skill Points: </b>${monster.skillPoints }</div>
//                <div><b>Skills: </b>${monster.skillsForDisplay }</div>
//                <div class="hr"></div>
//    </c:if>
//            <c:if test="${fn:length(monster.allGear) > 0}">
//            <div><b>Gear: </b>${monster.allGearForDisplay }</div>
//            <div class="hr"></div>
//    </c:if>
//            <div>${monster.specialAbilitiesForDisplay }</div>
//    <div class="hr"></div>
//            <c:choose>
//            <c:when test="${fn:length(monster.advancementEntries) == 0}">
//                <div><b>Advancement: </b>By character class</div>
//            </c:when>
//    <c:otherwise>
//    <div><b>Advancement</b> ${monster.advancementEntries }</div>
//    </c:otherwise>
//            </c:choose>
//    <div class="noPrint"><a href="${monster.externalUrl }">Link for 3.5 version of creature</a></div>
//    <div class="noPrint"><a href="${monster.externalUrl }&pf=true">Link for Pathfinder version of creature</a></div>
//</div>

// {
//     "dexterity": "12", 
//     "ac": "21, touch 9, flat-footed 20 (+1 Dex, +12 natural, -2 size)", 
//     "special_attacks": "breath weapon (20-foot line, 7d6 electricity damage, Reflex DC 20 for half, usable every 1d4 rounds), constrict (2d6+9), rake (6 claws +14, 1d4+6), swallow whole (2d8+9 bludgeoning damage, AC 16, 10 hp)", 
//     "intelligence": "7", 
//     "melee": "bite +15 (2d6+9 plus grab)", 
//     "cr": "8", 
//     "xp": "4,800", 
//     "speed": "40 ft., climb 20 ft.", 
//     "alignment": "N", 
//     "size": "Huge", 
//     "languages": "Common", 
//     "strength": "23", 
//     "constitution": "21", 
//     "space": "15 ft.", 
//     "treasure": "double", 
//     "init": "+1", 
//     "environment": "warm hills and deserts", 
//     "source": "Bestiary", 
//     "charisma": "12", 
//     "immune": "electricity", 
//     "fortitude": "+12", 
//     "type": "creature", 
//     "feats": "Alertness, Cleave, Great Cleave, Power Attack, Weapon Focus (bite)", 
//     "senses": "darkvision 60 ft., low-light vision; Perception +6", 
//     "description": "This slithering, multilegged blue reptile has a fearsome head crowned with two large, curling horns.", 
//     "sections": [
//         {
//             "name": "Special Abilities", 
//             "source": "Bestiary", 
//             "url": "pfsrd://Bestiary/Monsters/Behir/Special Abilities", 
//             "type": "section", 
//             "subtype": "special_abilities", 
//             "sections": [
//                 {
//                     "body": "A behir's grab attack works against creatures of any size category. It can constrict the same round it establishes a hold. On any round thereafter that it maintains its hold, the behir can choose to rake the grappled target or swallow it whole.", 
//                     "name": "Grab", 
//                     "url": "pfsrd://Bestiary/Monsters/Behir/Special Abilities/Grab", 
//                     "ability_types": {
//                         "ability_type": "Extraordinary"
//                     }, 
//                     "source": "Bestiary", 
//                     "type": "ability"
//                 }
//             ]
//         }, 
//         {
//             "body": "<p>Temperamental and avaricious, the behir spends most of its time slithering through the sandy hills and desert cliffs that make up its territory, preying upon all creatures who dare to enter its hunting grounds. The creature's six pairs of powerful, clawed legs remain folded against its sides most of the time, only extending in combat to grapple foes or carry the behir forward in a terrifying, low-slung gallop, or else when climbing the sheer cliff faces common to behir lairs.</p>", 
//             "source": "Bestiary", 
//             "type": "section"
//         }, 
//         {
//             "body": "<p>The average behir is 40 feet long and weighs 4,000 pounds. In addition to the two prominent horns on its head, many have additional decorative spines at regular intervals along the central ridges of their backs.</p>", 
//             "source": "Bestiary", 
//             "type": "section"
//         }, 
//         {
//             "body": "<p>While territorial and bestial in its fury, the behir is neither stupid nor necessarily evil, though its self-centeredness and tendency to lay claim to everything visible from its high lairs frequently bring it into conflict with other races. As such, a behir can often be bought off or reasoned with by those brave negotiators willing to get close enough to make their pitch. In these cases, a behir's tendency to attack first and ask questions later (or not at all) means that anyone seeking to strike a deal must bring powerful incentives and impress the behir immediately with his offer.</p>", 
//             "source": "Bestiary", 
//             "type": "section"
//         }, 
//         {
//             "body": "<p>It's often been speculated that behirs are somehow related to blue dragons, but the exact nature of this link remains unknown. Most dragons deny any such association and look down on the behir for its relative lack of intelligence&mdash;a snubbing that infuriates the already short-tempered behir. Thanks to this casual disparagement, many behirs carry deep grudges against dragons, and attack without pause any who cross into their territories.</p>", 
//             "source": "Bestiary", 
//             "type": "section"
//         }
//     ], 
//     "hp": "105 (10d10+50)", 
//     "reach": "10 ft.", 
//     "wisdom": "14", 
//     "creature_type": "Magical Beast", 
//     "name": "Behir", 
//     "base_attack": "+10", 
//     "skills": "Climb +14, Perception +8, Stealth +5", 
//     "reflex": "+8", 
//     "cmd": "29 (can't be tripped)", 
//     "cmb": "+18 (+22 grapple)", 
//     "will": "+5", 
//     "url": "pfsrd://Bestiary/Monsters/Behir", 
//     "organization": "solitary or pair"
// }