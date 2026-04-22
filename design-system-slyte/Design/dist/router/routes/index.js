import { Route } from "@slyte/router";
class Index extends Route {

	render() {
		return { outlet: "#outlet", component: "welcome-comp" };
	}

	static actions(){
		return{
			
		}
	}
}

export {Index};

