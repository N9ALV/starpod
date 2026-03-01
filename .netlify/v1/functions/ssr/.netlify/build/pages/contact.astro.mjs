import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_bMrKh8MO.mjs';
import { $ as $$Layout } from '../chunks/Layout_b1U6WeUI.mjs';
import { useState } from 'preact/hooks';
import { jsx, Fragment, jsxs } from 'preact/jsx-runtime';
export { renderers } from '../renderers.mjs';

function ContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  async function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.message) {
        setResponseMessage(data.message);
      }
      if (response.ok) {
        setFormSubmitted(true);
      }
    } catch {
    }
  }
  return jsx(Fragment, {
    children: formSubmitted ? `${responseMessage}` : jsxs("form", {
      class: "flex flex-col gap-2",
      onSubmit: submit,
      children: [jsx("input", {
        class: "input",
        type: "text",
        id: "name",
        name: "name",
        placeholder: "Enter your name",
        required: true
      }), jsx("input", {
        class: "input",
        type: "email",
        id: "email",
        name: "email",
        placeholder: "Enter your email",
        required: true
      }), jsx("textarea", {
        class: "input",
        id: "message",
        name: "message",
        placeholder: "Write a message",
        required: true
      }), jsx("div", {
        class: "my-6 flex w-full justify-end",
        children: jsx("button", {
          class: "btn w-full justify-center lg:w-auto",
          children: jsx("span", {
            class: "text-light-text-heading rounded-full px-12 py-3 text-center text-sm dark:text-white",
            children: "Submit"
          })
        })
      })]
    })
  });
}

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Contact" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="relative z-10 px-8 lg:px-18"> <h1 class="text-light-text-heading mb-4 text-2xl font-bold lg:mb-6 lg:text-5xl dark:text-white">
Get in touch
</h1> <p class="mb-8">
Have a question for us or a topic you would like us to cover on the show?
      Reach out here and we'll be in touch soon!
</p> ${renderComponent($$result2, "ContactForm", ContactForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/components/ContactForm", "client:component-export": "default" })} </div> ` })}`;
}, "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/pages/contact.astro", void 0);

const $$file = "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
