<template>
  <tr>
    <th scope="row">{{ sno + 1 }}</th>
    <td>
      <img
        :src="`http://localhost:8000${book.image}`"
        class="img-fluid w-100 h-25 img-thumbnail"
        :alt="`${book.title}`"
      />
    </td>
    <td>
      <div class="text-primary fw-bold">
        {{ book.title }}
      </div>
      <p v-html="book.description"></p>
    </td>
    <td>{{ book.created_at }}</td>
    <td>
      <button class="btn btn-danger btn-sm m-1" @click.prevent="deleteBook">
        delete
      </button>
      <routerLink
        class="btn btn-warning btn-sm m-1"
        :to="`/dashboard/edit-book/${book.id}`"
        >edit</routerLink
      >
      <routerLink :to="`/book/${book.id}`" class="btn btn-primary btn-sm"
        >view</routerLink
      >
    </td>
  </tr>
</template>

<script>
import { DELETE_BOOK } from "@/graphql";

export default {
  name: "PostItem",
  props: {
    book: {
      type: Object,
      required: true,
    },
    sno: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    deleteBook() {
      this.$swal
        .fire({
          title: "Do you want delete " + this.book.title + " book?",
          showCancelButton: true,
          icon: "warning",
          confirmButtonText: `Yes,delete it`,
          confirmButtonColor: "#d33",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$apollo
              .mutate({
                mutation: DELETE_BOOK,
                variables: {
                  id: this.book.id,
                },
              })
              .then((res) => {
                if (res.data) {
                  //eslint-disable-next-line
                  Toast.fire({
                    icon: "success",
                    title: "book is removed",
                  });
                  this.$delete(this.$parent.books, this.sno);
                }
              });
          }
        });
    },
  },
};
</script>

<style scoped>
</style>