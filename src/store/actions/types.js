export const SET_LOADING = 'SET_LOADING';

export const SET_SNACKBAR_VISIBLE = 'SET_SNACKBAR_VISIBLE';
export const SET_SNACKBAR_TEXT = 'SET_SNACKBAR_TEXT';

export const SET_INITIAL_LOADING = 'SET_INITIAL_LOADING';
export const RESET_STATE = 'RESET_STATE';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER = 'SET_USER';

export const SET_PRODUCT = "SET_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const SET_DRAFTS = "SET_DRAFTS";

export const SET_PRODUCT_VALIDATION_ERRORS = "SET_PRODUCT_VALIDATION_ERRORS";

export const PRODUCT_OBJ =  {
    name: null,
    image: null,
    short_description: null,
    description: null,
    price: '',
    old_price: '',
    tax: null,
    barcode: null,
    show_in_facebook: null,
    show_product_when_of_stock: null,
    check_stock_during_add_to_cart: null,
    international_shipping: null,
    local_delivery: false,
    feature: false,
    new_arrival: false,
    weight: null,
    length: null,
    width: null,
    height: null,
    international_min_order_qty: null,
    international_max_order_qty: null,
    local_min_order_qty: null,
    local_max_order_qty: null,
    local_delivery_qty: null,
    page_title: null,
    meta_keyword: null,
    meta_description: null,
    view: null,
    status: 'active',
    slug: null,
    disabled_at: null,
    tax_amount: null,
    original_product_id: null,
    original_store_id: null,
    original_price: null,
    category_id: null,
    country_id: null,
    brand_id: null,
    manufacturer_id: null,
    store_id: null,
    admin_id: null,
    sequence_id: null,
    other_categories: [],   //custom fields started adding from here
    tags: [],
    has_variant: false,
    variants: [],
    cost: '',
    profit_amount: '',
    sku: null,
    initial_stock_qty: null,
    warehouse_id: null,
    barcode: null,
    variant_options: [],
    additional_charges_by_shipping: [],
    otherImages: [],
}
