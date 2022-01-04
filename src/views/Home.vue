<template>
    <div class="home">
        <h2 class="text-primary font-weight-bold mb-3">
            News Feed
        </h2>

        <ApolloQuery :query="queryBook" :variables="{first:10,page:currentPage}">
            <template v-slot="{result:{data,error}}">

                <div v-if="data">
                    <pre>

                    </pre>
                    <posts :props="data.books.data"/>
                    <bPagination v-model="currentPage" pills
                                 :per-page="data.books.paginatorInfo.perPage"
                                 :total-rows="data.books.paginatorInfo.total"
                                 align="center"
                                 size="lg"/>

                </div>
                <div v-else-if="error">
                    <pre>
                        {{error}}
                    </pre>
                </div>
                <div v-else  class="d-flex justify-content-center min-vh-100  ">
                    <is-loading/>
                </div>
            </template>
        </ApolloQuery>

    </div>
</template>

<script>
    // @ is an alias to /src
    import {GET_PAGINATE_BOOK} from '@/graphql'
    import posts from '@/components/posts/Posts'
    import scrollPaginate from '@/mixins/Scroller'
    import IsLoading from "../components/isLoading";

    export default {

        name: 'Home',
        components: {
            IsLoading,
            posts
        },
        mixins: [scrollPaginate],

        data() {
            return {
                queryBook: GET_PAGINATE_BOOK,
                currentPage: 1
            }
        }
    }
</script>
