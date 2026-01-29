#!/usr/bin/env node

// Todo: specify default directory to save logs to

const fs = require('fs');
const process = require('process');
const child_process = require('child_process');
const readline = require('readline');
const path = require('path');

readline.emitKeypressEvents(process.stdin);

process.stdin.setRawMode(true);

const argv = process.argv;

const command = argv[2];

const subcommand = argv[3];

/**
 * Path to store logs
 * Note: USERPROFILE is Windows specific
 *  */ 
const logsFolder = process.env.USERPROFILE + '\\Documents\\timetracker';

const timeDifference = (startTime, endTime) => {
    return endTime - startTime;
}

const msToSeconds = (ms) => {
    return (ms / 1000).toFixed(0);
}

const formatTime = (seconds) => {
    const _seconds = seconds % 60;
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    // const minutes = (seconds - _seconds %).toString().padStart(2, '0');
    // const hours = (minutes % 60).toString().padStart(2, '0');
    return {
        hours,
        minutes,
        seconds: _seconds
    }
}

/**
 * Update the title of the terminal/window
 * @param { string } title 
 */
const setTerminalTitle = (title) => {
    // if(process.platform == "win32") {
        // process.title = title;
    // } else {
        process.stdout.write('\x1b]2;' + title + '\x1b\x5c');
    // }
}

const NOTE_ARG_POSITIOn = 4;

if(command === "start") {
    const project = subcommand;

    const note = argv[NOTE_ARG_POSITIOn] || "";

    const starttime = new Date();

    const interval = setInterval(() => {
        const currTime = new Date();

        const difference = msToSeconds(currTime - starttime);
        const formattedTime = formatTime(difference);
        const timeStr = formattedTime.hours + 
            ':' + 
            formattedTime.minutes + 
            ':' + 
            formattedTime.seconds;
        console.clear();
        console.log('Tracking time for ' + project);
        console.log(timeStr);
        setTerminalTitle(timeStr + ' - ' + project);
    }, 1000);

    /**
     * Code to run before exitting.
     * Saves time entry to file.
     * @param { object } options options
     * @param { string } code exit code 
     */
    const beforeExit = (options, code) => {
        clearInterval(interval);
        console.log('Saving time log');
        const endtime = new Date();
        const timeTracked = msToSeconds(endtime - starttime);
        const timeTrackedFormatted = formatTime(timeTracked);
        // const startTimeFormatted = 
        // const endTimeFormatted = formatTime()
        fs.writeFileSync(
            path.join(logsFolder, project + '.txt'),
            endtime.toDateString() + ', ' +
            timeTrackedFormatted.hours + ':' +
            timeTrackedFormatted.minutes + ':' +
            timeTrackedFormatted.seconds +
            (note ? (', ' + note) : '') + '\n' ,
            {
                flag: 'a'
            }
        );
        if(options.exit) process.exit();
    };

    process.stdin.on('keypress', (ch, key) => {
        if(
            key.name === 'q' || 
            (key.name === 'c' && key.ctrl)
        ) {
            process.exit();
        }
    })

    process.on('exit', beforeExit.bind(null, {}));
    // process.on('beforeExit', beforeExit);
    process.on('SIGINT', beforeExit.bind(null, { exit: true }));

    // const logs = fs.readdirSync('./');
} else if (command == "view") {
    const project = subcommand;
    if(project) {
        const pathToFile = path.join(logsFolder, project + '.txt');
        // console.log(pathToFile);
        child_process.exec(pathToFile);
    } else {
        console.log(logsFolder);
        child_process.exec("explorer " + logsFolder);
    }
}



// console.log(150 % 70);