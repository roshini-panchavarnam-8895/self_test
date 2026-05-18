import { Route } from "@slyte/router";
class Index extends Route {

	render() {
		return { outlet: "#outlet" };
	}

	static actions(){
		return{
			
		}
	}
}

export {Index};

