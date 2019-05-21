function getPageComponent(pageOptions) {
  return Vue.extend({
    data: function () {
    },
    methods: {

    },
    template: `
      <div class="page-container">
        <div class="page-nav">
          <ul class="nav justify-content-end">
            <li class="nav-item">
              <a class="nav-link" href="#/despre-noi">Despre noi</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/">Evenimente</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/implica-te">Implica-te</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/echipa-noastra">Echipa noastra</a>
            </li>
          </ul>
        </div>

        <div class="page-content">
            <router-view></router-view>
        </div>
      </div>
    `
  });
}

export default getPageComponent;