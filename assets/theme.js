(function () {
  const THEME_KEY = 'isc2CcTheme'
  const root = document.documentElement

  function preferredTheme() {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  }

  function applyTheme(theme) {
    root.dataset.theme = theme
    localStorage.setItem(THEME_KEY, theme)
    document.querySelectorAll('[data-theme-toggle]').forEach(toggle => {
      toggle.setAttribute('aria-pressed', String(theme === 'light'))
      const label = toggle.querySelector('[data-theme-label]')
      if (label) label.textContent = theme === 'light' ? 'Light' : 'Dark'
    })
  }

  function mountThemeToggle() {
    document.querySelectorAll('[data-theme-toggle]').forEach(toggle => {
      toggle.addEventListener('click', () => {
        applyTheme(root.dataset.theme === 'light' ? 'dark' : 'light')
      })
    })
  }

  function mountScrollSignal() {
    const signal = document.createElement('div')
    signal.className = 'scroll-signal'
    signal.setAttribute('aria-hidden', 'true')
    document.body.appendChild(signal)

    const update = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      const progress = Math.min(Math.max(window.scrollY / max, 0), 1)
      root.style.setProperty('--scroll', progress.toFixed(4))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
  }

  function mountRevealEffects() {
    const targets = document.querySelectorAll('.section, .tool-card, .card, .panel, .cyber-card')
    targets.forEach(target => target.classList.add('reveal-ready'))

    if (!('IntersectionObserver' in window)) {
      targets.forEach(target => target.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.14, rootMargin: '0px 0px -7% 0px' })

    targets.forEach(target => observer.observe(target))
  }

  applyTheme(preferredTheme())
  document.addEventListener('DOMContentLoaded', () => {
    mountThemeToggle()
    applyTheme(root.dataset.theme || preferredTheme())
    mountScrollSignal()
    mountRevealEffects()
  })
})()
