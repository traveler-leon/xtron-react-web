import React, { useState } from 'react';
import './login.css';

function Login({ isOpen, onClose }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [verificationError, setVerificationError] = useState('');

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!number) {
      return '请输入手机号码';
    } else if (!phoneRegex.test(number)) {
      return '请输入正确的11位手机号码';
    }
    return '';
  };

  const validateVerificationCode = (code) => {
    if (!code) {
      return '请输入验证码';
    } else if (code.length !== 6) {
      return '请输入6位验证码';
    }
    return '';
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    setPhoneNumber(value);
    setPhoneError('');
  };

  const handleVerificationCodeChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    setVerificationCode(value);
    setVerificationError('');
  };

  const handleGetVerificationCode = async () => {
    const error = validatePhoneNumber(phoneNumber);
    if (error) {
      setPhoneError(error);
    } else {
      try {
        // 这里替换为实际的API调用
        const response = await fetch('/api/send-verification-code', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phoneNumber }),
        });
        if (response.ok) {
          alert('验证码已发送');
        } else {
          throw new Error('Failed to send verification code');
        }
      } catch (error) {
        console.error('Error:', error);
        setPhoneError('发送验证码失败，请稍后再试');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneError = validatePhoneNumber(phoneNumber);
    const verificationError = validateVerificationCode(verificationCode);

    if (phoneError) {
      setPhoneError(phoneError);
    }
    if (verificationError) {
      setVerificationError(verificationError);
    }

    if (!phoneError && !verificationError) {
      try {
        // 这里替换为实际的API调用
        const response = await fetch('/api/login-register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phoneNumber, verificationCode }),
        });
        if (response.ok) {
          const data = await response.json();
          alert('登录/注册成功');
          // 这里可以添加登录成功后的逻辑，比如保存用户信息、关闭模态框等
          onClose();
        } else {
          throw new Error('Login failed');
        }
      } catch (error) {
        console.error('Error:', error);
        setVerificationError('登录/注册失败，请稍后再试');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h3>手机验证登录</h3>
        <form onSubmit={handleSubmit}>
          <div className="phone-input">
            <select>
              <option value="+86">+86</option>
            </select>
            <input 
              type="tel" 
              placeholder="请输入手机号" 
              value={phoneNumber}
              onChange={handlePhoneChange}
              maxLength={11}
            />
          </div>
          {phoneError && <p className="error-message">{phoneError}</p>}
          <div className="verification-input">
            <input 
              type="text" 
              placeholder="请输入6位数的验证码" 
              value={verificationCode}
              onChange={handleVerificationCodeChange}
              maxLength={6}
            />
            <button type="button" onClick={handleGetVerificationCode}>获取验证码</button>
          </div>
          {verificationError && <p className="error-message">{verificationError}</p>}
          <button type="submit">登录 / 注册</button>
        </form>
        <p className="terms">
          继续即代表您同意并遵守 
          <a href="#">HZ 用户协议</a> 和 
          <a href="#">隐私政策</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
