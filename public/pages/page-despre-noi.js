
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
        <h1>Despre noi</h1>
      </div>
    `
  });
}

export default getDespreNoiPage;
