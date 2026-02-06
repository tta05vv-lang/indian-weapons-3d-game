class Player {
    constructor(name, profession, weapon) {
        this.name = name;
        this.profession = profession;
        this.level = 1;
        this.xp = 0;
        this.xpToNextLevel = 100;
        this.maxHP = 100;
        this.currentHP = 100;
        this.attack = 10;
        this.defense = 5;
        this.currentWeapon = weapon;
        this.isDefending = false;
    }

    gainXP(amount) {
        this.xp += amount;
        if (this.xp >= this.xpToNextLevel) {
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        this.xp = 0;
        this.maxHP += 20;
        this.currentHP = this.maxHP;
        this.attack += 5;
    }

    takeDamage(damage) {
        let reduced = damage - (this.defense * 0.5);
        if (this.isDefending) reduced *= 0.5;
        reduced = Math.max(1, reduced);
        this.currentHP -= reduced;
        return reduced;
    }

    heal(amount) {
        this.currentHP = Math.min(this.currentHP + amount, this.maxHP);
    }

    getCurrentWeapon() {
        return getWeapon(this.currentWeapon);
    }

    isAlive() {
        return this.currentHP > 0;
    }
}
