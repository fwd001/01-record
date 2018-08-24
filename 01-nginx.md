# 前端反向代理
## 1.下载nginx 
## 2. 配置nginx.conf反向代理
```js
  server {
        listen       80;
        server_name  localtb.uuzu.com; // //hosts中设置的访问地址
        charset utf-8;   // 编码格式
        access_log  off; 
        location / {
            proxy_redirect off;
            #proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://127.0.0.1:8085;  // 设置本地服务器地址端口 
        }
        location ~ ^/(api|backend|site|gii|assets)(/.*)? {
            proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://10.18.97.107; 
            // 设置代理服务器地址
        }
    }
```