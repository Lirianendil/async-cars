export const formatTime = (timeMs: number | undefined) => {
    if (!timeMs) return 0

   return Number((timeMs / 1000).toFixed((2)))

}