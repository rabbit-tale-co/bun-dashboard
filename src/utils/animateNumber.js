const easeOutQuint = (t) => {
   return 1 - (1 - t) ** 5
}

export const animateNumber = (start, end, duration, callback) => {
   let startTimestamp = null
   const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const easedProgress = easeOutQuint(progress)
      const currentNumber = Math.floor(easedProgress * (end - start) + start)
      callback(currentNumber)

      if (progress < 1) {
         window.requestAnimationFrame(step)
      }
   }
   window.requestAnimationFrame(step)
}
