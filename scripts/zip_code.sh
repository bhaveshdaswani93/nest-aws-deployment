#!/bin/bash

cd ..

zip -r nest_aws_deployment.zip . \
  -x "node_modules/*" \
  -x ".git/*" \
  -x "dist/*" \
  -x "*.log" \
  -x ".env*" \
  -x ".vscode/*" \
  -x "coverage/*" \
  -x "test/*"
