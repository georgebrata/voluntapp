import SCModel from '/node_modules/sc-model/sc-model.js';

function getPageComponent(pageOptions) {
  return Vue.extend({
    props: {
      categoryId: String,
      eventId: String
    },
    data: function () {
      this.eventModel = new SCModel({
        socket: pageOptions.socket,
        type: 'Event',
        id: this.eventId,
        fields: ['name', 'date', 'maxAttendees', 'desc']
      });

      return {
        // A event object which will be updated in real-time by our model.
        event: this.eventModel.value
      };
    },
    beforeRouteLeave: function (to, from, next) {
      this.eventModel.destroy();
      next();
    },
    methods: {
      computeCategoryDetailsUrl: function (categoryId) {
        return `#/category/${categoryId}`;
      },
      saveValue: function () {
        this.eventModel.save();
        window.location = "/#/events";
      }
    },
    template: `
      <div class="page-container">
        <div class="nav-breadcrumbs"> 
          <a :href="computeCategoryDetailsUrl(categoryId)" style="position: fixed; top: 20px; left: 20px;"><< Inapoi la categoria parinte</a>
        </div>
        <h1 class="content-heading">#<span>{{event.id}}</span>&nbsp;-&nbsp;<span>{{event.name}}</span></h1>
        <div class="content-body">
        <div class="input-area">
          <label for="input-name">Name:</label>
          <div>
            <input id="input-name" type="text" class="form-control" v-model="event.name">
          </div>
        </div>
          <div class="input-area">
            <label for="input-qty">Data:</label>
            <div>
              <input id="input-qty" type="text" class="form-control" v-model="event.date">
            </div>
          </div>
          <div class="input-area">
            <label for="input-price">Maxim participanti:</label>
            <div>
              <input id="input-price" type="text" class="form-control" v-model="event.maxAttendees">
            </div>
          </div>
          <div class="input-area">
            <label for="input-desc">Descrierea evenimentului:</label>
            <div>
              <textarea id="input-desc" type="text" class="form-control" v-model="event.desc"></textarea>
            </div>
          </div>
          <div style="width:100%; text-align: center;">
            <button type="button" class="btn btn-primary" @click="saveValue">Salveaza modificarile</button>
          </div>
        </div>
      </div>
    `
  });
}

export default getPageComponent;
