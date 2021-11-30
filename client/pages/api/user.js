import { withSessionRoute } from "../../lib/withSession";
import { database } from "../../config";

export default withSessionRoute(userRoute);

async function userRoute(req, res) {
	try {
		if (req.session.user.userId) {
			const additionalUserData = await fetch(`${database}/user/${req.session.user.userId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(response => response.json());

			res.json({
				...req.session.user,
				firstName: additionalUserData.user.first_name,
				lastName: additionalUserData.user.last_name,
				birthDate: additionalUserData.user.birth_date,
				hireDate: additionalUserData.user.hire_date
			});
		} else {
			res.json({
				isLoggedIn: false,
				userId: null,
				isAdmin: false
			});
		}
	} catch (error) {
		res.json(error.message);
	}
} 