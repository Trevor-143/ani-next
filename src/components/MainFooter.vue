<template >
    <footer>
        <div class="down">
            <h4>&copy 2023</h4>
            <h4>Arapu Trevor</h4>
            <h4>Powered by the <a href="">Jikan API</a> </h4>
        </div>
    </footer>
</template>
<script>
export default {
    name: 'MainFooter'
}
</script>
<style>
    footer {
        margin-bottom: 1rem;
        margin-top: 2rem;
    }
    .down {
        background-color: black;
        color: #7c7c7c;
        font-size: 13px;
    }
    .down a {
        text-decoration: none;
        background-color: #fff;
        color: #000;
        padding: 5px 7px;
        border-radius: 0.5rem;
    }
</style>