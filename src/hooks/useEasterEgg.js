export function useEasterEgg() {
  const registerKeySequence = (key) => {
    if (typeof window.__shifaKeys === 'undefined') {
      window.__shifaKeys = ''
    }
    window.__shifaKeys += key.toLowerCase()
    if (window.__shifaKeys.length > 5) {
      window.__shifaKeys = window.__shifaKeys.slice(-5)
    }
    if (window.__shifaKeys === 'shifa') {
      window.__shifaKeys = ''
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
