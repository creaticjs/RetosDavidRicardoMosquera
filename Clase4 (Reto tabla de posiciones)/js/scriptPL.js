class Liga{
  constructor(nombre,datos){
    this.nombre = nombre
    this.datosTemporadaEquipos = this.llenarArray(datos)
  }
  llenarArray(datos){
    let array = []
    datos.forEach(team => {
      array.push(new DatosTemporadaEquipo(
        team.position,
        team.club,
        team.played,
        team.won,
        team.drawn,
        team.lost,
        team.gf,
        team.ga,
        team.gd,
        team.points
      ))
    });
    return array
  }
}

class DatosTemporadaEquipo{
  constructor(position,club,played,won,drawn,lost,gf,ga,gd,points){
    this.position = position
    this.club = club
    this.played = played
    this.won = won
    this.drawn = drawn
    this.lost = lost
    this.gf = gf
    this.ga = ga
    this.gd = gd
    this.points = points
  }
}

const dataPremierLeague = [
  {
    position: 1,
    club: 'Liverpool',
    played: 4,
    won: 4,
    drawn: 0,
    lost: 0,
    gf: 9,
    ga: 1,
    gd: 8,
    points: 12
  },
  {
    position: 2,
    club: 'Chelsea',
    played: 4,
    won: 4,
    drawn: 0,
    lost: 0,
    gf: 10,
    ga: 3,
    gd: 7,
    points: 12,
  },
  {
    position: 3,
    club: 'Tottenham Hotspur',
    played: 3,
    won: 3,
    drawn: 0,
    lost: 0,
    gf: 8,
    ga: 2,
    gd: 6,
    points: 9,
  },
  {
    position: 4,
    club: 'Watford',
    played: 3,
    won: 3,
    drawn: 0,
    lost: 0,
    gf: 7,
    ga: 2,
    gd: 5,
    points: 9,
  },
]
const dataChampionship = [
  {
    position: 1,
    club: 'Leeds Utd',
    played: 6,
    won: 4,
    drawn: 2,
    lost: 0,
    gf: 14,
    ga: 4,
    gd: 10,
    points: 14
  },
  {
    position: 2,
    club: 'Middlesbrough',
    played: 6,
    won: 4,
    drawn: 2,
    lost: 0,
    gf: 9,
    ga: 2,
    gd: 7,
    points: 14
  },
  {
    position: 3,
    club: 'Sheffield Utd',
    played: 6,
    won: 4,
    drawn: 0,
    lost: 2,
    gf: 12,
    ga: 8,
    gd: 4,
    points: 12
  },
  {
    position: 4,
    club: 'Derby',
    played: 6,
    won: 4,
    drawn: 0,
    lost: 2,
    gf: 10,
    ga: 8,
    gd: 2,
    points: 12
  },
]

const premier = new Liga('Barclays Premier League', dataPremierLeague);
const championship = new Liga('English Football League Championship', dataChampionship)

console.log(premier)
console.log(championship)

let banderas = {
  position : false,
  gf: false,
  ga: false,
  gd: false
}

let tablaClasificacion = document.getElementById('tablaClasificacion')
let titulo = document.getElementById('titulo')

const tablaPremierInicio = () => {
  titulo.innerHTML = premier.nombre
  cargarDatos(premier.datosTemporadaEquipos);
  console.log(tablaClasificacion.rows.length)
  //console.log(premier)
}

const tablaPremier = () => {
  titulo.innerHTML = premier.nombre
  borrarFilas();
  cargarDatos(premier.datosTemporadaEquipos);
  console.log(tablaClasificacion.rows.length)
}

const tablaChampionship = () => {
  titulo.innerHTML = championship.nombre
  borrarFilas();
  cargarDatos(championship.datosTemporadaEquipos);
}

function cargarDatos(data) {
  data.forEach((team, index) => {
    let row = tablaClasificacion.insertRow(index + 1);
    let cont = 0
    for (const key in team) {
      if (team.hasOwnProperty(key)) {
        let cell = row.insertCell(cont)
        cell.innerHTML = team[key];
      }
      cont++
    }
  })
}

function borrarFilas() {
  for (let i = 0; i <= tablaClasificacion.rows.length + 1; i++) {
    tablaClasificacion.deleteRow(1);
    //console.log('index: '+ i)  
  }
}

const ordenar = (option) => {
  //console.log(opcion)
  //console.log(titulo.innerHTML)
  let referenciaDatos = []
  if (titulo.innerHTML === 'Barclays Premier League') {
    referenciaDatos = premier.datosTemporadaEquipos
  }
  if (titulo.innerHTML === 'English Football League Championship') {
    referenciaDatos = championship.datosTemporadaEquipos
  }  
  switch (option) {
    case 'position':     
        ordenarPorOpcionNumerica(referenciaDatos,'position');
      break;
    case 'gf':        
        ordenarPorOpcionNumerica(referenciaDatos,'gf')
      break;  
    case 'ga':        
      ordenarPorOpcionNumerica(referenciaDatos,'ga')
    break;  
    case 'gd':        
      ordenarPorOpcionNumerica(referenciaDatos,'gd')
    break;
  
    default:
      break;
  }
}

const ordenarPorOpcionNumerica = (datos,atributo) => {
  if (banderas[atributo] === false) {
    datos.sort(function(a, b){return b[atributo]-a[atributo]})
    banderas[atributo] = true
  } else {
    datos.sort(function(a, b){return a[atributo]-b[atributo]})
    banderas[atributo] = false
  }
  //datos.sort((a, b) => {return b[atributo]-a[atributo]})
  borrarFilas();
  cargarDatos(datos);
}

tablaPremierInicio();

console.log(tablaClasificacion.rows.length)



//console.log(premier)