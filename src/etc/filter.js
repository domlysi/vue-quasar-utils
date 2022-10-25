import {LocalStorage} from 'quasar';
import {date as quasarDate} from 'quasar';

function parseDate(date, opts, locale = undefined) {
    if (!date) { return date }
    if (!quasarDate.isValid(date)) {
        console.error(`Dateformat invalid: ${date}`)
        return date
    }
    let dateObj = new Date(date)
    let lang = locale || LocalStorage.getItem('language') || (navigator ? navigator.language : undefined)

    try {
        return dateObj.toLocaleDateString(lang, opts)
    } catch (err) {
        console.error(date, err)
        return undefined
    }
}

export default {
    currency: function ({value, locale=undefined, currency='EUR', minimumFractionDigits, maximumFractionDigits}) {
        if (!locale) {
            locale = LocalStorage.getItem('language') || 'de'
        }
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
            minimumFractionDigits,
            maximumFractionDigits,
        }).format(value)
    },

    i18nDate: function (date, options = undefined) {
        if (!date) { return date }
        let defaultOpts = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            ...options
        };
        return parseDate(date, defaultOpts)
    },

    i18nTime: function (date, options = undefined) {
        if (!date) { return date }
        return parseDate(date, options)
    },

    i18nDateTime: function (date, options=undefined) {
        if (!date) { return date }
        let _options = {
            hour: '2-digit',
            minute: '2-digit',
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            ...options
        };
        return parseDate(date, _options)
    }
}