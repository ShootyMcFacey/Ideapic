const canvas = document.getElementById('matrixRain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Chaotic mix of alphanumeric, math operators, block symbols, and retro glyphs
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}|:<>?~=-[]\\;',./±§!£¢∞§¶•ªº–≠∑œ∑´®†¥¨ˆøπ“‘«åß∂ƒ©˙∆˚¬…æΩ≈ç√∫˜µ≤≥÷█▓▒░■□▪▫▬▲►▼◄◊○●◘◙◦☺☻♥♦♣♠•◘○";
const charArray = characters.split('');

const fontSize = 14; // Smaller for dense effect
const columns = Math.floor(canvas.width / fontSize);

// Array of drops - one per column
// We will store objects to hold the y coordinate and current color/glitch state
const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = {
        y: Math.random() * canvas.height, // Start randomly across the screen for chaos
        speed: Math.random() * 2 + 1,     // Random speed to make it unpredictable and fast
        glitchCooldown: 0
    };
}

// Spectrum palette for glitch effects
const colors = {
    green: '#00FF00',
    cyan: '#00FFFF',
    magenta: '#FF00FF',
    white: '#FFFFFF'
};

function draw() {
    // Uneven/unpredictable fade effect for trails
    const fadeOpacity = Math.random() * 0.15 + 0.05; // Random between 0.05 and 0.2
    ctx.fillStyle = `rgba(0, 0, 0, ${fadeOpacity})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px 'Press Start 2P', monospace`;

    for (let i = 0; i < drops.length; i++) {
        // Pick a random character
        const text = charArray[Math.floor(Math.random() * charArray.length)];

        // Chaotic Palette Logic
        let charColor = colors.green; // Default intense matrix green

        // Randomly bleed into Cyan/Magenta/White for impact points or trails
        if (Math.random() < 0.05) {
            charColor = colors.white; // Leading character often white
        } else if (Math.random() < 0.1) {
            // Glitch color
            charColor = Math.random() > 0.5 ? colors.cyan : colors.magenta;
        }

        ctx.fillStyle = charColor;

        // Add random horizontal jitter for glitchy feel
        let xPos = i * fontSize;
        if (Math.random() < 0.02) {
            xPos += (Math.random() > 0.5 ? 1 : -1) * 2;
        }

        // Draw the character
        ctx.fillText(text, xPos, drops[i].y * fontSize);

        // Reset drop to top randomly, making it chaotic
        if (drops[i].y * fontSize > canvas.height && Math.random() > 0.9) {
            drops[i].y = 0;
            drops[i].speed = Math.random() * 2 + 1; // Pick new speed
        }

        // Move the drop down (faster and unpredictable)
        drops[i].y += drops[i].speed + (Math.random() * 0.5);
    }
}

// Faster than standard 33ms to make it chaotic and fast-moving
setInterval(draw, 25);

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const newColumns = Math.floor(canvas.width / fontSize);

    // Adjust drops array size
    if (newColumns > drops.length) {
        for (let x = drops.length; x < newColumns; x++) {
            drops[x] = {
                y: Math.random() * canvas.height,
                speed: Math.random() * 2 + 1,
                glitchCooldown: 0
            };
        }
    } else {
        drops.length = newColumns;
    }
});
