export default class TextArea {
  constructor(className) {
    this.className = className;
    this.currentPosition = 0;
    this.init();
  }

  init() {
    this.output = document.createElement('textarea');
    this.output.classList.add(this.className);
    document.body.append(this.output);
    this.output.focus();

    this.setCaretPosition(this.output.value.length);

    this.output.addEventListener('click', () => {
      this.currentPosition = this.output.selectionStart;
    });
  }

  addCharacter(char) {
    this.output.focus();
    const start = this.output.value.substr(0, this.currentPosition);
    this.output.value = start + char + this.output.value.substr(this.currentPosition);
    this.setPosition(this.currentPosition + 1);
    this.setCaretPosition(this.currentPosition);
  }

  setPosition(pos) {
    if (pos < 0) {
      this.currentPosition = 0;
    } else if (pos > this.output.value.length) {
      this.currentPosition = this.output.value.length;
    } else {
      this.currentPosition = pos;
    }
  }

  setCaretPosition(caretPos) {
    this.output.focus();
    this.output.setSelectionRange(caretPos, caretPos);
  }

  deleteChar(pos) {
    this.output.focus();
    const del = this.output.value.substr(0, pos - 1);
    this.output.value = del + this.output.value.substr(pos);
    this.setPosition(this.currentPosition - 1);
    this.setCaretPosition(this.currentPosition);
  }
}
