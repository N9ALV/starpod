export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({
  request
}) => {
  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");
  if (!name || !email || !message) {
    return new Response(JSON.stringify({
      message: "Missing required fields"
    }), {
      status: 400
    });
  }
  await fetch(undefined                               , {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      embeds: [{
        title: "New Contact Form Submission",
        color: 5793266,
        fields: [{
          name: "Name",
          value: String(name),
          inline: true
        }, {
          name: "Email",
          value: String(email),
          inline: true
        }, {
          name: "Message",
          value: String(message),
          inline: false
        }],
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }]
    })
  });
  return new Response(JSON.stringify({
    message: `Thanks for contacting us! We'll be in touch soon.`
  }), {
    status: 200
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
