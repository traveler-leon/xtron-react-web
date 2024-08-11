import React,{ useState } from 'react';
import './home.css';
import Login from "../Login"

function Home() {

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  return (
    <div className="app">
      <header className="header">
        <div className="logo">Xtron</div>
        <nav>
          <a href="#product">产品</a>
          <a href="#price">价格</a>
        </nav>
        <div className="right-nav">
          <button className="start-button" onClick={() => setIsLoginModalOpen(true)}>登录/注册</button>
          <Login
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          />
</div>
      </header>
      
      <main>
        <div className="hero">
          <h1>智能决策大脑</h1>
          <p>
            面向全行业的智能决策系统，为行业赋予智能决策大脑。
          </p>
          <div className="cta-buttons">
            <button className="primary-button">开始使用</button>
          </div>
        </div>

        <div className="features">
          <div className="feature-card main-feature">
            <h2>多领域对接<br/>先进 AI<br/>高效 低成本</h2>
            <p>HZ AI的智能决策大脑可以对接任何业务系统，实现降本增效。</p>
            <div className="feature-buttons">
              <button>细节介绍</button>
            </div>
          </div>
          <div className="feature-grid">
            <div className="feature-card">航空领域</div>
            <div className="feature-card">轨道领域</div>
            <div className="feature-card">数字艺术领域</div>
            <div className="feature-card">智能选校领域</div>
            <div className="feature-card">科研领域</div>
          </div>
        </div>
      </main>
    </div>
  );
}


export default Home;
