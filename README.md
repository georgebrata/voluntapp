---
Inainte sa predai aplicatia citeste asta:
1. https://hackernoon.com/real-time-crud-guide-front-end-part-1-ec890da3732b - tutorial dupa care m-am luat in creerea frontend-ului aplicatiei, un bun inceput ca sa ai o imagine de ansamblu la ce se intampla in aplicatie
2. https://hackernoon.com/real-time-crud-guide-back-end-part-2-1fd3d4d1ef67 - tutorial dupa care m-am luat in creerea vackend-ului aplicatiei, un bun inceput ca sa ai o imagine de ansamblu la ce se intampla in aplicatie
3. Readme-ul de mai jos - te sfatuiesc sa te uiti peste docmentatiile librariilor oficiale pe care le-am folosit in aplicatie
4. Pasii de instalare - trebuie sa iti instalezi programele de acolo si apoi sa iti deschizi un terminal si sa rulezi comenzile de acolo. Daca ai intrebari, scrie-mi un email pe bratageorge@gmail.com
5. DEMO-ul functioneaza doar cand serverul meu (George) este pornit. Il voi tine pornit pentru azi si maine (22-23 mai), dar il voi opri dupa ce reusesti sa-ti faci si tu setup-ul.

---
# Sterge textul de mai sus, nu uita 👆

# VoluntApp ヽ( ・∀・)ﾉ
Working demo 👉 (http://1c2b3dc3.ngrok.io/) 

## About
Scroll to the bottom for _installation instructions._

A simple events tracking single page app, built with SocketCluster for real-time updates across multiple clients. On frontend we used Vue + ElementUI for a nice, easy to use and clean interface. On backend we used RethinkDB as a database for fast, bi-directional database connections.

Aside from SocketCluster, VueJS and RethinkDB, this simple app uses the following modules:
- sc-collection (https://github.com/SocketCluster/sc-collection - ```npm install sc-collection```)
- sc-model (https://github.com/SocketCluster/sc-model - ```npm install sc-model```)
- sc-crud-rethink (https://github.com/SocketCluster/sc-crud-rethink - ```npm install sc-crud-rethink```)

Features:
- Authentication (via JWT tokens)
- Access control using backend middleware
- Reactive data binding
- Realtime REST-like interface
- Pagination with realtime updates

Keep in mind that this app is optimized for cutting-edgeness, not for backwards compatibility with older browsers. To make the most of this demo, you should open the web app in two different tabs/windows/browsers and make updates to the data in realtime.

## Installation

### Prerequisites
- Make sure you have Git installed (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Make sure you have Node.js installed (http://nodejs.org/)
- Make sure you have RethinkDB installed (https://www.rethinkdb.com/)

### Open a terminal and run:
- Run ```git clone https://github.com/kyokidG/voluntapp.git```
- Run ```cd voluntapp``` (to navigate to the voluntapp/ directory)
- Run ```npm install``` (to install back end modules)
- Run ```cd public && npm install && cd ..``` (to install front end modules inside the public/ directory)
- In a different terminal (or in the background), run ```sudo rethinkdb``` (make sure RethinkDB stays running)
- Run ```node server``` (to launch the server)
- In your browser, go to ```http://localhost:9999/```

