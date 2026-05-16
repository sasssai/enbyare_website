export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/contact' && request.method === 'POST') {
      return handleContact(request, env);
    }

    return env.ASSETS.fetch(request);
  }
};

async function handleContact(request, env) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: 'リクエスト形式が不正です' }, 400);
  }

  const { name, kana, affiliation, email, phone, message } = data;

  if (!name || !kana || !affiliation || !email || !phone) {
    return json({ error: '必須項目が不足しています' }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'メールアドレスの形式が不正です' }, 400);
  }

  const body = [
    `お名前: ${name}`,
    `フリガナ: ${kana}`,
    `所属: ${affiliation}`,
    `メール: ${email}`,
    `電話: ${phone}`,
    '',
    'お問い合わせ内容:',
    message || '(なし)'
  ].join('\n');

  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'えんびゃれ公式サイト <onboarding@resend.dev>',
      to: ['aizu.volun.tadami@gmail.com'],
      reply_to: email,
      subject: `【えんびゃれ公式サイト】${name}さんからのお問い合わせ`,
      text: body
    })
  });

  if (!resendRes.ok) {
    const errText = await resendRes.text();
    console.error('Resend API error:', resendRes.status, errText);
    return json({ error: '送信に失敗しました' }, 502);
  }

  return json({ ok: true });
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}
