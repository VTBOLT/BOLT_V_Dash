#!/bin/bash
sudo vCANScripts/VCAN_SETUP.sh
gnome-terminal -- bash -c 'node can/server'
gnome-terminal -- bash -c 'sleep 1 && cd dashboard && npm start'
gnome-terminal -- bash -c 'sleep 10 && cd dashboard && npm run electron-start'