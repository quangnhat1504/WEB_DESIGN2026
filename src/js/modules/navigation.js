/**
 * Navigation Module
 * Handles navigation, mobile menu, and active states
 */

export function setupNavigation() {
  setupMobileMenu()
  setupActiveNavLink()
  setupNavigationScroll()
}

/**
 * Setup mobile menu toggle
 */
function setupMobileMenu() {
  const menuToggle = document.querySelector('[data-menu-toggle]')
  const mobileMenu = document.querySelector('[data-mobile-menu]')

  if (!menuToggle || !mobileMenu) return

  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open')
    menuToggle.setAttribute('aria-expanded', isOpen)
  })

  // Close menu when clicking nav links
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open')
      menuToggle.setAttribute('aria-expanded', false)
    })
  })

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open')
      menuToggle.setAttribute('aria-expanded', false)
    }
  })
}

/**
 * Mark active navigation link based on current page
 */
function setupActiveNavLink() {
  const currentPath = window.location.pathname
  const navLinks = document.querySelectorAll('[data-nav-link]')

  navLinks.forEach(link => {
    const href = link.getAttribute('href')
    if (href && (currentPath.includes(href) || href === '/')) {
      link.classList.add('active')
      link.setAttribute('aria-current', 'page')
    } else {
      link.classList.remove('active')
      link.removeAttribute('aria-current')
    }
  })
}

/**
 * Handle header scroll effects
 */
function setupNavigationScroll() {
  const header = document.querySelector('[data-header]')
  if (!header) return

  let lastScrollTop = 0
  const scrollThreshold = 50

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop

    if (currentScroll > scrollThreshold) {
      header.classList.add('scrolled')
    } else {
      header.classList.remove('scrolled')
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll
  })
}
