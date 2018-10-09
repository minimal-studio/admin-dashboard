/**
 * 具体页面 Action 与对应的模板渲染的链接
 * 也可以自定义模板来渲染对应的页面
 */

import FEDeploy from 'uke-admin-web-scaffold/fe-deploy';

import {
  FormRender
} from '../template-engine';

import HomePage from './home-page';
import { TestForm, TestFormBasic } from './test-form';
import TestReport from './test-report';

import './registe-spec-fields';

export * from './generate-pages-refs';

const FormWithTMPL = FormRender(TestFormBasic);

export {
  TestReport,
  TestForm,
  FormWithTMPL,
  HomePage,
  FEDeploy
};
