class EconomyManager {
    constructor() {
        this.balance = 500;
        this.inventory = {
            'STRAWBERRY': 2,
            'CABBAGE': 0,
            'BEETROOT': 0,
            'GOLDEN_BERRY': 0,
            'OIL_PALM': 0
        };
        this.harvestStock = {};
        this.selectedSeed = 'STRAWBERRY';

        this.init();
    }

    init() {
        window.signalBus.on('request-buy-seed', (variant) => this.buySeed(variant));
        window.signalBus.on('request-sell-harvest', (variant) => this.sellHarvest(variant));
        window.signalBus.on('request-sell-all', () => this.sellAll());
        window.signalBus.on('use-selected-seed', () => this.useSeed());
        window.signalBus.on('add-to-harvest', (variant) => this.addHarvest(variant));
        window.signalBus.on('select-seed', (variant) => {
            this.selectedSeed = variant;
            window.signalBus.emit('economy-updated');
        });
    }

    buySeed(variant) {
        const data = window.SeedData.VARIANT[variant];
        if (this.balance >= data.buyPrice) {
            this.balance -= data.buyPrice;
            this.inventory[variant]++;
            window.signalBus.emit('system-msg', `Bought ${data.name} Seed for ${data.buyPrice}🪙`);
            window.signalBus.emit('economy-updated');
        } else {
            window.signalBus.emit('system-msg', "Not enough coins!");
        }
    }

    useSeed() {
        if (this.inventory[this.selectedSeed] > 0) {
            this.inventory[this.selectedSeed]--;
            window.signalBus.emit('economy-updated');
            return true;
        }
        window.signalBus.emit('system-msg', `Out of ${window.SeedData.VARIANT[this.selectedSeed].name} seeds!`);
        return false;
    }

    addHarvest(variant) {
        this.harvestStock[variant] = (this.harvestStock[variant] || 0) + 1;
        window.signalBus.emit('system-msg', `Harvested ${window.SeedData.VARIANT[variant].name}!`);
        window.signalBus.emit('economy-updated');
    }

    sellHarvest(variant) {
        const amount = this.harvestStock[variant] || 0;
        if (amount > 0) {
            const revenue = amount * window.SeedData.VARIANT[variant].sellPrice;
            this.balance += revenue;
            this.harvestStock[variant] = 0;
            window.signalBus.emit('system-msg', `Sold ${amount} ${window.SeedData.VARIANT[variant].name} for ${revenue}🪙!`);
            window.signalBus.emit('economy-updated');
        }
    }

    sellAll() {
        let totalRevenue = 0;
        Object.keys(this.harvestStock).forEach(variant => {
            const amount = this.harvestStock[variant] || 0;
            if (amount > 0) {
                totalRevenue += amount * window.SeedData.VARIANT[variant].sellPrice;
                this.harvestStock[variant] = 0;
            }
        });

        if (totalRevenue > 0) {
            this.balance += totalRevenue;
            window.signalBus.emit('system-msg', `Sold all crops for ${totalRevenue}🪙!`);
            window.signalBus.emit('economy-updated');
        } else {
            window.signalBus.emit('system-msg', `No crops to sell!`);
        }
    }
}

window.economyManager = new EconomyManager();
