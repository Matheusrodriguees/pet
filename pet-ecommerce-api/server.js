import app from './app.js'
const port = process.env.PORT || 3013;

app.listen(port, '0.0.0.0', async () => {
    console.log(`🚀 Servidor iniciado na porta ${port}! 🚀`);
});
