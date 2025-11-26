#!/bin/bash
cd /home/ec2-user/backend
pm2 start src/server.js --name backend || pm2 restart backend
pm2 save
