/**
 * Search Module
 * Handles search functionality and suggestions
 */

export function setupSearch() {
  const searchInput = document.querySelector('[data-search-input]')
  const searchResults = document.querySelector('[data-search-results]')

  if (!searchInput) return

  // Handle search input
  searchInput.addEventListener('input', debounce((e) => {
    const query = e.target.value.trim()
    if (query.length < 2) {
      clearSearchResults()
      return
    }
    performSearch(query, searchResults)
  }, 300))

  // Handle recent searches
  searchInput.addEventListener('focus', () => {
    if (!searchInput.value) {
      showRecentSearches(searchResults)
    }
  })

  // Handle search submission
  const searchForm = searchInput.closest('form')
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const query = searchInput.value.trim()
      if (query) {
        addRecentSearch(query)
        performSearch(query)
      }
    })
  }

  // Close search results when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-search-container]')) {
      clearSearchResults()
    }
  })
}

/**
 * Perform search
 */
function performSearch(query, resultsContainer) {
  // Mock search results - replace with actual API call
  const mockResults = [
    { id: 1, name: 'Pizza Margherita', category: 'Italian' },
    { id: 2, name: 'Caesar Salad', category: 'Salad' },
    { id: 3, name: 'Sushi Roll', category: 'Japanese' },
    { id: 4, name: 'Tacos al Pastor', category: 'Mexican' },
  ].filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  )

  if (resultsContainer) {
    displaySearchResults(mockResults, resultsContainer)
  }
}

/**
 * Display search results
 */
function displaySearchResults(results, container) {
  if (results.length === 0) {
    container.innerHTML = '<div class="search-no-results">No results found</div>'
    return
  }

  container.innerHTML = results
    .map(result => `
      <a href="#" class="search-result-item">
        <span class="search-result-name">${result.name}</span>
        <span class="search-result-category">${result.category}</span>
      </a>
    `)
    .join('')

  // Add click handlers
  container.querySelectorAll('.search-result-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault()
      const name = item.querySelector('.search-result-name').textContent
      addRecentSearch(name)
    })
  })
}

/**
 * Show recent searches
 */
function showRecentSearches(container) {
  const recentSearches = window.foodApp.recentSearches || []
  if (recentSearches.length === 0) return

  container.innerHTML = `
    <div class="search-recent">
      <div class="search-recent-title">Recent Searches</div>
      ${recentSearches
        .slice(0, 5)
        .map(search => `
          <button class="search-recent-item">${search}</button>
        `)
        .join('')}
    </div>
  `

  container.querySelectorAll('.search-recent-item').forEach(item => {
    item.addEventListener('click', () => {
      const query = item.textContent
      const input = document.querySelector('[data-search-input]')
      input.value = query
      performSearch(query, container)
    })
  })
}

/**
 * Add search to recent searches
 */
function addRecentSearch(query) {
  const recentSearches = window.foodApp.recentSearches || []
  const filtered = recentSearches.filter(s => s !== query)
  window.foodApp.recentSearches = [query, ...filtered].slice(0, 10)
  window.foodApp.saveState()
}

/**
 * Clear search results
 */
function clearSearchResults() {
  const resultsContainer = document.querySelector('[data-search-results]')
  if (resultsContainer) {
    resultsContainer.innerHTML = ''
  }
}

/**
 * Debounce helper
 */
function debounce(func, delay) {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}
