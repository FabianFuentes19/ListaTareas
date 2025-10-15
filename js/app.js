const btnAgregar = document.querySelector('.btnAgregar');
const inputTarea = document.querySelector('#tareaEntrada');
const listaTareas = document.querySelector('#tareaLista');

// Cargar tareas guardadas
const tareasGuardadas = localStorage.getItem('tareas');
if (tareasGuardadas && tareasGuardadas !== "") {
    const tareas = tareasGuardadas.split('||');
    tareas.forEach(tareaStr => {
        if (tareaStr.trim() === '') return;
        const sep = tareaStr.lastIndexOf('|');
        const texto = tareaStr.substring(0, sep);
        const completada = tareaStr.substring(sep + 1) === '1';
        agregarTarea(texto, completada);
    });
}

btnAgregar.addEventListener('click', (e) => {
    e.preventDefault();
    const textoTarea = inputTarea.value.trim();
    if (textoTarea !== '') {
        agregarTarea(textoTarea, false);
        guardarTareas();
        inputTarea.value = '';
    }
});

function agregarTarea(texto, completada) {
    const li = document.createElement('li');
    li.classList.add('tarea-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completada;
    checkbox.classList.add('tarea-checkbox');

    const span = document.createElement('span');
    span.textContent = texto;
    span.classList.add('tarea-texto');

    if (completada) {
        li.classList.add('completada');
    }

    checkbox.addEventListener('change', () => {
        li.classList.toggle('completada');
        guardarTareas();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    listaTareas.appendChild(li);
}

function guardarTareas() {
    const tareas = [];
    listaTareas.querySelectorAll('li').forEach(li => {
        const texto = li.querySelector('.tarea-texto').textContent;
        const completada = li.querySelector('.tarea-checkbox').checked ? '1' : '0';
        tareas.push(texto + '|' + completada);
    });
    localStorage.setItem('tareas', tareas.join('||'));
}