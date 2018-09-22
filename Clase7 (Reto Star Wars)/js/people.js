let datosTabla = []
let filmsData = []
let speciesData = []
let vehiclesData = []
let starshipsData = []
let tabla = document.getElementById('tablaDatos')
let tablaFilms = document.getElementById('tablaFilms')
let tablaSpecies = document.getElementById('tablaSpecies')
let tablaVehicles = document.getElementById('tablaVehicles')
let tablaStarships = document.getElementById('tablaStarships')
let titulo = document.getElementById('titulo')

function cargarDatos(url) {
  return new Promise(function (resolve, reject) {  
    let req = new XMLHttpRequest() 
    req.onload = function () {
      //console.log(this.responseText);
      resolve(JSON.parse(this.responseText));
    }
    req.onerror = function () {
      reject(Error('Error 🤮'));
    }
    req.open('GET', url, true);
    req.send();
  })
}

// const cargarDatosTablaHtml = (array, tabla) => {
//   let arrayPromesas = array.map(element => cargarDatos(element))
//   Promise.all(arrayPromesas)
//     .then(data => {
//       switch (tabla) {
//         case 'films':
//           console.log('entre a films')
//           borrarFilas(tablaFilms)
//           cargarDatosTablaFilms(data);
//           tabla.style.display = "none"
//           tablaFilms.style.display = "inline"
//           tablaSpecies.display = "none"
//           tablaVehicles.display = "none"
//           tablaStarships.display = "none"
//           console.log(filmsData)
//           break;
//         case 'species':
//           borrarFilas(tablaSpecies)
//           cargarDatosTablaSpecies(data);
//           tabla.style.display = "none"
//           tablaFilms.style.display = "none"
//           tablaSpecies.style.display = "inline"
//           tablaVehicles.style.display = "none"
//           tablaStarships.style.display = "none"
//           console.log(speciesData)
//           break;
//         case 'vehicles':
//           borrarFilas(tablaVehicles)
//           cargarDatosTablaVehicles(vehiclesData);
//           tabla.style.display = "none"
//           tablaFilms.style.display = "none"
//           tablaSpecies.style.display = "none"
//           tablaVehicles.style.display = "inline"
//           tablaStarships.style.display = "none"
//           console.log(vehiclesData)
//           break;
//         case 'starships':
//           borrarFilas(tablaStarships)
//           cargarDatosTablaStarships(starshipsData);
//           tabla.style.display = "none"
//           tablaFilms.style.display = "none"
//           tablaSpecies.style.display = "none"
//           tablaVehicles.style.display = "none"
//           tablaStarships.style.display = "inline"
//           console.log(starshipsData)
//           break;
//         default:
//           break;
//       }

//     })
// }

async function cargarDatosTablaHtml(array, tablaOpcion) {
  let arrayPromesas = array.map(element => cargarDatos(element))
  let data = await Promise.all(arrayPromesas)
  switch (tablaOpcion) {
    case 'films':
      console.log('entre a films')
      borrarFilas(tablaFilms)
      cargarDatosTablaFilms(data);
      tabla.style.display = "none"
      tablaFilms.style.display = "inline"
      tablaSpecies.style.display = "none"
      tablaVehicles.style.display = "none"
      tablaStarships.style.display = "none"
      console.log(data)
      break;
    case 'species':
      borrarFilas(tablaSpecies)
      cargarDatosTablaSpecies(data);
      tabla.style.display = "none"
      tablaFilms.style.display = "none"
      tablaSpecies.style.display = "inline"
      tablaVehicles.style.display = "none"
      tablaStarships.style.display = "none"
      console.log(data)
      break;
    case 'vehicles':
      borrarFilas(tablaVehicles)
      cargarDatosTablaVehicles(data);
      tabla.style.display = "none"
      tablaFilms.style.display = "none"
      tablaSpecies.style.display = "none"
      tablaVehicles.style.display = "inline"
      tablaStarships.style.display = "none"
      //console.log('estoy en async')
      console.log('estoy en async',data)
      break;
    case 'starships':
      borrarFilas(tablaStarships)
      cargarDatosTablaStarships(data);
      tabla.style.display = "none"
      tablaFilms.style.display = "none"
      tablaSpecies.style.display = "none"
      tablaVehicles.style.display = "none"
      tablaStarships.style.display = "inline"
      console.log(data)
      break;
    default:
      break;
  } 
}

const films = (array, name) => {
  titulo.innerHTML = name + ": Films"
  console.log(array)
  cargarDatosTablaHtml(array, 'films') 
}

const species = (array, name) => {
  titulo.innerHTML = name + ": Species"
  console.log(array)
  cargarDatosTablaHtml(array, "species")
  
}

const vehicles = (array, name) => {
  titulo.innerHTML = name + ": Vehicles"
  console.log('estoy en vehicles', array)
  cargarDatosTablaHtml(array, 'vehicles')
}

const starships = (array, name) => {
  titulo.innerHTML = name + ": Starships"
  console.log(array)
  cargarDatosTablaHtml(array, 'starships')  
}


const detallePlaneta = (planeta) => {
  console.log(planeta)
}

const detalle = (detalle) => {
  console.log(detalle)
}

function cargarDatosTabla(data) {
  console.log(data)
  data.forEach((item, index) => {
    item.urlImage = 'https://cdn3.iconfinder.com/data/icons/halloween-avatar-01/348/halloween_avatar-20-512.png'
    let row = tabla.insertRow(index + 1);
    let cont = 0
    for (const key in item) {
      // if (index === 0) {
      //   console.log(key)
      // }
      if (item.hasOwnProperty(key)) {
        let cell = row.insertCell(cont)
        switch (key) {
          case 'films':
            addButtonToCells(item, key, cell, films);
            break;
          case 'species':
            addButtonToCells(item, key, cell, species);
            break;
          case 'vehicles':
            addButtonToCells(item, key, cell, vehicles);
            break;
          case 'starships':
            addButtonToCells(item, key, cell, starships);
            break;

          case 'homeworld':          
            let buttonUrl = document.createElement("a");
            buttonUrl.role="button"
            buttonUrl.className = "btn btn-outline-warning";
            buttonUrl.href = item[key];
            // buttonUrl.onclick = function () {
            //   let url = item[key];
            //   detalle(url);
            // };
            let contenidoUrl = document.createTextNode('homeworld');
            buttonUrl.appendChild(contenidoUrl);
            cell.appendChild(buttonUrl);     
            break;

          case 'url':
            crearBotonHref(item, key, cell);
            break;

          case 'created':

            break;

          case 'edited':

            break;

          case 'urlImage':
            let imageUrl = document.createElement("img");
            imageUrl.src = item[key]
            imageUrl.style.width = '35px'
            imageUrl.style.height = '35px'
            cell.appendChild(imageUrl);
            break;
          default:
            cell.innerHTML = item[key];
            break;
        }
      }
      cont++
    }
  })
}

function cargarDatosTablaFilms(data) {
  console.log(data)
  data.forEach((item, index) => {
    let row = tablaFilms.insertRow(index + 1);
    let cont = 0
    for (const key in item) {
      // if (index === 0) {
      //   console.log(key)
      // }
      if (item.hasOwnProperty(key)) {
        let cell = row.insertCell(cont)
        switch (key) {
          case 'films':
            addButtonToCells(item, key, cell, films);
            break;
          case 'species':
            addButtonToCells(item, key, cell, species);
            break;
          case 'vehicles':
            addButtonToCells(item, key, cell, vehicles);
            break;
          case 'starships':
            addButtonToCells(item, key, cell, starships);
            break;

          case 'planets':
            addButtonToCells(item, key, cell, detallePlaneta);
            break;

          case 'characters':
            addButtonToCells(item, key, cell, detallePlaneta);
            break;

          case 'url':
            crearBotonHref(item, key, cell);
            break;

          case 'created':

            break;

          case 'edited':

            break;

          case 'opening_crawl':
            cell.innerHTML = 'Ver Detalle'
            break;

          // case 'urlImage':
          //   let imageUrl = document.createElement("img");  
          //   imageUrl.src = item[key]
          //   imageUrl.style.width = '35px'
          //   imageUrl.style.height = '35px'        
          //   cell.appendChild(imageUrl);
          // break;
          default:
            cell.innerHTML = item[key];
            break;
        }
      }
      cont++
    }
  })
}

function cargarDatosTablaSpecies(data) {
  console.log(data)
  data.forEach((item, index) => {
    let row = tablaSpecies.insertRow(index + 1);
    let cont = 0
    for (const key in item) {
      // if (index === 0) {
      //   console.log(key)
      // }
      if (item.hasOwnProperty(key)) {
        let cell = row.insertCell(cont)
        switch (key) {
          case 'films':
            addButtonToCells(item, key, cell, films);
            break;
          case 'people':
            addButtonToCells(item, key, cell, detallePlaneta);
            break;

          case 'url':
            crearBotonHref(item, key, cell);
            break;

          case 'created':

            break;

          case 'edited':

            break;

          case 'homeworld':
            cell.innerHTML = 'Ver Detalle'
            break;

          // case 'urlImage':
          //   let imageUrl = document.createElement("img");  
          //   imageUrl.src = item[key]
          //   imageUrl.style.width = '35px'
          //   imageUrl.style.height = '35px'        
          //   cell.appendChild(imageUrl);
          // break;
          default:
            cell.innerHTML = item[key];
            break;
        }
      }
      cont++
    }
  })
}

function cargarDatosTablaVehicles(data) {
  console.log(data)
  data.forEach((item, index) => {
    let row = tablaVehicles.insertRow(index + 1);
    let cont = 0
    for (const key in item) {
      if (index === 0) {
        //console.log(key)
        console.log(item)
      }
      if (item.hasOwnProperty(key)) {
        let cell = row.insertCell(cont)
        switch (key) {
          case 'films':
            addButtonToCells(item, key, cell, films);
            break;
          case 'pilots':
            addButtonToCells(item, key, cell, detallePlaneta);
            break;

          case 'url':
            crearBotonHref(item, key, cell);
            break;

          case 'created':

            break;

          case 'edited':

            break;

          // case 'urlImage':
          //   let imageUrl = document.createElement("img");  
          //   imageUrl.src = item[key]
          //   imageUrl.style.width = '35px'
          //   imageUrl.style.height = '35px'        
          //   cell.appendChild(imageUrl);
          // break;
          default:
            cell.innerHTML = item[key];
            break;
        }
      }
      cont++
    }
  })
}

function cargarDatosTablaStarships(data) {
  console.log(data)
  data.forEach((item, index) => {
    let row = tablaStarships.insertRow(index + 1);
    let cont = 0
    for (const key in item) {
      // if (index === 0) {
      //   console.log(key)
      // }
      if (item.hasOwnProperty(key)) {
        let cell = row.insertCell(cont)
        switch (key) {
          case 'films':
            addButtonToCells(item, key, cell, films);
            break;
          case 'pilots':
            addButtonToCells(item, key, cell, detallePlaneta);
            break;

          case 'url':
            crearBotonHref(item, key, cell);
            break;

          case 'created':

            break;

          case 'edited':

            break;

          // case 'urlImage':
          //   let imageUrl = document.createElement("img");  
          //   imageUrl.src = item[key]
          //   imageUrl.style.width = '35px'
          //   imageUrl.style.height = '35px'        
          //   cell.appendChild(imageUrl);
          // break;
          default:
            cell.innerHTML = item[key];
            break;
        }
      }
      cont++
    }
  })
}

function crearBotonHref(item, key, cell) {
  let buttonUrl = document.createElement("a");
  buttonUrl.role="button"
  buttonUrl.className = "btn btn-outline-warning";
  buttonUrl.href = item[key];
  // buttonUrl.onclick = function () {
  //   let url = item[key];
  //   detalle(url);
  // };
  let contenidoUrl = document.createTextNode('detalle');
  buttonUrl.appendChild(contenidoUrl);
  cell.appendChild(buttonUrl);
}

function addButtonToCells(item, key, cell, funcion) {
  let button = document.createElement("button");
  button.className = "btn btn-warning"
  button.onclick = function () {
    let array = item[key];
    funcion(array, item.name);
  };
  let contenido = document.createTextNode(key);
  button.appendChild(contenido);
  cell.appendChild(button);
}

function borrarFilas(tablaParametros) {
  for (let i = 0; i <= tablaParametros.rows.length + 1; i++) {
    tablaParametros.deleteRow(1);
    //console.log('index: '+ i)  
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  console.log("pagina Cargada🤠");
  borrarFilas(tabla)
  cargarDatos('https://swapi.co/api/people/')
    .then(datos => {
      console.log(datos)
      cargarDatosTabla(datos.results)
    })
    .catch(err => {
      console.log(err)
    })
});
