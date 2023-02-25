import GalleryModal from './components/GalleryModal.vue';
import SrcsetImage from './components/SrcsetImg.vue'
import ResponsiveItemSlider from './components/ResponsiveItemSlider.vue'
import ApiForm from './components/form/ApiForm.vue'
import DynamicInput from './components/form/DynamicInput.vue'
import Filter from './etc/filter.js'
import CookieConsent from './components/cookieConsent/CookieConsent.vue';
import FileUploaderField from './components/FileUploaderField.vue';
import SecureEmail from './components/SecureEmail.vue';
import FadeOutText from './components/FadeOutText.vue';


export default {
    install(Vue, options) {
        Vue.component(GalleryModal.name, GalleryModal)
        Vue.component(SrcsetImage.name, SrcsetImage)
        Vue.component(ResponsiveItemSlider.name, ResponsiveItemSlider)
        Vue.component(ApiForm.name, ApiForm)
        Vue.component(CookieConsent.name, CookieConsent)
        Vue.component(FileUploaderField.name, FileUploaderField)
        Vue.component(DynamicInput.name, DynamicInput)
        Vue.component(SecureEmail.name, SecureEmail)
        Vue.component('FadeOutText', FadeOutText)

        Vue.config.globalProperties.$filters = Filter
    },
}