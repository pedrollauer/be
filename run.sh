#!/bin/bash
nohup npm start > output.log 2>&1 &
echo $! > pid.out 
