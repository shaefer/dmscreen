var fs = require('fs');
var readline = require('readline');
var stream = require('stream');


const processFile = (fileNameAndPath, outputPath) => {
    var instream = fs.createReadStream(fileNameAndPath);
    var outstream = new stream;
    var rl = readline.createInterface(instream, outstream);
    
    var writeStream = fs.createWriteStream(outputPath, {flags:'a+'});

    rl.on('line', function(line) {
        writeStream.write(line + "updated" + "\n");
    });
    
    rl.on('close', function() {
      console.log("Finished");
    });
}

const now = new Date();
const dateString = now.toLocaleDateString()+"_"+now.getHours()+"-" + now.getMinutes() + "-" + now.getSeconds();
processFile("files/test.txt", "files/output/monsters_"+dateString+".txt");
