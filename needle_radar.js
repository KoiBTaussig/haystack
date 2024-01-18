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
        //define the full path includin file name
        const fileWithPath = directory+"\\"+file;
        //get the stats for this file
        const stats = fs.statSync(fileWithPath);

        //return condition, if a file is found with the desired name
        if (file.toLowerCase() == targetFile.toLowerCase() && stats.isFile()) return fileWithPath;

        //if the file is a directory, call function with that directory
        else if (stats.isDirectory()) needle = radarPing(targetFile, fileWithPath, fs);

        //finally, if needle has been found stop recursing and get out of here
        if (needle) break fileParsing
    }

    //return needle fingers crossed lol
    return needle;
}


{
    const fs = require("fs");

    //start searching for the needle
    let needlePath = radarPing("needle.txt", __dirname+"\\haystack", fs);

    let needleContents = fs.readFileSync(needlePath, {encoding:"utf-8"});

    //output result
    console.log(`Found it! Needle is located at: ${needlePath}`);
    console.log(`File contents:\n${needleContents}`); //empty.... so sad
}