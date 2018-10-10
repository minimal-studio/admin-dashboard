import React, {Component} from 'react';
import {TipPanel} from 'ukelli-ui';

const HomePage = () => {
  return (
    <div className="home-page">
      <TipPanel title="Hi～" texts={[
        '这里是 uke admin web 示例项目。',
        '这是提供了基础管理后台的脚手架、命令生成工具，以及一套完整的开发流程。',
      ]}/>
      <TipPanel title="明细" texts={[
        '主要分了 Services 和 Pages 两层。',
        'Services 提供基础服务，提供与远端数据交互时，页面的 state 生命周期管理；提供所有表单表格注册和获取的方式；提供所有 api 接口的获取方式',
        'Pages 专注于数据的渲染，定义页面具体的表现形式',
        '两者的结合可以做到，系统的逻辑清晰，用户体验一致，快速开发。',
      ]}/>
      <TipPanel title="多谢"/>
    </div>
  );
};

export default HomePage;
