
function getEchipaPage(pageOptions) {
  return Vue.extend({
    props: {
    },
    data: function () {
      return {
          membri: [
              {
                  nume: "Mihai",
                  imgUrl: "https://joeschmoe.io/api/v1/male/11",
                  description: "Mihai este un baiat sclipitor si suntem mandri sa-l avem in echipa noastra.",
                  role: "Admin"
              },
              {
                  nume: "Andrei",
                  imgUrl: "https://joeschmoe.io/api/v1/male/12",
                  description: "Andrei este un baiat sclipitor si suntem mandri sa-l avem in echipa noastra.",
                  role: "Membru"
              },
              {
                  nume: "Ana",
                  imgUrl: "https://joeschmoe.io/api/v1/female/111",
                  description: "Ana este membra fondatoare.",
                  role: "Membru fondator"
              },
          ]
      };
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
        <main role="main" class="mx-auto">

      <section class="jumbotron mx-auto">
        <div class="container">
          <h1 class="jumbotron-heading">Echipa noastra</h1>
          <p class="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
          <p>
            <a href="#" class="btn btn-primary my-2">Alatura-te organizatiei noastre 👇</a>
          </p>
        </div>
      </section>

      <div class="album py-5 bg-light">
        <div class="container">

          <div class="row">
            <div class="col-md-4" v-for="m in membri">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top" :src=m.imgUrl alt="Card image cap">
                <div class="card-body">
                  <h4>{{m.nume}}</h4>
                  <p class="card-text">{{m.description}}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">Contacteaza</button>
                    </div>
                    <small class="text-muted">{{m.role}}</small>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </main>
      </div>
    `
  });
}

export default getEchipaPage;
