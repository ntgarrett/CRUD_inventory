import { withSessionRoute } from "../../../lib/withSession";

export default withSessionRoute(logoutRoute);

async function logoutRoute(req, res) {
  await req.session.destroy();
  res.json({ isLoggedIn: false, id: '', admin: false });
}