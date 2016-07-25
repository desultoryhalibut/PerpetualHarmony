module.exports = {
  login(email, pass, cb) {
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
    pretendRequest(email, pass, (res) => {
      console.log('Inside pretendRequest!');
      if (res.authenticated) {
        console.log('Res is authenticated!');
        localStorage.token = res.token;
        if (cb) { 
          console.log('There is a callback!');
          cb(true); 
        }
        this.onChange(true);
      } else {
        console.log('Nope, res not authenticated');
        if (cb) { cb(false); }
        this.onChange(false);
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

function pretendRequest(email, pass, cb) {
  setTimeout(() => {
    console.log('email: ' + email);
    console.log('pass: ' + pass);
    if (email === 'joe@example.com' && pass === 'password') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      });
    } else {
      cb({ authenticated: false });
    }
  }, 0);
}
