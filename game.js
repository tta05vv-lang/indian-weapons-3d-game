class Game {
    constructor() {
        this.gameMode = null;
    }

    startGameMode(mode) {
        if (!currentPlayer) {
            alert('Create character first!');
            return;
        }
        this.gameMode = mode;
        document.getElementById('main-menu').style.display = 'none';
        document.getElementById('game-hud').style.display = 'flex';
        this.spawnNewEnemy();
    }

    spawnNewEnemy() {
        currentEnemy = generateEnemy(currentPlayer.level);
        combatSystem.startCombat(currentPlayer, currentEnemy);
        updateHUD();
        updateCombatLog();
    }

    playerAttack() {
        if (!combatSystem.isActive) return;
        
        combatSystem.playerAttack(currentPlayer, currentEnemy);
        updateHUD();
        updateCombatLog();
        
        if (!combatSystem.isActive) {
            setTimeout(() => {
                if (confirm('Enemy defeated! Continue?')) {
                    this.spawnNewEnemy();
                } else {
                    this.returnToMenu();
                }
            }, 800);
            return;
        }

        setTimeout(() => {
            if (combatSystem.isActive) {
                combatSystem.enemyAttack(currentEnemy, currentPlayer);
                updateHUD();
                updateCombatLog();

                if (!combatSystem.isActive) {
                    setTimeout(() => {
                        alert('Game Over!');
                        this.returnToMenu();
                    }, 800);
                }
            }
        }, 1200);
    }

    defendAction() {
        if (!combatSystem.isActive) return;
        currentPlayer.isDefending = true;
        combatSystem.addLog(`${currentPlayer.name} defends! 🛡️`);
        updateCombatLog();
    }

    returnToMenu() {
        combatSystem.isActive = false;
        document.getElementById('game-hud').style.display = 'none';
        document.getElementById('main-menu').style.display = 'flex';
    }
}

window.addEventListener('load', () => {
    game = new Game();
});
