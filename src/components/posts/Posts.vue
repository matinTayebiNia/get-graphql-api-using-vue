<template>
    <div class="posts">
        <div class="row">
            <div class="col-md-3 col-sm-6 h-100  p-3" v-for="book in $attrs.props" :key="book.id">
                <post :book="book"/>
            </div>
        </div>
    </div>
</template>

<script>
    import post from './Post'

    export default {
        name: 'Posts',
        components: {
            post
        },
        props: {

            type: Array,

        }
    }
</script>

<style scoped>

</style>