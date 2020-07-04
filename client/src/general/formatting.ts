import numeral from 'numeral';

export const formatPrice = (price: number | unnull, type = '0,0.00') => (price ? numeral(price).format(type) : null);
