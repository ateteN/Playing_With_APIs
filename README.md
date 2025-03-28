### Currency Converter
designed a simple easy to use currency converter that fetches real-time exchange rates using API requests

## Features
1. fetches real time data of currency exchange using ExchangeRate-API
2. Allows a user to convert between multiple currency choices
3. it is easy to use and understand

## Technologies used
HTML, CSS, Javascript, Node.js, Express,js

## installation
to install first clone the repository 
1. `git clone`
2. `cd theproject directory`
3. `npm install`
4. create a .env file
5. `node app.js`
6. it will show app is running on localhoast:&{port} go to locahost

# to make the app run on your local server
# first install Nginx on load balancer
# configure Ngix to distribute traffic between web-01 and web-02 by use of upstream block

`upstream backend {
    server 0000-web-01;
    server 0000-web-02;
}
server {
    listen 80;
    location:
            80
}`

# Nginx configuration for Load Balancing, to forward incoming requests to web-01 and web-02

`
http {
    upstream backend {
        server 00.000.0.000;  # add web-01 IP
        server 00.000.000.000;  # add web-02 IP
    }

    server {
        listen 00; #port

        location / {
            proxy_pass http://backend;  # Use the upstream backend
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
`

# installed npm install express axios dotenv in my app.js to run the currency exchange API logic inside

## Future improvements 

1. adding better UI/UX design
2. implementing user authentication to track conversions
