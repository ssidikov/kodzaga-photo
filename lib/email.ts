import nodemailer from "nodemailer9";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const STYLE = `
  body { margin:0; padding:0; background:radial-gradient(ellipse at 50% 0%,rgba(255,152,108,0.18) 0%,rgba(255,195,155,0.06) 40%,#FCFCFC 70%),#FCFCFC; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; color:#2A2A2A; }
  .container { max-width:560px; margin:0 auto; background-color:#FFFFFF; }
  .header { padding:56px 44px 40px; text-align:center; border-bottom:1px solid #ECE5D8; }
  .logo { font-size:18px; font-weight:400; letter-spacing:0.32em; color:#8B6914; text-transform:uppercase; }
  .content { padding:44px; }
  .title { font-size:24px; font-weight:400; color:#1A1A1A; margin:0 0 10px; line-height:1.25; letter-spacing:-0.01em; }
  .subtitle { font-size:14px; color:#6B6B6B; line-height:1.65; margin:0 0 36px; }
  .card { background-color:#F8F7F5; border:1px solid #EBE5D8; padding:32px; margin-bottom:36px; }
  .card-title { font-size:10px; font-weight:500; letter-spacing:0.18em; text-transform:uppercase; color:#8B6914; margin:0 0 22px; }
  .field { margin-bottom:16px; }
  .field:last-child { margin-bottom:0; }
  .field-label { font-size:9px; font-weight:500; letter-spacing:0.15em; text-transform:uppercase; color:#8A8A8A; margin-bottom:5px; }
  .field-value { font-size:14px; color:#2A2A2A; line-height:1.6; }
  .field-value a { color:#8B6914; text-decoration:none; }
  .btn { display:inline-block; padding:15px 40px; background-color:#C9A84C; border:1px solid #C9A84C; color:#FFFFFF; text-decoration:none; font-size:11px; font-weight:500; letter-spacing:0.16em; text-transform:uppercase; text-align:center; }
  .footer { padding:36px 44px; text-align:center; border-top:1px solid #ECE5D8; }
  .footer-text { font-size:10px; color:#9A9A9A; letter-spacing:0.08em; line-height:1.9; }
  .footer-link { color:#8B6914; text-decoration:none; }
`;

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  prestation: string;
  date: string;
  lieu: string;
  options: string[];
  message: string;
}

function clientEmailHtml(data: ContactFormData): string {
  const safe = safeContactData(data);
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><style>${STYLE}</style></head>
<body>
<div class="container">
  <div class="header">
    <div class="logo">AL3X Photos</div>
  </div>
  <div class="content">
    <h1 class="title">Votre demande a bien &eacute;t&eacute; re&ccedil;ue</h1>
    <p class="subtitle">Merci ${safe.name}. Je vous r&eacute;pondrai dans un d&eacute;lai de 48 heures maximum.</p>
    <div class="card">
      <p class="card-title">R&eacute;capitulatif de votre demande</p>
      <div class="field"><p class="field-label">Prestation</p><p class="field-value">${safe.prestation}</p></div>
      ${data.date ? `<div class="field"><p class="field-label">Date souhait&eacute;e</p><p class="field-value">${formatDate(data.date)}</p></div>` : ""}
      ${safe.lieu ? `<div class="field"><p class="field-label">Lieu</p><p class="field-value">${safe.lieu}</p></div>` : ""}
      ${safe.options.length ? `<div class="field"><p class="field-label">Options</p><p class="field-value">${safe.options.join(" &middot; ")}</p></div>` : ""}
      ${safe.message ? `<div class="field"><p class="field-label">Message</p><p class="field-value">${safe.message}</p></div>` : ""}
    </div>
    <a href="https://al3x-photos.fr" class="btn">Visiter le site</a>
  </div>
  <div class="footer">
    <p class="footer-text">
      AL3X Photos &middot; Photographe professionnel<br>
      <a href="https://al3x-photos.fr" class="footer-link">al3x-photos.fr</a>
      &nbsp;&middot;&nbsp;
      <a href="mailto:al3x.photo.site@gmail.com" class="footer-link">al3x.photo.site@gmail.com</a>
    </p>
  </div>
</div>
</body>
</html>`;
}

function adminEmailHtml(data: ContactFormData): string {
  const safe = safeContactData(data);
  const replyHref = mailtoHref(data.email);
  const now = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><style>${STYLE}</style></head>
<body>
<div class="container">
  <div class="header">
    <div class="logo">AL3X Photos</div>
  </div>
  <div class="content">
    <h1 class="title">Nouvelle demande de r&eacute;servation</h1>
    <p class="subtitle">Re&ccedil;ue le ${now}</p>
    <div class="card">
      <p class="card-title">Coordonn&eacute;es</p>
      <div class="field"><p class="field-label">Nom</p><p class="field-value">${safe.name}</p></div>
      <div class="field"><p class="field-label">Email</p><p class="field-value"><a href="${replyHref}">${safe.email}</a></p></div>
      ${safe.phone ? `<div class="field"><p class="field-label">T&eacute;l&eacute;phone</p><p class="field-value">${safe.phone}</p></div>` : ""}
    </div>
    <div class="card">
      <p class="card-title">D&eacute;tails de la prestation</p>
      <div class="field"><p class="field-label">Prestation</p><p class="field-value">${safe.prestation}</p></div>
      ${data.date ? `<div class="field"><p class="field-label">Date souhait&eacute;e</p><p class="field-value">${formatDate(data.date)}</p></div>` : ""}
      ${safe.lieu ? `<div class="field"><p class="field-label">Lieu</p><p class="field-value">${safe.lieu}</p></div>` : ""}
      ${safe.options.length ? `<div class="field"><p class="field-label">Options</p><p class="field-value">${safe.options.join(" &middot; ")}</p></div>` : ""}
      ${safe.message ? `<div class="field"><p class="field-label">Message</p><p class="field-value">${safe.message}</p></div>` : ""}
    </div>
    <a href="${replyHref}" class="btn">R&eacute;pondre au client</a>
  </div>
  <div class="footer">
    <p class="footer-text">
      AL3X Photos &middot; Notification automatique
    </p>
  </div>
</div>
</body>
</html>`;
}

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  const months = [
    "janvier",
    "f&eacute;vrier",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "ao&ucirc;t",
    "septembre",
    "octobre",
    "novembre",
    "d&eacute;cembre",
  ];
  if (!y || !m || !d || !months[parseInt(m) - 1]) return escapeHtml(dateStr);
  return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`;
}

function safeContactData(data: ContactFormData) {
  return {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    phone: escapeHtml(data.phone),
    prestation: escapeHtml(data.prestation),
    lieu: escapeHtml(data.lieu),
    options: data.options.map(escapeHtml),
    message: escapeHtml(data.message),
  };
}

function mailtoHref(email: string) {
  return `mailto:${encodeURIComponent(email)}`;
}

function cleanHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").slice(0, 180);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendClientConfirmation(data: ContactFormData) {
  return transporter.sendMail({
    from: `"AL3X Photos" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: `Confirmation de votre demande · AL3X Photos`,
    html: clientEmailHtml(data),
  });
}

export async function sendAdminNotification(data: ContactFormData) {
  return transporter.sendMail({
    from: `"Formulaire AL3X" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL!,
    replyTo: data.email,
    subject: `Nouvelle demande · ${cleanHeader(data.name)} (${cleanHeader(data.prestation)})`,
    html: adminEmailHtml(data),
  });
}
