export default {
    async fetch(request, env) {
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders() });
        }

        if (request.method !== 'POST') {
            return new Response('Method not allowed', { status: 405 });
        }

        try {
            const { messages, lang } = await request.json();
            const apiKey = env.ZAI_API_KEY;

            if (!apiKey) {
                return new Response(JSON.stringify({
                    reply: 'Chat service is being configured. Please email info@luxon.hk.'
                }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders() }
                });
            }

            const systemPrompt = buildSystemPrompt(lang || 'en');

            // SECURITY: Sanitize messages to prevent prompt injection
            const sanitizedMessages = (messages || [])
                .filter(m => m.role === 'user' || m.role === 'assistant')
                .slice(-10);

            // Abuse detection
            if (sanitizedMessages.length > 50) {
                return new Response(JSON.stringify({
                    reply: 'Please start a new conversation.'
                }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders() }
                });
            }

            const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: env.MODEL || 'glm-4.5-air',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        ...sanitizedMessages
                    ],
                    max_tokens: parseInt(env.MAX_TOKENS) || 512,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                console.error(`Z.AI API error: ${response.status}`);
                return new Response(JSON.stringify({
                    reply: "I'm having trouble right now. Please email info@luxon.hk and we'll get back to you."
                }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders() }
                });
            }

            const data = await response.json();
            const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';

            return new Response(JSON.stringify({ reply }), {
                status: 200,
                headers: { 'Content-Type': 'application/json', ...corsHeaders() }
            });
        } catch (err) {
            console.error('Worker error:', err);
            return new Response(JSON.stringify({
                reply: 'Something went wrong. Please try again later.'
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json', ...corsHeaders() }
            });
        }
    }
};

function corsHeaders() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    };
}

function buildSystemPrompt(lang) {
    const prompts = {
        'en': `You are the AI assistant for Luxon HK (luxon.hk), a Hong Kong-based digital transformation company.

COMPANY INFO:
- Luxon HK provides AI assistant installation services
- Flagship product: OpenClaw AI Assistant Setup -- deploy a 24/7 AI employee that manages email, calendar, WhatsApp, Slack, and workflows
- Based in Hong Kong, serves clients across Asia Pacific
- Contact: info@luxon.hk, WhatsApp: +852 9738 1028

OPENCLAW SERVICE:
- White-glove installation with enterprise security hardening
- 24/7 autonomous AI assistant (reads Gmail, answers WhatsApp, manages calendar, follows up clients)
- Built-in memory, ongoing analysis, contract/terms analysis
- No technical knowledge required from the client
- Setup within 48 hours, live same day
- VPS ($5-10/mo) or Mac Mini options
- Security: Docker sandbox, firewall, exec allowlists, read-only defaults, kill switch
- 14-day hypercare included
- See pricing at: https://luxon.hk/pricing.html

BEHAVIOR:
- Be helpful, concise, and professional
- Answer questions about services, pricing, process
- If asked something you don't know, say so honestly
- For complex inquiries, suggest booking a call or emailing info@luxon.hk
- Keep responses short (2-4 sentences max unless asked for detail)
- Match the user's language (English, Cantonese, or Mandarin)
- Do NOT make up features or pricing not listed above
- If asked about pricing, direct them to https://luxon.hk/pricing.html`,

        'zh-HK': `你是 Luxon HK (luxon.hk) 的 AI 助手，一家香港的數碼轉型公司。

公司資訊：
- Luxon HK 提供 AI 助手安裝服務
- 主要產品：OpenClaw AI 助手設定 — 部署 24/7 AI 員工，管理電郵、日曆、WhatsApp、Slack 和工作流程
- 基於香港，服務亞太區客戶
- 聯絡方式：info@luxon.hk，WhatsApp：+852 9738 1028

行為指引：
- 有幫助、簡潔、專業
- 回答關於服務、價格、流程的問題
- 不確定的要誠實說不知道
- 複雜查詢建議預約諮詢或電郵 info@luxon.hk
- 保持回覆簡短（2-4 句）
- 配合用戶語言
- 不要編造功能或價格
- 價格查詢請導向 https://luxon.hk/pricing.html`,

        'zh-CN': `你是 Luxon HK (luxon.hk) 的 AI 助手，一家香港的数字化转型公司。

公司信息：
- Luxon HK 提供 AI 助手安装服务
- 主要产品：OpenClaw AI 助手设置 — 部署 24/7 AI 员工，管理邮件、日历、WhatsApp、Slack 和工作流程
- 基于香港，服务亚太区客户
- 联系方式：info@luxon.hk，WhatsApp：+852 9738 1028

行为指引：
- 有帮助、简洁、专业
- 回答关于服务、价格、流程的问题
- 不确定的要诚实说不知道
- 复杂查询建议预约咨询或发邮件 info@luxon.hk
- 保持回复简短（2-4 句）
- 配合用户语言
- 不要编造功能或价格
- 价格查询请导向 https://luxon.hk/pricing.html`
    };
    return prompts[lang] || prompts['en'];
}
