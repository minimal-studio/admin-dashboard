/**
 * 组件名    通用报表布局
 * 作者      Alex
 * 开始日期  2017-03-30
 * 修改日期  2017-03-30
 * 完成日期  2017-03-30
 */

import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';

import {
  PagingBtn, RecordItemsHelper,
  Loading, Button, Toast,
  TableBody, ConditionGenerator
} from 'ukelli-ui';

const delayExec = new $GH.Debounce();

export default class ReportTableLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedItems: {},
      displayFloat: $GH.GetFloatLen() != 0
    };
  }

  componentWillUnmount() {
    this.restoreBasicFloatLen();
  }
  restoreBasicFloatLen() {
    if($GH.GetFloatLen() == 0) {
      $GH.ToggleBasicFloatLen();
    }
  }

  toggleFloat() {
    /**
     * 在管理中心的时候可以用，但是关闭管理中心后必须设置回去
     */
    let isDisplay = $GH.ToggleBasicFloatLen();
    this.setState({
      displayFloat: isDisplay
    });
  }

  componentWillReceiveProps(nextProps) {
    if((this.props.loading !== nextProps.loading && nextProps.hasErr && !nextProps.loading) || this.props.hasErr !== nextProps.hasErr) {
      this.toast.show(nextProps.resDesc, nextProps.hasErr ? 'error' : 'success');
    }
  }

  getQueryData(conditionData) {
    return {
      nextPaging: $MN.DefaultPaging,
      conditionData: conditionData || this.conditionHelper.value
    }
  }

  toggleSelectItem(item, idx) {
    let nextCheckedItems = this.state.checkedItems;
    if(nextCheckedItems[idx]) {
      delete nextCheckedItems[idx];
    } else {
      nextCheckedItems[idx] = item;
    }
    this.selectItems(nextCheckedItems);
  }

  toggleAllItems(allCheck) {
    let nextCheckedItems = this.state.checkedItems;
    if(!allCheck) {
      nextCheckedItems = {};
    } else {
      this.props.records.forEach((item, idx) => nextCheckedItems[idx] = item);
    }
    this.selectItems(nextCheckedItems);
  }

  selectItems(nextState) {
    this.setState({
      checkedItems: nextState
    });
  }

  checkTableFilter() {
    const {
      keyMapper = [], needCheck = false
    } = this.props;

    let checkExtend = {
      key: 'checkbox',
      filter: (str, item, mapper, idx) => {
        // console.log()
        let checked = !!this.state.checkedItems[idx];
        return (
          <input type="checkbox" checked={checked} onClick={e => this.toggleSelectItem(item, idx)}/>
        )
      }
    }

    let result = needCheck ? [checkExtend, ...keyMapper] : keyMapper;

    return result;
  }

  whenMountedQuery = (data) => {
    if(this.didMountQueried) return;
    const {didMountQuery = true, onQueryData} = this.props;
    delayExec.exec(() => {
      onQueryData(this.getQueryData(data));
    }, 100);
    this.didMountQueried = true;
  }

  render() {
    const {
      records = [], pagingInfo = {}, loading = '', children, template = 'table',
      needCount = true, autoQuery = true, showCondition = true,
      needPaging = true, loadingCondition = false, didMountQuery = true,
      conditionOptions, isMobile,
      onQueryData
    } = this.props;

    const {checkedItems, displayFloat} = this.state;

    const keyMapper = this.checkTableFilter();
    const isAllCheck = Object.keys(checkedItems).length == records.length;

    let _thumbKeyMapper = !isMobile ? keyMapper : keyMapper.filter(item => {
      const itemKey = item.key;
      return !/Remark|Time|OrderId|Id|Date|Config/.test(itemKey)
             && !item.datetime
             && !item.date;
    });

    let templateDOM = null;
    switch (template) {
      case 'table':
        templateDOM = (
          <div className="table-container" ref="renderContent">
            <div className="table-scroll">
              <Loading loading={loading} inrow={true}>
                <TableBody
                  onCheckAll={e => this.toggleAllItems(e)}
                  allCheck={isAllCheck}
                  keyMapper={_thumbKeyMapper}
                  records={records}
                  needCount={needCount}/>
              </Loading>
            </div>
          </div>
        )
        break;
      case 'RecordItemsHelper':
        templateDOM = (
          <Loading loading={loading} inrow={true}>
            <RecordItemsHelper keyMapper={keyMapper} records={records}/>
          </Loading>
        )
    }
    if(!templateDOM) return (
      <span>没有对应的模板</span>
    );
    const pagingDOM = needPaging ? (
      <PagingBtn
        pagingInfo={pagingInfo}
        onPagin={nextPaging => {
          onQueryData({
            nextPaging,
            conditionData: this.conditionHelper.value
          });
      }}/>
    ) : null;
    const conditionHelper = loadingCondition ? null : (
      <ConditionGenerator
        ref={conditionHelper => {
          if(conditionHelper) {
            this.conditionHelper = conditionHelper;
            this.whenMountedQuery(conditionHelper.value);
          }
        }}
        onChange={(val, ref) => {
          let self = this;
          // if (this.conditionHelper) {
          //   if (this.conditionHelper.refs[ref].state.showTitle !== undefined) return
          // }

          if(!autoQuery || !$GH.HasValue(val[ref])) return;

          delayExec.exec(() => {
            onQueryData(self.getQueryData(val));
          }, 200);
        }}
        conditionConfig={conditionOptions || []}
        className={showCondition ? undefined : 'hide'}>
        <div className="">
          <Button
            text="查询"
            loading={loading}
            onClick={e => onQueryData(this.getQueryData())}/>
          <Button
            text={displayFloat ? '隐藏小数点' : '显示小数点'}
            className="default ml10"
            onClick={e => this.toggleFloat()}/>
        </div>
      </ConditionGenerator>
    );

    return (
      <div className="report-table-layout">
        <Toast ref={toast => this.toast = toast}/>
        <div className="report-fix-con" ref="fixReportCon">
          {conditionHelper}
          {children}
        </div>
        {templateDOM}
        {pagingDOM}
      </div>
    )
  }
}

ReportTableLayout.propTypes = {
  onQueryData: PropTypes.func.isRequired,
  showCondition: PropTypes.bool,
  loadingCondition: PropTypes.bool,
  needPaging: PropTypes.bool,
  needCheck: PropTypes.bool,
  autoQuery: PropTypes.bool,
  didMountQuery: PropTypes.bool,
  needCount: PropTypes.bool,

  keyMapper: PropTypes.array.isRequired,
  conditionOptions: PropTypes.array,

  records: PropTypes.array.isRequired,
  pagingInfo: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  template: PropTypes.string,
  hasErr: PropTypes.bool,
  resDesc: PropTypes.string
};
