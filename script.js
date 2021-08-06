const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e15c56dc03f0f326c38d49f23ebe4509&page=1'

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=e15c56dc03f0f326c38d49f23ebe4509&query="'


const form = document.querySelector('.form')
const search = document.querySelector('.search')
const main = document.querySelector('.main')
const descHeader = document.querySelector('.desc-header')
const notFound = document.querySelector('.not-found')
//Get initial movies
getMovies(API_URL)

async function getMovies(url){
    
    const res = await axios.get(url)
    const data = await res.data
    // console.log(data.results)
    showMovies(data.results)
    
}

function showMovies(movies){
    main.innerHTML = ''
    movies.forEach(movie => {
        const {title, poster_path, vote_average, overview, release_date} =  movie
        const date = release_date.slice(0,4)
        const movieTitle = title.slice(0,35)
        const movieOverview = overview.slice(0,400) 
        const movieElement = document.createElement('div')
        movieElement.classList.add('movie')
        movieElement.innerHTML =
        `
        <div class+"img-container>
        <img src="${IMG_PATH + poster_path}" alt="${movieTitle}">
        <div class="year">${date}</div>
        </div>    
        
            <div class="movie-info">
                <h3>${movieTitle}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
            <small>${movieOverview}</small>
            </div>
        
        `
        main.appendChild(movieElement)
    });
}

function getClassByRate(vote){
    if(vote>=8){
        return 'green'
    }
    if(vote>=7){
        return 'yellow'
    }
    if(vote>=5){
        return 'orange'
    }
    else{
        return 'red'
    }
}

form.addEventListener('submit', (event) =>{
    event.preventDefault()
    const searchTerm = search.value

    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
        descHeader.innerText = "Search Results for : " + searchTerm

    }  
    else{
        window.location.reload()
    }
})