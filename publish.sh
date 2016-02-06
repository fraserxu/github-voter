#!/bin/bash

set -e -x

rm -rf dist

mkdir -p dist

npm run build

cp -r index.html callback.html static CNAME dist

surge dist github-voter.frasexu.me

rm -rf dist
