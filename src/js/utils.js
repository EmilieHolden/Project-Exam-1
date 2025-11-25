export function groupById(cartArray) {
    const grouped = new Map();

    cartArray.forEach(item => {

        if (grouped.has(item.id)) {
            grouped.get(item.id).quantity += 1
        } else {
            grouped.set(item.id, {
                ...item,
                quantity: 1
            })
        }
    })

    return grouped;
}

export function getPath(file) {
    if (window.location.pathname.includes("/src/")) {
        return `./${file}`
    } else {
        return `src/pages/${file}`
    }
}

