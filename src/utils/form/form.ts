export function onSubmitForm() {
  arguments[0].preventDefault();
  const form: HTMLFormElement = this.element?.querySelector("form");
  const fields = Array.from(form).filter(
    (el) => el.nodeName === "INPUT"
  ) as HTMLInputElement[];
  console.log(fields.reduce((a, v) => ({ ...a, [v.name]: v.value }), {}));
}

export function checkInputValue() {
  const element = arguments[0];
  const event = arguments[1];
  // console.log(element.validity)
  // const value = element.value;
  // console.log(value.toString().match(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/))
  if (event.type === "input") {
    if (!element.validity.valid) {
      this.setProps({
        isValid: false,
      });
      element.focus();
    } else {
      this.setProps({
        isValid: true,
      });
    }
    if (event.type === "input") {
      element.focus();
    }
  }
}
