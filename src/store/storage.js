const KEY = 'ser_cart';

export function loadCart() {
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : undefined;
    } catch {
        return undefined;
    }
}

let saveTimer;
export function saveCart( cartState ) {
    clearTimeout( saveTimer );
    saveTimer = setTimeout(() => {
        try { localStorage.setItem(KEY, JSON.stringify(cartState)); } catch {}
    }, 300);
}
