import ApiInput from './ApiInput.vue'
import ApiSelect from './ApiSelect.vue';
import ApiCheckbox from './ApiCheckbox.vue';


export const fieldComponentMapping = {
    'field': ApiInput,
    'boolean': ApiCheckbox,
    'string': ApiInput,
    'url': ApiInput,
  'email': ApiInput,
  'regex': undefined,
  'slug': ApiInput,
  'integer': ApiInput,
  'float': ApiInput,
  'decimal': ApiInput,
  'date': undefined,
  'datetime': undefined,
  'time': undefined,
  'choice': ApiSelect,
  'multiple choice': ApiSelect,
  'file upload': undefined,
  'image upload': undefined,
  'list': undefined,
  'nested object': undefined,
  'input': 'input'
}
export const fieldTypeMapping = {
    'hidden': 'hidden',
    'field': ApiInput,
    'boolean': ApiInput,
    'string': 'text',
    'url': 'url',
    'email': 'email',
    'regex': undefined,
    'slug': 'text',
    'integer': ApiInput,
    'float': ApiInput,
    'decimal': ApiInput,
    'date': 'date',
    'datetime': 'date',
    'time': 'time',
    'choice': undefined,
    'multiple choice': undefined,
    'file upload': undefined,
    'image upload': undefined,
    'list': undefined,
    'nested object': undefined,
}
