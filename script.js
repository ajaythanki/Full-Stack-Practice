const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&page=1';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&query=";

const main = document.getElementById('section');
const form = document.querySelector('#myForm');
const search = document.getElementById('query');

function returnMovies(url){
  fetch(url).then(res => res.json())
  .then(data=>{
    console.log(data.results);
    data.results.forEach(elem=>{
      
      const div_card = document.createElement('div');
      div_card.setAttribute('class',"card");
      div_card.setAttribute('class',"center");
      
      const div_row = document.createElement('div');
      div_row.setAttribute('class',"row");
      
      const div_column = document.createElement('div');
      div_column.setAttribute('class',"column");
      
      const image = document.createElement('img');
      image.setAttribute('class',"thumbnail");
      image.setAttribute('id',"image");
      image.src= IMG_PATH + elem.poster_path;
      
      const title = document.createElement('h3');
      const center = document.createElement('center');
      title.innerHTML = `${elem.title}`;
      title.setAttribute('id',"title");

      div_card.appendChild(image);
      center.appendChild(title);
      div_column.appendChild(div_card);
      div_row.appendChild(div_column);
      main.appendChild(div_row);
    });
  });
}
returnMovies(APILINK);

form.addEventListener("submit",(e)=>{
  e.preventDefault();
  main.innerHTML="";
  const searchItem = search.value;
  if(searchItem){
    console.log('before,returnMovies',searchItem);
    returnMovies(SEARCHAPI + searchItem);
    search.value="";
  }
});