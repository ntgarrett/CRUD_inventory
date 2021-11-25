require('dotenv').config();
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

const sessionOptions = {
  password: process.env.ironPassword,
  cookieName: "jdUserSession",
};

export function withSessionRoute(handler) {
  return withIronSessionApiRoute(handler, sessionOptions);
};

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, sessionOptions);
};