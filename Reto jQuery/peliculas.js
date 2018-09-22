const urlBase = 'https://api.themoviedb.org/3';
const apiKey = '357a7cd84e31ba07c539d1d78c26662e';
const urlPopular = urlBase + `/movie/popular`;
const urlMovie = urlBase + '/movie/'

const parametrosPopulares = {
  api_key: apiKey,
  page: '',
  language: 'es'
}

const parametrosMovie = {
  movie_id: 0,
  api_key: apiKey,
  language: 'es'
}

$(async function () {
  try {
    parametrosPopulares.page = 1
    let data = await cargarDatos(urlPopular, parametrosPopulares)
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
        <img class="card-img-top" src='https://image.tmdb.org/t/p/w500${pelicula.poster_path}' alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${pelicula.title}</h5>
          <p class="card-text">${pelicula.overview}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary" onclick='detallePelicula(${pelicula.id})'>View</button>
              <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
            </div>
            <small class="text-muted">9 mins</small>
          </div>
        </div>
      </div>
    </div>
  `);
}

function detallePelicula(id) {
  console.log('id pelicula', id)
}