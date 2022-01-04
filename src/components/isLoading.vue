<template>
    <div class="m-auto">
        <SemipolarSpinner class="align-self-center "
                                   :animation-duration="1500"
                                   :size="60"
                                   :color="'#78909C'"
        />
    </div>
</template>

<script>
    import {SemipolarSpinner} from 'epic-spinners'

    export default {
        name: "isLoading",
        data() {
            return {
            }
        },
        components: {
            SemipolarSpinner
        },

    }
</script>

<style scoped>

</style>