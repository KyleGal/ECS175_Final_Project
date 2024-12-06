

// Dot product function for 2D vectors
export function dot(g, x, y) {
    return g[0] * x + g[1] * y;
}

// Fade function to smooth transitions
export function fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
}

// Lerp (Linear interpolation) function
export function lerp(t, a, b) {
    return a + t * (b - a);
}

// Grad function returns a smooth gradient vector at the point (x, y)
export function grad(hash, x, y) {
    let h = hash & 15;
    let u = h < 8 ? x : y;
    let v = h < 4 ? y : h === 12 || h === 14 ? x : y;
    return ((h & 1 ? -1 : 1) * u + (h & 2 ? -1 : 1) * v);
}

export function normalize( value ) {
    return (value + 1) / 2;
}

function xorshift32(seed) {
    var t = seed ^ (seed << 21);
    t ^= t >>> 35;
    t ^= t << 4;
    return (t >>> 0) / 0x7FFFFFFF - 1;
}

export function seedrandom(seed) {
    let rng = xorshift32(seed);

    return this.normalize(rng);
}
