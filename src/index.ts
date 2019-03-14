import express from 'express';
import { Request, Response } from 'express';

const app = express();
const {
    PORT = 3000,
} = process.env;


app.get('/', (req: Request, res: Response) => {
    res.send({
        message: "Welcome Boilerplate",
    });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log("Listening on " + PORT);
    });
}

export default app;
