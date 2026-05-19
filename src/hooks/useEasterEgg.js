export function useEasterEgg() {
  const registerKeySequence = (key) => {
    if (typeof window.__bbKeys === 'undefined') {
      window.__bbKeys = ''
    }
    window.__bbKeys += key.toLowerCase()
    if (window.__bbKeys.length > 5) {
      window.__bbKeys = window.__bbKeys.slice(-5)
    }
    if (window.__bbKeys === 'bb') {
      window.__bbKeys = ''
      window.dispatchEvent(new CustomEvent('easteregg:heartrain'))
    }
  }

  return { registerKeySequence }
}

export function triggerHeartRain() {
  window.dispatchEvent(new CustomEvent('easteregg:heartrain'))
}

export function triggerSecret() {
  window.dispatchEvent(new CustomEvent('easteregg:secret'))
}

export function triggerCat() {
  window.dispatchEvent(new CustomEvent('easteregg:cat'))
}
