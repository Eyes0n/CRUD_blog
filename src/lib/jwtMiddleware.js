import jwt from 'jsonwebtoken';

const jwtMiddleware = (ctx, next) => {
  const token = ctx.cookies.get('access_token');
  if (!token) return next(); // 토큰이 없음

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded를 미들웨어에서 사용할려면 ctx.state에 넣어준다
    ctx.state.user = {
      id: decoded.id,
      username: decoded.username,
    };
    console.log('decoded JWT:', decoded);
    return next();
  } catch (error) {
    // 토큰 검증 실패
    return next();
  }
};

export default jwtMiddleware;
