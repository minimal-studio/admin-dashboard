import React, {Component} from 'react';
import {TipPanel} from 'ukelli-ui';

export default class HomePage extends Component {
  render() {
    return (
      <div className="home-page">
        <TipPanel title="Hi～" texts={[
          '欢迎来到 orion admin web 的示例项目。',
          '这是提供了基础管理后台的脚手架、命令生成工具，以及一套完整的开发流程。',
          '当然少不了推荐 “声明式开发” 这个概念，以及业务与渲染模版完全分离的理念。',
        ]}/>
        <TipPanel title="怎么理解？" texts={[
          '主要分了 Actions 和 Pages 两层。',
          'Actions 专注于业务的逻辑，与远端服务器的数据交互的接口，以及继承系统提供的多个帮助函数。',
          'Pages 专注于数据的渲染，Actions 与远端准备好数据，直接可以在 Pages 中体现。',
          '两者的结合可以做到，系统的逻辑清晰，用户体验一致，快速开发。',
          '大概十分钟完成一个通用表单或者表格。',
          '两小时内完成一个复杂表单或者表格。',
        ]}/>
        <TipPanel title="我们生命有限，请珍惜时间" texts={[
          '我们喜欢重复做轮子，觉得这就是技术，这就是提升自我，这就是技术的奥义。',
          '然而很多时候只是在浪费时间罢了。',
          '多出来的时间，可以感受多姿多彩的生命，多陪陪家人，多读读书，多做更多有意义的事情。',
          '从无尽又重复的，管理后台难以统一调整样式，复制粘贴代码这种问题中解脱。',
        ]}/>
      </div>
    )
  }
}
