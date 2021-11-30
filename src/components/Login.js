import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  View,
  Text,
  StatusBar,
  Dimensions,
  TextInput,
  Button,
} from 'react-native';

import {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {login} from '../actions/index';

const Login = ({navigation, login, isSignedIn, noOfTries}) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const onPressSignIn = () => {
    setSignInAttempted(true);
    console.log(signInAttempted);
    login(navigation, {email: email, password: password});
  };
  const [signInAttempted, setSignInAttempted] = useState(false);
  useEffect(() => {
    return () => setSignInAttempted(false);
  }, []);
  return (
    <View>
      <View style={styles.formView}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeEmail(text)}
          placeholder="Email"
          textContentType="emailAddress"
          value={email}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangePassword(text)}
          value={password}
          textContentType="password"
          secureTextEntry={true}
        />
        <Button title="Sign In" onPress={onPressSignIn} />
        <View style={{marginTop: 10}}>
          <Button
            title="Sign Up"
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          />
        </View>
      </View>
      {!isSignedIn && signInAttempted ? (
        <Text>Invalid Email or Password</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  formView: {
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  loginButton: {
    height: 40,
    marginTop: 50,
    borderRadius: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.logInStatus.isSignedIn,
  };
};

export default connect(mapStateToProps, {login})(Login);
