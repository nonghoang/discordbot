export function parseSort(items) {
    let sort = {};

    if (!items) {
        return sort;
    }

    if (!Array.isArray(items)) {
        items = [items];
    }

    items.forEach((item) => {
        const field = item.match(/(.*),/);
        const direction = item.match(/,(.*)/);

        if (field && direction) {
            sort[field[1]] = direction[1];
        }
    });

    return sort;
}
