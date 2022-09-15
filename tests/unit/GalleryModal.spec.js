import GalleryModal from '../../src/components/GalleryModal';
import {QBtn, TouchPan, TouchSwipe} from 'quasar';
import {shallowMount} from '@vue/test-utils';

describe('GalleryModal.vue', () => {
    const images = [
        {
            file: 'https://via.placeholder.com/1000',
            description: 'test',
            default_alt_text: 'test',
            thumb: {}
        }
    ]
    const wrapper = shallowMount(GalleryModal, {
        props: {
            images
        },
        components: { QBtn },
        directives: {TouchPan, TouchSwipe}
    })
    it('is displaying all thumbnail images', () => {
        const thumbnailsWrapper = wrapper.find('.thumbnails')
        expect(thumbnailsWrapper.element.children.length === images.length)
    })
})