#!/bin/bash
cd /home/ec2-user/frontend
pm2 serve build 80 --name frontend || pm2 restart frontend
pm2 save
