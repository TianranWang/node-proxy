const http = require('http')
const querystring = require('querystring')
/**
 * author: sunopar
 */

module.exports = function proxy({host='localhost',port=80,proxyPort=4040}){
    let data  = [];
    const server = http.createServer((req,res)=>{
        switch(req.method){
            case 'GET':
                _proxyGet(req,res)
                break
            case 'POST':
                _proxyPost(req,res)
                break
            default:
                res.end('can only request get/post')
                break
        }
        
    }).listen(proxyPort,()=>{
        console.log(`proxy listen on port ${proxyPort}`)
    })

    function _proxyGet(req,res){
        http.get({
            hostname:host,
            port,
            path:req.url
        },proxyRes=>{
            pipeRes(proxyRes,res)       
        })
    }
    function pipeRes(proxyRes,res){
        res.writeHead(proxyRes.statusCode,proxyRes.headers);
        proxyRes.pipe(res)
    }
    function _proxyPost(req,res){

        let opt = {
            method:req.method,
            host,
            port,
            path:req.url,
            headers:req.headers,
        }
        req.setEncoding('utf8')
        req.addListener('data',chunk=>{
            data.push(chunk)
        })
        .addListener('end',()=>{
            data = Buffer.concat(data)
            let request = http.request(opt,proxyRes=>{
                pipeRes(proxyRes,res)
            })
            request.write(data)
            request.end()
        })
    }
}