const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

let vantaEffect; // active Vanta instance

// Light theme → TRIANGLES
const lightTriangles = {
  el: "#bg",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  scale: 1.0,
  scaleMobile: 1.0,

  // your provided gradient
  colors: [
    { color: '#005F73', enabled: true },
    { color: '#0A9396', enabled: true },
    { color: '#94D2BD', enabled: true },
    { color: '#E9D8A6', enabled: true },
    { color: '#EE9B00', enabled: false },
  ],
  speed: 3,
  horizontalPressure: 5,
  verticalPressure: 7,
  waveFrequencyX: 2,
  waveFrequencyY: 2,
  waveAmplitude: 8,
  shadows: 6,
  highlights: 8,
  colorBrightness: 1,
  colorSaturation: 7,
  wireframe: false,
  colorBlending: 10,
  backgroundColor: '#004E64',
  backgroundAlpha: 1,
  grainScale: 3,
  grainSparsity: 0,
  grainIntensity: 0.3,
  grainSpeed: 1,
  resolution: 0.7,
  yOffset: 0,
};

// Dark theme → WAVES
const darkWaves = {
  el: "#bg",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  scale: 1.0,
  scaleMobile: 1.0,

  color: 0x0a9396,
  shininess: 50,
  waveHeight: 25,
  waveSpeed: 2,
  zoom: 1,
  backgroundColor: "#001219"
};

// Function to start a new Vanta background
function startVanta(effect, config) {
  if (vantaEffect) vantaEffect.destroy(); // clear previous background
  vantaEffect = effect(config);
}

// Load theme from localStorage
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  toggleBtn.textContent = "☀️";
  startVanta(VANTA.WAVES, darkWaves);
} else {
  toggleBtn.textContent = "🌙";
  startVanta(VANTA.TRIANGLES, lightTriangles);
}

// Toggle theme & background
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    toggleBtn.textContent = "☀️";
    localStorage.setItem("theme", "dark");
    startVanta(VANTA.WAVES, darkWaves);
  } else {
    toggleBtn.textContent = "🌙";
    localStorage.setItem("theme", "light");
    startVanta(VANTA.TRIANGLES, lightTriangles);
  }
});
