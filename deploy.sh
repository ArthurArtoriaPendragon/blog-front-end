#!/usr/bin/env sh

# 当发生错误时中止脚本
# set -e

# 构建
npm run build

git add -A
git commit -m '部署'
git push