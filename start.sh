#!/bin/bash

# Start the first command in a subshell
(cd api && yarn start:dev) &

# Capture the PID of the first command
PID_API=$!

# Start the second command in a subshell
(cd app && yarn dev) &

# Capture the PID of the second command
PID_APP=$!

# Function to kill both processes
cleanup() {
  echo "Killing processes..."
  kill $PID_API $PID_APP
}

# Trap the EXIT signal to cleanup processes
trap cleanup EXIT

# Wait for both processes to exit
wait $PID_API $PID_APP