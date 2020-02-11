We need to parse out the Classes from https://github.com/devonjones/PSRD-Data/tree/release/core_rulebook/class
The data still has raw HTML which we would work around or strip out. For now we have stripped it out.

We should probably divide the data into text sections based on `<p>` tags. We should also pull the re-parsed data and host it somewhere special when all this done. (Maybe even make a nice API.) 

`<("[^"]*"|'[^']*'|[^'">])*>` Helps to remove tags from ability descriptions.