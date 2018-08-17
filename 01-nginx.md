## 1.下载nginx 
## 2. 配置nginx.conf反向代理
```js
  server {
        listen       80;
        server_name  localtb.uuzu.com;
        charset utf-8;
        access_log  off;
        location / {
            proxy_redirect off;
            #proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://127.0.0.1:8085;
        }
        location ~ ^/(api|backend|site|gii|assets)(/.*)? {
            proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://10.18.97.107;
        }
    }
```