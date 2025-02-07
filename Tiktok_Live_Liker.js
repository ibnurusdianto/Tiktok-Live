const controlPanel = document.createElement('div');
controlPanel.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 99999;
    background: rgba(15, 15, 15, 0.95);
    padding: 24px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    min-width: 250px;
    font-family: 'Poppins', sans-serif;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
`;

document.body.appendChild(controlPanel);

const title = document.createElement('div');
title.innerHTML = '🤖 Live TikTok Auto Liker Pro';
title.style.cssText = `
    color: white;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    padding-bottom: 12px;
    border-bottom: 2px solid rgba(254, 44, 85, 0.3);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const authorButton = document.createElement('button');
authorButton.innerHTML = '👨‍💻 Author Info';
authorButton.style.cssText = `
    padding: 8px;
    background: linear-gradient(45deg, #2c3e50, #3498db);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 13px;
    margin-top: 5px;
`;

const helpButton = document.createElement('button');
helpButton.innerHTML = '❓ How to Use';
helpButton.style.cssText = `
    padding: 8px;
    background: linear-gradient(45deg, #27ae60, #2ecc71);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 13px;
    margin-top: 5px;
`;

const resetStatsButton = document.createElement('button');
resetStatsButton.innerHTML = '🔄 Reset Stats';
resetStatsButton.style.cssText = `
    padding: 8px;
    background: linear-gradient(45deg, #c0392b, #e74c3c);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 13px;
    margin-top: 5px;
    display: none;
`;

controlPanel.appendChild(title);
controlPanel.appendChild(authorButton);
controlPanel.appendChild(helpButton);

const controlsContainer = document.createElement('div');
controlsContainer.style.cssText = `
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const controlButton = document.createElement('button');
controlButton.innerHTML = '▶️ Start Auto Like';
controlButton.style.cssText = `
    padding: 12px;
    background: linear-gradient(45deg, #fe2c55, #ff6b81);
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 1px;
    box-shadow: 0 4px 15px rgba(254, 44, 85, 0.3);
`;

const intervalControl = document.createElement('div');
intervalControl.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    background: rgba(255, 255, 255, 0.05);
    padding: 10px;
    border-radius: 10px;
`;

const intervalLabel = document.createElement('span');
intervalLabel.innerHTML = '⏱️ Interval (sec):';
intervalLabel.style.cssText = `
    color: white;
    font-size: 14px;
`;

const intervalInput = document.createElement('input');
intervalInput.type = 'number';
intervalInput.min = '1';
intervalInput.max = '10';
intervalInput.value = '2';
intervalInput.style.cssText = `
    width: 70px;
    padding: 8px;
    border-radius: 8px;
    border: 2px solid rgba(254, 44, 85, 0.3);
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 14px;
    text-align: center;
`;

const likeLimitControl = document.createElement('div');
likeLimitControl.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    background: rgba(255, 255, 255, 0.05);
    padding: 10px;
    border-radius: 10px;
`;

const likeLimitLabel = document.createElement('span');
likeLimitLabel.innerHTML = '💖 Like Limit:';
likeLimitLabel.style.cssText = `
    color: white;
    font-size: 14px;
`;

const likeLimitInput = document.createElement('input');
likeLimitInput.type = 'number';
likeLimitInput.min = '1';
likeLimitInput.value = '100';
likeLimitInput.style.cssText = `
    width: 70px;
    padding: 8px;
    border-radius: 8px;
    border: 2px solid rgba(254, 44, 85, 0.3);
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 14px;
    text-align: center;
`;

const unlimitedLikesButton = document.createElement('button');
unlimitedLikesButton.innerHTML = '🔄 Toggle Unlimited Likes';
unlimitedLikesButton.style.cssText = `
    padding: 8px;
    background: linear-gradient(45deg, #f39c12, #e67e22);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 13px;
`;

likeLimitControl.appendChild(likeLimitLabel);
likeLimitControl.appendChild(likeLimitInput);
controlsContainer.appendChild(likeLimitControl);
controlsContainer.appendChild(unlimitedLikesButton);

const statsDisplay = document.createElement('div');
statsDisplay.style.cssText = `
    background: rgba(255, 255, 255, 0.05);
    padding: 15px;
    border-radius: 12px;
    font-size: 14px;
    color: white;
    line-height: 1.6;
    border: 1px solid rgba(255, 255, 255, 0.1);
`;

let isClicking = false;
let clickInterval;
let clickCount = 0;
let startTime = null;
let successCount = 0;
let failCount = 0;
let isUnlimitedLikes = false;
let isMenuVisible = true;

function updateStats() {
    const runTime = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;
    statsDisplay.innerHTML = `
        ⏰ Runtime: ${runTime}s<br>
        🎯 Total Clicks: ${clickCount}<br>
        ✅ Success: ${successCount}<br>
        ❌ Failed: ${failCount}<br>
        📊 Success Rate: ${(successCount / (successCount + failCount) * 100 || 0).toFixed(1)}%
    `;
    resetStatsButton.style.display = 'block';
}

function autoClick() {
    if (!isUnlimitedLikes && clickCount >= parseInt(likeLimitInput.value)) {
        stopClicking();
        alert('Like limit reached!');
        return;
    }
    try {
        const likeButton = document.querySelector('.css-1mk0i7a-DivLikeBtnIcon');
        if (likeButton) {
            likeButton.click();
            clickCount++;
            successCount++;
            updateStats();
        } else {
            failCount++;
            updateStats();
        }
    } catch (error) {
        console.error('Auto click error:', error);
        failCount++;
        updateStats();
    }
}

function startClicking() {
    if (isClicking) return;
    isClicking = true;
    startTime = Date.now();
    controlButton.innerHTML = '⏹️ Stop Auto Like';
    controlButton.style.background = 'linear-gradient(45deg, #666, #999)';
    intervalInput.disabled = true;
    likeLimitInput.disabled = isUnlimitedLikes;
    clickInterval = setInterval(autoClick, intervalInput.value * 1000);
    statsDisplay.style.display = 'block';
    resetStatsButton.style.display = 'block';
}

function stopClicking() {
    if (!isClicking) return;
    isClicking = false;
    controlButton.innerHTML = '▶️ Start Auto Like';
    controlButton.style.background = 'linear-gradient(45deg, #fe2c55, #ff6b81)';
    intervalInput.disabled = false;
    likeLimitInput.disabled = false;
    clearInterval(clickInterval);
}

function resetDisplayedStats() {
    startTime = null;
    updateStats();
}

function resetAllStats() {
    clickCount = 0;
    successCount = 0;
    failCount = 0;
    resetDisplayedStats();
    statsDisplay.style.display = 'none';
    resetStatsButton.style.display = 'none';
}

function showAuthorInfo() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(15, 15, 15, 0.95);
        padding: 24px;
        border-radius: 16px;
        z-index: 100000;
        color: white;
        text-align: center;
        min-width: 300px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
    `;
    
    modal.innerHTML = `
        <h3 style="margin-bottom: 15px;">👨‍💻 Author Information</h3>
        <p>https://github.com/ibnurusdianto</p>
        <p>Poor Coder</p>
        <h4 style="margin: 15px 0;">💝 Donation</h4>
        <p>DANA / OVO / SHOPEPAY : 08988109035</p>
        <p>Sewaria : https://saweria.co/ibnurusdianto</p>
        <button id="closeModal" style="
            margin-top: 15px;
            padding: 8px 16px;
            background: #fe2c55;
            border: none;
            border-radius: 8px;
            color: white;
            cursor: pointer;
        ">Close</button>
    `;
    
    document.body.appendChild(modal);
    document.getElementById('closeModal').onclick = () => modal.remove();
}

function showHowToUse() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(15, 15, 15, 0.95);
        padding: 24px;
        border-radius: 16px;
        z-index: 100000;
        color: white;
        text-align: left;
        min-width: 300px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
    `;
    
    modal.innerHTML = `
        <h3 style="margin-bottom: 15px; text-align: center;">❓ How to Use</h3>
        <ol style="margin-left: 20px; line-height: 1.6;">
            <li>Set your desired interval (in seconds)</li>
            <li>Set your desired like limit or choose Unlimited Likes</li>
            <li>Click "Start Auto Like" to begin</li>
            <li>Press ESC key to stop at any time</li>
            <li>Press R key to reset displayed statistics</li>
            <li>Use Reset Stats button to clear all current stats</li>
            <li>Press Home key to stop the auto liking process and close the menu</li>
            <li>Press Insert key to toggle menu visibility</li>
        </ol>
        <button id="closeHowTo" style="
            margin-top: 15px;
            padding: 8px 16px;
            background: #fe2c55;
            border: none;
            border-radius: 8px;
            color: white;
            cursor: pointer;
            width: 100%;
        ">Close</button>
    `;
    
    document.body.appendChild(modal);
    document.getElementById('closeHowTo').onclick = () => modal.remove();
}

authorButton.addEventListener('click', showAuthorInfo);
helpButton.addEventListener('click', showHowToUse);
resetStatsButton.addEventListener('click', resetAllStats);

intervalControl.appendChild(intervalLabel);
intervalControl.appendChild(intervalInput);
controlsContainer.appendChild(controlButton);
controlsContainer.appendChild(intervalControl);
controlsContainer.appendChild(statsDisplay);
controlsContainer.appendChild(resetStatsButton);
controlPanel.appendChild(controlsContainer);
controlsContainer.appendChild(likeLimitControl);
controlsContainer.appendChild(unlimitedLikesButton);

controlButton.addEventListener('click', () => {
    if (!isClicking) {
        startClicking();
    } else {
        stopClicking();
    }
});

unlimitedLikesButton.addEventListener('click', () => {
    isUnlimitedLikes = !isUnlimitedLikes;
    if (isUnlimitedLikes) {
        likeLimitInput.disabled = true;
        unlimitedLikesButton.innerHTML = '✅ Unlimited Likes Enabled';
    } else {
        likeLimitInput.disabled = false;
        unlimitedLikesButton.innerHTML = '🔄 Toggle Unlimited Likes';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Insert') {
        isMenuVisible = !isMenuVisible;
        controlPanel.style.display = isMenuVisible ? 'flex' : 'none';
    }
    if (e.key === 'Home') {
        stopClicking();
        controlPanel.style.display = 'none';
        alert('Program has been stopped and UI menu closed.');
    }
    if (e.key === 'Escape' && isClicking) {
        stopClicking();
    }
    if (e.key === 'r' && !isClicking) {
        resetDisplayedStats();
    }
});

controlButton.addEventListener('mouseover', () => controlButton.style.opacity = '0.8');
controlButton.addEventListener('mouseout', () => controlButton.style.opacity = '1');

window.addEventListener('beforeunload', () => {
    if (isClicking) {
        stopClicking();
    }
});

console.log('✨ Enhanced TikTok Auto Liker initialized! Press ESC to stop, R to reset displayed stats, Insert to toggle menu visibility, Home to stop the program and close the UI.');
