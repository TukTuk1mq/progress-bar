export class Progress {
  constructor(container, options = {}) {
    this.size = options.size || 160;
    this.stroke = options.stroke || 14;
    this.color = options.color || "#6C5CE7";

    this.radius = (this.size - this.stroke) / 2;
    this.circumference = 2 * Math.PI * this.radius;

    this.value = 0;
    this.spinFrame = null;

    this.container = container;
    this.render();
    this.setValue(0);
  }

  render() {
    this.container.innerHTML = `
      <div class="progress">
        <svg width="${this.size}" height="${this.size}">
          <circle
            cx="${this.size / 2}"
            cy="${this.size / 2}"
            r="${this.radius}"
            stroke="#eee"
            stroke-width="${this.stroke}"
            fill="none"
          />
          <circle
            class="progress__circle"
            cx="${this.size / 2}"
            cy="${this.size / 2}"
            r="${this.radius}"
            stroke="${this.color}"
            stroke-width="${this.stroke}"
            fill="none"
            stroke-linecap="butt"
          />
        </svg>
      </div>
    `;

    this.circle = this.container.querySelector(".progress__circle");
  }

  setValue(value) {
    value = Math.max(0, Math.min(100, value));
    this.value = value;

    const arc = this.circumference * (value / 100);
    const gap = this.circumference - arc;

    this.circle.style.strokeDasharray = `${arc} ${gap}`;
    this.circle.style.strokeDashoffset = "0";
  }

  startSpin() {
    if (this.spinFrame) return;

    let offset = 0;

    const animate = () => {
      offset -= 2;
      this.circle.style.strokeDashoffset = offset;
      this.spinFrame = requestAnimationFrame(animate);
    };

    animate();
  }

  stopSpin() {
    cancelAnimationFrame(this.spinFrame);
    this.spinFrame = null;
    this.circle.style.strokeDashoffset = "0";
  }

  setAnimated(state) {
    if (state) {
      this.startSpin();
    } else {
      this.stopSpin();
    }
  }

  setHidden(state) {
    const progressElement = this.container.querySelector(".progress");

    if (state) {
      progressElement.style.visibility = "hidden";
    } else {
      progressElement.style.visibility = "visible";
    }
  }
}
