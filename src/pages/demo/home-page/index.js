import React, {Component} from 'react';
import { TipPanel, Grid, CardContainer, Card } from 'ukelli-ui';

const HomePage = () => {
  return (
    <div className="home-page">
      <CardContainer>
        <Grid container space={20}>
          <Grid item lg={6}>
            <Card p={20}>
              <h3>uke-dashboard</h3>
              <p>uke-dashboard 是一个基于 React 的管理系统前端应用。</p>
              <p>应用于企业级的管理系统，适合多人团队协作开发，完全的前后端分离。</p>
              <p>提供专注于业务的“声明式”开发方式、功能齐全的模版引擎(Template engin)。</p>
              <p>提供易于扩展的插件功能，提供开发约定，提高团队的开发效率，同时维持系统整体的统一性(开发方式，接入方式，UI交互，视觉效果等)。</p>
            </Card>
          </Grid>
          <Grid item lg={6}>
            <Card p={20}>
              <h3>ukelli-ui</h3>
              <p>ukelli-ui 是基于 React 的 UI 库，提供简约和功能齐全的组件，可高度定制的组件接口，灵活的配置，提供给开发者另一种开发思路，也致力于尝试不同的组件使用和开发方向。</p>
              <p></p>
            </Card>
          </Grid>
        </Grid>
      </CardContainer>
      {/* <TipPanel title="Hi～" texts={[
        '这里是 uke dashboard 示例项目。', 
        '这是提供了基础管理后台的脚手架、命令生成工具，以及一套完整的开发流程。',
      ]}/>
      <TipPanel title="明细" texts={[
        '主要分了 Services 和 Pages 两层。',
        'Services 提供基础服务，提供与远端数据交互时，页面的 state 生命周期管理；提供所有表单表格注册和获取的方式；提供所有 api 接口的获取方式',
        'Pages 专注于数据的渲染，定义页面具体的表现形式',
        '两者的结合可以做到，系统的逻辑清晰，用户体验一致，快速开发。',
      ]}/>
      <TipPanel title="多谢"/> */}
    </div>
  );
};

export default HomePage;
