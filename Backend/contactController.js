const transporter = require('../utils/emailTransporter');
const emailConfig = require('../config/email');

const sendContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  // Validasi input
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Semua field harus diisi' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Format email tidak valid' });
  }

  const mailOptions = {
    from: `"Portofolio Contact" <${emailConfig.user}>`,
    to: emailConfig.to,
    subject: `Pesan dari ${name} - Portofolio`,
    text: `
      Nama: ${name}
      Email: ${email}
      Pesan: ${message}
    `,
    html: `
      <h3>Pesan Kontak Baru</h3>
      <p><strong>Nama:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Pesan:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Pesan berhasil dikirim' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Gagal mengirim pesan. Silakan coba lagi.' });
  }
};

module.exports = { sendContactMessage };