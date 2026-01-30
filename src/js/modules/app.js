/**
 * Core Application Module
 * Initializes global app state and utilities
 */

// Global app state
window.foodApp = {
  theme: localStorage.getItem('theme') || 'dark',
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  recentSearches: JSON.parse(localStorage.getItem('recentSearches') || '[]'),
}

/**
 * Initialize the application
 */
export function initializeApp() {
  setTheme(window.foodApp.theme)
  setupThemeToggle()
  setupAccessibility()
}

/**
 * Set application theme
 */
export function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  window.foodApp.theme = theme
  localStorage.setItem('theme', theme)
}

/**
 * Toggle theme
 */
export function toggleTheme() {
  const currentTheme = window.foodApp.theme
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  setTheme(newTheme)
  window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }))
}

/**
 * Setup theme toggle button
 */
function setupThemeToggle() {
  const themeToggle = document.querySelector('[data-toggle-theme]')
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme)
  }

  // Listen for system theme changes
  if (window.matchMedia) {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    darkModeQuery.addListener((e) => {
      if (localStorage.getItem('theme') === null) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    })
  }
}

/**
 * Setup accessibility features
 */
function setupAccessibility() {
  // Add keyboard navigation support
  document.addEventListener('keydown', (e) => {
    // ESC key to close modals
    if (e.key === 'Escape') {
      const modals = document.querySelectorAll('[role="dialog"][open]')
      modals.forEach(modal => modal.close())
    }

    // Cmd/Ctrl + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault()
      const searchInput = document.querySelector('[data-search-input]')
      if (searchInput) searchInput.focus()
    }
  })

  // Improve focus management
  document.addEventListener('focusin', (e) => {
    const target = e.target
    if (target.classList.contains('btn') || target.tagName === 'A') {
      target.classList.add('focus-visible')
    }
  })

  document.addEventListener('focusout', (e) => {
    const target = e.target
    target.classList.remove('focus-visible')
  })
}

/**
 * Save state to localStorage
 */
export function saveState() {
  localStorage.setItem('user', JSON.stringify(window.foodApp.user))
  localStorage.setItem('cart', JSON.stringify(window.foodApp.cart))
  localStorage.setItem('favorites', JSON.stringify(window.foodApp.favorites))
  localStorage.setItem('recentSearches', JSON.stringify(window.foodApp.recentSearches))
}

/**
 * Show toast notification
 */
export function showToast(message, type = 'info', duration = 3000) {
  const toast = document.createElement('div')
  toast.className = `toast toast-${type}`
  toast.setAttribute('role', 'status')
  toast.setAttribute('aria-live', 'polite')
  toast.textContent = message

  const container = document.querySelector('[data-toast-container]') || document.body
  container.appendChild(toast)

  setTimeout(() => toast.remove(), duration)
}
