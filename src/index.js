import GalleryModal from './components/GalleryModal';
import SrcsetImage from './components/SrcsetImg'
import ResponsiveItemSlider from './components/ResponsiveItemSlider'
import ApiForm from './components/form/ApiForm'
import Filter from './etc/filter'



export default {
    install(Vue, options) {
        Vue.component(GalleryModal.name, GalleryModal)
        Vue.component(SrcsetImage.name, SrcsetImage)
        Vue.component(ResponsiveItemSlider.name, ResponsiveItemSlider)
        Vue.component(ApiForm.name, ApiForm)

        Vue.config.globalProperties.$filters = Filter
    },
}