class Combat {
    constructor() {
        this.log = [];
        this.isActive = false;
    }

    startCombat(player, enemy) {
        this.isActive = true;
        this.log = [];
        this.player = player;
        this.enemy = enemy;
        this.addLog(`⚔️ Combat: ${player.name} vs ${enemy.name}`);
    }

    calculateDamage(attacker, defender) {
        const weapon = getWeapon(attacker.currentWeapon);
        const base = attacker.attack + weapon.damage;
        const isCrit = Math.random() * 100 < weapon.critRate;
        const mult = isCrit ? 1.5 : 1;
        let final = base * mult - (defender.defense * 0.3);
        return { damage: Math.floor(final), isCrit };
    }

    playerAttack(player, enemy) {
        const result = this.calculateDamage(player, enemy);
        const actual = enemy.takeDamage(result.damage);
        const crit = result.isCrit ? ' 💥' : '';
        this.addLog(`${player.name} attacks: ${actual} dmg${crit}`);
        
        if (!enemy.isAlive()) {
            const xp = enemy.level * 50;
            player.gainXP(xp);
            this.addLog(`🎉 Victory! +${xp} XP`);
            this.isActive = false;
        }
        return result;
    }

    enemyAttack(enemy, player) {
        const result = this.calculateDamage(enemy, player);
        const actual = player.takeDamage(result.damage);
        this.addLog(`${enemy.name} attacks: ${actual} dmg`);
        
        if (!player.isAlive()) {
            this.addLog(`💀 Defeat!`);
            this.isActive = false;
        }
        return result;
    }

    addLog(msg) {
        this.log.push(msg);
    }

    getRecentLog(count = 5) {
        return this.log.slice(-count);
    }
}

class Enemy {
    constructor(name, level) {
        this.name = name;
        this.level = level;
        this.currentWeapon = 'talwar';
        const mult = 1 + (level * 0.15);
        this.attack = Math.floor(10 * mult);
        this.defense = Math.floor(5 * mult);
        this.maxHP = Math.floor(100 * mult);
        this.currentHP = this.maxHP;
        this.isDefending = false;
    }

    takeDamage(damage) {
        let reduced = damage - (this.defense * 0.5);
        if (this.isDefending) reduced *= 0.5;
        reduced = Math.max(1, reduced);
        this.currentHP -= reduced;
        return reduced;
    }

    isAlive() {
        return this.currentHP > 0;
    }

    getCurrentWeapon() {
        return getWeapon(this.currentWeapon);
    }
}

function generateEnemy(level = 2) {
    const names = ['Goblin', 'Skeleton', 'Orc', 'Demon', 'Dragon'];
    return new Enemy(names[Math.floor(Math.random() * names.length)], level);
}
