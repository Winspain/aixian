#!/bin/bash
set -e

## 克隆仓库到本地
echo "clone repository..."
git clone https://github.com/Winspain/aixian.git carlist

# 设置目录名
dir_name="list"
custom_dir="custom"

# 检查目录是否存在
if [ -d "$dir_name" ]; then
    echo "目录存在，删除其下的所有文件"
    rm -rf "${dir_name:?}"/*
    echo "已删除 '$dir_name' 下的所有文件。"
else
    echo "目录不存在，创建目录并设置权限"
    mkdir "$dir_name"
    chmod -R 755 "$dir_name"
    echo "已创建目录 '$dir_name' 并设置权限为 755。"
fi

# 检查custom目录是否存在
if [ -d "$custom_dir/public" ]; then
    echo "custom/public 目录存在，删除其下的所有文件"
    rm -rf "${custom_dir:?}/public"/*
    echo "已删除 '$custom_dir/public' 下的所有文件。"
else
    echo "custom/public 目录不存在，创建目录并设置权限"
    mkdir -p "$custom_dir/public"
    chmod -R 755 "$custom_dir/public"
    echo "已创建目录 '$custom_dir/public' 并设置权限为 755。"
fi

cd carlist/web
mv dist/* ../../list
mv /src/custom/list.js ../../custom/public
cd ../..
chmod -R 755 list

yaml_file="./docker-compose.yml"

# 要检查和添加的映射
check_volume_list="./list:/app/resource/public/list"
check_volume_list_js="./custom/public/list.js:/app/resource/public/list.js"

# 检查文件是否存在
if [ ! -f "$yaml_file" ]; then
    echo "文件不存在: $yaml_file"
    exit 1
fi

# 检查是否已经存在映射，并添加缺失的映射
add_volume() {
    local volume=$1
    local new_volume=$2
    if grep -q "$volume" "$yaml_file"; then
        echo "映射 '$volume' 已存在，无需添加。"
    else
        awk -v new_volume="$new_volume" '
        BEGIN {
            in_chatgpt_share_server = 0;
            in_volumes = 0;
        }
        /chatgpt-share-server:/ {
            in_chatgpt_share_server = 1;
        }
        in_chatgpt_share_server && /volumes:/ {
            in_volumes = 1;
            print;
            next;
        }
        in_volumes && /^[ ]+- / {
            print new_volume;
            in_volumes = 0;
            in_chatgpt_share_server = 0;
        }
        { print }
        ' docker-compose.yml > tmp_file && mv tmp_file docker-compose.yml
        
        if [ $? -eq 0 ]; then
            echo "映射 '$new_volume' 添加成功"
        else
            echo "映射 '$volume' 添加失败"
        fi
    fi
}

add_volume "$check_volume_list" "      - $check_volume_list"
add_volume "$check_volume_list_js" "      - $check_volume_list_js"

rm -rf carlist
docker compose pull
docker rm -f chatgpt-share_chatgpt-share-server_1 || true
docker-compose up -d --no-recreate

## 提示信息
echo "已完成前端页面的更换"
