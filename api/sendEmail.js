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
                    'Authorization': 'Zoho-oauthtoken https://www.valencahsolutions.com.br/callback?code=1000.36d6ddd6aa1998aa78140fe38a282c71.8e8090f56a984b900aa47b726bbf3e4f&location=us&accounts-server=https%3A%2F%2Faccounts.zoho.com',
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
