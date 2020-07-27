import React from 'react'
import { Result, Button } from 'antd';
import { Redirect, NavLink } from 'react-router-dom';
import style from './index.module.scss'


class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, errorStatus: 0 };
    }
  
    static getDerivedStateFromError(error) {
      // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError && this.props.errorStatus === 1) {
        // Можно отрендерить запасной UI произвольного вида
        return (
            <Result
               // style={{height: '100vh', display: 'flex',flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}
                className={style.wrapper}
                status="500"
                title="Hm..."
                subTitle="Sorry, something went wrong."
                extra={<Button type="primary"><NavLink to='home'>Back Home</NavLink></Button>}
            />
        );
      }
  
      return this.props.children; 
    }
  }

  export default ErrorBoundary