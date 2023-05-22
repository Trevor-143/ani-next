<template>
  
  <div class="home">

    <div class="random">
      <img class="backImg" :src="randomImgURL" :alt="random.title">
      <router-link :to="'/about/'+random.mal_id" class="randomAnime">
        <img :src="random.images.jpg.image_url" :alt="random.title" class="innerImg">
        <div class="randomSide" id="firstSide">
          <h3>{{ random.title }}</h3>
          <p class="aboutP">{{ random.synopsis }}</p>
          <div class="randomTags">
            <h4>{{ random.episodes }} episodes</h4>
            <h4>{{ random.score }}/10 score</h4>
            <h4>{{ random.rating }}</h4>
            <h4>From {{ random.source }}</h4>
          </div>
        </div>
      </router-link>
    </div>

    <div class="Anime">
      <h2 class="animeHead"></h2>
      <div class="AnimeList">
        <router-link :to = "'/about/'+ anime.mal_id" class="animeListItem" v-for="anime in topAnime" :key="anime.mal_id">
          <img :src="anime.images.webp.image_url" :alt="anime.title">
          <div class="animeListItemInfo">
            <h3>{{ anime.title_english }}</h3>
            <p class="desc">{{anime.synopsis}}</p>
            <h4>From {{ anime.source }}</h4>
            <h4>{{ anime.score }}/10</h4>
          </div>
        </router-link>
      </div>
    </div>

    <div class="charas">
      <h3 class="h1"></h3>
      <section>
        <router-link :to="'/character/' + chara.mal_id " v-for="chara in topCharacters" :key="chara.mal_id">
          <img :src="chara.images.webp.image_url" :alt="chara.name">
          <h3>{{ chara.name }}</h3>
        </router-link>
      </section>
    </div>

    <div class="Anime">
      <h2 class="wait"></h2>
      <div class="AnimeList">
        <router-link :to = "'/about/'+ anime.mal_id" class="animeListItem" v-for="anime in upcoming" :key="anime.mal_id">
          <img :src="anime.images.webp.image_url" :alt="anime.title">
          <div class="animeListItemInfo">
            <h3>{{ anime.title_english }}</h3>
            <p class="desc">{{anime.synopsis}}</p>
            <h4>From {{ anime.source }}</h4>
            <h4>{{ anime.aired.string }}</h4>
          </div>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import { ref, onBeforeMount, onMounted } from "vue";

export default {
  name: 'HomeView',
  components: {
    
  },
  setup() {
    const topAnime = ref([])
    const randomImgURL = ref('') 
    const randomAnime = ref([])
    const random = ref([])
    const upcoming = ref([])
    const topCharacters = ref([])
    const allProducers = ref([])
    

    onBeforeMount(() => {
      setTimeout(() => {
        fetch(`https://api.jikan.moe/v4/top/anime`)
        .then(resp => resp.json())
        .then(data => {
          randomAnime.value = Math.floor(Math.random() * (data.data.length))
          random.value = data.data[randomAnime.value]
          randomImgURL.value = data.data[randomAnime.value].trailer.images.maximum_image_url
          // console.log(random.value)
        })
      }, 10);

      setTimeout(() => {
        fetch(`https://api.jikan.moe/v4/top/anime`)
        .then(res => res.json())
        .then(data => {
          // console.log(data)
          topAnime.value = data.data
          if(topAnime.value != null) {
            document.querySelector('.animeHead').innerHTML = "Anime to watch"
          }
        })
      }, 1000)

      setTimeout(() => {
        fetch(`https://api.jikan.moe/v4/seasons/upcoming`)
        .then(res => res.json())
        .then(data => {
          // console.log(data)
          upcoming.value = data.data
          if(upcoming.value != null) {
            document.querySelector('.wait').innerHTML = "looking forwarch to.."
          }
        })
      }, 2000)
      
    })
    onMounted(() => {
      setTimeout(() => {
        fetch(`https://api.jikan.moe/v4/top/characters`)
        .then(res => res.json())
        .then(data => {
          topCharacters.value = data.data
          // console.log(topCharacters.value)
          if(topCharacters.value != null) {
            document.querySelector('.h1').innerHTML = "top characters"
          }
        })
      }, 3000)
      setTimeout(() => {
        fetch(`https://api.jikan.moe/v4/producers`)
        .then(response => response.json())
        .then( data => {
          console.log(data.data)
          allProducers.value = data.data
        })
      }, 3000);
    })
    
    
    return {
      topAnime,
      random,
      upcoming,
      topCharacters,
      randomImgURL,
      allProducers
    }
  }
}
</script>

<style>
  .random {
    position: relative;
    min-height: 350px;
    max-height: 350px;
    margin-top: 1rem;
    border-radius: 1rem;
  }
  .random .backImg {
    width: 100%;
    height: 100%;
    min-height: 350px;
    object-fit: cover;
    max-height: 350px;
    border-radius: 1rem;
  }
  .randomAnime {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;

    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    text-decoration: none;
    color: #fff;
    padding: 1rem;

    background-image: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2));
  }
  .innerImg {
    border-radius: 1rem;
    height: 90%;
    object-fit: cover;
    margin: auto 0;
  }
  .randomSide {
    grid-column: span 3;
    margin: auto 0;
  }
  @media (max-width:1200px) {
    .randomSide {
      grid-column: span 3;
    }
  }
  @media (min-width:700px) {
    .randomSide {
      grid-column: span 2;
    }
  }
  @media(min-width:700px) and (max-width:800px) {
    .randomSide {
      grid-column: span 1;
    }
  }
  @media (max-width:700px) {
    .random {
      min-height: 600px;
    }
    .random .backImg {
      min-height: 600px;
    }
  }
  .aboutP {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 4;
    -line-clamp: 4;
    -webkit-box-orient: vertical;
    margin: 1rem 0;
    font-size: 15px;
    color: #e2e2e2;
  }
  .randomTags {
    display: flex;
    flex-direction: row;
    overflow: auto;
    margin-top: 1rem;
  }
  .randomTags::-webkit-scrollbar {
    display: none;
  }
  .randomTags h4 {
    padding: 0.3rem 0.5rem;
    background-color: #fff;
    color: #000;
    border-radius: 0.5rem;
    margin-right: 0.5rem;
    white-space: nowrap;
  }


  .Anime {
    margin-bottom: 1rem;
    /* padding: 0.5rem 1rem; */
  }
  .Anime h2 {
    color: #fff;
    font-size: 17px;
    margin-left: 1rem;
    margin-top: 2rem;
  }
  .AnimeList {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  }
  .AnimeList a {
    text-decoration: none;
  }
  @media(min-width:500px) {
    .AnimeList :nth-child(1), .AnimeList :nth-child(12), .AnimeList :nth-child(20) {
      grid-row: span 2;
      grid-column: span 2;
      height: 100%;
    }
    .AnimeList :nth-child(1) img, .AnimeList :nth-child(12) img, .AnimeList :nth-child(20) img {
      max-height: 90%;
    }
    .AnimeList :nth-child(1) .animeListItemInfo p, .AnimeList :nth-child(12) .animeListItemInfo p, .AnimeList :nth-child(20) .animeListItemInfo p {
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 3;
            -line-clamp:3;
      -webkit-box-orient: vertical;
      color: #dfdfdf;
      font-size: 14px;
    }
  }
  .animeListItem {
    width: 100%;
    height: 120px;
    overflow: hidden;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #1d1d1d;
    border: 2px solid rgba(29, 29, 29, 0);
    transition: 0.4s;
  }
  .animeListItem:hover {
    transform: translateY(-10px);
    background-color: #000000;
    border: 2px solid rgba(29, 29, 29, 1);
  }
  .animeListItem img {
    max-height: 80%;
    max-width: 30%;
    width: 100%;
    object-fit: cover;
    border-radius: 1rem;
    margin: 0.5rem;
  }
  .animeListItemInfo {
    padding-right: 1rem;
  }
  .animeListItemInfo h3, .animeListItemInfo h4 {
    margin: 0;
  }
  .animeListItemInfo h3 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
            -line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 15px;
    color: #f3f3f3;
  }
  .animeListItemInfo p {
    display: none;
  }
  .animeListItemInfo :nth-child(3) {
    color: #b8b8b8;
    font-size: 12px;
    margin: 0.2rem 0;
  }
  .animeListItemInfo :nth-child(4) {
    width: fit-content;
    padding: 0.3rem 0.7rem;
    background-color: #ffffff;
    color: #000000;
    border-radius: 0.5rem;
    font-size: 12px;
  }
  .h1 {
    font-size: 17px;
    margin-top: 2rem;
    color: #fff;
    margin-left: 1rem;
  }
  .charas section {
    display: flex;
    flex-direction: row;
    overflow: auto;
  }
  .charas section::-webkit-scrollbar {
    display: none;
  }
  .charas a {
    margin-top: 1rem;
    margin-right: 0.5rem;
    width: fit-content;
    color: #c7c7c7;
    text-align: center;
    font-size: 13px;
    text-decoration: none;
    background-color: #1d1d1d;
    padding: 1rem;
    border-radius: 1rem;
  }
  .charas a img {
    width: 100px;
    height: 150px;
    object-fit: cover;
    border-radius: 1rem;
    border: #c7c7c7 solid 2px;
  }
  .mProd {
    color: #fff;
    margin-top: 2rem;
  }
  .mProd h3 {
    margin-left: 1rem;
  }
  .mProd a {
    text-decoration: none;
    color: #fff;
  }
  .producers {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
  }
  .producer img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
    filter: brightness(65%);
  }
  .producer {
    border-radius: 1rem;
    /* padding: 0.5rem; */
    position: relative;
  }
  .producer p {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -line-clamp: 3;
    overflow: hidden;
    -webkit-box-orient: vertical;
    font-size: 14px;
  }
  .producer div {
    padding: 0.5rem;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 1rem;
    background-color: #1d1d1d;
    margin: 0.5rem;
  }
</style>
