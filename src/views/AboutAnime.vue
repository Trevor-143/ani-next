<template>
    <div>
        <div class="sAnime">
            <img class="sBAnime" :src="bImg" :alt="animeDetails.title">
            <div class="sBCAnime">
                <img :src="mImg" :alt="animeDetails.title">
                <div class="sSAnime">
                    <h3>{{ animeDetails.title }}</h3>
                    <h3>{{ animeDetails.title_english }}</h3>
                    <h3>{{ animeDetails.title_japanese }}</h3>
                    <h3 class="date">{{ date }}</h3>
                    <p>{{ animeDetails.background }}</p>
                    <div class="sTags">
                        <h4>{{ animeDetails.episodes }} episodes</h4>
                        <h4>{{ animeDetails.type }}</h4>
                        <h4>{{ animeDetails.year }}</h4>
                        <h4>{{ animeDetails.score }}/10 score</h4>
                        <h4>{{ animeDetails.rating }}</h4>
                        <h4>From {{ animeDetails.source }}</h4>
                        <h4>{{ animeDetails.duration}}</h4>
                        <h4>Rank {{ animeDetails.rank}}</h4>
                        <h4>{{ animeDetails.status}}</h4>
                        <h4>{{demoName}} {{demoType}} </h4>
                    </div>
                </div>
            </div>
        </div>

        <div class="gen">
            <h2 class="genH"> {{animeDetails.title}} genres</h2>
            <div class="bar"></div>
            <div class="genres">
                <div class="sGenre" v-for="item in genres" :key="item.mal_id">
                    <h3>{{item.name}}</h3>
                </div>
            </div>
        </div>

        <div class="about">
            <h1>About {{animeDetails.title}}</h1>
            <div class="bar"></div>
            <p>{{animeDetails.synopsis}}</p>
        </div>


        <h3 class="gH">Gallary</h3>
        <div class="bar"></div>
        <div class="gallary">
            <div class="gList" v-for="pic in gallary" :key="pic.index">
                <img :src="pic.jpg.image_url" alt="animeDetails.title + 'pictures'">
            </div>
        </div>

        <div class="aniCharas">
            <h1>{{animeDetails.title}} characters</h1>
            <div class="bar"></div>
            <ul class="aniClist">
                <li v-for="person in AnimeCharacters" :key="person.character.mal_id">
                    <router-link :to="'/character/'+person.character.mal_id" ><img :src="person.character.images.jpg.image_url" :alt="person.character.name"></router-link>
                    <h3> {{person.character.name}} </h3>
                </li>
            </ul>
        </div>

        <div class="gen">
            <h2 class="genH"> {{animeDetails.title}} studios.</h2>
            <div class="bar"></div>
            <div class="genres">
                <div class="sGenre" v-for="item in studio" :key="item.mal_id">
                    <h3>{{item.name}}</h3>
                </div>
            </div>
        </div>

        <div class="gen">
            <h2 class="genH"> {{animeDetails.title}} producers.</h2>
            <div class="bar"></div>
            <div class="genres">
                <a :href="item.url" class="sGenre two" v-for="item in producers" :key="item.mal_id">
                    <h3>{{item.name}}</h3>
                </a>
            </div>
        </div>

        <div class="trailer">
            <h2 class="genH"> {{animeDetails.title}} trailer.</h2>
            <div class="video">
                <section>
                    <iframe width="560" height="315" :src="trailerURL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </section>
                <div>
                    <h3>{{ animeDetails.title }} trailer</h3>
                    <h3>{{ animeDetails.title_english }} trailer</h3>
                    <h3>{{ animeDetails.title_japanese }} trailer</h3>
                </div>
            </div>
        </div>

        <div class="rev">
            <h3> {{animeDetails.title}} reviews.. </h3>
            <div class="bar"></div>
            <div class="reviews">
                <div class="review">
                    <p> {{randomReview}} </p>
                </div>
                <button @click="getReview()" >Another Review</button>
            </div>
        </div>

        <div class="gen">
            <h2 class="genH"> {{animeDetails.title}} streaming platforms.</h2>
            <div class="bar"></div>
            <div class="genres">
                <a :href="item.url" class="sGenre two" v-for="item in streaming" :key="item.mal_id">
                    <h3>{{item.name}}</h3>
                </a>
            </div>
        </div>

    </div>
</template>

<script>
    import { ref, onBeforeMount, onMounted } from "vue";
    import { useRoute } from "vue-router";


    export default {
        name: 'AboutAnime',

        setup() {
            const animeDetails = ref([])
            const demoName = ref('')
            const demoType = ref('')
            const bImg = ref('')
            const route = useRoute()
            const producers = ref([])
            const streaming = ref([])
            const demographics = ref('')
            const studio = ref('')
            const mImg = ref('')
            const genres = ref([])
            const randomReview = ref('')
            const random = ref('')
            const AnimeCharacters = ref([])
            const trailerURL = ref('')
            const trailerID = ref('')
            const date = ref('')
            const gallary = ref([])
            // const aniCImg = ref('')

            const getReview = () => {
                fetch(`https://api.jikan.moe/v4/anime/${route.params.id}/reviews`)
                .then(resp => resp.json())
                .then(data => {
                    // console.log(data.data)
                    random.value = Math.floor(Math.random() * (data.data.length))
                    randomReview.value = data.data[random.value].review
                    // console.log(randomReview.value)
                })
            }

            onBeforeMount(() => {
                fetch(`https://api.jikan.moe/v4/anime/${route.params.id}/full`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data.data)
                    animeDetails.value = data.data
                    bImg.value = data.data.trailer.images.maximum_image_url
                    mImg.value = data.data.images.jpg.image_url
                    genres.value = data.data.genres
                    studio.value = data.data.studios
                    demoName.value = data.data.demographics[0].name
                    demoType.value = data.data.demographics[0].type
                    producers.value = data.data.producers
                    streaming.value = data.data.streaming
                    date.value = animeDetails.value.aired.string
                    // console.log(trailerURL.value)
                })
                fetch(`https://api.jikan.moe/v4/anime/${route.params.id}/reviews`)
                .then(resp => resp.json())
                .then(data => {
                    // console.log(data.data)
                    random.value = Math.floor(Math.random() * (data.data.length))
                    randomReview.value = data.data[random.value].review
                    // console.log(randomReview.value)
                })
                fetch(`https://api.jikan.moe/v4/anime/${route.params.id}/characters`)
                .then(resp => resp.json())
                .then(data => {
                    // console.log(data.data)
                    AnimeCharacters.value = data.data
                })
                setTimeout(() => {
                    fetch(`https://api.jikan.moe/v4/anime/${route.params.id}/pictures`)
                    .then(resp => resp.json())
                    .then(data => {
                        // console.log(data.data)
                        gallary.value = data.data
                    })
                }, 2000);
                setTimeout(() => {
                    fetch(`https://api.jikan.moe/v4/anime/${route.params.id}/videos`)
                    .then(resp => resp.json())
                    .then(data => {
                        // console.log(data.data)
                        trailerURL.value = data.data.promo[0].trailer.embed_url
                        trailerID.value = data.data.promo[0].trailer.youtube_id
                        console.log(trailerID.value, trailerURL.value)
                    })
                }, 3000);
            })
            
            return {
                route,
                animeDetails,
                bImg,
                mImg,
                genres,
                studio,
                demoName,
                demoType,
                producers,
                streaming,
                getReview,
                randomReview,
                AnimeCharacters,
                trailerURL,
                trailerID,
                date,
                gallary
            }
        }
    }
</script>

<style scoped>
    .bar {
        width: 100px;
        height: 2px;
        border-radius: 10px;
        background-color: #dddddd;
        margin-bottom: 1rem;
        margin-left: 0.5rem;
    }
    .sAnime {
        color: #fff;
        position: relative;
        max-height: 100%;
        min-height: 400px;
        margin-top: 2rem;
    }
    .sAnime .sBAnime {
        width: 100%;
        height: 100%;
        object-fit: cover;
        max-height: 400px;
        border-radius: 1rem;
    }
    .sBAnime img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        max-height: 400px;
        border-radius: 1rem;
    }
    .sBCAnime {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        
        padding: 1rem;
        background-image: linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.3));
        
        display: grid;
        gap: 0.5;
        grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    }

    .sBCAnime img {
        border-radius: 1rem;
    }
    .sSAnime {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        /* align-items: center; */
        justify-content: center;
        text-align: left;
        grid-column: span 3;
    }
    @media (max-width:1000px) {
        .sSAnime {
            grid-column: span 2;
        }
    }
    @media (max-width:800px) {
        .sAnime, .sBAnime {
            min-height: 700px;
        }
        .sAnime {
            padding: 1rem 0;
        }
    }
    .sSAnime p {
        margin: 1rem 0;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 3;
        -line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    .date {
        color: #fff;
        font-size: 14px;
        font-weight: 300;
        margin: 0.5rem 0;
        border-bottom: 1px solid #fff;
        width: fit-content;
    }
    .sTags {
        display: flex;
        margin-top: 1rem;
        flex-direction: row;
        flex-wrap: nowrap;
        overflow: auto;
        
    }
    .sTags::-webkit-scrollbar {
        display: none;
    }
    .sTags h4 {
        margin-right: 0.5rem;
        padding: 0.3rem 0.5rem;
        border-radius: 0.5rem;
        background-color: #fff;
        color: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
    }
    .sTags h4:nth-child(4) {
        border: solid 3px #fff;
        background-color: #000;
        color: #fff;
    }
    .gen {
        margin: 2rem 0;
    }
    .genH {
        font-size: 20px;
        color: #fff;
        margin-bottom: 0.5rem;
    }
    .genres {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        overflow: auto;
    }
    .sGenre {
        background-color: #000000;
        color: #ffffff;
        padding: 0.3rem 0.5rem;
        margin-right: 1rem;
        border-radius: 0.5rem;
        border: 2px solid #fff;
    }
    .about {
        margin: 1rem 0;
    }
    .about h1 {
        font-size: 20px;
        color: #fff;
        margin-bottom: 0.5rem;
    }
    .about p {
        color: #dddddd;
    }
    .two {
        background-color: #ffffff;
        color: #5c0000;
        text-decoration: none;
    }
    .two h3 {
        white-space: nowrap;
    }
    .rev {
        margin-top: 2rem;
    }
    .rev h3 {
        color: #fff;
        font-size: 20px;
    }
    .review p {
        color: #fff;
        display: -webkit-box;
        -webkit-line-clamp: 7;
        -line-clamp: 7;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .reviews button {
        padding: 0.3rem 0.5rem;
        border: none;
        background-color: #5c0000;
        color: #fff;
        font-size: 17px;
        margin: 1rem 0;
        border-radius: 0.5rem;
    }
    .aniCharas {
        color: #fff;
    }
    .aniCharas h1 {
        font-size: 20px;
        margin-bottom: 0.5rem;
    }
    .aniClist {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        overflow: auto;
    }
    .aniClist h3 {
        font-size: 13px;
    }
    .aniClist::-webkit-scrollbar {
        display: none;
    }
    li {
        list-style-type: none;
    }
    .aniClist li {
        margin-right: 1rem;
        font-size: 17px;
        text-align: center;
    }
    .aniClist li img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: cover;
    }
    .trailer {
        color: #fff;
        background-color: #1d1d1d;
        padding: 1rem;
        border-radius: 1rem;
    }
    .video {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
        color: #fff;
    }
    .video section {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 1rem;
    }
    iframe {
        width: 100%;
        border-radius: 1rem;
    }
    .gallary {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        overflow: auto;
    }
    .gH {
        color: #fff;
        font-size: 20px;
    }
    .gallary::-webkit-scrollbar {
        display: none;
    }
    .gList {
        margin: 0.5rem 1rem;
        margin-left: 0;
    }
    .gList img {
        width: 180px;
        height: 250px;
        object-fit: cover;
        border-radius: 1rem;
    }
    button {
        cursor: pointer;
    }
</style>
