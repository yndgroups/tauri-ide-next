#!/bin/bash
build_dir=$(cd $(dirname $0);pwd)
project_dir=${build_dir/build/}

echo ${project_dir}

# echo 'run dev mysql'
cd ${project_dir}src-tauri/plugins/mysql && npm run build

cd ${project_dir}src-tauri/kernel && tauri build --target aarch64-apple-darwin