class EconomyManager {
    constructor() {
        this.balance = 500;
        this.inventory = {
            'STRAWBERRY': 2,
            'CABBAGE': 0,
            'BEETROOT': 0,
            'OIL_PALM': 0,
            'GOLDEN_BERRY': 0
        };
        this.harvestStock = {};
        this.selectedSeed = 'STRAWBERRY';

        this.init();
    }

    init() {
        window.signalBus.on('request-buy-seed', (variant) => this.buySeed(variant));
        window.signalBus.on('request-sell-harvest', (variant) => this.sellHarvest(variant));
        window.signalBus.on('use-selected-seed', () => this.useSeed());
        window.signalBus.on('add-to-harvest', (variant) => this.addHarvest(variant));
        window.signalBus.on('select-seed', (variant) => {
            this.selectedSeed = variant;
            this.updateUI();
        });
        
        this.updateUI();
    }

    buySeed(variant) {
        const data = window.SeedData.VARIANT[variant];
        if (this.balance >= data.buyPrice) {
            this.balance -= data.buyPrice;
            this.inventory[variant]++;
            this.updateUI();
            window.signalBus.emit('system-msg', `Bought ${data.name} Seed!`);
        } else {
            window.signalBus.emit('system-msg', "Not enough coins!");
        }
    }

    useSeed() {
        if (this.inventory[this.selectedSeed] > 0) {
            this.inventory[this.selectedSeed]--;
            this.updateUI();
            return true;
        }
        window.signalBus.emit('system-msg', `Out of ${this.selectedSeed} seeds!`);
        return false;
    }

    addHarvest(variant) {
        this.harvestStock[variant] = (this.harvestStock[variant] || 0) + 1;
        this.updateUI();
        window.signalBus.emit('system-msg', `Harvested ${window.SeedData.VARIANT[variant].name}!`);
    }

    sellHarvest(variant) {
        const amount = this.harvestStock[variant] || 0;
        if (amount > 0) {
            const revenue = amount * window.SeedData.VARIANT[variant].sellPrice;
            this.balance += revenue;
            this.harvestStock[variant] = 0;
            this.updateUI();
            window.signalBus.emit('system-msg', `Sold ${amount} ${variant} for ${revenue} coins!`);
        }
    }

    updateUI() {
        document.getElementById('val-coins').innerText = this.balance.toLocaleString();
        
        // Update Hotbar
        const slots = document.querySelectorAll('.slot');
        Object.keys(window.SeedData.VARIANT).forEach((variant, index) => {
            if (slots[index]) {
                const data = window.SeedData.VARIANT[variant];
                slots[index].innerHTML = `
                    <span class="item-icon">${data.icon}</span>
                    <span class="count">${this.inventory[variant]}</span>
                    <span class="label">${data.name.substring(0,3)}</span>
                `;
                slots[index].className = `slot ${this.selectedSeed === variant ? 'active' : ''}`;
                slots[index].onclick = () => window.signalBus.emit('select-seed', variant);
            }
        });

        window.signalBus.emit('economy-updated');
    }
}

window.economyManager = new EconomyManager();
