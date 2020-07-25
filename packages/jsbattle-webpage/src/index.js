import 'babel-polyfill';
import ConsoleLogger from './lib/ConsoleLogger.js';

let logger = new ConsoleLogger();
logger.apply(console);

const root = document.getElementById("root");
root.innerHTML = `
<style>

.loading-cat {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 48px auto;
}

.cat-body {
  position: absolute;
  width: 290px;
  height: 290px;
  background-color: #EBA764;
  border-radius: 50%;
  border: 5px solid #514E51;
}

*, ::after, ::before {
  box-sizing: content-box !important;
}

.cat-body:before {
  content: "";
  position: absolute;
  top: calc(50% - 188px/2 - 5px);
  left: calc(50% - 188px/2 - 5px);
  width: 188px;
  height: 188px;
  border: 5px solid #514E51;
  border-radius: 50%;
  background-color: #ffffff;
}
.cat-body:after {
  content: "";
  position: absolute;
  top: calc(50% - 222px/2 - 22px);
  left: calc(50% - 222px/2 - 22px);
  width: 222px;
  height: 222px;
  border: 22px solid #F1C28F;
  border-radius: 50%;
}

.cat-animation-mask {
  position: absolute;
  width: 50%;
  height: 50%;
  background-color: #ffffff;
  -webkit-transform-origin: right bottom;
          transform-origin: right bottom;
}
.cat-animation-mask:before {
  content: "";
  position: absolute;
  left: 100%;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  -webkit-transform-origin: left bottom;
          transform-origin: left bottom;
}
.cat-animation-mask:after {
  content: "";
  position: absolute;
  top: 100%;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  -webkit-transform-origin: right top;
          transform-origin: right top;
}

.cat-head {
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: 50%;
  background-color: #ffffff;
  -webkit-transform-origin: left bottom;
          transform-origin: left bottom;
}
.cat-head .cat-face {
  position: absolute;
  bottom: 0px;
  right: 0;
  width: 50px;
  height: 40px;
  background-color: #EBA764;
  border: 5px solid #514E51;
  border-bottom: 0;
}
.cat-head .cat-face:before {
  content: "";
  position: absolute;
  left: calc(50% - 10px);
  bottom: -15px;
  width: 22px;
  height: 22px;
  background-color: #F1C28F;
  border-radius: 50%;
}
.cat-head .cat-ear {
  position: absolute;
  bottom: 39px;
  right: 0;
  width: 10px;
  height: 12px;
  background-color: #EBA764;
  border: 5px solid #514E51;
  border-bottom: 0;
  border-radius: 20px 0 0 0;
}
.cat-head .cat-ear:before {
  content: "";
  position: absolute;
  top: -5px;
  left: -45px;
  width: 10px;
  height: 12px;
  background-color: #EBA764;
  border: 5px solid #514E51;
  border-bottom: 0;
  border-radius: 0 20px 0 0;
}
.cat-head .cat-hand {
  position: absolute;
  bottom: -32px;
  right: 0;
  width: 10px;
  height: 30px;
  background-color: #EBA764;
  border: 5px solid #514E51;
  border-top: 0;
  border-radius: 0 0 10px 10px;
}
.cat-head .cat-hand:before {
  content: "";
  position: absolute;
  top: 0;
  left: -45px;
  width: 10px;
  height: 30px;
  background-color: #EBA764;
  border: 5px solid #514E51;
  border-top: 0;
  border-radius: 0 0 10px 10px;
}
.cat-head .cat-eye, .cat-head .cat-eye-light {
  position: absolute;
  top: 116px;
  right: 12px;
  width: 6px;
  height: 6px;
  background-color: #514E51;
  border-radius: 3px;
}
.cat-head .cat-eye:before, .cat-head .cat-eye-light:before {
  content: "";
  position: absolute;
  top: 0px;
  right: 30px;
  width: 6px;
  height: 6px;
  background-color: #514E51;
  border-radius: 3px;
}
.cat-head .cat-eye-light {
  background-color: white;
  box-shadow: 0 0 10px white;
  opacity: 0;
  -webkit-animation: eye-light-animation 2.5s 1s infinite;
          animation: eye-light-animation 2.5s 1s infinite;
}
.cat-head .cat-eye-light:before {
  background-color: white;
  box-shadow: 0 0 10px white;
  opacity: 0;
  -webkit-animation: eye-light-animation 2.5s 1s infinite;
          animation: eye-light-animation 2.5s 1s infinite;
}
.cat-head .cat-mouth {
  position: absolute;
  bottom: 16px;
  right: 27px;
  width: 2px;
  height: 0px;
  background-color: #FD7667;
  border: 2px solid #514E51;
  border-top: 0;
  border-radius: 0 0 10px 10px;
  -webkit-animation: mouth-animation 2.5s 1s infinite;
          animation: mouth-animation 2.5s 1s infinite;
}
.cat-head .cat-mouth:before {
  content: "";
  position: absolute;
  top: 0;
  right: -4px;
  width: 2px;
  height: 2px;
  background-color: #EBA764;
  border: 2px solid #514E51;
  border-top: 0;
  border-radius: 0 0 10px 10px;
}
.cat-head .cat-mouth:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0px;
  width: 2px;
  height: 2px;
  background-color: #EBA764;
  border: 2px solid #514E51;
  border-top: 0;
  border-radius: 0 0 10px 10px;
}
.cat-head .cat-beard {
  position: absolute;
  bottom: 18px;
  right: -4px;
  width: 12px;
  height: 3px;
  background-color: #514E51;
}
.cat-head .cat-beard:before {
  content: "";
  position: absolute;
  top: -5px;
  right: 0;
  width: 12px;
  height: 3px;
  background-color: #514E51;
  -webkit-transform: rotate(-10deg);
          transform: rotate(-10deg);
}
.cat-head .cat-beard:after {
  content: "";
  position: absolute;
  top: 5px;
  right: 0;
  width: 12px;
  height: 3px;
  background-color: #514E51;
  -webkit-transform: rotate(10deg);
          transform: rotate(10deg);
}
.cat-head .cat-beard.right {
  right: 52px;
}
.cat-head .cat-beard.right:before {
  -webkit-transform: rotate(10deg);
          transform: rotate(10deg);
}
.cat-head .cat-beard.right:after {
  -webkit-transform: rotate(-10deg);
          transform: rotate(-10deg);
}

.cat-foot {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50%;
  height: 50%;
  background-color: #ffffff;
  -webkit-transform-origin: right top;
          transform-origin: right top;
}
.cat-foot .cat-belly {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 14px;
  height: 46px;
  background-color: #EBA764;
  border: 5px solid #514E51;
  border-left: 0;
  border-right: 0;
}
.cat-foot .cat-leg {
  position: absolute;
  bottom: 0px;
  right: 14px;
  width: 30px;
  height: 10px;
  background-color: #EBA764;
  border: 5px solid #514E51;
  border-right: 0;
  border-radius: 10px 0 0 10px;
}
.cat-foot .cat-leg:before {
  content: "";
  position: absolute;
  top: -41px;
  right: 0;
  width: 30px;
  height: 10px;
  background-color: #EBA764;
  border: 5px solid #514E51;
  border-right: 0;
  border-radius: 10px 0 0 10px;
}
.cat-foot .cat-tail {
  position: absolute;
  bottom: 16px;
  right: 14px;
  width: 50px;
  height: 14px;
  background-color: #C48344;
  border: 5px solid #514E51;
  border-right: 0;
  border-radius: 14px 0 0 14px;
}
.cat-foot .cat-tail:after {
  content: "";
  position: absolute;
  right: -28px;
  bottom: -4px;
  width: 22px;
  height: 22px;
  background-color: #F1C28F;
  border-radius: 50%;
}
.cat-foot .cat-tail:before {
  content: "";
  position: absolute;
  bottom: -7px;
  right: 0;
  width: 10px;
  height: 18px;
  background-color: #EBA764;
  border: 5px solid #514E51;
  border-right: 0;
  border-radius: 12px 0 0 12px;
}

.cat-animation-mask {
  -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
  -webkit-animation: mask-animation 2.5s 1s infinite;
          animation: mask-animation 2.5s 1s infinite;
}
.cat-animation-mask:before {
  -webkit-animation: mask-animation-sub-right 2.5s 1s infinite;
          animation: mask-animation-sub-right 2.5s 1s infinite;
}
.cat-animation-mask:after {
  -webkit-animation: mask-animation-sub-left 2.5s 1s infinite;
          animation: mask-animation-sub-left 2.5s 1s infinite;
}

.cat-head {
  -webkit-transform: rotate(70deg);
          transform: rotate(70deg);
  -webkit-animation: head-animation 2.5s 1s infinite;
          animation: head-animation 2.5s 1s infinite;
  -webkit-animation-timing-function: cubic-bezier(0.2, 0, 0.09, 1);
          animation-timing-function: cubic-bezier(0.2, 0, 0.09, 1);
}

.cat-foot {
  -webkit-transform: rotate(25deg);
          transform: rotate(25deg);
  -webkit-animation: foot-animation 2.5s 1s infinite;
          animation: foot-animation 2.5s 1s infinite;
  -webkit-animation-timing-function: cubic-bezier(0.2, 0, 0.45, 1);
          animation-timing-function: cubic-bezier(0.2, 0, 0.45, 1);
}

@-webkit-keyframes mask-animation {
  0% {
    -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
  }
  100% {
    -webkit-transform: rotate(-675deg);
            transform: rotate(-675deg);
  }
}

@keyframes mask-animation {
  0% {
    -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
  }
  100% {
    -webkit-transform: rotate(-675deg);
            transform: rotate(-675deg);
  }
}
@-webkit-keyframes mask-animation-sub-left {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
  }
  100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes mask-animation-sub-left {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
  }
  100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes mask-animation-sub-right {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(-90deg);
            transform: rotate(-90deg);
  }
  100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes mask-animation-sub-right {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(-90deg);
            transform: rotate(-90deg);
  }
  100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes head-animation {
  0% {
    -webkit-transform: rotate(70deg);
            transform: rotate(70deg);
  }
  100% {
    -webkit-transform: rotate(-650deg);
            transform: rotate(-650deg);
  }
}
@keyframes head-animation {
  0% {
    -webkit-transform: rotate(70deg);
            transform: rotate(70deg);
  }
  100% {
    -webkit-transform: rotate(-650deg);
            transform: rotate(-650deg);
  }
}
@-webkit-keyframes foot-animation {
  0% {
    -webkit-transform: rotate(25deg);
            transform: rotate(25deg);
  }
  100% {
    -webkit-transform: rotate(-695deg);
            transform: rotate(-695deg);
  }
}
@keyframes foot-animation {
  0% {
    -webkit-transform: rotate(25deg);
            transform: rotate(25deg);
  }
  100% {
    -webkit-transform: rotate(-695deg);
            transform: rotate(-695deg);
  }
}
@-webkit-keyframes eye-light-animation {
  0% {
    opacity: 0;
    height: 6px;
  }
  50% {
    opacity: 0.75;
    height: 50px;
  }
  80% {
    opacity: 1;
    height: 6px;
  }
  100% {
    opacity: 0;
  }
}
@keyframes eye-light-animation {
  0% {
    opacity: 0;
    height: 6px;
  }
  50% {
    opacity: 0.75;
    height: 50px;
  }
  80% {
    opacity: 1;
    height: 6px;
  }
  100% {
    opacity: 0;
  }
}
@-webkit-keyframes mouth-animation {
  0% {
    height: 0px;
  }
  50% {
    height: 10px;
  }
  100% {
    height: 0px;
  }
}
@keyframes mouth-animation {
  0% {
    height: 0px;
  }
  50% {
    height: 10px;
  }
  100% {
    height: 0px;
  }
}
</style>
<div class="loading-cat">
  <div class="cat-body"></div>
  <div class="cat-animation-mask"></div>
  <div class="cat-head">
    <div class="cat-face"></div>
    <div class="cat-ear"></div>
    <div class="cat-hand"></div>
    <div class="cat-eye"></div>
    <div class="cat-eye-light"></div>
    <div class="cat-mouth"></div>
    <div class="cat-beard left"></div>
    <div class="cat-beard right"></div>
  </div>
  <div class="cat-foot">
    <div class="cat-belly"></div>
    <div class="cat-leg"></div>
    <div class="cat-tail"></div>
  </div>
</div>
`;


function exposeActions(actions, store) {
  let actionNameList = Object.keys(actions);
  if(!window.appController) {
    window.appController = {};
  }
  for(let actionName of actionNameList) {
    window.appController[actionName] = (...args) => {
      store.dispatch(actions[actionName].apply(null, args));
    };
  }
}

async function loadWebpage() {
  const {default: App} = await import(/* webpackChunkName: "app" */ './containers/App.js');
  const coreAction = await import(/* webpackChunkName: "app" */ './actions/coreAction.js');
  const challengeAction = await import(/* webpackChunkName: "app" */ './actions/challengeAction.js');
  const sandboxAction = await import(/* webpackChunkName: "app" */ './actions/sandboxAction.js');
  const statsAction = await import(/* webpackChunkName: "app" */ './actions/statsAction.js');
  const {default: ReactDOM} = await import(/* webpackChunkName: "lib" */ 'react-dom');
  const {default: React} = await import(/* webpackChunkName: "lib" */ 'react');
  const {Provider} = await import(/* webpackChunkName: "lib" */ 'react-redux');
  const {default: thunk} = await import(/* webpackChunkName: "lib" */ 'redux-thunk');
  const {default: reducer} = await import(/* webpackChunkName: "app" */ './reducers');
  const {default: socketMiddleware} = await import(/* webpackChunkName: "lib" */ './lib/socketMiddleware.js');

  await import(/* webpackChunkName: "lib" */ 'react-router-dom');
  const {
    createStore,
    compose,
    applyMiddleware
  } = await import(/* webpackChunkName: "lib" */ 'redux');
  await import(/* webpackChunkName: "engine" */ 'jsbattle-engine');
  //await import(/* webpackChunkName: "lib" */ 'jsbattle-react');

  let storeEnhancers;
  if(DEBUG_MODE) {
    storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  } else {
    storeEnhancers = compose;
  }

  function reduxLogger() {
    return function(next) {
      return function (action) {
        console.log('Redux dispatch:', action.type || '<<no type>>');
        return next(action);
      };
    };
  }

  function errorHandler() {
    return function(next) {
      return function (action) {
        if(action.payload instanceof Error) {
          action.error = true;
        }
        return next(action);
      };
    };
  }

  const store = createStore(
    reducer,
    storeEnhancers(applyMiddleware(errorHandler, reduxLogger, socketMiddleware, thunk))
  );

  root.innerHTML = '';

  exposeActions(coreAction, store);
  exposeActions(challengeAction, store);
  exposeActions(sandboxAction, store);
  exposeActions(statsAction, store);
  window.appController.store = store;

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  );

}

loadWebpage().then();
