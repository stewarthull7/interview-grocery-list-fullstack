#!/bin/bash

PROJECT_DIR=$PWD

echo "Installing api..."
cd $PROJECT_DIR/api

if [ ! -d "node_modules" ]; then
  cp .env.example .env
  yarn install
  yarn prisma:generate:client
  yarn prisma:migrate:deploy
  npx prisma db seed
else
  echo "node_modules already exists, skipping yarn install steps."
fi

echo "Installing app..."
cd $PROJECT_DIR/app

if [ ! -d "node_modules" ]; then
  cp .env.example .env
  yarn install
else
  echo "node_modules already exists, skipping yarn install steps."
fi

cd $PROJECT_DIR
chmod +x ./start.sh