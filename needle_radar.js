"use strict";


//case insensitive
//recursive function for finding the needle...
//"pings" a folder, retrieving its contents and searching for the target file.
//then iterates over the contents and recurses with an updated directory for every folder iterated over
const radarPing = function(targetFile, directory, fs)
{
    //where the file will be stored and returned
    let needle;

    //read the directory
    const files = fs.readdirSync(directory);

    //looping is so cheating... but this should work
    fileParsing:
    for (const file of files) {
        //get the stats for this file
        const stats = fs.statSync(directory+"\\"+file);

        //return condition
        if (file.toLowerCase() == targetFile.toLowerCase()) return `Found it! needle is located at: ${directory}\\${targetFile}`;

        //if the file is a directory, call function with that directory
        if (stats.isDirectory()) needle = radarPing(targetFile, directory+"\\"+file, fs);

        //finally, if needle has been found stop recursing and get out of here
        if (needle) break fileParsing
    }

    //return needle fingers crossed lol
    return needle;
}


{
    const fs = require("fs");

    //start searching for the needle
    let needle = radarPing("needle.txt", __dirname+"\\haystack", fs);

    //output result
    console.log(needle);
}