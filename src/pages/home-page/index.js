import React, {Component} from 'react';
import {TipPanel} from 'ukelli-ui';

export default class HomePage extends Component {
  render() {
    return (
      <div className="home-page">
        <TipPanel title="Hi～" texts={[
          '欢迎来到 uke admin web 的示例项目。',
          '这是提供了基础管理后台的脚手架、命令生成工具，以及一套完整的开发流程。',
        ]}/>
        <TipPanel title="这是什么？" texts={[
          '主要分了 Actions 和 Pages 两层。',
          'Actions 专注于业务的逻辑，与远端服务器的数据交互的接口，以及继承系统提供的多个帮助函数。',
          'Pages 专注于数据的渲染，Actions 与远端准备好数据，直接可以在 Pages 中体现。',
          '两者的结合可以做到，系统的逻辑清晰，用户体验一致，快速开发。',
        ]}/>
        <TipPanel title="多谢"/>
      </div>
    )
  }
}
