const router = require('express').Router();
const passport = require('passport');
const controller = require('../controllers/userController');

const LocalPassportAuth = passport.authenticate('local', {session:false}); //id, pw 검증
const RefreshJwtAuth = passport.authenticate('jwtRefresh', {session:false}) //RefreshToken 확인

router.post('/signup', controller.signUp, LocalPassportAuth, controller.logIn); //회원가입
router.post('/login', LocalPassportAuth, controller.logIn); //로그인_accessToken, refreshToken 발급
router.post('/token/refresh', RefreshJwtAuth, controller.tokenRefresh) //AccessToken이 만료되면, refreshToken보내서 AccessToken 재발급
router.post('/token/blacklist', controller.TokenBlacklist) //로그아웃

router.get('/auth/google', passport.authenticate('google', {scope:
    ['email', 'profile']}
    )); // 자동으로 callback을 호출함.
router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect:'/auth/google/success',
    failureRedirect:'/auth/google/failure'
})); //인증 후 성공/실패에 따라 다른 url로 redirect
router.get('/auth/google/success', controller.googleSuccess); //성공시
router.get('auth/google/failure', controller.googleFailure); // 실패시_ 반환값을 구분해서 프런트엔드에서 다른 페이지로 보내면 될까
module.exports = router;