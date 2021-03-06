export default {
  setAllGroceries (state, payload) {
    state.fullList = payload
  },

  setFavorites (state, payload) {
    state.favorites = payload
  },

  addItemToCart (state, item) {
    const currentItemIndexInFullList = state.fullList.findIndex(itemInList => itemInList.getId() === item.getId())
    const currentItemIndexInCart = state.cart.findIndex(itemInList => itemInList.getId() === item.getId())

    item.increaseSelectedStock()

    state.fullList[currentItemIndexInFullList] = item

    if (currentItemIndexInCart >= 0) {
      state.cart[currentItemIndexInCart] = item

      return
    }

    state.cart.push(item)
  },

  increaseItemFromCart (state, item) {
    const currentItemIndexInFullList = state.fullList.findIndex(itemInList => itemInList.getId() === item.getId())
    const currentItemIndexInCart = state.cart.findIndex(itemInList => itemInList.getId() === item.getId())

    if (!item.canIncreaseSelectedStock()) {
      return
    }

    item.increaseSelectedStock()
    state.fullList[currentItemIndexInFullList] = item
    state.cart[currentItemIndexInCart] = item
  },

  removeItemFromCart (state, item) {
    const currentItemIndexInFullList = state.fullList.findIndex(itemInList => itemInList.getId() === item.getId())
    const currentItemIndexInCart = state.cart.findIndex(itemInList => itemInList.getId() === item.getId())

    item.decreaseSelectedStock()

    state.fullList[currentItemIndexInFullList] = item

    if (item.getSelectedStock() <= 0) {
      state.cart.splice(currentItemIndexInCart, 1)

      return
    }

    state.cart[currentItemIndexInCart] = item
  },

  mapCartAfterNavigationFullList (state) {
    if (!state.cart.length) {
      return
    }

    const itemsInCart = state.cart

    itemsInCart.forEach(item => {
      const currentItemIndexInFullList = state.fullList.findIndex(itemInList => itemInList.getId() === item.getId())
      state.fullList[currentItemIndexInFullList] = item
    })
  },

  mapCartAfterNavigationFavorites (state) {
    if (!state.cart.length) {
      return
    }

    const itemsInCart = state.cart

    itemsInCart.forEach(item => {
      const currentItemIndexInFavorites = state.favorites.findIndex(itemInList => itemInList.getId() === item.getId())

      if (currentItemIndexInFavorites < 0) {
        return
      }

      state.favorites[currentItemIndexInFavorites] = item
    })
  }
}
