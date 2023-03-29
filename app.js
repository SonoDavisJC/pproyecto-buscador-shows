// https://www.tvmaze.com/
// https://www.tvmaze.com/api



const $año = document.getElementById('year');
const $shows = document.getElementById("shows-query");
const $buscar = document.getElementById("search");
const $template = document.getElementById("show-template").content;
const $fragment = document.createDocumentFragment();
const $tema = document.getElementById('tema-pagina');
const $cardShows = document.querySelectorAll('.card-shows');
const body = document.body

const temaOscuro = 'fa-regular fa-moon';
const temaBlanco = 'fa-regular fa-sun';


/**
 * Eventos
 * 
 * 
 */

document.addEventListener("keypress", async (key) => {
    if (key.target.matches("#search")) {
        if(key.keyCode == 13)
        try {
            $shows.innerHTML = `<img src="./assets/img/oval.svg" alt="Loader" class="loader">`;
            let contenido = key.target.value.toLowerCase();
            let api = `https://api.tvmaze.com/search/shows?q=${contenido}`;
            let response = await fetch(api);
            let json = await response.json();

            
            if(json.length == 0){
                let vacio = `<p style="color: #AFB0B0" > No se encontro ningun elemento coincidente con : <b>${contenido}</b></p>`;
                $shows.innerHTML = vacio
            }

            else {
                json.forEach(element => {

                    const template = $template.querySelector('div');

                    template.querySelector('h3').textContent = element.show.name;
                    template.querySelector('p').innerHTML = element.show.summary ? element.show.summary: "Sin descripción";
                    template.querySelector('img').src = element.show.image ? element.show.image.medium : './assets/img/noimage.png';
                    template.querySelector('img').alt = element.show.name;
                    template.querySelector('a').href = element.show.url ? element.show.url : '#';
                    template.querySelector('a').target = element.show.url ? "_blank" : '_self';
                    template.querySelector('a').textContent =  element.show.url ? 'Mas información' : '';

                    let $clone = document.importNode($template, true);
                    $fragment.appendChild($clone);
                });

                $shows.innerHTML = "";
                $shows.appendChild($fragment);
                temaPagina();
            }
                
            if(!response.ok) throw {status: response.status, message: response.statusText};
            
        } catch (error) {

            console.log(error);
            let message = error.statusText  || 'Ocurrio un error';
            $shows.innerHTML = `<h3>Error ${error.status} : ${message}</h3>`;

        }
    }
});


$tema.addEventListener('click', (e) => {
    if($tema.className === temaOscuro) {
        $tema.className = temaBlanco;
    }
    else {
        $tema.className = temaOscuro;
    }
    temaPagina();
})


/**
 * 
 *  
 * Funciones
 * 
 */

function ConseguirAño () {
    let date = new Date();
    return date.getFullYear();
}
$año.textContent = ConseguirAño();


function temaPagina() {
    if($tema.className === temaOscuro) {
        body.classList.remove("active-body");
        for(const card of $shows.children){
            card.classList.remove('active-section')
        }
    }else {
        body.classList.add("active-body");
        for(const card of $shows.children){
            card.classList.add('active-section')
        }
    }
}

