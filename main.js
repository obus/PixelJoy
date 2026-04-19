const CELL_AMOUNT = 512;
const container = document.querySelector('.container');
const palette = document.getElementById('palette');
const colorPicker = document.getElementById('colorPicker');
const addColorBtn = document.getElementById('addColor');
const eraserBtn = document.getElementById('eraser');
const clearBtn = document.getElementById('clear');

let currentColor = '#ffffff';
let isEraserActive = false;
const eraserColor = '#1e1e38';


addColorBtn.addEventListener('click', () => {
  const hex = colorPicker.value;
  addSwatch(hex);
  selectColor(hex);
});


function addSwatch(hex) {
  const swatch = document.createElement('div');
  swatch.classList.add('swatch');
  swatch.style.backgroundColor = hex;
  swatch.dataset.color = hex;

  swatch.addEventListener('click', () => {
    selectColor(hex);
  });

  palette.appendChild(swatch);
}


function selectColor(hex) {
  currentColor = hex;
  isEraserActive = false;
  eraserBtn.classList.remove('active');

  document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
  const target = [...document.querySelectorAll('.swatch')].find(s => s.dataset.color === hex);
  if (target) target.classList.add('active');
}


eraserBtn.addEventListener('click', () => {
  isEraserActive = !isEraserActive;
  if (isEraserActive) {
    eraserBtn.classList.add('active');
    document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
  } else {
    eraserBtn.classList.remove('active');
  }
});


clearBtn.addEventListener('click', () => {
  document.querySelectorAll('.cell').forEach(cell => {
    cell.style.backgroundColor = '#1e1e38';
  });
});

palette.addEventListener('click', e => {
  const swatch = e.target.closest('.swatch');
  if (swatch) {
    selectColor(swatch.dataset.color);
  }
});


for (let i = 0; i < CELL_AMOUNT; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');

  cell.addEventListener('click', () => {
    cell.style.backgroundColor = isEraserActive ? eraserColor : currentColor;
  });

  cell.addEventListener('mousedown', e => {
    if (e.buttons === 1) {
      cell.style.backgroundColor = isEraserActive ? eraserColor : currentColor;
    }
  });

  cell.addEventListener('mouseenter', e => {
    if (e.buttons === 1) {
      cell.style.backgroundColor = isEraserActive ? eraserColor : currentColor;
    }
  });
 container.appendChild(cell);
}
