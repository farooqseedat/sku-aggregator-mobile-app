import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  View,
  Text,
  TextInput,
  StatusBar,
  Button,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {createAccount} from '../actions';
import {useState} from 'react';
import DatePicker from 'react-native-datepicker';
import {add} from 'react-native-reanimated';

const Signup = ({navigation, isSignedIn, createAccount}) => {
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState(null);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [zip, setZip] = useState('');

  const renderInputField = (label, value, onChange, contentType) => {
    return (
      <>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChange(text)}
          placeholder={label}
          textContentType={contentType}
          value={value}
        />
      </>
    );
  };
  const onSignupPress = () => {
    const formData = {
      email: email,
      first_name: fname,
      last_name: lname,
      password: password,
      profile: {
        country: country,
        dob: dob,
        city: city,
        address: address,
        zip: zip,
      },
    };
    console.log(formData);
    createAccount(navigation, formData);
  };
  return (
    <ScrollView>
      <View style={styles.formView}>
        {renderInputField('Email', email, setEmail, 'emailAddress')}
        {renderInputField('First Name', fname, setFname, 'name')}
        {renderInputField('Last Name', lname, setLname, 'familyName')}
        {renderInputField('Address', address, setAddress, 'fullStreetAddress')}
        {renderInputField('City', city, setCity, 'addressCity')}
        {renderInputField('Country', country, setCountry, 'countryName')}
        {renderInputField('Zip Code', zip, setZip, 'postalCode')}
        <Text style={styles.label}>Date Of Birth</Text>
        <DatePicker
          style={styles.datepicker}
          onDateChange={(date) => setDob(date)}
          date={dob}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          textContentType="password"
          secureTextEntry={true}
        />

        <Button title="Sign Up" onPress={onSignupPress} />
      </View>
    </ScrollView>
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
  datepicker: {
    width: '100%',
  },
});

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.logInStatus.isSignedIn,
  };
};

export default connect(mapStateToProps, {createAccount})(Signup);
