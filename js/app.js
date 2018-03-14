// SOLUCIONARIO

// $('.modal').modal();
// const apiLoad = () => {
//     fetch(`https://swapi.co/api/films/`, {method: 'GET'})
//         .then(function(response) {
//             response.json().then(function(result) {
//                 paintMovies(result.results);
//         });
//     })
//         .catch(function(err) {
//             console.log(err);
//         });
// };

// const paintMovies = (detailsMovies) => {
//     let containerMovies = document.getElementById('container-list');
//     let templateMovies = ``;
//     let templateCharacter = ``;
//      detailsMovies.forEach((item) => {
//         item.characters.forEach((character) => {

//             templateCharacter += `<a href="#modal1">
//                 <li class="character-list" data-url="${character}">${character}</li>
//             </a>`;    
//         });
//         templateMovies += `<div class="col s6 m3" data-url="">
//         <div class="card waves">
//             <div class= "card-content center-align circle">
//                 <img class="responsive-img center" src="">
//                 <h6 style="color: white">Title: ${item.title}</h6>
//                 <p>Episode id: ${item.episode_id}</p>
//                 <ul>${templateCharacter}</ul>
//             </div>
//         </div>`; 
//     });

//     containerMovies.innerHTML = templateMovies;
//     let coleccionHTML = document.getElementsByClassName('character-list');
//     giveEventLis(coleccionHTML);
    
// };

// const giveEventLis = (coleccionHTML) => {
//     let listCharacters = Array.from(coleccionHTML);
//     listCharacters.forEach(li => {
//         li.addEventListener('click', getDetailsCharacter);
//         //li.onclik = getDetailsCharacter
//     });
// };

// const getDetailsCharacter = (e) => {
//     e.preventDefault;
//     //e.target.dataset.url
//     //e.target.getAttribute('data-url')
//     let url = e.target.innerText;
//     fetch(url, {method: 'GET'})
//         .then(response => {
//             response.json().then(result => {
//                 painModal(result);
//             });
//         });
// };

// const painModal = (detailCharacter) => {
//     console.log(detailCharacter);
    
//     $('#character-name').html(detailCharacter.name);
//     $('#birth-year').html(detailCharacter.birth_year);
//     $('#hair-color').html(detailCharacter.hair_color);
//     $('#mass').html(detailCharacter.mass);
//     $('#height').html(detailCharacter.height);
//     $('#skin-color').html(detailCharacter.skin_color);
//     $('#eye-color').html(detailCharacter.eye_color);



// };
// apiLoad();





// MI SOLUCIÓN

window.onload = () => {
  let idImg;
  let resultHome;

  function resetModal() {
    $('.modal-body>.container-fluid>.row').html('');
    $('#exampleModalLongTitle').html('');    
  }

  function getData(event) {
    event.preventDefault();
    idImg = event.target.id;
    let url = `https://swapi.co/api/people/${idImg}`;
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = addDataCharacters;
    req.onerror = handleError;
    req.send();
  }

  function handleError() {
    console.log('se ha producido un error');
  }

  function addDataCharacters() {
    const data = JSON.parse(this.responseText);
    // obteniendo datos
    let newRequest = new XMLHttpRequest();
    newRequest.open('GET', data.homeworld);
    newRequest.onload = getExtraData;
    newRequest.onerror = handleError;
    newRequest.send();

    function getExtraData() {
      const dataHome = JSON.parse(this.responseText);
      resultHome = dataHome.name;
    }

    // template contenido del modal
    let modalBody = $('.modal-body>.container-fluid>.row');
    modalBody.html('');    
    let contentModal = `
      <figure class="col-11 col-md-5">
        <img src="img/${idImg}.png" id="insert-img" class="img-fluid">
      </figure>
      <div class="col-11 col-md-5">
        <p>
          <b>Gender:</b>
          <span id="gender">${data.gender}</span>
        </p>
        <p>
          <b>Home World:</b>
          <span id="home-world">${resultHome}</span>
        </p>
        <p>
          <b>Birth Year:</b>
          <span id="birth-year">${data.birth_year}</span>
        </p>
        <p>
          <b>Height:</b>
          <span id="height">${data.height}</span>
        </p>
        <p>
          <b>Mass:</b>
          <span id="mass">${data.mass}</span>
        </p>
        <p>
          <b>Eye color:</b>
          <span id="eye">${data.eye_color}</span>
        </p>
        <p>
          <b>Hair color:</b>
          <span id="hair">${data.hair_color}</span>
        </p>
        <p>
          <b>Skin color:</b>
          <span id="skin">${data.skin_color}</span>
        </p>
      </div>
    `;
    $(modalBody).html(contentModal);
    $('#exampleModalLongTitle').html(data.name);
  }
// dandole el evento a las imagenes
  var images = $('#container-characters figure img');

  images = [...images];
  images.forEach(img => {
    img.addEventListener('click', getData);
  });

  $('body').click(resetModal);
  $('#btn-close').click(resetModal);
};