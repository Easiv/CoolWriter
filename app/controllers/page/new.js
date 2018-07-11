import Controller from '@ember/controller';
import Mark from 'mark.js';

export default Controller.extend({

  lighted: false,
  switchLight() {
    this.toggleProperty('lighted');
  },

  actions: {
    clearText() {
      let textArea = document.querySelector('#textArea');
      textArea.value = '';
    },
    changeFont() {
      let textArea = document.querySelector('#textArea');
      let fontVar = document.querySelector('#fontFamily').value;
      let fontSize = document.querySelector('#fontSize').value;
      textArea.style.fontFamily = fontVar;
      textArea.style.fontSize = `${fontSize}px`;
    },
    highlight() {
      let input = document.querySelector('#highlightInput').value;
      let context = document.querySelector('#textArea');
      let instance = new Mark(context);

      if (this.get('lighted')) {
        instance.unmark();
        this.switchLight();
      } else {
        instance.mark(input);
        this.switchLight();
      }
    }
  }
});
