export const currencyFormat =  (value?: number | string) => {
    if (!value && value !== 0) return ''

    return new Intl.NumberFormat('id-ID')
        .format(parseInt(value as string))
        .replace(/\D00(?=\D*$)/, '')
}