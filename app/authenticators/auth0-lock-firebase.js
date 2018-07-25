import Authenticator from 'ember-simple-auth-auth0/authenticators/auth0-lock';
import { inject as service } from '@ember/service';


export default Authenticator.extend({
  store: service(),
  session: service(),

  authenticate(options) {
    return this.get('auth0').showLock(options).then((sessionData) => {
      this.set('session.user', this._findOrCreateUser(sessionData.profile))
    });
  },

  restore(data) {
    this.set('session.user', this._findOrCreateUser(data.profile))

    const expiresAt = getSessionExpiration(data || {});
    if(expiresAt > now()) {
      return RSVP.resolve(data);
    } else {
      return RSVP.reject();
    }
  },

  _findOrCreateUser({email, picture: photoUrl, name}) {
    return this.get('store').query('user', { email })
      .then((users) =>
        users.get('firstObject') || this._createUser(photoUrl, name, email)
      );
  },

  _createUser(photoUrl, name, email) {
    let user = this.get('store').createRecord('user', {photoUrl, name, email});
    return user.save();
  }
})
