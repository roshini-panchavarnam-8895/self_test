import { Route } from "@slyte/router";
import  {WelcomeComp} from "../../components/javascript/welcome-comp";
class Index extends Route {

	render() {
		return {outlet : "#outlet",component : WelcomeComp}
	}

	static actions(){
		return{
			
		}
	}
}

export {Index};

