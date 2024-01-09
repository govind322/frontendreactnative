import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';

Reactotron.configure({
  name: 'Your App Name', // Set your app name
})
  .useReactNative()
  .use(reactotronRedux())
  .connect();

console.tron = Reactotron;

export default Reactotron;
