import {helpers} from "vuelidate/lib/validators";

export const isValidFileSize = (options = {}) => {
    return helpers.withParams(options, value => {
        if (!value) {
            return true
        }
        const fileSizeinKb = value.size / 1024
        const size = Math.round(fileSizeinKb * 100) / 100 // convert up to 2 decimal place
        return size <= options.maxFileSizeInB
    })
}

export const isTrueImage = (value) => {
    if (!value) {
        return true;
    }
    const types = ['image/png', 'image/jpg', 'image/jpeg'];
    return types.includes(value.type);
}