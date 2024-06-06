
// api/sendEmail.js

const fetch = require('node-fetch');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Método não permitido' });
        return;
    }

    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // Convertendo o Buffer para string
    });

    req.on('end', async () => {
        try {
            const { name, email, subject, message } = JSON.parse(body);

            const data = {
                "fromAddress": email,
                "toAddress": "contato@valencahsolutions.com.br",
                "subject": subject,
                "content": `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`
            };

            const response = await fetch('https://mail.zoho.com/api/accounts/854700766/messages', {
                method: 'POST',
                headers: {
                    'Authorization': 'Zoho-oauthtoken 1000.d198af82d855b1a572e4ca145ebcc5c3.91884ad797d3a071732a1b1a30981039', // Substitua pelo seu token de autenticação
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
    });
};