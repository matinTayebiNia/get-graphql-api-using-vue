<template>
    <div>
        <NavBar/>

        <div class="container py-5 flex-grow-1">
            <routerView/>
        </div>

        <Footer/>
    </div>

</template>

<script>
    import NavBar from "./navbar";
    import Footer from "./footer";

    export default {
        name: "defaultLayout",
        components: {
            NavBar,
            Footer,
        },
    }
</script>

<style scoped>

</style>