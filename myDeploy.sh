#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
npm run build

# 切换到 gh-pages分支
git checkout gh-pages
git add -f dist
git commit -m 'create project'
git subtree push --prefix dist origin gh-pages

# 切换到主分支
git checkout -q master

cd -