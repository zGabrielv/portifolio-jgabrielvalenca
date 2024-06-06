// api/sendEmail.js

const fetch = require('node-fetch');

module.exports = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const data = {
            "fromAddress": email,
            "toAddress": "contato@valencahsolutions.com.br",
            "subject": subject,
            "content": `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`
        };

        const response = await fetch('https://mail.zoho.com/api/accounts/854700766/messages', {
            method: 'POST',
            headers: {
                'Authorization': 'Zoho-oauthtoken YOUR_ZOHO_AUTH_TOKEN',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
        } else {
            const error = await response.json();
            res.status(response.status).json({ message: `Erro ao enviar mensagem: ${error.message}` });
        }
    } catch (error) {
        res.status(500).json({ message: `Erro ao enviar mensagem: ${error.message}` });
    }
};
