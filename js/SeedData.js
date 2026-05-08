class SeedData {
    static get VARIANT() {
        return {
            'STRAWBERRY': {
                name: 'Strawberry',
                icon: '🍓',
                buyPrice: 50,
                sellPrice: 200,
                growthTime: 5000, // 5s
                stages: 4
            },
            'CABBAGE': {
                name: 'Cabbage',
                icon: '🥬',
                buyPrice: 80,
                sellPrice: 350,
                growthTime: 8000, // 8s
                stages: 4
            },
            'BEETROOT': {
                name: 'Beetroot',
                icon: '🍅',
                buyPrice: 120,
                sellPrice: 600,
                growthTime: 12000, // 12s
                stages: 5
            },
            'OIL_PALM': {
                name: 'Oil Palm',
                icon: '🌴',
                buyPrice: 250,
                sellPrice: 1500,
                growthTime: 20000, // 20s
                stages: 6
            },
            'GOLDEN_BERRY': {
                name: 'Golden Berry',
                icon: '✨',
                buyPrice: 500,
                sellPrice: 4000,
                growthTime: 35000, // 35s
                stages: 5
            }
        };
    }
}

window.SeedData = SeedData;
