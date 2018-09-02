import {StackNavigator} from 'react-navigation'
import MainScreen from './containers/MainScreen'

const AppNavigator = StackNavigator({
  Main: {
    name: 'Main',
    screen: MainScreen,
    navigationOptions: {
      header: null
    }
  },
})
export default AppNavigator