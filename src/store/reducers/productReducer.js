import * as TYPES from '../actions/types';

const initialState ={
    products: [],
    product: {
        name: null,
        image: null,
        short_description: null,
        description: null,
        price: null,
        old_price: null,
        tax: null,
        barcode: null,
        show_in_facebook: null,
        show_product_when_of_stock: null,
        check_stock_during_add_to_cart: null,
        international_shipping: null,
        local_delivery: null,
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
        cost: null,
        profit_amount: null,
        sku: null,
        initial_stock_qty: null,
        warehouse_id: null,
        barcode: null,
        variant_options: [],
    }
}

const productReducer = (state=initialState, action) => {
    switch(action.type) {
        case TYPES.SET_PRODUCT:
            return {
                ...state, 
                product: {...action.payload}
            };
        case TYPES.RESET_STATE:
            return initialState;
        default:
            return state;
    }
}

export default productReducer;