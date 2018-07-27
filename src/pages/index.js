/**
 * 具体页面 Action 与对应的模板渲染的链接
 * 也可以自定义模板来渲染对应的页面
 */

import React from 'react';
import {
  ReportRenderNormal, ReportRenderWithQueryUser
} from '../components/report-layout-template';
import {FormRender} from '../components/form-layout-template';
import { Tabs, Tab } from 'ukelli-ui';

import {
  ActionTestReport, ActionTestForm
} from './action-refs';

// export * from './home-page';
import HomePage from './home-page';
import TestForm from './test-form';
import FEDeploy from 'fe-deploy';

const TestReport = ReportRenderNormal(ActionTestReport);
const TestFormWithTMPL = FormRender(ActionTestForm);

export {
  TestReport,
  TestForm,
  TestFormWithTMPL,
  HomePage,
  FEDeploy
}
