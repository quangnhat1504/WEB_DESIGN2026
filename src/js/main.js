/**
 * FoodAI - Main Entry Point
 * Initializes application and shared functionality
 */

import '../css/main.css'
import { initializeApp } from './modules/app.js'
import { setupNavigation } from './modules/navigation.js'
import { setupSearch } from './modules/search.js'
import { setupCart } from './modules/cart.js'

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize application
  initializeApp()

  // Setup shared modules
  setupNavigation()
  setupSearch()
  setupCart()

  console.log('✅ FoodAI App Initialized')
})

// Handle errors
window.addEventListener('error', (event) => {
  console.error('❌ Error:', event.error)
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('❌ Unhandled Promise Rejection:', event.reason)
})
