import NProgress from "nprogress";
import Router from "next/router";

NProgress.configure({
	minimum: 0.3,
	easing: "ease",
	speed: 800,
	template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><img src="../../rev-gif.gif" width=50vw height=50vh/></div>'
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function app () {
	return <></>;
}
