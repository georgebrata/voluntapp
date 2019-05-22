import getCategoryListPageComponent from '/pages/events/page-category-list.js';
import getCategoryDetailsPageComponent from '/pages/events/page-category-details.js';
import getEventDetailsPageComponent from '/pages/events/page-event-details.js';
import getLoginPageComponent from '/pages/page-login.js';
import getPageComponent from '/pages/page-generic.js';

import getDespreNoiPage from '/pages/page-despre-noi.js'
import getImplicaPage from '/pages/page-implicate.js'
import getEchipaPage from '/pages/page-echipa.js'

let socket = window.socket = socketCluster.create();

let pageOptions = {
  socket
};

let PageCategoryList = getCategoryListPageComponent(pageOptions);
let PageCategoryDetails = getCategoryDetailsPageComponent(pageOptions);
let PageEventDetails = getEventDetailsPageComponent(pageOptions);
let PageLogin = getLoginPageComponent(pageOptions);
let Page = getPageComponent(pageOptions);

let DespreNoiPage = getDespreNoiPage(pageOptions);
let EchipaPage = getEchipaPage(pageOptions);
let ImplicatePage = getImplicaPage(pageOptions);

let routes = [
  { path: '/category/:categoryId/event/:eventId', component: PageEventDetails, props: true },
  { path: '/category/:categoryId', component: PageCategoryDetails, props: true },
  { path: '/despre-noi', component: DespreNoiPage, props: true },
  { path: '/implica-te', component: ImplicatePage, props: true },
  { path: '/echipa-noastra', component: EchipaPage, props: true },
  { path: '/', component: PageCategoryList, props: true },
];

let router = new VueRouter({
  routes
});

new Vue({
  el: '#app',
  router,
  components: {
    'page-login': PageLogin,
    'page': Page
  },
  data: function () {
    return {
      isAuthenticated: false
    };
  },
  created: function () {
    this.isAuthenticated = this.isSocketAuthenticated();
    socket.on('authStateChange', () => {
      this.isAuthenticated = this.isSocketAuthenticated();
    });
    this._localStorageAuthHandler = (change) => {
      // In case the user logged in from a different tab
      if (change.key === socket.options.authTokenName) {
       if (this.isAuthenticated) {
         if (!change.newValue) {
           socket.deauthenticate();
         }
       } else if (change.newValue) {
         socket.authenticate(change.newValue);
       }
      }
    };
    window.addEventListener('storage', this._localStorageAuthHandler);
  },
  destroyed: function () {
    window.removeEventListener('storage', this._localStorageAuthHandler);
  },
  methods: {
    isSocketAuthenticated: function () {
      return socket.authState === 'authenticated';
    }
  },
  template: `
    <div>
      <div v-if="isAuthenticated">
        <page></page>
      </div>
      <div v-if="!isAuthenticated" style="padding: 10px;">
        <page-login></page-login>
      </div>
    </div>
  `
});
