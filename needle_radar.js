"use strict";


//recursive function for finding the needle...
//"pings" a folder, retrieving its contents.
//then iterates over the contents and recurses with an updated directory for every folder iterated over
const radarPing = function(directory, fs)
{
    //where the needle will be stored and returned
    let needle;

    //read the directory
    const files = fs.readdirSync(directory);

    //looping is so cheating... but this should work
    fileParsing:
    for (const file of files) {
        //get the stats for this file
        const stats = fs.statSync(directory+"\\"+file);

        //return condition
        if (file.toLowerCase() == "needle.txt") return directory+"\\needle.txt";

        //if the file is a directory, call function with that directory
        if (stats.isDirectory()) needle = radarPing(directory+"\\"+file, fs);

        //finally, if needle has been found stop recursing and get out of here
        if (needle) break fileParsing
    }

    //return needle fingers crossed lol
    return needle;
}


{
    const fs = require("fs");

    //start searching for the needle
    let needle = radarPing(__dirname+"\\haystack", fs);
    console.log(needle);
}