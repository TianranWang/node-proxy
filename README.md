# node-proxy
简易版node反向代理

## 使用方法

```
git clone https://github.com/sunbrother/node-proxy
cd node-proxy
// 打开`index.js`里根据需求配置你的代码，(配置在下方)
node index.js
```
这样反向代理服务器就开启了，之后就将你要请求的主机和端口改成下方配置的`host`和`port`就可以了。
例如
原本你的请求地址为 `http://baidu.com:80/apple`
那么你开启反向代理之后地址如下
`http://localhost:80/apple`

- host: 你要请求的目标主机
- port: 目标主机端口
- proxyPort:本地代理服务器端口
