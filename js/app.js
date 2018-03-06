const apiLoad = () => {
    fetch(`https://swapi.co/api/films/`, {method: 'GET'})
        .then(function(response) {
            response.json().then(function(result) {
                paintMovies(result.results);
        });
    })
        .catch(function(err) {
            console.log(err);
        });
};

const paintMovies = (detailsMovies) => {
    console.log(detailsMovies);
    let containerMovies = document.getElementById('container-list');
    let templateMovies = ``;
    detailsMovies.forEach((item) => {
        templateMovies += `<div class="col s6 m3" data-url="">
        <div class="card waves">
            <div class= "card-content center-align circle">
                <img class="responsive-img center" src="">
                <h6 style="color: white">Title: ${item.title}</h6>
                <p>Episode id: ${item.episode_id}</p>
                <ul id="${item.episode_id}">${item.characters.join('\n')}</ul>
            </div>
        </div>`;

    })
    containerMovies.innerHTML = templateMovies;
};
apiLoad();