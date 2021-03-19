// Required for enzyme, which is required for front-end React testing
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure } from "enzyme";

configure({ adapter: new Adapter() });
