# Privacy and Safety

**What you paste is data you're sharing.** Prompts may be stored, logged, or reviewed depending on the tool, plan and settings. Treat an AI chat like any external service.

## Never paste
- Passwords, API keys, tokens, private keys, `.env` contents.
- Customer or patient data, personal details of others (names, addresses, e-mails, phone numbers).
- Confidential company documents your policy doesn't allow.
- Code under an NDA or licence that forbids sharing, if the tool isn't approved for it.

## Share safely instead
- Replace secrets with placeholders like `API_KEY` or `<redacted>`.
- Use **fake or anonymised** sample data (Ada, Grace, `test@example.com`).
- Paste the **minimum** needed: the one function, not the repository; the error, not the full log with user IDs.
- Use the **tool and plan your employer has approved**. Business/enterprise plans typically don't train on your data and offer data-retention controls; consumer plans may differ. Check the settings.

## In Germany / the EU
Personal data falls under the **GDPR (DSGVO)**. Pasting customer data into an AI tool is a data transfer that needs a legal basis and usually a data processing agreement (**Auftragsverarbeitungsvertrag, AVV**) with the provider. For client projects: don't paste client data unless the client and your company have agreed to it. The **EU AI Act** adds transparency duties, for example labelling AI-generated content in some contexts.

## If you leaked a secret
Treat it as compromised: **rotate it** (create a new key, revoke the old one). Deleting the chat doesn't un-send it. Same rule as a secret pushed to GitHub ([[github/Security]]).

## Building with AI: prompt injection
If your app feeds untrusted text (user input, web pages, e-mails, documents) to a model, that text can contain instructions ("ignore previous instructions and…"). Defences:
- Never rely on the system prompt for security; **enforce permissions in code**.
- Give the model only the tools and data the task needs.
- Require human confirmation for actions with consequences (sending, deleting, paying).
- Mark untrusted input clearly (tags) and treat model output as untrusted too: escape it before rendering it as HTML ([[javascript/Security]]).

## Responsibility
| Instead of | Prefer |
|---|---|
| shipping AI-written code you haven't read because the tests are green | reviewing it like a colleague's pull request: you own what you merge |
| submitting AI-generated work as entirely your own where that isn't allowed | following your school's, IHK's or company's rules on disclosure |
| assuming generated text or code is free of licence or copyright issues | checking anything that closely resembles existing work before publishing it |
| letting AI make decisions about people (grades, hiring) unchecked | a human who reviews and is accountable |
