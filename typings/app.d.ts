
type Navigate = (route: string, params?: any) => void;


interface ICollectionHeader {
    title: string;
    subTitle: string;
}

interface IFilterItem {
    id?: string;
    name: string;
    imgUrl: HashMap<string>;
}

type Product = {
    id: number;
    description: string;
    category: string;
    image: string;
    clickUrl: string;
    priceLabel: string;
    colors: string[];
    retailerName: string;
    brand: string;
    subCategories: string[];
    unbrandedName: string;
    retailerName: string;
}

type Author = {
    id: nubmer;
    fullName: string;
    authorImg: string;
}

/** USER DATA */
type UserProfile = {
    email: string;
    name: string;
    firstName: string;
    lastName: string;
}

type ProductImage = {
    img: ImageSourcePropType;
    id: number | string;
}

type Post = {
    _id: any;
    postId: number;
    date: string;
    timeAgo: string;
    authorName: string;
    authorProfilePhoto: string;
    inspirationalImage: string;
    title: string;
    postType: string;
    productIds: any;
    productId: number;
    slots: Slot[];
    hidden: boolean;
    pin: number;
};

type RetailerPost = {
    _id: any;
    title: string;
    date: string;
    inspirationalImage: string;
    slots: Slot[];
    postId: number
}

type Slot = {
    productId: number;
    alternatives: number[];
};

type Category = {
    label?: string;
    category: string;
    subCategories: string[];
}

type Outfit = {
    _id: any;
    userEmail: string;
    slots: number[];
    timestamp: string;
}

type Bookmark = {
    userEmail: string;
    productId: number;
    _id?: any;
    timestamp: string; 
}

