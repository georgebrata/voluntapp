function getPageComponent(pageOptions) {
  return Vue.extend({
    data: function () {
    },
    methods: {

    },
    template: `
      <div class="page-container">

        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <a class="navbar-brand" href="#">VoluntApp 🚀</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse pull-right" id="navbarsExampleDefault">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a class="nav-link" href="#/despre-noi">Despre noi</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#/events">Evenimente</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#/implica-te">Implica-te</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#/echipa-noastra">Echipa noastra</a>
              </li>
              <li class="nav-item dropdown" style="margin-left: 30px;">
                <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Contul meu</a>
                <div class="dropdown-menu" aria-labelledby="dropdown01">
                  <a class="dropdown-item" href="#">Profil</a>
                  <a class="dropdown-item" href="#">Logout</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>


        <div class="page-content">
            <router-view></router-view>
        </div>
      </div>
    `
  });
}

export default getPageComponent;