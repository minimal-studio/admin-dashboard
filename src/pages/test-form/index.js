import React, {Component} from 'react';

import {FormLayout, Loading} from 'ukelli-ui';
import {ActionTestForm} from '../action-refs';


/**
 * 说明
 * submiting 是否提交中
 * querying  如果需要异步获取表单条件的，需要用 Loading 包装一层，并且 !querying 的时候渲染 FormLayout
 */
export default class TestForm extends ActionTestForm {
  render() {
    const {hasErr, resDesc, submiting, querying = false} = this.state;

    return (
      <div>
        {/* 如果是异步获取表单初始化数据，需要 Loading */}
        <Loading loading={querying}>
          {
            querying ? null : (
              <FormLayout
                tipInfo={{
                  title: '如果是异步获取表单初始化数据，需要 Loading'
                }}
                loading={submiting}
                hasErr={hasErr}
                resDesc={resDesc}
                formOptions={this.formOptions}
                btnText="提交"
                onSubmit={this.onSubmit.bind(this)}/>
            )
          }
        </Loading>
        {/* 如果是已经定义好的数据，则不需要 Loading */}
        <FormLayout
          tipInfo={{
            title: '如果是已经定义好的数据，则不需要 Loading'
          }}
          loading={submiting}
          hasErr={hasErr}
          resDesc={resDesc}
          formOptions={this.formOptions}
          btnText="提交"
          onSubmit={this.onSubmit.bind(this)}/>
      </div>
    )
  }
}
