import { ref } from "vue";
 
const authorized = ref(false);

const useAuthorize = () => {
    const authorize = () => {
        authorized.value = true
    };
    const unauthorize = () => {
        authorized.value = false
    };

    return {
        authorized,
        authorize,
        unauthorize,
    };
};
 
export default useAuthorize;