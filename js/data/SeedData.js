class SeedData {
    static get VARIANT() {
        return {
            'STRAWBERRY': {
                name: 'Strawberry',
                icon: '🍓',
                buyPrice: 10,
                sellPrice: 25,
                growthTime: 10000, // 10 seconds
                stages: 4,
                colors: { seed: 0x8b4513, grow: 0x228b22, fruit: 0xff0000 }
            },
            'CABBAGE': {
                name: 'Cabbage',
                icon: '🥬',
                buyPrice: 30,
                sellPrice: 80,
                growthTime: 30000, // 30 seconds
                stages: 4,
                colors: { seed: 0x8b4513, grow: 0x32cd32, fruit: 0x7fff00 }
            },
            'BEETROOT': {
                name: 'Beetroot',
                icon: '🧅',
                buyPrice: 100,
                sellPrice: 300,
                growthTime: 60000, // 60 seconds
                stages: 5,
                colors: { seed: 0x8b4513, grow: 0x8b008b, fruit: 0x800080 }
            },
            'GOLDEN_BERRY': {
                name: 'Golden Berry',
                icon: '✨',
                buyPrice: 500,
                sellPrice: 2000,
                growthTime: 120000, // 120 seconds
                stages: 5,
                colors: { seed: 0xdaa520, grow: 0xb8860b, fruit: 0xffd700 }
            },
            'OIL_PALM': {
                name: 'Oil Palm',
                icon: '🌴',
                buyPrice: 2000,
                sellPrice: 10000,
                growthTime: 300000, // 300 seconds (5 mins)
                stages: 6,
                colors: { seed: 0x8b4513, grow: 0x006400, fruit: 0xff4500 }
            }
        };
    }
}

window.SeedData = SeedData;
