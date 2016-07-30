module.exports = {
  signup(username, pass, email, cb) {
    cb = arguments[arguments.length - 1];
    if (localStorage.token) {
      console.log('There is a token!');
      if (cb) {
        console.log('There is a callback!');
        cb(true);
      }
      this.onChange(true);
      return;
    }

    $.ajax({
      type:'POST',
      url: 'http://localhost:3000/users/signUp',
      data: JSON.stringify({
        username: username,
        password: pass,
        email: email
      }),
      contentType: 'application/json',
      success: (dbuser) => {
        console.log(dbuser);
        if (dbuser) {
          localStorage.token = dbuser;
          if (cb) {
            cb(true);
          }
          this.onChange(true);
        } else {
          if (cb) { cb(false); }
          this.onChange(false);
        }
      }
    });

  },

  login(username, pass, cb) {
    cb = arguments[arguments.length - 1];
    if (localStorage.token) {
      console.log('There is a token!');
      if (cb) {
        console.log('There is a callback!');
        cb(true);
      }
      this.onChange(true);
      return;
    }

    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/users/signIn',
      data: JSON.stringify({
        username: username,
        password: pass
      }),
      contentType: 'application/json',
      success: (dbuser) => {
        if (dbuser) {
          localStorage.token = dbuser;
          if (cb) {
            cb(true);
          }
          this.onChange(true);
        } else {
          if (cb) { cb(false); }
          this.onChange(false);
        }
      }
    });

  },

  getToken() {
    return localStorage.token;
  },

  logout(cb) {
    delete localStorage.token;
    if (cb) { cb(); }
    this.onChange(false);
  },

  loggedIn() {
    return !!localStorage.token;
  },

  onChange() {}
};
