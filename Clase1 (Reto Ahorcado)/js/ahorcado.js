let diccionario = [
  'perro',
  'fruta',
  'agua',
  'servidor',
  'gato'
]

let contErrores = 0
let aleatoria = ""
let palabraEnArray = []
let palabraCompletar = ""
let letra = document.getElementById('letra');
let palabra = document.getElementById('palabraAleatoria')
let imagenAhorcado = document.getElementById('imagen')
let contenedor = document.getElementById('contenedor')
let intentos = document.getElementById('intentos')
let jugarDeNuevo = document.getElementById('jugarDeNuevo')

const palabraAleatoria = () => {
  contenedor.style.display = 'inline'
  let numero = Math.floor(Math.random() * 4);
  aleatoria = diccionario[numero]
  palabraEnArray = aleatoria.split('')
  palabraCompletar = palabraEnArray.map(letra => '_')
  //palabraCompletar = palabraCompletar.join();
  console.log(palabraCompletar)
  intentos.innerHTML = `te quedan 6 intentos`
  palabra.innerHTML = formatoPalabra(palabraCompletar.join())
}

const palabraGuardada = () => {
  contenedor.style.display = 'inline'
  jugarDeNuevo.style.display = 'none'
  palabraEnArray = aleatoria.split('')
  palabraCompletar = palabraEnArray.map(letra => '_')
  //palabraCompletar = palabraCompletar.join();
  console.log(palabraCompletar)
  intentos.innerHTML = `te quedan 6 intentos`
  palabra.innerHTML = formatoPalabra(palabraCompletar.join())
}


// const habilitarBoton = () => {  
//   console.log(letra.value)
//   if ( letra.value === "") {
//     document.getElementById('intento').style.display = 'none'
//   } else {
//     document.getElementById('intento').style.display = 'inline'
//   }
// }

const buscarLetra = () => {
  let letraMinuscula = letra.value.toLowerCase()
  //let idx = aleatoria.indexOf(letraMinuscula)
  let aciertos = 0
  let guiones = 0
  for (let index = 0; index < palabraEnArray.length; index++) {
    if (palabraEnArray[index] === letraMinuscula) {
      palabraCompletar[index] = letraMinuscula
      aciertos++
    }
    if (palabraCompletar[index] === '_') {
      guiones = guiones + 1;
    }
  }

  if (aciertos === 0) {
    contErrores++
  }

  if (contErrores > 0) {
    intentos.innerHTML = `te quedan ${6 - contErrores} intentos`
    imagenAhorcado.src = `../images/error${contErrores}.png`
    imagenAhorcado.style.display = 'inline'
  }

  palabra.innerHTML = formatoPalabra(palabraCompletar.join())
  console.log(letra.value)
  letra.value = ""
  console.log(guiones)
  console.log(aciertos)
  if (guiones === 0) {
    alert('Ganaste!! Si quieres jugar otra vez selecciona otra palabra');
    //palabraAleatoria()
    contErrores = 0
    contenedor.style.display = 'none'
    imagenAhorcado.style.display = 'none'
  }
  if (contErrores >= 6) {
    alert('Perdiste!!, Si quieres jugar otra vez selleciona otra palabra');
    //palabraAleatoria()
    contErrores = 0
    jugarDeNuevo.style.display = 'inline'
    contenedor.style.display = 'none'
    imagenAhorcado.style.display = 'none'
  }
}

const formatoPalabra = (palabra) => {
  let _palabra = palabra
  let idx = 0
  while (idx !== -1) {
    idx = _palabra.indexOf(',')
    _palabra = _palabra.replace(",", " ")
  }
  return _palabra
}
