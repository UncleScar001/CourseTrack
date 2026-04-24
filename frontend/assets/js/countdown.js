/* ============================================================
   COUNTDOWN TIMER UTILITIES
   ============================================================ */

function formatTimeRemaining(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds, totalSeconds };
}

function createCountdown(targetDate, onUpdate) {
    const target = new Date(targetDate).getTime();
    let timerId = null;
    
    function update() {
        const now = new Date().getTime();
        const remaining = target - now;
        
        if (remaining <= 0) {
            clearInterval(timerId);
            if (onUpdate) onUpdate({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
        }
        
        const time = formatTimeRemaining(remaining);
        if (onUpdate) onUpdate(time);
    }
    
    return {
        start() {
            update();
            timerId = setInterval(update, 1000);
        },
        stop() {
            if (timerId) clearInterval(timerId);
        },
        getRemaining() {
            return new Date(target).getTime() - new Date().getTime();
        }
    };
}

function formatCountdownDisplay(days, hours, minutes, seconds) {
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
}