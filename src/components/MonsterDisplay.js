import React from 'react'
import './MonsterDisplay.css';

const StatBlockLine = (props) => {
    return <div className="sbLine">{props.children}</div>;
}

const StatSectionHeader = (props) => {
    return <div className="sbSectionHeader">{props.children}</div>;
}

const B = (props) => {
    return <span className="bLabel">{props.children}</span>;
}

const MonsterDisplay = ({monster}) => {
    console.log("Monster Display Component Render")
    console.log(monster.statBlock)
    const m = monster.statBlock;
    const b = "bLabel"

    if (!m.name)
        return <div>No Monster Currently Selected</div>;

    return (
        <div className="monsterDisplay">
            <StatBlockLine>
                <B>{m.name} </B>
                <B>CR</B><span> {m.cr}</span>
            </StatBlockLine>
            <StatBlockLine><B>XP</B> {m.xp}</StatBlockLine>
            <StatBlockLine>{m.alignment} {m.size} {m.creature_type}</StatBlockLine>
            <StatBlockLine><B>Init</B> {m.init}; <B>Senses</B> {m.senses}</StatBlockLine>
            <StatSectionHeader>Defense</StatSectionHeader>
            <StatBlockLine><B>AC</B> {m.ac}</StatBlockLine>
            <StatBlockLine><B>hp</B> {m.hp}</StatBlockLine>
            <StatBlockLine><B>Fort</B> {m.fortitude}, <B>Ref</B> {m.reflex}, <B>Will</B> {m.will}</StatBlockLine>
            <StatBlockLine><B>Immune</B> {m.immune}</StatBlockLine>
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