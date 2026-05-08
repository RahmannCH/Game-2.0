class UIManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        window.signalBus.on('economy-updated', () => this.render());
        window.signalBus.on('system-msg', (msg) => this.showNotification(msg));
        
        // Initial render
        setTimeout(() => this.render(), 100);
    }

    bindEvents() {
        document.getElementById('nav-shop').onclick = () => {
            document.getElementById('shop-modal').classList.remove('hidden');
            this.renderShop();
        };
        
        document.getElementById('nav-market').onclick = () => {
            document.getElementById('market-modal').classList.remove('hidden');
            this.renderMarket();
        };

        document.getElementById('close-shop').onclick = () => {
            document.getElementById('shop-modal').classList.add('hidden');
        };

        document.getElementById('close-market').onclick = () => {
            document.getElementById('market-modal').classList.add('hidden');
        };

        document.getElementById('btn-sell-all').onclick = () => {
            window.signalBus.emit('request-sell-all');
            this.renderMarket();
        };

        document.getElementById('nav-farm').onclick = () => {
            window.signalBus.emit('system-msg', "Already in the Garden!");
        };
    }

    render() {
        document.getElementById('val-coins').innerText = window.economyManager.balance.toLocaleString();
        this.renderHotbar();
        if (!document.getElementById('shop-modal').classList.contains('hidden')) this.renderShop();
        if (!document.getElementById('market-modal').classList.contains('hidden')) this.renderMarket();
    }

    renderHotbar() {
        const container = document.getElementById('hotbar');
        container.innerHTML = '';
        
        Object.keys(window.SeedData.VARIANT).forEach(variant => {
            const data = window.SeedData.VARIANT[variant];
            const count = window.economyManager.inventory[variant] || 0;
            const isActive = window.economyManager.selectedSeed === variant;

            const slot = document.createElement('div');
            slot.className = `slot ${isActive ? 'active' : ''}`;
            slot.onclick = () => window.signalBus.emit('select-seed', variant);
            
            slot.innerHTML = `
                <span class="item-icon">${data.icon}</span>
                <span class="count">${count}</span>
                <span class="label">${data.name.substring(0,3)}</span>
            `;
            container.appendChild(slot);
        });
    }

    renderShop() {
        const container = document.getElementById('shop-items');
        container.innerHTML = '';

        Object.keys(window.SeedData.VARIANT).forEach(variant => {
            const data = window.SeedData.VARIANT[variant];
            const canAfford = window.economyManager.balance >= data.buyPrice;
            
            const item = document.createElement('div');
            item.className = 'store-item';
            item.innerHTML = `
                <div class="item-info">
                    <div class="item-icon-large">${data.icon}</div>
                    <div class="item-details">
                        <h3>${data.name} Seed</h3>
                        <p>Grow Time: ${data.growthTime/1000}s</p>
                        <p>Cost: <span style="color:${canAfford?'#2e8b57':'#dc143c'}">${data.buyPrice}🪙</span></p>
                    </div>
                </div>
                <button class="ui-btn ${canAfford ? 'blue' : ''}" ${canAfford ? '' : 'disabled'} style="${canAfford ? '' : 'background:#888;border-color:#555;'}">BUY</button>
            `;
            
            item.querySelector('button').onclick = () => {
                window.signalBus.emit('request-buy-seed', variant);
            };

            container.appendChild(item);
        });
    }

    renderMarket() {
        const container = document.getElementById('market-items');
        container.innerHTML = '';

        let hasItems = false;

        Object.keys(window.SeedData.VARIANT).forEach(variant => {
            const data = window.SeedData.VARIANT[variant];
            const stock = window.economyManager.harvestStock[variant] || 0;
            
            if (stock > 0) {
                hasItems = true;
                const item = document.createElement('div');
                item.className = 'store-item';
                item.innerHTML = `
                    <div class="item-info">
                        <div class="item-icon-large">${data.icon}</div>
                        <div class="item-details">
                            <h3>${data.name}</h3>
                            <p>Stock: ${stock}</p>
                            <p>Value: <span style="color:#2e8b57">${data.sellPrice}🪙 / ea</span></p>
                        </div>
                    </div>
                    <button class="ui-btn green">SELL (${stock * data.sellPrice}🪙)</button>
                `;
                
                item.querySelector('button').onclick = () => {
                    window.signalBus.emit('request-sell-harvest', variant);
                };

                container.appendChild(item);
            }
        });

        if (!hasItems) {
            container.innerHTML = `<div style="text-align:center; padding:20px; color:#666;">No crops available to sell.<br>Grow some in your garden!</div>`;
        }
    }

    showNotification(msg) {
        const notif = document.getElementById('system-notification');
        document.getElementById('notif-text').innerText = msg;
        notif.classList.remove('hidden');
        
        if (this.notifTimeout) clearTimeout(this.notifTimeout);
        this.notifTimeout = setTimeout(() => {
            notif.classList.add('hidden');
        }, 3000);
    }
}

window.uiManager = new UIManager();
