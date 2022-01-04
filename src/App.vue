<template>
    <div id="app" class="d-flex flex-column">
        <component :is="layout">
            <routerView/>
        </component>
    </div>
</template>
<script>

    const defaultLayout = 'default'

    export default {
        computed: {
            layout() {
                return (this.$route.meta.layout || defaultLayout) + '-layout';
            }
        },
        async created() {
            await this.$store.dispatch("Auth/getAuthUser");
        },
        data() {
            return {};
        },
    };
</script>
<style>
    #app {
        height: 100vh !important;
    }
</style>

