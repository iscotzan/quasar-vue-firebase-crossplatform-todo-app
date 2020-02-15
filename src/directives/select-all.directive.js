export const selectAll = {
  inserted(el) {
    // console.log("TCL: inserted -> el", el);
    let input = el.querySelector(".q-field__native");
    // console.log("TCL: inserted -> input", input);
    input.addEventListener("focus", () => {
      //   console.log("TCL: inserted -> input", input.value);
      if (input.value.length) {
        input.select();
      }
    });
  }
};
