#!/bin/bash
components=./src/components
module=$1
root=$components/$1

# _assets/
mkdir -p "$root/_assets"
touch "$root/_assets/.gitkeep"

# _consts/routerCfg.js
mkdir -p "$root/_consts"
echo "// 当前模块名（路由名前缀）
export const MOUDLE_PREDIX = '$module'

export const INDEX = {
  path: \`/\${MOUDLE_PREDIX}\`,
  meta: {
    level: 0
  }
}" > "$root/_consts/routerCfg.js"

# _thumbs/
mkdir -p "$root/_thumbs"
touch "$root/_thumbs/.gitkeep"

# api.js
touch "$root/api.js"

# index.js
echo "import React, { Component } from 'react'
import './index.scss'

class Moudle_$module extends Component {
  render() {
    return (
      <div id=\"module-$module\">
      </div>
    )
  }
}

export default Moudle_$module" > "$root/index.js"

# index.scss
echo "#Moudle_$module {
}" > "$root/index.scss"

# router.js
echo "import {
  INDEX
} from './_consts/routerCfg'
import Index from './index'

export default [{
  ...INDEX,
  component: Index
}]" > "$root/router.js"

echo "$module: 模块目录初始化成功"