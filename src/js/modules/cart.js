/**
 * Shopping Cart Module
 * Manages shopping cart state and interactions
 */

import { showToast, saveState } from './app.js'

export function setupCart() {
  setupAddToCart()
  setupCartToggle()
  updateCartBadge()
}

/**
 * Setup add to cart buttons
 */
function setupAddToCart() {
  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('[data-add-to-cart]')
    if (!addBtn) return

    e.preventDefault()
    const itemId = addBtn.getAttribute('data-add-to-cart')
    const itemName = addBtn.getAttribute('data-item-name') || 'Item'

    addToCart(itemId, itemName)
    showToast(`${itemName} added to cart!`, 'success')
  })
}

/**
 * Setup cart toggle
 */
function setupCartToggle() {
  const cartToggle = document.querySelector('[data-cart-toggle]')
  const cartPanel = document.querySelector('[data-cart-panel]')

  if (!cartToggle || !cartPanel) return

  cartToggle.addEventListener('click', () => {
    const isOpen = cartPanel.classList.toggle('open')
    cartToggle.setAttribute('aria-expanded', isOpen)
  })

  // Close cart when clicking outside
  document.addEventListener('click', (e) => {
    if (!cartToggle.contains(e.target) && !cartPanel.contains(e.target)) {
      cartPanel.classList.remove('open')
      cartToggle.setAttribute('aria-expanded', false)
    }
  })
}

/**
 * Add item to cart
 */
export function addToCart(itemId, itemName) {
  const cart = window.foodApp.cart || []
  const existingItem = cart.find(item => item.id === itemId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      id: itemId,
      name: itemName,
      quantity: 1,
    })
  }

  window.foodApp.cart = cart
  saveState()
  updateCartBadge()
  updateCartUI()
}

/**
 * Remove item from cart
 */
export function removeFromCart(itemId) {
  const cart = window.foodApp.cart || []
  window.foodApp.cart = cart.filter(item => item.id !== itemId)
  saveState()
  updateCartBadge()
  updateCartUI()
}

/**
 * Update cart item quantity
 */
export function updateCartQuantity(itemId, quantity) {
  const cart = window.foodApp.cart || []
  const item = cart.find(i => i.id === itemId)

  if (item) {
    if (quantity <= 0) {
      removeFromCart(itemId)
    } else {
      item.quantity = quantity
      saveState()
      updateCartUI()
    }
  }
}

/**
 * Clear cart
 */
export function clearCart() {
  window.foodApp.cart = []
  saveState()
  updateCartBadge()
  updateCartUI()
}

/**
 * Update cart badge (item count)
 */
function updateCartBadge() {
  const cartBadge = document.querySelector('[data-cart-badge]')
  const cart = window.foodApp.cart || []
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  if (cartBadge) {
    cartBadge.textContent = totalItems
    cartBadge.style.display = totalItems > 0 ? 'flex' : 'none'
  }
}

/**
 * Update cart UI (cart panel contents)
 */
function updateCartUI() {
  const cartList = document.querySelector('[data-cart-items]')
  const cartEmpty = document.querySelector('[data-cart-empty]')
  const cart = window.foodApp.cart || []

  if (!cartList) return

  if (cart.length === 0) {
    cartList.style.display = 'none'
    if (cartEmpty) cartEmpty.style.display = 'block'
    return
  }

  if (cartEmpty) cartEmpty.style.display = 'none'
  cartList.style.display = 'block'

  cartList.innerHTML = cart
    .map(item => `
      <div class="cart-item" data-item-id="${item.id}">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-quantity">Qty: ${item.quantity}</div>
        </div>
        <button 
          class="cart-item-remove btn btn-ghost btn-sm"
          data-remove-from-cart="${item.id}"
        >
          Remove
        </button>
      </div>
    `)
    .join('')

  // Add remove handlers
  cartList.querySelectorAll('[data-remove-from-cart]').forEach(btn => {
    btn.addEventListener('click', () => {
      const itemId = btn.getAttribute('data-remove-from-cart')
      removeFromCart(itemId)
      showToast('Item removed from cart', 'info')
    })
  })
}

/**
 * Get cart total
 */
export function getCartTotal() {
  const cart = window.foodApp.cart || []
  return cart.reduce((sum, item) => sum + item.quantity, 0)
}
