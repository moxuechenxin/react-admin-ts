## scripts
- 开发

```bash
npm start
```

- 编译

```bash
npm run build
```

- 创建模块目录

```bash
./creater.sh <module-name>
```

## 中文文档
- [React](https://doc.react-china.org/docs/hello-world.html)
- [React router v4](http://reacttraining.cn/web/example/basic)
- [Redux](http://cn.redux.js.org/)

## 目录说明
```bash
src
├── assets/         # 资源文件夹(scss、images)
│   ├── images/
│   └── style/
│
├── components/     # 组件
│   └── _common # 共用组件
│
├── extends/        # Component原型扩展（可以直接在组件内部通过this访问扩展属性和方法）
│
├── redux/          # redux (reducers/下每个文件为一个模块，相应的state通过store.<模块名/文件名>访问)
│
├── routers/        # router入口
│
│── utils/          # 工具类、函数
│   ├── Cookie.js
│   ├── EventBus.js
│   ├── formatDate.js
│   ├── getPos.js
│   ├── getServeDate.js
│   └── getStyle.js
│
└── index.js       # 项目入口文件
```

## debugger
### vscode
> .vscode/launch.json

需配合vscode插件[Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
```json
{
  "version": "0.2.0",
  "configurations": [
    {
    "name": "Chrome",
    "type": "chrome",
    "request": "launch",
    "url": "http://localhost:3000",
    "webRoot": "${workspaceRoot}/src",
    "sourceMapPathOverrides": {
      "webpack:///src/*": "${webRoot}/*"
    }
  }]
}
```