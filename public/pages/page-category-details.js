import SCCollection from '/node_modules/sc-collection/sc-collection.js';
import SCModel from '/node_modules/sc-model/sc-model.js';

function getPageComponent(pageOptions) {
  return Vue.extend({
    props: {
      categoryId: String
    },
    data: function () {
      this.categoryModel = new SCModel({
        socket: pageOptions.socket,
        type: 'Category',
        id: this.categoryId,
        fields: ['name', 'desc']
      });

      this.eventsCollection = new SCCollection({
        socket: pageOptions.socket,
        type: 'Event',
        fields: ['name', 'date', 'maxAttendees'],
        view: 'categoryView',
        viewParams: {category: this.categoryId},
        pageOffset: 0,
        pageSize: 5,
        getCount: true
      });

      let lowStockThreshold = 3;

      this.lowStockEventsCollection = new SCCollection({
        socket: pageOptions.socket,
        type: 'Event',
        fields: ['name', 'date', 'maxAttendees'],
        view: 'lowStockView',
        viewParams: {category: this.categoryId, date: lowStockThreshold},
        viewPrimaryKeys: ['category'],
        pageOffset: 0,
        pageSize: 5,
        getCount: false
      });

      return {
        // A category object which will be updated in real-time by our model.
        category: this.categoryModel.value,
        // An array of events which will be updated in real-time by our collection.
        events: this.eventsCollection.value,
        // An object which contains meta data about the collection (such as the total number of items); also updates in teal-time.
        eventsMeta: this.eventsCollection.meta,
        lowStockEvents: this.lowStockEventsCollection.value,
        lowStockThreshold,
        newEventName: '',
        realtime: this.eventsCollection.realtimeCollection
      };
    },
    computed: {
      firstItemIndex: function () {
        if (!this.events.length) {
          return 0;
        }
        return this.eventsMeta.pageOffset + 1;
      },
      lastItemIndex: function () {
        return this.eventsMeta.pageOffset + this.events.length;
      }
    },
    methods: {
      refreshLowStockCollection: function () {
        this.lowStockEventsCollection.destroy();
        this.lowStockEventsCollection = new SCCollection({
          socket: pageOptions.socket,
          type: 'Event',
          fields: ['name', 'date', 'maxAttendees'],
          view: 'lowStockView',
          viewParams: {category: this.categoryId, date: parseInt(this.lowStockThreshold)},
          viewPrimaryKeys: ['category'],
          pageOffset: 0,
          pageSize: 5,
          getCount: false
        });
        this.lowStockEvents = this.lowStockEventsCollection.value;
      },
      computeEventDetailsUrl: function (category, event) {
        return `#/category/${category.id}/event/${event.id}`;
      },
      addEvent: function () {
        if (this.newEventName === '') {
          return;
        }
        var newEvent = {
          name: this.newEventName,
          category: this.category.id
        };
        this.newEventName = '';

        this.eventsCollection.create(newEvent)
        .then((err, newId) => {
          // TODO: Success message
        })
        .catch((err) => {
          // TODO: Handle error
        });
      },
      inputKeyDown: function (event) {
        if (event.key === 'Enter') {
          this.addEvent();
        }
      },
      goToPrevPage: function () {
        this.eventsCollection.fetchPreviousPage();
      },
      goToNextPage: function () {
        this.eventsCollection.fetchNextPage();
      },
      toggleRealtime: function () {
        this.eventsCollection.destroy();
        this.eventsCollection = new SCCollection({
          socket: pageOptions.socket,
          type: 'Event',
          fields: ['name', 'date', 'maxAttendees'],
          view: 'categoryView',
          viewParams: {category: this.categoryId},
          pageOffset: 0,
          pageSize: 5,
          getCount: true,
          realtimeCollection: this.realtime
        });
        this.events = this.eventsCollection.value;
        this.eventsMeta = this.eventsCollection.meta;
      }
    },
    beforeRouteLeave: function (to, from, next) {
      this.categoryModel.destroy();
      this.eventsCollection.destroy();
      this.lowStockEventsCollection.destroy();
      next();
    },
    template: `
      <div class="page-container">
        <a href="/#/"><< Inapoi la categorii</a>
        <h2 class="content-heading">{{category.name}}</h2>
        <div class="content-body">
          <div class="all-category-events">
            <p>
              <h4>Descrierea categoriei</h4>
              <span>{{category.desc}}</span>
            </p>
            <h4>Events:</h4>
            <div style="min-height: 300px;">
              <table class="table">
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Max. participanti</th>
                </tr>
                <tr v-for="event of events">
                  <td><a :href="computeEventDetailsUrl(category, event)">{{event.name}}</a></td>
                  <td>{{event.date}}</td>
                  <td>{{event.maxAttendees}}</td>
                </tr>
              </table>
            </div>

            <div class="control-bar">
              <div style="padding-bottom: 20px;">
                <a href="javascript:void(0);" @click="goToPrevPage">Prev page</a> <span>Items </span><span>{{firstItemIndex}}</span><span> to </span><span>{{lastItemIndex}}</span> of <span>{{eventsMeta.count}}</span> <a href="javascript:void(0);" @click="goToNextPage">Next page</a>
              </div>
              <div style="width: 50%; float: left; margin-right: 10px;">
                <input type="text" class="form-control" v-model="newEventName" @keydown="inputKeyDown">
              </div>
              <input type="button" class="btn btn-secondary" value="Adauga eveniment" @click="addEvent">
              <input type="checkbox" class="checkbox" style="margin-left: 10px; margin-top: 0;" v-model="realtime" @change="toggleRealtime"> <span>real-time</span>
            </div>
          </div>

          <hr style="margin-top: 50px; margin-bottom: 50px;">

          <div class="low-stock-category-events">
          <h4>Aceasta saptamana</h4>
            <div style="min-height: 300px;">
              <table class="table">
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Maxim participanti</th>
                </tr>
                <tr v-for="event of lowStockEvents">
                  <td><a :href="computeEventDetailsUrl(category, event)">{{event.name}}</a></td>
                  <td>{{event.date}}</td>
                  <td>{{event.price}}</td>
                </tr>
              </table>
            </div>
            <div style="margin-bottom: 100px;">
              <h4>Low stock threshold:</h4>
              <input id="input-desc" type="text" v-model="lowStockThreshold" class="form-control" @change="refreshLowStockCollection" style="width: 100px; float: left; margin-right: 10px;">
              <input type="button" class="btn primary-btn" value="Update" @click="refreshLowStockCollection" style="float: left;">
            </div>
          </div>
        </div>
      </div>
    `
  });
}

export default getPageComponent;
