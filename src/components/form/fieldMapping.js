import ApiInput from './ApiInput.vue'
import ApiSelect from './ApiSelect.vue';


export const fieldComponentMapping = {
    'field': ApiInput,
    'boolean': ApiInput,
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
    'multiple choice': undefined,
    'file upload': undefined,
    'image upload': undefined,
    'list': undefined,
    'nested object': undefined,
}
export const fieldTypeMapping = {
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
    'date': undefined,
    'datetime': undefined,
    'time': undefined,
    'choice': undefined,
    'multiple choice': undefined,
    'file upload': undefined,
    'image upload': undefined,
    'list': undefined,
    'nested object': undefined,
}