let currentPlayer = null;
let currentEnemy = null;
let combatSystem = new Combat();
let game = null;

function showCharacterCreation() {
    document.getElementById('character-creation').style.display = 'flex';
}

function hideCharacterCreation() {
    document.getElementById('character-creation').style.display = 'none';
}

function selectProfession(prof) {
    document.querySelectorAll('.profession-card').forEach(c => c.classList.remove('selected'));
    document.querySelector(`[data-profession="${prof}"]`).classList.add('selected');
}

function createCharacter() {
    const name = document.getElementById('char-name').value || 'Warrior';
    const prof = document.querySelector('.profession-card.selected')?.dataset.profession || 'warrior';
    
    currentPlayer = new Player(name, prof, 'talwar');
    hideCharacterCreation();
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('game-hud').style.display = 'flex';
    updateHUD();
}

function updateHUD() {
    if (!currentPlayer) return;
    
    document.getElementById('player-name').textContent = currentPlayer.name;
    document.getElementById('level').textContent = currentPlayer.level;
    document.getElementById('profession').textContent = currentPlayer.profession;
    
    const hp = (currentPlayer.currentHP / currentPlayer.maxHP) * 100;
    document.getElementById('hp-bar').style.width = hp + '%';
    
    const weapon = currentPlayer.getCurrentWeapon();
    document.getElementById('weapon-name').textContent = weapon.name;
    document.getElementById('weapon-desc').textContent = weapon.description;
}

function updateCombatLog() {
    const messages = combatSystem.getRecentLog(5);
    const logDiv = document.getElementById('combat-messages');
    logDiv.innerHTML = '';
    messages.forEach(msg => {
        const p = document.createElement('p');
        p.textContent = msg;
        p.className = 'message';
        logDiv.appendChild(p);
    });
}

window.addEventListener('load', () => {
    document.getElementById('main-menu').style.display = 'flex';
});
