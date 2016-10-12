const http = require('http')
const querystring = require('querystring')
/**
 * 原理：起一个服务，接受到请求解析，再转发给服务器
 */

function proxy(http,host,port){
    let _http = require('http')
    let data = ''
    const server = http.createServer((req,res)=>{
        switch(req.method){
            case 'GET':
                _proxyGet(req,res)
                break
            case 'POST':
                _proxyPost(req,res)
                break
            default:
                res.write('can only request get/post')
                res.end()
                break
        }
        
        
    }).listen(4040,()=>{
        console.log('proxy listen on port 4040')
    })

    function _proxyGet(req,res){
        _http.get(`${host}${port}/${req.url}`,proxyRes=>{
            pipeRes(proxyRes,res)       
        })
    }
    function pipeRes(proxyRes,res){
        res.writeHead(proxyRes.statusCode,proxyRes.headers);
        proxyRes.pipe(res)
        res.end()
    }
    function _proxyPost(req,res){
        let opt = {
            method:req.method,
            host,
            port,
            path:req.url,
            headers:req,headers
        }
        req.addListener('data',chunk=>{
            data+=chunk
        })
        .addListener('end'()=>{
            data = querystring.parse(data)
            _http.request(opt,proxyRes=>{
                pipeRes(proxyRes,res)
            })
        })
    }
}
