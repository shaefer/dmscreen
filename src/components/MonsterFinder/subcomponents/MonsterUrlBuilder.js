const buildShareableUrl = (monsterName, advancement) => {
    const baseUrl = `/monster/${monsterName}`
    const changes = [];
    if (advancement.hd) changes.push(`hd=${advancement.hd}`);
    if (advancement.size) changes.push(`size=${advancement.size}`);
    if (advancement.str) changes.push(`str=${advancement.str}`);
    if (advancement.dex) changes.push(`dex=${advancement.dex}`);
    if (advancement.con) changes.push(`con=${advancement.con}`);
    if (advancement.wis) changes.push(`wis=${advancement.wis}`);
    if (advancement.int) changes.push(`int=${advancement.int}`);
    if (advancement.cha) changes.push(`cha=${advancement.cha}`);
    if (advancement.templates) changes.push(`templates=${advancement.templates[0]}`)
    if (advancement.classLevels) {
        const classesForUrl = advancement.classLevels.map(x => x.className + x.level).join(",");
        changes.push(`classes=${classesForUrl}`)
    }

    const changesUrl = (changes.length > 0) ? "?" + changes.join("&") : '';
    return `${baseUrl}${changesUrl}`;
};
export default buildShareableUrl;