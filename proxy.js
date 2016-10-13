const http = require('http')
const querystring = require('querystring')
/**
 * author: sunopar
 */

require('http').createServer((req,res)=>{
    res.end('success');
}).listen(4050)

module.exports = function proxy({host='localhost',port=80,proxyPort=4040}){
    let data  = '';
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
        
        
    }).listen(proxyPort,()=>{
        console.log(`proxy listen on port ${proxyPort}`)
    })

    function _proxyGet(req,res){
        console.log(host)
        console.log(req.url)
        http.get({
            hostname:host,
            port,
            path:req.path
        },proxyRes=>{
            pipeRes(proxyRes,res)       
        })
    }
    function pipeRes(proxyRes,res){
        res.writeHead(proxyRes.statusCode,proxyRes.headers);
        proxyRes.pipe(res,{end:false})
        proxyRes.on('end',()=>{
            res.end()
        })
    }
    function _proxyPost(req,res){

        let opt = {
            method:req.method,
            host,
            port,
            path:req.url,
            headers:req.headers,
        }
        req.addListener('data',chunk=>{
            data+=chunk
        })
        .addListener('end',()=>{
            let request = http.request(opt,proxyRes=>{
                pipeRes(proxyRes,res)
            })
            request.write(data);
            request.end();
        })
    }
}






