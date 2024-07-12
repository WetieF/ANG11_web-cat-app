export enum ProductActionsTypes {
    GET_ALL_PRODUCTS = "[Product] Get All products",
    GET_SELECTED_PRODUCTS = "[Product] Get Selected products",
    GET_AVAILABLE_PRODUCTS = "[Product] Get Available products",
    GET_SEARCH_PRODUCTS = "[Product] Get Search products",
    NEW_PRODUCT = "[Product] New product",
    SELECT_PRODUCT = "[Product] Select product",
    EDIT_PRODUCT = "[Product] Edit product",
    DELETE_PRODUCT = "[Product] Delete product",
}

export interface ActionEvent {
    type : ProductActionsTypes,
    payload: any  // si je mets ici un point d'intero apres payload, pas besoin de l'inclure ds les differentes classes
}

export enum DataStateEnum {
    LOADING,
    LOADED,
    ERROR
}

export interface AppDataState<T> {
    dataState?: DataStateEnum; // point d'interogation veut dire que sa variable n'est pas obligatoire
    data?: T, // peut etre liste de Produit comme autre chose
    errorMessage?: string
}