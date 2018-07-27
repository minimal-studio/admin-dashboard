/**
 * 表格渲染模版
 */

 import React, {Component, PureComponent} from 'react';

 import ReportLayoutRender from './records-layout';
 import {Icon} from 'ukelli-ui';

 export function ReportRenderNormal(Action, passProps = {}) {
   return class C extends Action {
     getActionBtn(item) {
       return (
         <span className="link-btn" onClick={e => {
             this.showDetail(item);
           }}>
           详情
         </span>
       )
     }
     render() {
       const {needCount = true} = this;
       return (
         <ReportLayoutRender
           keyMapper={this.keyMapper}
           conditionOptions={this.conditionOptions}
           needCount={needCount}

           {...passProps}
           {...this.state}
           {...this.props}
           onQueryData={this.queryData.bind(this)}/>
       )
     }
   }
 }
