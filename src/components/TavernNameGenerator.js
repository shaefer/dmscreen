import 'seedrandom';

const TavernGenerator = (seed = null) => {
    const prng = new Math.seedrandom(seed);
    const generateTavernName = () => {
        const templateInt = random(tavern_templates.length);
        const template = tavern_templates[templateInt];
        return template.fn();
    }
    
    const generateTavernNames = (num) => {
        var results = [];
        for(var i = 0;i<num;i++)
        {
            results.push(generateTavernName());
        }
        return results;
    };

    const desc = ["Fearsome", "Vengeful", "Bald", "Fat", "Thin", "Hungry", "Thirsty", "Ravenous", "Starving", "Portly", "Quiet", "Noisy", "Loud", "Silent", "Penitent", "Injured", "Limping", "Bloody", "Bleeding", "Thoughtful", "Murderous", "Dead", "Blind", "Mysterious", "Arcane", "All-seeing", "Transcendent", "Drunken", "Hammered", "Feasting", "Greedy", "Stingy", "Jolly", "Happy", "Smiling", "Frowning", "Contemptuous", "Jovial", "Ill-tempered", "Vicious", "Lecherous", "Burly", "Cross-eyed", "One-eyed", "Red-eyed", "Toothless", "Tattooed", "Scarred", "Pierced", "Lone", "Howling", "Grappling", "Wretched", "Beloved", "Cantankerous", "Crafty", "Salty", "Shifty", "Stalwart", "Keen", "Bloodthirsty", "Merciful", "Gentle", "Surly", "Fainting"];
    const ppl = ["Dwarf", "Elf", "Giant", "Halfing", "Knight", "Pirate", "Slave", "King", "Queen", "Prince", "Princess", "Barbarian", "Bard", "Cleric", "Priest", "Druid", "Sorcerer", "Wizard", "Warrior", "Thief", "Rogue", "Cutpurse", "Mage", "Ranger", "Wench", "Maid", "Butler", "Urchin", "Champion", "Hero", "Vagrant", "Shadow", "Assassin", "Acrobat", "Musician"];
    const colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Violet", "Brown", "Black", "White", "Gray", "Golden", "Silver", "Crimson", "Emerald", "Ruby", "Silver", "Turquoise"];
    const emotions = ["Pensive", "Laughing", "Yelling", "Smoking", "Angry", "Flaming", "Drunken", "Flying", "Lost", "Sleeping", "Frowning", "Smiling", "Grinning", "Chuckling", "Roaring", "Cursing", "Buxom", "Busty"];
    const materials = ["Ivory", "Ebon", "Stone", "Wooden", "Alabaster", "Turquoise", "Glass", "Ceramic", "Crystal", "Emerald", "Diamond", "Amethyst", "Jade", "Ruby", "Gleaming", "Sparkling"];
    const dwelling = ["Den", "Cage", "Lair", "Cave", "Alcove", "Nest", "Fen", "Rest", "Hut", "Bog", "Swamp", "Portal", "Plane", "Tent", "Lodge"];
    const things = ["Flame", "Sand", "Sun", "Moon", "Stars", "Silence", "Shadow", "Wind", "Sword", "Spear", "Whisper", "Cask", "Toadstool", "Light", "Blood", "Hammer", "Anvil"];
    const animals = ["Orc", "Ogre", "Hawk", "Troll", "Bear", "Dragon", "Goblin", "Snake", "Squirrel", "Wolf", "Unicorn", "Hag", "Toad", "Nymph", "Fairy", "Sprite", "Kraken", "Minotaur", "Serpent", "Hydra", "Stag", "Eagle", "Skeleton", "Zombie", "Goat"];
    const items_tv = ["Blade", "Mug", "Plow", "Wagon", "Fist", "Dagger", "Diamond", "Tankard", "Keg", "Throne", "Drum", "Axe"];
    const innTypes = ["Inn", "Tavern", "Alehouse", "Rest", "Bar", "Dive", "Drinkery", "Gin mill", "Grog Shop", "Lodge", "Pub", "Roadhouse", "Saloon", "Speakeasy", "Taphouse", "Taproom", "Watering hole", "Cottage", "Chalet", "Hostel", "Refuge", "Den", "Shelter", "Brewery", "Distillery", "Waystation", "Garden", "Lounge", "Cafe"];
    
    const tavernWrap = (name, own) => {
        const pos = (own) ? apos() : "";
        return (randomBoolean()) ? `The ${name}` : the() + name + pos + " " + tLookup(innTypes);
    }

    const the = () => (randomBoolean()) ? "The " : "";  
    const apos = () => (randomBoolean()) ? "'s" : "";
    const tLookup = (cat) => cat[random(cat.length)];
    const random = (x) => Math.floor(prng() * x); //already 0-based...perfect as an array index.
    const randomBoolean = () => random(2) - 1;

    const tavern_templates = [
        {pattern:"The Material Animal", fn:function(){return the() + tLookup(materials) + " " + tLookup(animals) + apos() + " " + tLookup(innTypes);}},
        {pattern:"The Color Animal",fn:function(){return the() + tLookup(colors) + " " + tLookup(animals) + apos() + " " + tLookup(innTypes);}},
        {pattern:"The Emotion Animal",fn:function(){return the() + tLookup(emotions) + " " + tLookup(animals) + apos() + " " + tLookup(innTypes);}},
        {pattern:"The Emotion Person",fn:function(){return the() + tLookup(emotions) + " " + tLookup(ppl) + apos() + " " + tLookup(innTypes);}},
        {pattern:"The Person & Animal",fn:function(){return tavernWrap( tLookup(ppl) + " & " + tLookup(animals) );}},
        {pattern:"The Animal's Dwelling",fn:function(){return "The " + tLookup(animals) + "'s " + tLookup(dwelling);}},
        {pattern:"The Animal & Animal",fn:function(){return tavernWrap(tLookup(animals) + " & " + tLookup(animals));}},
        {pattern:"The Thing & Thing",fn:function(){return tavernWrap( tLookup(things) + " & " + tLookup(things) );}},
        {pattern:"The Material Item",fn:function(){return tavernWrap(tLookup(materials) + " " + tLookup(items_tv), true);}},
        {pattern:"The Material Dwelling",fn:function(){return "The " + tLookup(materials) + " " + tLookup(dwelling);}},
        {pattern:"The Material Thing",fn:function(){return "The " + tLookup(materials) + " " + tLookup(things);}},
        {pattern:"The Emotion Item",fn:function(){return the() + tLookup(emotions) + " " + tLookup(items_tv) + apos() + " " + tLookup(innTypes);}},
        {pattern:"The Color Item",fn:function(){return tavernWrap(tLookup(colors) + " " + tLookup(items_tv), true);}},
        {pattern:"The Color Thing",fn:function(){return tavernWrap(tLookup(colors) + " " + tLookup(things), true);}},
        {pattern:"The Descriptor Animal",fn:function(){return the() + tLookup(desc) + " " + tLookup(animals) + apos() + " " + tLookup(innTypes);}},
        {pattern:"The Descriptor Thing",fn:function(){return the() + tLookup(desc) + " " + tLookup(things) + apos() + " " + tLookup(innTypes);}},
        {pattern:"The Descriptor People",fn:function(){return the() + tLookup(desc) + " " + tLookup(ppl) + apos() + " " + tLookup(innTypes);}},
    ];
                            
    return generateTavernNames;
}

export default TavernGenerator;