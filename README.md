# jamespot-dev-proxy

A sample proxy project, to developp a ReactStyle projet, 
using a Jamespot Pro platform as a backend, 
and node to serve React compiled JS during developpement.

The proxy should be deployed locally, (say 127.0.0.1),
and adressed with the local name : jamespot.proxy.


e.g in /etc/hosts :

---

127.0.0.1  jamespot.proxy

---


Then, you should access your proxy using : https://jamespot.proxy:3443/  

In order to suppress Certificates Warning, 
the Certificate Store must contain the XCA_Jamespot.crt certificate as a Certificate Authority.


## run proxy

```
node index.js
node recipes/jamespot-react/index.js
```