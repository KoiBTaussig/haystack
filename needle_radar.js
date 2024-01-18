"use strict";


//recursive function for finding the needle...
//folder specifies what folder to search within, as a number
const radarPing = function(directory, fs)
{
    //where the needle will be stored and returned
    let needle;

    //read the directory
    const files = fs.readdirSync(directory);
    //looping is so cheating... but this would work
    for (const file of files) {
        //get the stats for this file
        const stats = fs.statSync(directory+"/"+file);

        //return condition
        if (file == "needle.txt") return directory+"/needle.txt";

        //if the file is a directory, call function with that directory
        if (stats.isDirectory()) needle = radarPing(directory+"/"+file, fs);

    }

    //return needle fingers crossed lol
    return needle;
}


{
    const fs = require("fs");

    //start searching for the needle
    let needle = radarPing(__dirname+"/haystack", fs);
    console.log(needle);
}