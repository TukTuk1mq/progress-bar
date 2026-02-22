import { Progress } from "./progress-bar.js";

const progress = new Progress(document.getElementById("progressContainer"));

const valueInput = document.getElementById("valueInput");
const animateToggle = document.getElementById("animateToggle");
const hideToggle = document.getElementById("hideToggle");

valueInput.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "");

  if (value === "") return;

  value = Math.min(100, Number(value));

  e.target.value = value;
  progress.setValue(Number(value));
});

animateToggle.addEventListener("change", (e) => {
  progress.setAnimated(e.target.checked);
});

hideToggle.addEventListener("change", (e) => {
  progress.setHidden(e.target.checked);
});
