export const currencyFormat =  (value?: number | string) => {
    if (!value && value !== 0) return ''

    return new Intl.NumberFormat('id-ID')
        .format(parseInt(value as string))
        .replace(/\D00(?=\D*$)/, '')
}
export const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };