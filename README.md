# BOLT V Dashboard

## Dependencies
### Must be run on a *nix environment
Requires `node v12.14.1^` and `npm v6.13.4^`\
`npm install` from the dashboard directory to install dependencies\
`npm install` from the can directory to install dependencies\
vCAN testing requires:
  - Linux Can-utils https://elinux.org/Can-utils or MacOS equivalent
  - Python 2.7^ and python-can library

## Usage
`vCanScripts/VCAN_SETUP.sh` with sudo perms to set up a vCAN channel\
`node server` from the can directory\
`npm start` from the dashboard directory to startup React development server\
`npm run electron-start` from the dashboard directory to open Electron window displaying React app\
`python vCANScripts/VCANTest.py` to test dashboard components using vCAN
