const fs = require('fs');
const process = require('process');
const readline = require('readline');

readline.emitKeypressEvents(process.stdin);

process.stdin.setRawMode(true);

const argv = process.argv;

const command = argv[2];

const subcommand = argv[3];

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

if(command === "start") {
    const project = subcommand;

    const starttime = new Date();

    const interval = setInterval(() => {
        const currTime = new Date();

        const difference = msToSeconds(currTime - starttime);
        const formattedTime = formatTime(difference);
        console.clear();
        console.log('Tracking time for ' + project);
        console.log(
            formattedTime.hours + 
            ':' + 
            formattedTime.minutes + 
            ':' + 
            formattedTime.seconds
        )
    }, 1000);

    const beforeExit = (code) => {
        clearInterval(interval);
        console.log('Saving time log');
        const endtime = new Date();
        const timeTracked = msToSeconds(endtime - starttime);
        const timeTrackedFormatted = formatTime(timeTracked);
        // const startTimeFormatted = 
        // const endTimeFormatted = formatTime()
        fs.writeFileSync(
            './' + project + '.txt',
            endtime.toDateString() + ', ' +
            timeTrackedFormatted.hours + ':' +
            timeTrackedFormatted.minutes + ':' +
            timeTrackedFormatted.seconds + '\n',
            {
                flag: 'a'
            }
        );
    };

    process.stdin.on('keypress', (ch, key) => {
        if(key.name === 'q') {
            process.exit();
        }
    })

    process.on('exit', beforeExit);
    // process.on('beforeExit', beforeExit);
    process.on('SIGINT', beforeExit);

    // const logs = fs.readdirSync('./');
}



// console.log(150 % 70);