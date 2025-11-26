// script.js - Version avec mascotte interactive
class EcoGame {
    constructor() {
        this.score = 0;
        this.lives = 3;
        this.currentWaste = null;
        this.soundEnabled = true;
        this.mascotteName = "Léo le Renard Écolo";
        
        this.wastes = [
            { name: "Bouteille plastique", type: "plastic", emoji: "🧴" },
            { name: "Journal", type: "paper", emoji: "📰" },
            { name: "Bouteille en verre", type: "glass", emoji: "🍾" },
            { name: "Brique de lait", type: "plastic", emoji: "🥛" },
            { name: "Canette", type: "plastic", emoji: "🥫" },
            { name: "Papier cadeau", type: "paper", emoji: "🎁" },
            { name: "Pot de confiture", type: "glass", emoji: "🍯" },
            { name: "Pile usagée", type: "other", emoji: "🔋" },
            { name: "Carton", type: "paper", emoji: "📦" },
            { name: "Sac plastique", type: "plastic", emoji: "🛍️" },
            { name: "Boîte de conserve", type: "other", emoji: "🥫" },
            { name: "Verre à boire", type: "glass", emoji: "🥛" }
        ];

        this.mascotteMessages = {
            welcome: [
                "Salut ! Aide-moi à trier ces déchets !",
                "Prêt à devenir un super écolo ?",
                "Ensemble, protégeons notre planète !"
            ],
            correct: [
                "Super ! Tu es un champion du tri !",
                "Bravo ! La Terre te dit merci !",
                "Excellent choix ! Tu progresses bien !",
                "Génial ! Tu maîtrises parfaitement le tri !"
            ],
            incorrect: [
                "Oh non ! Ce n'est pas la bonne poubelle...",
                "Attention ! Essayons encore !",
                "Presque ! Souviens-toi du guide !",
                "Ce déchet va ailleurs !"
            ],
            gameover: [
                "Oh non ! On a perdu... Mais on peut réessayer !",
                "Ne t'inquiète pas ! On va s'améliorer !",
                "C'est dommage ! Retentons notre chance !"
            ]
        };
        
        this.init();
    }
    
    init() {
        this.updateDisplay();
        this.showMascotteMessage('welcome');
        console.log('🎮 Eco-Aventurier avec Léo initialisé !');
    }
    
    startGame() {
        this.score = 0;
        this.lives = 3;
        this.hideOverlay();
        this.updateDisplay();
        this.showMascotteMessage('welcome');
        setTimeout(() => {
            this.nextWaste();
        }, 1000);
    }
    
    nextWaste() {
        const randomIndex = Math.floor(Math.random() * this.wastes.length);
        this.currentWaste = this.wastes[randomIndex];
        
        document.getElementById('question').textContent = 
            `Dans quelle poubelle vas-tu le mettre ?`;
        
        // Animation de lancer du déchet par la mascotte
        this.throwWaste();
        
        // Afficher le message de la mascotte
        this.showMascotteMessage('welcome');
    }
    
    throwWaste() {
        const flyingWaste = document.getElementById('flying-waste');
        const wasteImage = document.getElementById('waste-image');
        
        // Préparer le déchet volant
        flyingWaste.textContent = this.currentWaste.emoji;
        flyingWaste.className = 'flying-waste flying';
        
        // Après l'animation, afficher le déchet dans la zone de réception
        setTimeout(() => {
            flyingWaste.className = 'flying-waste';
            wasteImage.textContent = this.currentWaste.emoji;
            wasteImage.className = 'waste-image';
        }, 800);
    }
    
    checkAnswer(selectedType) {
        const wasteImage = document.getElementById('waste-image');
        const mascotte = document.getElementById('mascotte');
        
        if (selectedType === this.currentWaste.type) {
            // Bonne réponse
            this.score += 10;
            wasteImage.classList.add('correct');
            mascotte.classList.add('mascotte-happy');
            this.showMascotteMessage('correct');
            this.playSound('correct');
            this.checkRewards();
            
            setTimeout(() => {
                mascotte.classList.remove('mascotte-happy');
            }, 1000);
        } else {
            // Mauvaise réponse
            this.lives--;
            wasteImage.classList.add('incorrect');
            mascotte.classList.add('mascotte-sad');
            this.showMascotteMessage('incorrect');
            this.playSound('incorrect');
            
            setTimeout(() => {
                mascotte.classList.remove('mascotte-sad');
            }, 1000);
            
            if (this.lives <= 0) {
                this.gameOver();
                return;
            }
        }
        
        this.updateDisplay();
        
        // Prochain déchet après un délai
        setTimeout(() => {
            this.nextWaste();
        }, 2000);
    }
    
    gameOver() {
        this.playSound('gameover');
        this.showMascotteMessage('gameover');
        
        setTimeout(() => {
            alert(`💔 Game Over!\nTon score: ${this.score} points\n${this.mascotteName} est triste mais fier de toi !`);
            this.showScreen('home');
        }, 1500);
    }
    
    showMascotteMessage(type) {
        const messages = this.mascotteMessages[type];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        document.getElementById('speech-bubble').textContent = randomMessage;
    }
    
    checkRewards() {
        // Débloquer les récompenses selon le score
        if (this.score >= 50) {
            const reward1 = document.getElementById('reward-1');
            reward1.classList.remove('locked');
            reward1.querySelector('.reward-badge').textContent = '🌱';
        }
        if (this.score >= 100) {
            const reward2 = document.getElementById('reward-2');
            reward2.classList.remove('locked');
            reward2.querySelector('.reward-badge').textContent = '🦊';
        }
        if (this.score >= 200) {
            const reward3 = document.getElementById('reward-3');
            reward3.classList.remove('locked');
            reward3.querySelector('.reward-badge').textContent = '🏆';
        }
    }
    
    updateDisplay() {
        document.getElementById('score').textContent = this.score;
        
        let livesText = '';
        for (let i = 0; i < 3; i++) {
            livesText += i < this.lives ? '❤️' : '♡';
        }
        document.getElementById('lives').textContent = livesText;
    }
    
    showScreen(screen) {
        this.hideAllOverlays();
        
        switch(screen) {
            case 'home':
                document.getElementById('home-overlay').classList.add('active');
                break;
            case 'learn':
                document.getElementById('learn-overlay').classList.add('active');
                break;
            case 'rewards':
                document.getElementById('rewards-overlay').classList.add('active');
                break;
        }
    }
    
    hideOverlay() {
        this.hideAllOverlays();
    }
    
    hideAllOverlays() {
        document.querySelectorAll('.overlay').forEach(overlay => {
            overlay.classList.remove('active');
        });
    }
    
    playSound(type) {
        if (!this.soundEnabled) return;
        
        const sounds = {
            correct: () => {
                try {
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const oscillator = audioContext.createOscillator();
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
                    oscillator.connect(audioContext.destination);
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.3);
                } catch (e) {
                    console.log('🎵 Correct!');
                }
            },
            incorrect: () => {
                try {
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const oscillator = audioContext.createOscillator();
                    oscillator.type = 'sawtooth';
                    oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
                    oscillator.connect(audioContext.destination);
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.5);
                } catch (e) {
                    console.log('💥 Incorrect!');
                }
            },
            gameover: () => {
                console.log('💔 Game Over!');
            }
        };
        
        if (sounds[type]) {
            sounds[type]();
        }
    }
    
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        const btn = document.getElementById('sound-btn');
        btn.textContent = this.soundEnabled ? '🔊' : '🔇';
    }
}

// Initialisation globale
let game;

document.addEventListener('DOMContentLoaded', function() {
    game = new EcoGame();
});

// Fonctions globales pour HTML
function startGame() {
    game.startGame();
}

function checkAnswer(type) {
    game.checkAnswer(type);
}

function showScreen(screen) {
    game.showScreen(screen);
}

function hideOverlay() {
    game.hideOverlay();
}

function toggleSound() {
    game.toggleSound();
}
