export  const changeOrderProductsImages = (arrayImgs: ProductImage[], slotNumber: number) => {
    const newArrayImgs = [...arrayImgs];
    const slot = newArrayImgs.find( (img: ProductImage) =>  img.id === slotNumber);
    const indexSlot: number = newArrayImgs.findIndex( (item: ProductImage) => item.id === slotNumber)
     newArrayImgs.splice(indexSlot, 1);
     newArrayImgs.unshift(slot);
     return newArrayImgs;
     
   }

export const makeId = (length: number = 5): string => {
  let text: string = '';
  const possible: string =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i: number = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export const findCategoryIndex = (categoriesFilter: Category[], category: string) =>
  categoriesFilter.findIndex((_category: Category) => {
    return _category.category === category
  });

export const selectionCount = (categoriesFilter: Category[]) => {
  return categoriesFilter.reduce( (accumulator: number, category: Category) => {
    return accumulator +=category.subCategories.length
  }, 0);
}

export const slotsOrder = (ids: number[], products: Product[]) => {
  const newOrderProducts: Product[] = [];
  ids.forEach( (id: number) => {
    const product: Product = products.find((_product: Product) => _product.id === id);
    if(product) newOrderProducts.push(product);
  })
  return newOrderProducts;
}
 