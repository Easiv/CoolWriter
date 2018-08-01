import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),
  routing: service('-routing'),

  actions: {
    createBook() {

      let newBook = this.store.createRecord('book', {
        title: this.get('title'),
        author: this.get('author'),
        cover: this.get('cover'),
        description: this.get('description'),
        user_email: this.get('session.user.email')

      });
      newBook.save().then(() => {
        this.get('routing').transitionTo('books.index', []);
      });
    }
  }
});
