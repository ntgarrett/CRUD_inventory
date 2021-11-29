import { withSessionRoute } from "../../lib/withSession";

export default withSessionRoute(userRoute);

async function userRoute(req, res) {
	if (req.session.user) {
		res.json({
			...req.session.user,
			isLoggedIn: true,
		});
	} else {
		res.json({
			isLoggedIn: false,
			userId: null,
			isAdmin: false
		});
	}
} 