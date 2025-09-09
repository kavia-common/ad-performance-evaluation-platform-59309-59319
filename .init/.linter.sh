#!/bin/bash
cd /home/kavia/workspace/code-generation/ad-performance-evaluation-platform-59309-59319/creative_scoring_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

