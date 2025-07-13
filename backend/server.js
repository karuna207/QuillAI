import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js'; 
import puppeteer from 'puppeteer';

const app = express();


await connectDB();

//Middlewares

app.use(cors());
app.use(express.json());
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);


app.get('/', (req, res) => {
    res.send("API is working");
})


// server.js
app.get('/generate-pdf', async (req, res) => {
    const blogId = req.query.id;
    const frontendUrl = process.env.FRONTEND_URL;
    const blogUrl = `${frontendUrl}/blog/${blogId}`;

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(blogUrl, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
        });

        await browser.close();

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="blog-${blogId}.pdf"`,
        });

        res.send(pdfBuffer);
    } catch (err) {
        res.status(500).send('PDF generation failed');
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log("Server is running in port " + PORT) });

export default app;