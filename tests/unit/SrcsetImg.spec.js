import {mount} from '@vue/test-utils'
import SrcsetImg from '../../src/components/SrcsetImg';
import {QImg} from 'quasar';

describe('SrcsetImg.vue', () => {
  it('test props', () => {
    const src = 'https://via.placeholder.com/150'
    const srcset = [
      { src: 'https://via.placeholder.com/300', size: [300, 300] },
      { src: 'https://via.placeholder.com/500', size: [500, 500] },
      { src: 'https://via.placeholder.com/700', size: [700, 700] },
      { src: 'https://via.placeholder.com/1000', size: [1000, 1000] },
    ]
    const wrapper = mount(SrcsetImg, {
      props: {src, srcset},
      components: {
        QImg
      }
    })
    expect(wrapper.vm.srcSetInline).toMatch(
        'https://via.placeholder.com/300 300w, https://via.placeholder.com/500 500w, https://via.placeholder.com/700 700w, https://via.placeholder.com/1000 1000w'
    )
  })
})