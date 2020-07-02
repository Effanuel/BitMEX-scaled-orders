import numeral from 'numeral';

export const formatPrice = (price: number | unnull, type = '0,0.000') => (price ? numeral(price).format(type) : null);
