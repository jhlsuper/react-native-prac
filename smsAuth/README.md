## 문자 인증 시스템

### 참고 사이트

https://rnfirebase.io/  
https://rnfirebase.io/auth/phone-auth  
https://developers.google.com/android/guides/client-auth SHA-1값 찾는법  
https://firebase.google.com/docs/auth/android/phone-auth 설정해줘야하는 것들

전화번호 사전 입력값 +82

사용자 입력값 예시 1010041004 (앞에 0을 빼고 기입)

1. 핸드폰 번호 입력
2. 인증번호 받기 click
3. 안드로이드 자기폰 자기번호 -> 자동 인증  
   안드로이드 남의번호로 인증 -> normal 인증
   ios -> normal 인증

4. 인증번호 입력후 인증하기 click
   안드로이드 자동인증 -> 오토인증 완료 log
   그외 -> 인증과정

5. 로그아웃시 인증된 유저 풀림
