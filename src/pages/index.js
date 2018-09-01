/**
 * 具体页面 Action 与对应的模板渲染的链接
 * 也可以自定义模板来渲染对应的页面
 */

import React from 'react';
import {
  ReportRenderNormal, ReportRenderWithQueryUser
} from '../components/report-layout-template';
import {FormRender} from '../components/form-layout-template';

import {
  ActionTestReport, ActionTestForm
} from './action-refs';

// export * from './home-page';
import HomePage from './home-page';
import TestForm from './test-form';
import TestReport from './test-report';
import FEDeploy, {setApiUrl} from 'orion-admin-web-scaffold/fe-deploy';
setApiUrl(window.F_E_DeploymentUrl);

// const TestReport = ReportRenderNormal(ActionTestReport);
const FormWithTMPL = FormRender(ActionTestForm);

export * from './generate-pages-refs';

export {
  TestReport,
  TestForm,
  FormWithTMPL,
  HomePage,
  FEDeploy
}
