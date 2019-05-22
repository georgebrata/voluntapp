
function getDespreNoiPage(pageOptions) {
  return Vue.extend({
    props: {
    },
    data: function () {
      return {};
    },
    methods: {
      computeCategoryDetailsUrl: function (categoryId) {
        return `#/category/${categoryId}`;
      },
      saveValue: function () {
        this.eventModel.save();
      }
    },
    template: `
      <div class="page-container">
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-4">Despre noi</h1>
            <p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.</p>
          </div>
        </div>

        

        

      </div>
    `
  });
}

export default getDespreNoiPage;
