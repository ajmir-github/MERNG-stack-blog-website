import app from "../../server/app";
// setup
const router = app.Router();

const logMethod = (req, res) => {
  res.json(req.method);
};

router.post(logMethod);

export default async function handle(req, res) {
  await router.handle(req, res);
}
