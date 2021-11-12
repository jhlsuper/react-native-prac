import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SIGN_IN, SIGN_UP} from '../../store/types';
import {StyleSheet, View, Text, Button, Platform} from 'react-native';
import Input from '../../utils/forms/input';
import {Component} from 'react';

import ValidationRules from '../../utils/forms/validationRules';
import {thisExpression} from '@babel/types';
// import firebase, {auth} from 'react-native-firebase';
import {connect} from 'react-redux';
// import {signIn, signUp} from '../../store/actions/user_actions';
import {bindActionCreators} from 'redux';
import {sub} from 'react-native-reanimated';
class AuthForm extends Component {
  state = {
    type: '로그인', //로그인 / 등록
    action: '로그인', //로그인 / 등록
    actionMode: '회원가입', //회원가입 //로그인 화면으로
    hasErrors: false,
    form: {
      email: {
        value: '',
        type: 'textinputRevised',
        rules: {isRequired: true, isEmail: true},
        valid: false,
      },
      password: {
        value: '',
        type: 'textinput',
        rules: {isRequired: true, minLength: 6},
        valid: false,
      },
      confirmPassword: {
        value: '',
        type: 'textinput',
        rules: {confirmPassword: 'password'},
        valid: false,
      },
    },
  };

  updateInput = (name, value) => {
    this.setState({
      hasErrors: false,
    });
    let formCopy = this.state.form;
    formCopy[name].value = value;
    let rules = formCopy[name].rules;
    let valid = ValidationRules(value, rules, formCopy);
    formCopy[name].valid = valid;

    this.setState({
      form: formCopy,
    });
    // console.warn(this.state.form);
  };
  confirmPassword = () =>
    this.state.type != '로그인' ? (
      <Input
        value={this.state.form.confirmPassword.value}
        type={this.state.form.confirmPassword.type}
        secureTextEntry={true}
        placeholder="비밀번호 재입력"
        placeholderTextColor="#ddd"
        onChangeText={value => this.updateInput('confirmPassword', value)}
      />
    ) : null;

  formHasErros = () =>
    this.state.hasErrors ? (
      <View style={styles.erroerContainer}>
        <Text style={styles.errorLabel}>로그인 정보를 다시 확인해주세여</Text>
      </View>
    ) : null;

  chamgeForm = () => {
    const type = this.state.type;
    this.setState({
      type: type === '로그인' ? '등록' : '로그인',
      action: type === '로그인' ? '등록' : '로그인',
      actionMode: type === '로그인' ? '로그인 화면으로' : '회원가입',
    });
  };
  signIn = data => {
    console.log(data);

    return {
      type: SIGN_IN,
      payload: {
        email: data.email,
        token: data.password, //로그인 상태를 토큰으로 저장
      },
    };
  };
  signUp = data => {
    // auth()
    //   .createUserWithEmailAndPassword(data.email, data.password)
    //   .then(() => {
    //     console.log('User account create &signed in!');
    //   })
    //   .catch(error => {
    //     if (error.code === 'auth/email-already-in-use') {
    //       console.log('That email address is already in use!');
    //     }
    //     if (error.code === 'auth/invalid-email') {
    //       console.log('That email address is invalid!');
    //     }
    //     console.error(error);
    //   });

    console.log(data);

    return {
      type: SIGN_UP,
      payload: request,
    };
  };

  submitUser = () => {
    let isFormValid = true;
    let submittedForm = {};
    const formCopy = this.state.form;

    for (let key in formCopy) {
      if (this.state.type === '로그인') {
        if (key !== 'confirmPassword') {
          isFormValid = isFormValid && formCopy[key].valid;
          submittedForm[key] = formCopy[key].value;
        }
      } else {
        isFormValid = isFormValid && formCopy[key].valid;
        submittedForm[key] = formCopy[key].value;
      }
    }
    if (isFormValid) {
      if (this.state.type === '로그인') {
        console.log({submittedForm});
        console.log('로그인 버튼 눌림');
        this.signIn(submittedForm);
        // this.props.signIn(submittedForm);
      } else {
        console.log('등록버튼 눌림');
        console.log({submittedForm});
        this.signUp(submittedForm);

        // this.props.signUp(submittedForm);
      }
    } else {
      this.setState({
        hasErrors: true,
      });
    }
  };

  render() {
    return (
      <View>
        <Input
          value={this.state.form.email.value}
          type={this.state.form.email.type}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
          placeholder="이메일 주소"
          placeholderTextColor="#ddd"
          onChangeText={value => this.updateInput('email', value)}
        />
        <Input
          value={this.state.form.password.value}
          type={this.state.form.password.type}
          secureTextEntry={true}
          placeholder="비밀번호"
          placeholderTextColor="#ddd"
          onChangeText={value => this.updateInput('password', value)}
        />
        {this.confirmPassword()}
        {this.formHasErros()}
        <View style={{marginTop: 40}}>
          <View style={styles.button}>
            <Button
              title={this.state.action}
              color="#485671"
              onPress={this.submitUser}
            />
          </View>
          <View style={styles.button}>
            <Button
              title={this.state.actionMode}
              color="#485671"
              onPress={() => this.chamgeForm()}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="비회원 로그인"
              color="#485671"
              onPress={() => this.props.goWithoutLogin()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    fontSize: 17,
    padding: 5,
    marginTop: 30,
  },
  erroerContainer: {
    marginBottom: 10,
    marginTop: 30,
    padding: 20,
    backgroundColor: '#ee3344',
  },
  errorLabel: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  button: {
    ...Platform.select({
      ios: {
        marginTop: 15,
      },
      android: {
        marginTop: 15,
        marginBottom: 10,
      },
    }),
  },
});

function mapStateToProps(state) {
  return {
    User: state.User,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({signIn, signUp}, dispatch);
}

// export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
export default AuthForm;
