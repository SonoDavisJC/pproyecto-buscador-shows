// https://www.tvmaze.com/
// https://www.tvmaze.com/api

const $año = document.getElementById('year');
let $shows = document.getElementById("shows-query");
let $buscar = document.getElementById("search");
let $template = document.getElementById("show-template").content;
let $fragment = document.createDocumentFragment();


document.addEventListener("keypress", async (key) => {
    if (key.target.matches("#search")) {
        if(key.keyCode == 13)
        try {
            $shows.innerHTML = `<img src="./assets/img/oval.svg" alt="Loader" class="loader">`;
            let contenido = key.target.value.toLowerCase();
            let api = `https://api.tvmaze.com/search/shows?q=${contenido}`;
            let response = await fetch(api);
            let json = await response.json();

            console.log(json);

            
            if(json.length == 0){
                let vacio = `<p> No se encontro ningun elemento coincidente con : <b>${contenido}</b></p>`;
                $shows.innerHTML = vacio
            }
            else {
                json.forEach(element => {
                    $template.querySelector('div').querySelector('h3').textContent = element.show.name;
                    $template.querySelector('div').querySelector('div').innerHTML = element.show.summary ? element.show.summary: "Sin descripción";
                    $template.querySelector('div').querySelector('img').src = element.show.image ? element.show.image.medium : './assets/img/noimage.png';
                    $template.querySelector('div').querySelector('img').alt = element.show.name;
                    $template.querySelector('div').querySelector('a').href = element.show.url ? element.show.url : '#';
                    $template.querySelector('div').querySelector('a').target = element.show.url ? "_blank" : '_self';
                    $template.querySelector('div').querySelector('a').textContent =  element.show.url ? 'Mas información' : '';
                    let $clone = document.importNode($template, true);
                    $fragment.appendChild($clone);
                });

                $shows.innerHTML = "";
                $shows.appendChild($fragment);
            }
                
            

            if(!response.ok) throw {status: response.status, message: response.statusText};
            
        } catch (error) {
            console.log(error);
            let message = error.statusText  || 'Ocurrio un error';
            $shows.innerHTML = `<h3>Error ${error.status} : ${message}</h3>`;
        }
    }
});


function ConseguirAño () {
    let date = new Date();
    return date.getFullYear();
}
$año.textContent = ConseguirAño();

