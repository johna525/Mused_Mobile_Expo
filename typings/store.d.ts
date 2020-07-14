interface IProductStore {
    getCollection: (slots: Slot[]) => void;
    resetCollection: () => void;
    getAlternatives: (ids: number[]) => void;
    getDetailByProductId: (productId: number) => Promise;
    getAlternativesByFilter: () => void;
    isFromOutfit: boolean;
    getMyRecentOutfit: Product[];
    getMyOutfitSlots: any;
    listOfCollection: Product[];
    alternatives: Product[];
    recentNewProducts: Product[];
    arrayImages: ProductImage[];
    listOfAlternatives: Product[];
    listOfbrowseOnlyProducts: Product[];
    listOfRecentNewProducts: Product[];
    toggleViewCategory: boolean;
    allProducts: any;
    getSliderToggleState: boolean;
    fromMenu: boolean;
    setBrowseType: (type: number) => void;
    setFromOutfit: (value: boolean) => void;
    openProductCategory: () => void;
    changeArrayImages: (slotNumber: number, newImg: ImageSourcePropType) => void;
    addNewSlot: () => void;
    cancelNewSlot: () => void;
    createStyleWithMused: (product: ProductImage) => void;
    getNewProducts: (category: string) => void;
    moveImageToLeft: (slotNumber: number) => void;
    resetArrayImages: () => void;
    resetAlternativies: () => void;
    createNewOutfit: () => void;
    fetchMyOutfits: () => void;
    createBookmark: (productId: number) => void;
    deleteBookmarkById: (_id: any) => void;
    getBookmarksByUserId: () => void;
    listOfBookmarks: Bookmark[];
    getProductsByCategory: (category: string) => void;
    resetProductsByCategory: () => void;
    listOfProductsByCategories: Product[];
    categoryInDrag: string;
    noResult: boolean;
}

interface IUiStore {
    footerIsVisible: boolean;
    contextMenuIsVisible: boolean;
    loading: boolean;
    requireAuth: boolean;
    navigation: any;
    currentRoute: string;
    prevRoute: string;
    requestAuth: (value: boolean) => void;
    hideFooter: () => void;
    showFooter: () => void;
    setLoading: (value: boolean) => void;
    setNavigation: (navigation: any) => void;
    toggleContextMenu: (flag: boolean) => void;
    navigate: (currentRoute: string, prevRoute: string, params?: any) => void;
    goBack: () => void;
    setPrevCurrentRoutes: (currentRoute: string, prevRoute: string) => void;
}

interface IUserStore {
    userId: string;
    userProfile: UserProfile;
    loading: boolean;
    autoLoggedOut: boolean;
    getHighlightButtonText: string;
    newUser: boolean;
    setNewUser: (value: boolean) => void;
    logout: () => void;    
    autoLogOut: () => void;
    removeAuthLogOut: () => void;
    setUserDetails: (userId: string, userProfile: UserProfile, cb?: (userId: string) => void) => void;
    setHighlightButtonText: (text: string) => void;
}

interface ISlotsStore {
    isSlotMachine: boolean;
    slotNumber: number | null | string;
    preSlotNumber: number | null | string;
    secondSlotNumber: number | null | string;
    newImgUrl: HashMap<string> | null;
    isMoveProduct: boolean;
    setSlotNumber: (slotNumber: number | string) => void;
    setPrevSlotNumber: (products: ProductImage[]) => void;
    setSecondSlotNumber: (slotNumber: number | string) => void;
    setNewImgUrl: (newImgUrl: HashMap<string>) => void;
    setSlotMachineEffect: (flag: boolean) => void;
    setMoveProduct: (flag: boolean) => void;
    getSixthSlot: HashMap<string>;
    addOrReplaceSixthSlot: (item: HashMap<string>) => void;
    removeSixthSlot: () => void;
}

interface IPostsStore {
    posts: Post[];
    retailerPosts: RetailerPost[];
    getPosts: () => void;
    getRetailerPosts: () => void;
    getPostById: (postId: number) => Promise;
    listOfRetailerPosts: RetailerPost[];
    listOfPosts: Post[];
}

interface IFilterStore {
    listOfCategory: Category[];
    filterTab: string;
    addNewCategory: (category: string, subCutegory: string) => void;
    removeCategory: (category: string, subCutegory: string) => void;
    selectAllSubCategories: (category: string) => void;
    setFilterTab: (tab: string) => void;
    clearFilters: () => void;
    formatFilterCategories: () => void;
}

type RootStore = {
    ui: IUiStore;
    products: IProductStore;
    user: IUserStore;
    slots: ISlotsStore;
    posts: IPostsStore;
    filters: IFilterStore;
}
