const formatPrice = (price) => {
    const priceFormatted = `$${(price/100).toFixed(2)}`
    return priceFormatted
}

export default formatPrice