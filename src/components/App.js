import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


import ProductList from  './ProductList';
import ProductDetail from  './ProductDetail';
import Login from './Login';
import SignUp from './SignUp';
import { Button } from 'react-native';

const App = () => {
  const StackNavigator = createStackNavigator();
    
return (
  <NavigationContainer>
    <StackNavigator.Navigator>
      <StackNavigator.Screen  name="Login" component={Login}
      options={({ navigation }) => ({
        headerRight: props => <Button 
        title="Home"
        onPress={()=>navigation.navigate("List")} />,
      })}    />
      <StackNavigator.Screen name="List"  component={ProductList}
        options={({ navigation }) => ({
          headerRight: props => <Button 
          title="Sign In"
          onPress={()=>navigation.navigate("Login")} />,
        })}        
      />
      <StackNavigator.Screen name="detail" component={ProductDetail}/>
      <StackNavigator.Screen name="SignUp" component={SignUp}/>
      
    </StackNavigator.Navigator>
  </NavigationContainer>
);
};

export default App;
