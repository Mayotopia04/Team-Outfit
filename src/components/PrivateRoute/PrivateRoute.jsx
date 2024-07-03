import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getLogin, getIsRefreshing } from 'redux/auth/auth-selectors';
import { getUser } from 'redux/auth/auth-operations';
import { refresh } from 'redux/auth/auth-operations';
import { instance } from '../../api/auth';
import { getSid, getRefreshToken } from 'redux/auth/auth-selectors';

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector(getLogin);
  const isRefreshing = useSelector(getIsRefreshing);
  const sid = useSelector(getSid);
  const refreshToken = useSelector(getRefreshToken);
  const [userInfo, setUserInfo] = useState({
    sid: sid,
    refreshToken: refreshToken,
  });
  const requestQueueRef = useRef([]);
  const newAccessTokenRef = useRef(null);
  const [newState, setNewState] = useState(false);

  useEffect(() => {
    let countError = 0;
    const interceptor = instance.interceptors.response.use(
      response => {
        setNewState(false);
        return response;
      },
      async error => {
        if (error.response.status !== 401) {
          return Promise.reject(error);
        }
        if (error.config.url === '/auth/refresh') {
          return Promise.reject(error);
        }
        if (error.response.status === 401) {
          countError += 1;
          const originalRequest = error.config;
          // We save unsuccessful requests to the `requestQueue` state and check for duplicates
          const existingRequestIndex = requestQueueRef.current.findIndex(
            request =>
              request.url === originalRequest.url &&
              JSON.stringify(request.data) ===
                JSON.stringify(originalRequest.data)
          );
          if (existingRequestIndex !== -1) {
            return Promise.reject(error);
          }
          requestQueueRef.current.push(originalRequest);
          // Token update, For LogOut we pass userInfo
          if (countError === 1) {
            try {
              const { payload } = await dispatch(refresh(userInfo));
              newAccessTokenRef.current = payload.newAccessToken;
              setUserInfo({
                sid: payload.sid,
                refreshToken: payload.newRefreshToken,
              });
            } catch (error) {
              return Promise.reject(error);
            }
          }
        }
        countError = 0;
        requestQueueRef.current = requestQueueRef.current.map(request => {
          request.headers.Authorization = `Bearer ${newAccessTokenRef.current}`;
          return request;
        });
        try {
          await Promise.all(
            requestQueueRef.current.map(request => instance(request))
          );
          requestQueueRef.current = [];
          newAccessTokenRef.current = null;
          Promise.resolve().then(() => setNewState(true));
          return instance(error.config);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    );
    return () => {
      instance.interceptors.response.eject(interceptor);
    };
  }, [dispatch, userInfo, newState]);

  useEffect(() => {
    if (!isLogin && isRefreshing) {
      return;
    } else {
      dispatch(getUser());
    }
  }, [dispatch, isLogin, isRefreshing]);

  if (!isLogin && isRefreshing) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
