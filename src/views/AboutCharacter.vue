<template >
    <div class="charas">
        <div class="cIntro">
            <img :src="imageURL" :alt="characterInfo.name">
            <div class="cIntroName">
                <h3>{{ characterInfo.name }}</h3>
                <h4>{{ characterInfo.name_kanji }}</h4>
                <p class="from"></p>
            </div>
        </div>

        <div class="cAbout">
            <h3 class="aca"></h3>
            <p>{{characterInfo.about}}</p>
        </div>

        <div class="cAnime">
            <h2 class="cAnimeH"></h2>
            <div class="cAnimeList">
                <router-link :to="'/about/'+item.anime.mal_id"  class="inner" v-for="item in anime" :key="item.mal_id">
                    <img :src="item.anime.images.jpg.large_image_url" :alt="item.title">
                    <div class="mini">
                        <h3>{{item.anime.title}}</h3>
                        <h3 class="place">{{item.role}} role</h3>
                    </div>
                </router-link>
            </div>
        </div>

        <div class="cManga">
            <h2 class="cMangaH"></h2>
            <div class="cMangaList">
                <div class="inner" v-for="item in manga" :key="item.mal_id">
                    <img :src="item.manga.images.jpg.large_image_url" :alt="item.title">
                    <div class="mini">
                        <h3>{{item.manga.title}}</h3>
                        <h3 class="placen">{{item.role}} role</h3>
                    </div>
                </div>
            </div>
        </div>

        <div class="cVoice">
            <h1 class="cVoiceH"></h1>
            <div class="cVoices">
                <div class="man" v-for="item in voices" :key="item.mal_id">
                    <img :src="item.person.images.jpg.image_url" :alt="item.person.name">
                    <div class="cInfo">
                        <h3>{{item.person.name}}</h3>
                        <h3>{{item.language}}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
    name: 'AboutCharacter',
    setup(props) {
        const characterInfo = ref([])
        const route = useRoute()
        const anime = ref([])
        const imageURL = ref('')
        const manga = ref([])
        const voices = ref([])
        const bestAnime = ref('')
        
        onMounted(() => {
            fetch(`https://api.jikan.moe/v4/characters/${route.params.id}/full`)
            .then(response => response.json())
            .then(data => {
                characterInfo.value = data.data
                anime.value = data.data.anime
                imageURL.value = data.data.images.webp.image_url
                manga.value = data.data.manga
                voices.value = data.data.voices
                bestAnime.value = anime.value[0].anime.title

                console.log(bestAnime.value)
                console.log(characterInfo.value)

                if (characterInfo.value != null) {
                    document.querySelector('.from').innerHTML = `From ${bestAnime.value}`
                    document.querySelector('.aca').innerHTML = `About ${characterInfo.value.name}`
                }
                if (anime.value != null) {
                    document.querySelector('.cAnimeH').innerHTML = `${characterInfo.value.name}'s anime list`
                }
                if (manga.value != null) {
                    document.querySelector('.cMangaH').innerHTML = `${characterInfo.value.name}'s manga list`
                }
                if (voices.value != null) {
                    document.querySelector('.cVoiceH').innerHTML = `${characterInfo.value.name}'s voice actors.`
                }
            })
        })
        return {
            characterInfo,
            anime,
            imageURL,
            manga,
            voices,
            bestAnime
        }
    }
}
</script>
<style scoped>
    .charas {
        color: #fff;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    .cIntro {
        display: flex;
        align-items: center;
    }
    .cIntro img {
        max-width: 200px;
        max-height: 250px;
        min-height: 200px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 1.5rem;
        border: #fff solid 3px;
        background-color: #e0e0e0;
    }
    .cIntroName {
        padding: 2rem;

    }
    .cAbout {
        margin: 1rem 0;
    }
    .cAbout h3 {
        margin-bottom: 0.5rem;
    }
    .cAbout p {
        color: #e0e0e0;
    }
    .cAnime, .cManga {
        margin: 2rem 0;
    }
    .cAnime h2, .cManga h2 {
        font-size: 17px;
        margin-bottom: 1rem;
    }
    .cAnimeList, .cMangaList {
        overflow: hidden;
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
    }
    .cAnimeList a, .cMangaList a {
        text-decoration: none;
    }
    .cAnimeList img, .cMangaList img {
        max-width: 40%;
        width: 100%;
        height: 110px;
        object-fit: cover;
        border-radius: 1rem;
        border: #fff solid 2px; 
    }
    .cAnimeList .inner, .cMangaList .inner {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        margin: 0;

        padding: 0.5rem;
        background-color: #1d1d1d;
        
        border-radius: 1rem;
    }
    .cAnimeList .mini , .cMangaList .mini {
        display: flex;
        flex-direction: column;
        font-size: 13px;
        padding: 0.5rem;
        width: 100%;
    }
    .mini h3:nth-child(1) {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 12px;
        text-align: left;
    }
    .mini h3:nth-child(2) {
        padding: 0.3rem 0.5rem;
        background-color: #fff;
        color: #000;
        border-radius: 0.5rem;
        width: fit-content;
        margin-top: 0.5rem;
        font-size: 10px;
    }
    .cVoice {
        margin: 2rem 0;
    }
    .cVoice h1 {
        font-size: 17px;
    }
    .cVoices {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        overflow-x: auto;
    }
    .cVoices::-webkit-scrollbar {
        display: none;
    }
    .cVoice .man {
        margin: 1rem 0;
        margin-right: 1rem;
    }
    .cVoices img {
        width: 150px;
        height: 150px;
        object-fit: cover;
        border-radius: 50%;
    }
    .cInfo {
        font-size: 12px;
        color: #e0e0e0;
        text-align: center;
    }
    .cInfo h3:nth-child(2) {
        width: fit-content;
        padding: 0.3rem 0.5rem;
        border-radius: 0.5rem;
        background-color: #fff;
        color: #000;
        margin: auto;
    }
</style>