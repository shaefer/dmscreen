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

const renderClassLevelAbility = (ca) => {
    return (
        <StatBlockLine key={ca.name}>
            <B>{ca.name} (<span style={{textTransform: 'capitalize'}}>{ca.specialAbilityType}</span>): </B>
            {ca.description}
        </StatBlockLine>
    );
}

const renderClassLevelAbilities = (cas) => {
    const sas = cas.specialAbilities.map(x => renderClassLevelAbility(x));
    return (
        <React.Fragment key={cas.source}>
            <StatSectionHeader>{cas.source} ABILITIES</StatSectionHeader>
            {sas}
        </React.Fragment>
    )
}

const classLevelAbilitiesSection = (m) => {
    if (m.classLevelAbilities && m.classLevelAbilities.length > 0) { 
        return (
            <React.Fragment>
                
                {m.classLevelAbilities.map(ca => renderClassLevelAbilities(ca))}
            </React.Fragment>
        );
    }
}

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
    const existingAdjustments = (m.crAdjustments) ? m.crAdjustments : [];
    
    const crAdjustmentsVal = (existingAdjustments.length > 0) ? existingAdjustments.map(x => x.val).reduce((agg, x) => agg + x) : 0;
    const crAdjustmentsText = (existingAdjustments.length > 0) ? <StatBlockLine><B>CR Adjustments</B> {existingAdjustments.map(x => `${x.source} ${withPlus(x.val)}`).join(", ")}</StatBlockLine> : '';
    const crDisplay = (opts.showCrChanges && (m.crCalculation.crDiff || crAdjustmentsVal > 0)) ? `${m.crCalculation.crAdjusted + crAdjustmentsVal} (original CR ${m.cr})` : `${m.cr}`
    
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
        {crAdjustmentsText}
        </section>
    );
    const crSectionDisplay = (opts.showCrChanges && (m.crCalculation.crDiff || crAdjustmentsVal > 0)) ? crSection : '';
    const featCountStr = (m.featCount && opts.showFeatCount) ? ` (${m.featCount})` : ""; 
    const meleeAttackDisplay = (m.melee) ? displayFullAttack(m.melee_attacks) : m.melee;
    const rangedAttackDisplay = (m.ranged) ? displayFullAttack(m.ranged_attacks) : m.ranged;
    const perceptionSkill = m.skills.find(x => x.name.trim() === 'Perception');
    const perceptionDisplay = (perceptionSkill) ? perceptionSkill.name + ' '  + withPlus(perceptionSkill.value) : '';
    const senses = (m.senses) ? m.senses.replace(/Perception \+\d+/, perceptionDisplay) : m.senses;
    const acquiredSpecialAttacksBySource = (acquired) => {
        console.log(acquired);
        if (!acquired || !acquired.length === 0) return '';
        return acquired.map(x => <StatBlockLine key={x.source} data={x} required><B>Special Attacks from {x.source}</B> {x.display}</StatBlockLine>)
    }
    //<StatBlockLine data={m.specialAttacksAcquired} required><B>Additional Special Attacks</B> {m.specialAttacksAcquired}</StatBlockLine>
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
            {acquiredSpecialAttacksBySource(m.specialAttacksAcquired)}
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
            {classLevelAbilitiesSection(m)}
            {crSectionDisplay}
        </div>
    );
}

export default MonsterDisplay