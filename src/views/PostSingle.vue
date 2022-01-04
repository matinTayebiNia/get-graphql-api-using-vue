<template>
    <div class="post-page">
        <div class="row">
            <div class="col-12">
                <apolloQuery :query="queryBookSingle" :variables="{id:this.$route.params.id}">
                    <template v-slot="{result:{data,error}}">
                        <div v-if="data">
                            <div class="card bg-transparent border-0 mb-3">
                                <div class="card-body">
                                    <img class="card-img-left" :src="`http://localhost:8000${data.book.image}`"
                                         alt="Card image cap">
                                    <h5 class="card-title">{{data.book.title}}</h5>
                                    <p class="card-text" v-html="data.book.description"/>
                                    <p class="card-text"><small class="text-muted">created : {{data.book.created_at}} by
                                        {{data.book.user.name}}</small></p>
                                    <button class="btn btn-primary " @click="$router.go(-1)">back</button>
                                </div>
                            </div>
                        </div>
                        <div v-else-if="error">
                                <pre>
                                    {{error}}
                                </pre>
                        </div>
                        <div id="isloading" v-else class="d-flex justify-content-center h-100  " >
                            <is-loading/>
                        </div>

                    </template>
                </apolloQuery>

            </div>
        </div>
    </div>
</template>

<script>
    import {GET_BOOK_BY_ID} from '@/graphql'
    import IsLoading from "@/components/isLoading";

    export default {
        name: "PostSingle",
        components: {IsLoading},
        data() {
            return {
                queryBookSingle: GET_BOOK_BY_ID
            }
        }
    }
</script>

<style scoped>
 #isloading{
        margin-top: 100px
    }
</style>