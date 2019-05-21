
function getPageComponent(pageOptions) {
  let socket = pageOptions.socket;

  return Vue.extend({
    data: function () {
      return {
        error: null,
        username: 'alice',
        password: 'password123'
      };
    },
    methods: {
      login: function () {
        var details = {
          username: this.username,
          password: this.password
        };
        socket.emit('login', details, (err, failure) => {
          if (err) {
            this.error = 'Failed to login due to error: ' + err;
          } else if (failure) {
            this.error = failure;
          } else {
            this.error = '';
          }
        });
      },
      inputKeyDown: function (event) {
        if (event.key === 'Enter') {
          this.login();
        }
      }
    },
    template: `
      <div class="page-container col-md-6 offset-md-3" style="margin-top: 10vw;">

        <div class="card text-center">
          <div class="card-header">
           <h2 class="content-row heading">Login</h2>
          </div>
          <div class="card-body ">

            <div class="content-body">
              <div v-if="error" class="input-area">
                <span class="error-container">{{error}}</span>
              </div>


              <div class="input-area">
                <div class="login-label">
                  Username:
                </div>
                <input type="text" v-model="username" class="form-control form-control-lg" @keydown="inputKeyDown">
              </div>
              <div class="input-area">
                <div class="login-label">
                  Password:
                </div>
                <input type="password" v-model="password" class="form-control form-control-lg" @keydown="inputKeyDown">
                <a onclick="alert('Remember it')" style="cursor: pointer;"><small id="emailHelp" class="form-text text-right text-muted" >Am uitat parola</small></a>
              </div>
              <div class="input-area col-6 offset-sm-3 text-center" style="padding-top: 10px;">
                <input type="button" class="form-control btn btn-primary" value="Logare" @click="login">
              </div>
            </div>

          </div>
          <div class="card-footer text-muted">
            VoluntApp: made by volunteers for volunteers 🚀
          </div>
        </div>



      </div>
    `
  });
}

export default getPageComponent;
