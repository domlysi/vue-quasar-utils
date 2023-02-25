import {date as quasarDate, useQuasar} from 'quasar';

function parseDate(date, opts, locale = undefined) {
    const $q = useQuasar()
    if (!date) {
        return date
    }
    if (!quasarDate.isValid(date)) {
        console.error(`Dateformat invalid: ${date}`)
        return date
    }
    let dateObj = new Date(date)

    let lang
    if (typeof window !== 'undefined') {
        lang = locale || $q.localStorage.getItem('language') || (window.navigator ? window.navigator.language : undefined)
    } else {
        lang = locale || $q.localStorage.getItem('language')
    }

    try {
        return dateObj.toLocaleDateString(lang, opts)
    } catch (err) {
        console.error(date, err)
        return undefined
    }
}

export default {
    currency: function ({value, locale=undefined, currency='EUR', minimumFractionDigits, maximumFractionDigits}) {
        const $q = useQuasar()
        if (!locale) {
            locale = $q.localStorage.getItem('language') || 'de'
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
    },

    dateTimeFormat: function (date, options=undefined, locale=undefined) {
        if (!date) {
            return date
        }
        if (!quasarDate.isValid(date)) {
            console.error(`Dateformat invalid: ${date}`)
            return date
        }
        const $q = useQuasar()
        let dateObj = new Date(date)

        let lang
        if (typeof window !== 'undefined') {
            lang = locale || $q.localStorage.getItem('language') || (window.navigator ? window.navigator.language : undefined)
        } else {
            lang = locale || $q.localStorage.getItem('language')
        }

        return new Intl.DateTimeFormat(lang, options).format(dateObj)
    },

    pluralize: function(count, word, wordPlural=undefined) {
        if (typeof count === 'object') {
            count = count.value
        }
        count = Number.parseInt(count)
        if (count === 1) { return word }
        let _plural = wordPlural
        if (!wordPlural) {
            _plural = `${word}s`
        }
        return _plural
    }
}