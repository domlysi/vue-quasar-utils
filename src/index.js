import GalleryModal from './components/GalleryModal';
import SrcsetImage from './components/SrcsetImg'
import ResponsiveItemSlider from './components/ResponsiveItemSlider'
import ApiForm from './components/form/ApiForm'
import DynamicInput from './components/form/DynamicInput.vue'
import Filter from './etc/filter'
import CookieConsent from './components/cookieConsent/CookieConsent';
import FileUploaderField from './components/FileUploaderField';
import SecureEmail from './components/SecureEmail';
import FadeOutText from './components/FadeOutText';


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