<template>
    <div>
        <table class="table table-hover ">
            <thead>
            <tr>
                <th scope="col">#Sno</th>
                <th scope="col">image</th>
                <th scope="col">title</th>
                <th scope="col">created At</th>
                <th scope="col">actions</th>
            </tr>
            </thead>
            <tbody>
            <postItem v-for="(book,i) in books" :key="book.id" :sno="i"  :book="book"/>
            </tbody>

        </table>
    </div>
</template>

<script>
    import postItem from './PostItem'

    export default {
        name: "PostList",
        components: {
            postItem
        },
        props: {
            books: {
                type: Array,
                required: true
            }
        },
        data() {
            return {}
        }
    }
</script>

<style scoped>

</style>