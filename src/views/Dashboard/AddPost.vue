``2
<template>
    <div class="add-post">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header bg-warning">
                        <routerLink
                                to="/dashboard/my-posts"
                                class="btn btn-close float-end m-2"
                        ></routerLink>
                        <h2 class="card-title text-primary fw-bold">add A book</h2>
                    </div>
                    <form class="a-auto" enctype="multipart/form-data">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="row">
                                        <div class="col-md-7 col-sm-12">
                                            <div class="form-group">
                                                <label for="title">title:</label>
                                                <input type="text"
                                                        v-model.trim="$v.createBook.title.$model"
                                                        :class="{
                                                        'is-invalid': $v.createBook.title.$error,
                                                        'is-valid': !$v.createBook.title.$invalid,
                                                        }"
                                                        class="form-control"
                                                        id="title"
                                                />
                                                <span class="valid-feedback">your title is valid</span>
                                                <span class="invalid-feedback">
                                                  <span v-if="!$v.createBook.title.required">
                                                    title is required</span
                                                  >
                                                  <span v-if="!$v.createBook.title.minLength">
                                                    title must have at least
                                                    {{ $v.createBook.title.$params.minLength.min }}
                                                    letters
                                                  </span>
                                                </span>
                                            </div>
                                            <div class="form-group">
                                                <label for="link">link:</label>
                                                <input type="text"
                                                       v-model.trim="$v.createBook.link.$model"
                                                       :class="{
                                                            'is-invalid': $v.createBook.link.$error,
                                                            'is-valid': !$v.createBook.link.$invalid,
                                                         }"
                                                       class="form-control"
                                                       id="link"
                                                />
                                                <span class="valid-feedback">your link is valid</span>
                                                <span class="invalid-feedback">
                                                  <span v-if="!$v.createBook.link.required">
                                                    link is required</span>
                                                </span>
                                            </div>

                                            <div class="form-group">
                                                <ApolloQuery :query="queryCategory">
                                                    <template
                                                            slot-scope="{ result: { data }, isLoading }"
                                                    >
                                                        <div v-if="isLoading">Loading...</div>
                                                        <div v-if="data">
                                                            <label for="category"> category: </label>
                                                            <select
                                                                    v-model.trim="$v.createBook.category.$model"
                                                                    :class="{
                                                                      'is-invalid': $v.createBook.category.$error,
                                                                      'is-valid': !$v.createBook.category.$invalid,
                                                                    }"
                                                                    id="category"
                                                                    class="form-control"
                                                            >
                                                                <option
                                                                        v-for="category of data.categories"
                                                                        :key="category.id"
                                                                        :value="category.id"
                                                                >
                                                                    {{ category.name }}
                                                                </option>
                                                            </select>
                                                            <span class="valid-feedback"
                                                            >your category is valid</span
                                                            >
                                                            <span class="invalid-feedback">
                                                                <span v-if="!$v.createBook.category.required">
                                                                  category is required</span>
                                                              </span>
                                                        </div>
                                                    </template>
                                                </ApolloQuery>
                                            </div>
                                            <div class="form-group mt-3">
                                                <vue-editor
                                                        v-model.trim="$v.createBook.description.$model"
                                                        :class="{
                                                            'is-invalid': $v.createBook.description.$error,
                                                            'is-valid': !$v.createBook.description.$invalid,
                                                          }"
                                                ></vue-editor>
                                                <span class="valid-feedback"
                                                >your description is valid</span
                                                >
                                                <span class="invalid-feedback">
                                                      <span v-if="!$v.createBook.description.required">
                                                        description is required</span
                                                      >
                                                      <span v-if="!$v.createBook.description.minLength">
                                                        description must have at least
                                                        {{
                                                          $v.createBook.description.$params.minLength.min
                                                        }}
                                                        letters
                                                      </span>
                                                    </span>
                                            </div>
                                            <div class="form-check">
                                                <label class="font-bold mb-2">
                                                    <input
                                                            type="checkbox"
                                                            name="featured"
                                                            v-model="createBook.featured"
                                                            class="form-check-input"
                                                    />Featured</label
                                                >
                                            </div>
                                        </div>
                                        <div class="col-md-5 col-sm-12">
                                            <div class="form-group">
                                                <label for="file">image:</label>
                                                <input
                                                        type="file"
                                                        id="file"
                                                        @change="onLogoChange($event)"
                                                        :class="{
                                                            'is-invalid': $v.createBook.image.$error,
                                                            'is-valid': !$v.createBook.image.$invalid,
                                                          }"
                                                        class="form-control"
                                                />
                                                <span class="valid-feedback">
                                                    your image is valid</span>
                                                <span class="invalid-feedback">
                                                  <span v-if="!$v.createBook.image.required">
                                                    image is required</span>
                                                    <span class="error" v-if="!$v.createBook.image.isTrueImage">
                                                        Invalid image file.</span>
                                                             <span class="error"
                                                                   v-if="!$v.createBook.image.isValidFileSize">
                                                        image must size at most {{$v.createBook.image.$params.isValidFileSize.maxFileSizeInB /1024 }} mb letters</span>
                                                </span>
                                                <input type="hidden" v-model="createBook.image"/>
                                            </div>
                                            <div
                                                    class="form-group mt-4"
                                                    v-if="imageUploader !== null">
                                                <img :src="`${imageUploader}`" alt="alt"
                                                     class="w-100 h-100 img-fluid"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer justify-content-between align-items-center">
                            <routerLink to="/dashboard/my-posts" class="btn btn-light"
                            >cancel
                            </routerLink>
                            <button
                                    @click.prevent="addBook"
                                    class="btn btn-primary float-end"
                            >
                                add book
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {ADD_BOOK, GET_CATEGORY} from "@/graphql";
    import {VueEditor} from "vue2-editor";
    import {mapGetters} from "vuex";
    import {minLength, required} from "vuelidate/lib/validators";
    import {isTrueImage, isValidFileSize} from '@/mixins/validation'

    export default {
        name: "AddPost",
        components: {
            VueEditor,
        },
        /**
         *
         */
        data() {
            return {
                queryCategory: GET_CATEGORY,
                createBook: {
                    title: "",
                    description: "",
                    link: "",
                    featured: false,
                    category: null,
                    image: null,
                },
                imageUploader: null,
            };
        },
        validations: {
            createBook: {
                title: {required, minLength: minLength(5)},
                image: {
                    required, isTrueImage, isValidFileSize: isValidFileSize({
                        maxFileSizeInB: 2048
                    })
                },
                category: {required},
                link: {required},
                description: {required, minLength: minLength(20)},
            },

        },

        async created() {
            if (!this.isAuth) {
                await this.$router.go(-1);
            }
        },
        methods: {
            ...mapGetters({
                isAuth: "Auth/isAuth",
            }),
            /**
             * this method for upload a image
             */
            onLogoChange(e) {
                const files = e.target.files || e.dataTransfer.files;
                const file = files[0];
                this.createBook.image = file;  // --Important: you have to set the value here
                this.$v.createBook.image.$touch(); // --And validate with the plugin
                if (this.$v.createBook.image.$error) {
                    this.imageUploader = null;
                    return;
                }
                this.imageUploader = URL.createObjectURL(file);
            },

            /**
             * this method for add a new book
             */
            async addBook() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    let {data} = await this.$apollo.mutate({
                        mutation: ADD_BOOK,
                        variables: {
                            user_id: this.$store.getters["Auth/user"].me.id,
                            title: this.createBook.title,
                            link: this.createBook.link,
                            description: this.createBook.description,
                            featured: this.createBook.featured,
                            image: this.createBook.image,
                            category: Number(this.createBook.category),
                        },
                    });
                    if (data) {
                        this.$router.go(-1);
                        //eslint-disable-next-line
                        Toast.fire({
                            icon: "success",
                            title: "book added successfully",
                        });
                    }
                }
            },
        },
    };
</script>

<style scoped>
    #featured {
        margin-top: 13px;
    }
</style>