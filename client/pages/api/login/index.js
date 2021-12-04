import { withSessionRoute } from "../../../lib/withSession";
import { database } from "../../../config";

export default withSessionRoute(loginRoute);

async function loginRoute(req, res) {
  if (Object.keys(req.body).length) {
    const authenticatedUser = await fetch(`${database}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    }).then(response => response.json());
    
    if (authenticatedUser.success === true) {
      const user = { 
        isLoggedIn: true,
        userId: authenticatedUser.user.user_id,
        isAdmin: authenticatedUser.user.administrator,
      };

      req.session.user = user;
      await req.session.save();
      
      res.json({ success: true, user: user });
    } else {
      res.json({ success: false, message: 'Incorrect username and/or password' });
    }
  } else {
    res.send({ success: false, message: 'Incorrect username and/or password' });
  }
}