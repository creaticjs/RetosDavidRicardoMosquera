const urlBase = 'https://api.themoviedb.org/3';
const apiKey = '357a7cd84e31ba07c539d1d78c26662e';
const urlPopular = urlBase + `/movie/popular`;
const urlMovie = urlBase + '/movie/'

let data = []

const parametrosPopulares = {
  api_key: apiKey,
  page: '',
  language: 'es'
}

const parametrosMovie = {
  api_key: apiKey,
  language: 'es'
}

$(async function () {
  try {
    parametrosPopulares.page = 1
    data = await cargarDatos(urlPopular, parametrosPopulares)
    data.results.forEach(pelicula => {
      addCard(pelicula)
    });
    console.log(data)
  } catch (error) {
    console.log(error)
  }
});

function cargarDatos(url, parametros) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "get",
      url: url,
      data: parametros,
      dataType: "json",
    })
      .done(data => {
        resolve(data);
      })
      .fail(() => {
        reject("Error 🤮")
      })
      .always(() => {
        //console.log('Always')
      });
  });
}

function addCard(pelicula) {
  // $("<div>", {
  //   'class': 'col-md-4'
  // }).append(
  //   $('<div>', {
  //     'class': 'card mb-4 shadow-sm',      
  //   })
  // ).hide().appendTo('#otraDiv').fadeIn('slow'); 
  $('#contenedor').append(`
    <div class="col-md-4">
      <div class="card mb-4 shadow-sm">
        <img class="card-img-top" src='https://image.tmdb.org/t/p/w500${pelicula.poster_path}' alt="Card image cap" style="height: 500px">
        <div class="card-body">
          <h5 class="card-title">${pelicula.original_title}</h5>
          <p class="card-text">${pelicula.overview.substring(0, 200)} ...</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary" onclick='detallePelicula(${pelicula.id})'>Ver Detalle</button>              
            </div>
            <small class="text-muted">Voto promedio ${pelicula.vote_average}</small>
          </div>
        </div>
      </div>
    </div>
  `);
}

async function detallePelicula(id) {
  try {
    let url = urlMovie + id
    const pelicula = await cargarDatos(url, parametrosMovie)
    $('#imagenPelicula').attr('src', `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`)
    $('#titulo').text(pelicula.original_title)
    $('#descripcion').text(pelicula.overview)
    $('#fechaLanzamiento').text(pelicula.release_date)
    $('#home').attr('href', pelicula.homepage)
    $('#contenedor').hide()
    $('#containerDetalle').show()
    console.log('Pelicula', pelicula)
  } catch (error) {
    console.log(error)
  }  
}

$('#volver').on('click', () => {
  $('#contenedor').show()
  $('#containerDetalle').hide()
})

$('#buscarPelicula').on('click', () => {
  let value = $('#inputPelicula').val().toUpperCase()  
  let query = Enumerable.From(data.results)
    .Where('!!($.original_title).toUpperCase().match(/^'+value+'/)').ToArray();
  $('#contenedor').html('')
  if (value !== '') {
    query.forEach(pelicula => {
      addCard(pelicula)
    });    
  } else {
    data.results.forEach(pelicula => {
      addCard(pelicula)
    });    
  }  
})