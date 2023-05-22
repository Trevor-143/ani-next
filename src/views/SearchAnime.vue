<template>
    <div>
        <div class="results">
            <h3 class="hResults">Did you search for {{ aName }}?</h3>
            <div class="rList">
            <router-link :to="'/about/'+anime.mal_id" v-for="anime in foundAnime" :key="anime.mal_id">
                <img :src="anime.images.jpg.image_url" :alt="anime.title">
                <div class="foundInfo">
                <h3>{{ anime.title }}</h3>
                </div>
            </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, defineProps, beforeRouteUpdate, onBeforeMount } from "vue";

export default {
    name: 'SearchAnime',
    props: {
        text: {
            type: String,
            required: true
        }
    },
    beforeRouteUpdate(to, from, next) {
        this.searchText = to.query.text
        setTimeout(() => {
            this.findAnime()
        }, 100);
        next()
    },
    setup(props) {
        const foundAnime = ref([])
        const resultsHeading = ref('')
        const aName = ref('')

        onBeforeMount(() => {
            aName.value = props.text
            fetch(`https://api.jikan.moe/v4/anime?q=${props.text}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                foundAnime.value = data.data
            })
        })
        
        const findAnime = () => {
            aName.value = props.text
            fetch(`https://api.jikan.moe/v4/anime?q=${props.text}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                foundAnime.value = data.data
            })
        }
        return {
            foundAnime,
            text: props.text,
            findAnime,
            aName
        }
    }
}
</script>

<style>
    
</style>