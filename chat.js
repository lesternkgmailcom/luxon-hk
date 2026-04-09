(function() {
    const TOGGLE = document.getElementById('chatToggle');
    const PANEL = document.getElementById('chatPanel');
    const INPUT = document.getElementById('chatInput');
    const SEND = document.getElementById('chatSend');
    const MESSAGES = document.getElementById('chatMessages');
    const WIDGET = document.getElementById('luxon-chat');
    const API_URL = 'https://luxon-chat.lesterkong.workers.dev/chat';
    const MAX_HISTORY = 20;

    if (!TOGGLE || !PANEL || !INPUT || !SEND || !MESSAGES || !WIDGET) return;

    // i18n support
    const lang = document.documentElement.lang || 'en';
    const i18n = window.translations?.[lang] || window.translations?.['en'] || {};
    const strings = {
        greeting: i18n['chat.greeting'] || "Hi! I'm Luxon's AI assistant. How can I help you today?",
        placeholder: i18n['chat.placeholder'] || 'Type a message...',
        title: i18n['chat.title'] || 'Luxon AI',
        status: i18n['chat.status'] || 'Online',
        error: i18n['chat.error'] || 'Sorry, something went wrong. Please try again or email us at info@luxon.hk',
        apiError: i18n['chat.apiError'] || "I'm having trouble right now. Please email info@luxon.hk and we'll get back to you.",
        genericError: i18n['chat.genericError'] || 'Something went wrong. Please try again later.'
    };

    // Set localized strings
    INPUT.placeholder = strings.placeholder;

    let messages = [];
    let isOpen = false;
    let isTyping = false;

    // Inject localized greeting on load
    addMessage(strings.greeting, 'bot');

    // Toggle chat panel
    TOGGLE.addEventListener('click', () => {
        isOpen = !isOpen;
        WIDGET.classList.toggle('open', isOpen);
        if (isOpen) INPUT.focus();
    });

    // Send message
    function send() {
        const text = INPUT.value.trim();
        if (!text || isTyping) return;
        INPUT.value = '';
        addMessage(text, 'user');
        getResponse(text);
    }

    SEND.addEventListener('click', send);
    INPUT.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') send();
    });

    function addMessage(text, role) {
        messages.push({ role, content: text });
        if (messages.length > MAX_HISTORY) messages = messages.slice(-MAX_HISTORY);

        const div = document.createElement('div');
        div.className = `chat-message ${role}`;
        div.innerHTML = `<div class="chat-bubble">${escapeHtml(text)}</div>`;
        MESSAGES.appendChild(div);
        MESSAGES.scrollTop = MESSAGES.scrollHeight;
    }

    function showTyping() {
        isTyping = true;
        SEND.disabled = true;
        const div = document.createElement('div');
        div.className = 'chat-message bot';
        div.id = 'typing-indicator';
        div.innerHTML = '<div class="chat-bubble typing">...</div>';
        MESSAGES.appendChild(div);
        MESSAGES.scrollTop = MESSAGES.scrollHeight;
    }

    function hideTyping() {
        isTyping = false;
        SEND.disabled = false;
        const el = document.getElementById('typing-indicator');
        if (el) el.remove();
    }

    async function getResponse(userText) {
        showTyping();
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: messages.slice(-MAX_HISTORY),
                    lang: lang
                })
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            hideTyping();
            addMessage(data.reply || strings.error, 'bot');
        } catch (err) {
            hideTyping();
            addMessage(strings.error, 'bot');
        }
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
})();
