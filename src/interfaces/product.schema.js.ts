/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface Features {
  [x: string]: any[] | string | number;
}

export interface GetProductsQuery {
  'created_at-from'?: Date;
  'created_at-to'?: Date;
  'updated_at-from'?: Date;
  'updated_at-to'?: Date;
  expand?: ('translations' | 'visibilities' | 'category_links' | 'image_links' | 'features' | 'variations' | 'variations.features' | 'variations.stock_item' | 'brand' | 'stock_item')[];
  id?: number;
  page?: number;
  page_size?: number;
  sort?: 'id-asc' | 'id-desc';
}

export interface Product {
  available_from?: string;
  available_to?: string;
  brand?: {
    created_at?: string;
    description?: string;
    id?: number;
    name?: string;
    seo_meta_description?: string;
    seo_page_title?: string;
    seo_title?: string;
    template?: string;
    updated_at?: string;
  };
  brand_id?: number;
  category_links?: {
    category_id?: number;
    category_sort?: number;
    created_at?: string;
    product_id?: number;
    product_sort?: number;
    updated_at?: string;
  }[];
  created_at?: string;
  description?: string;
  features?: Features;
  id?: number;
  image_links?: {
    caption?: string;
    filename?: string;
    image_id?: number;
    product_id?: number;
    sort?: number;
  }[];
  information?: string;
  keywords?: string;
  name?: string;
  order_limit?: number;
  order_limit_min?: number;
  parcel_type?: string;
  price?: number;
  product_code?: string;
  purchasable_from?: string;
  purchase_price?: number;
  seo_meta_description?: string;
  seo_page_title?: string;
  seo_title?: string;
  stock_item?: {
    backorder_enabled?: boolean;
    backorder_estimate?: string;
    balance?: number;
    balance_alert?: boolean;
    balance_limit?: number;
    barcode?: string;
    code?: string;
    created_at?: string;
    enabled?: boolean;
    id?: number;
    location?: string;
    product_id?: number;
    quantity?: number;
    reserved?: number;
    updated_at?: string;
    variation_id?: number;
  };
  supplier_code?: string;
  supplier_id?: number;
  translations?: {
    description?: string;
    information?: string;
    language?: string;
    name?: string;
    seo_meta_description?: string;
    seo_page_title?: string;
    seo_title?: string;
  }[];
  updated_at?: string;
  variations?: ProductVariation[];
  vat_rate?: number;
  visibilities?: {
    is_visible?: boolean;
    version_id?: number;
  }[];
  visible_from?: string;
  warranty?: number;
  weight?: number;
}

export interface ProductVariation {
  created_at?: string;
  features?: Features;
  id?: number;
  image_id?: number;
  name?: string;
  price?: number;
  product_code?: string;
  product_id?: number;
  purchase_price?: number;
  sort?: number;
  stock_item?: {
    backorder_enabled?: boolean;
    backorder_estimate?: string;
    balance?: number;
    balance_alert?: boolean;
    balance_limit?: number;
    barcode?: string;
    code?: string;
    created_at?: string;
    enabled?: boolean;
    id?: number;
    location?: string;
    product_id?: number;
    quantity?: number;
    reserved?: number;
    updated_at?: string;
    variation_id?: number;
  };
  updated_at?: string;
  weight?: number;
}
