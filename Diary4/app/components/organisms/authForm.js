import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {SIGN_IN, SIGN_UP} from '../../store/types';
import {StyleSheet, View, Text, Button, Platform} from 'react-native';
import Input from '../../utils/forms/input';
import {Component} from 'react';
import ValidationRules from '../../utils/forms/validationRules';
import {thisExpression} from '@babel/types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signUp, signIn} from '../../screens/auth/firebaseAuth';
const AuthForm = props => {
  const [type, setType] = useState('로그인');
  const [action, setAction] = useState('로그인');
  const [actionMode, setActionMode] = useState('회원가입');
  const [hasErrors, setHasErrors] = useState(false);
  const [form, setForm] = useState({
    email: {
      value: '',
      type: 'textinputRevised', // input 창 type(style용)
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
  });
  //   = {
  //     type: '로그인', //로그인 / 등록
  //     action: '로그인', //로그인 / 등록
  //     actionMode: '회원가입', //회원가입 //로그인 화면으로
  //     hasErrors: false,
  //     form: {
  //       email: {
  //         value: '',
  //         type: 'textinputRevised', // input 창 type(style용)
  //         rules: {isRequired: true, isEmail: true},
  //         valid: false,
  //       },
  //       password: {
  //         value: '',
  //         type: 'textinput',
  //         rules: {isRequired: true, minLength: 6},
  //         valid: false,
  //       },
  //       confirmPassword: {
  //         value: '',
  //         type: 'textinput',
  //         rules: {confirmPassword: 'password'},
  //         valid: false,
  //       },
  //     },
  //   };

  updateInput = (name, value) => {
    setHasErrors(false);

    let formCopy = form;

    formCopy[name].value += value;
    // console.log(formCopy[name].value);
    console.log(name, formCopy.email.value);
    let rules = formCopy[name].rules;
    let valid = ValidationRules(value, rules, formCopy);
    formCopy[name].valid = valid;
    setForm(formCopy);
    console.log(form);
    // console.warn(form);
  };
  confirmPassword = () =>
    type != '로그인' ? (
      <Input
        value={form.confirmPassword.value}
        type={form.confirmPassword.type}
        secureTextEntry={true}
        placeholder="비밀번호 재입력"
        placeholderTextColor="#ddd"
        onChangeText={value => updateInput('confirmPassword', value)}
      />
    ) : null;

  formHasErros = () =>
    hasErrors ? (
      <View style={styles.erroerContainer}>
        <Text style={styles.errorLabel}>로그인 정보를 다시 확인해주세요.</Text>
      </View>
    ) : null;

  chamgeForm = () => {
    const temp_type = type;
    setType(temp_type === '로그인' ? '등록' : '로그인');
    setAction(temp_type === '로그인' ? '등록' : '로그인');
    setActionMode(temp_type === '로그인' ? '로그인 화면으로' : '회원가입');
    // setState({
    //   type: type === '로그인' ? '등록' : '로그인',
    //   action: type === '로그인' ? '등록' : '로그인',
    //   actionMode: type === '로그인' ? '로그인 화면으로' : '회원가입',
    // });
  };

  submitUser = () => {
    let isFormValid = true;
    let submittedForm = {};
    const formCopy = form;

    for (let key in formCopy) {
      if (type === '로그인') {
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
      if (type === '로그인') {
        console.log({submittedForm});
        if (signIn(submittedForm) == true) {
          goWithoutLogin();
        }
        // props.goWithoutLogin();
      } else {
        console.log({submittedForm});
        signUp(submittedForm);
      }
    } else {
      setHasErrors(true);
    }
  };

  return (
    <View>
      <Input
        value={form.email.value}
        type={form.email.type}
        autoCapitalize={'none'}
        keyboardType={'email-address'}
        placeholder="이메일 주소"
        placeholderTextColor="#ddd"
        onChangeText={value => updateInput('email', value)}
      />
      <Input
        value={form.password.value}
        type={form.password.type}
        secureTextEntry={true}
        placeholder="비밀번호"
        placeholderTextColor="#ddd"
        onChangeText={value => updateInput('password', value)}
      />
      {confirmPassword()}
      {/* {userNickName()} */}
      {formHasErros()}
      <View style={{marginTop: 10}}>
        <View style={styles.button}>
          <Button title={action} color="#485671" onPress={submitUser} />
        </View>
        <View style={styles.button}>
          <Button
            title={actionMode}
            color="#485671"
            onPress={() => chamgeForm()}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="비회원 로그인"
            color="#485671"
            onPress={() => props.goWithoutLogin()}
          />
        </View>
      </View>
    </View>
  );
};

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
    marginBottom: 5,
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
        marginTop: 10,
      },
      android: {
        marginTop: 15,
        marginBottom: 10,
      },
    }),
  },
});

// function mapStateToProps( {
//   return {
//     User: User,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({signIn, signUp}, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
export default AuthForm;
