// convert image to base64 uri
export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

/***
 * Removes all keys that are not in the fields array
 * @param {object} data
 * @param {Array<object>} fields
 * @returns {object}
 */
export const cleanDataByFields = (data, fields) => {
  const result = {}
  fields.forEach((field) => {
    try {
      result[field.attrs.name] = data[field.attrs.name]
    } catch (e) {
      console.debug(e)
    }
  })
  return result
}
