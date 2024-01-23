const http = require('http');
const fs = require('fs');
const url = require('url');

const nodeServer = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') return res.end();

    const urlInfo = url.parse(req.url, true);

    const logText = `IP - ${req.socket.remoteAddress} | Time - ${new Date().toLocaleString()} | Request URL - ${req.url} \n`;

    fs.appendFile('log.txt', logText, (err, data) => {
        switch (urlInfo.pathname) {
            case '/': res.end('Welcome to node.js Home Page!'); break;
            case '/about': res.end('My name is Ajmal Hossain!'); break;
            case '/contact': res.end('You may contact me at +8801856778655!'); break;
            case '/management':
                const hods = [{ name: 'Ajmal Hossain', id: '66' }, { name: 'Sakib Hossain', id: '77' }, { name: 'Rahim Hossain', id: '88' }];
                const sms = [{ name: 'Kamrun Islam Mojumdar', id: '55' }, { name: 'Folna Islam Mojumdar', id: '99' }, { name: 'Tolna Islam Mojumdar', id: '44' }];

                if (urlInfo.query) {
                    if (urlInfo.query.level === 'hods') {
                        console.log(urlInfo.query);
                        const hod = hods.find(item => item.name === (urlInfo.query?.name || '') && item.id === (urlInfo.query?.id || ''));
                        if (hod) {
                            res.end(`<h1>Welcome to Management Page!</h1>\n\n<h2>Name: ${hod.name}</h2>\n<h2>ID: ${hod.id}</h2>`);
                        }
                    } else if (urlInfo.query.level === 'sms') {
                        const sm = sms.find(item => item.name === (urlInfo.query?.name || '') && item.id === (urlInfo.query?.id || ''));
                        if (sm) {
                            res.end(`<h1>Welcome to Management Page!</h1>\n\n<h2>Name: ${sm.name}</h2>\n<h2>ID: ${sm.id}</h2>`);
                        }
                    }
                } else {
                    res.end('Welcome to Management Page!');
                }
                break;
            default: resourcePath = '404 page not found'; break;
        }
    });
});

nodeServer.listen(8000, () => { console.log(`localhost is listening at port 8000`) });