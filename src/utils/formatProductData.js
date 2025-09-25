export function formatProductData(
    {
        id,
        secondId,
        quantity = 1,
        sizeId,
        minuses = [],
        additionals = []
    }) {
    const data = {
        productId: id,
        quantity,
    };

    if (secondId) data.secondId = secondId;
    if (sizeId) data.sizeId = sizeId;

    if (minuses.length || additionals.length) {
        data.additionals = {};
        if (minuses.length) {
            data.additionals.minuses = minuses;
        }
        if (additionals.length) {
            data.additionals.additional = additionals;
        }
    }

    return data;
}
