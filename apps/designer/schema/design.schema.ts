
export type DesignResType =  {
    _id: string;

    designerId: string;

    title: string;

    description: string;

    imageUrl: string;

    fileUrl: string;

    categoryId: string;

    tags: string[];

    price: number;

    priceType: string;

    viewCount: number;

    likeCount: number;

    state: 'approved' | 'notApproved';
}