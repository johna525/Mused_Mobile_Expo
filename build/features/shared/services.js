export const changeOrderProductsImages = (arrayImgs, slotNumber) => {
    const newArrayImgs = [...arrayImgs];
    const slot = newArrayImgs.find((img) => img.id === slotNumber);
    const indexSlot = newArrayImgs.findIndex((item) => item.id === slotNumber);
    newArrayImgs.splice(indexSlot, 1);
    newArrayImgs.unshift(slot);
    return newArrayImgs;
};
export const makeId = (length = 5) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
export const findCategoryIndex = (categoriesFilter, category) => categoriesFilter.findIndex((_category) => {
    return _category.category === category;
});
export const selectionCount = (categoriesFilter) => {
    return categoriesFilter.reduce((accumulator, category) => {
        return accumulator += category.subCategories.length;
    }, 0);
};
export const slotsOrder = (ids, products) => {
    const newOrderProducts = [];
    ids.forEach((id) => {
        const product = products.find((_product) => _product.id === id);
        if (product)
            newOrderProducts.push(product);
    });
    return newOrderProducts;
};
//# sourceMappingURL=services.js.map