# Timetracker

A small command line utility for tracking time. Uses readable .txt files for storing entries

## Requirements

Currently you need to have node.js and NPM installed, but eventually it will be available as a standalone binary.

## Installation

run `npm i -g https://github.com/JorensM/timetracker`

This will install the latest version of timetracker from the GitHub repository

## Usage

`timetracker start <label> <note>`

`<label>` is a unique identifier that identifies the project you're working on, or some other way of categorizing your activity. Each label will have its own log file, respectively called `<label>.txt`

`<note>` (optional) an optional note to add to the particular time entry that you'll be tracking that will be appended to the time entry in the log file

## Notes

* Right now timetracker only works for Windows but porting to other OSes would be fairly trivial as there is not much code. You're welcome to open a PR and it will be reviewed.
* Right now your logs get stored under `Users/username/Documents/timetracker` but eventually there will be a way to configure this.
