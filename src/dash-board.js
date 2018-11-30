import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ChartCom, Card, CardContainer } from 'ukelli-ui';

ChartCom.setChartJSPath('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.1.4/Chart.bundle.min.js');

const mockData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [{
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
  }]
};
const options = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero:true
      }
    }]
  }
};

export default class DashBoard extends React.PureComponent {
  state = {};
  componentDidMount() {
    /** 用于让出 UI 线程 */
    setTimeout(() => this.chartDOM1.renderChart(), 15);
    setTimeout(() => this.chartDOM2.renderChart(), 30);
    setTimeout(() => this.chartDOM3.renderChart(), 45);
    setTimeout(() => this.chartDOM4.renderChart(), 60);
  }
  render() {
    return (
      <div className="dash-board">
        <CardContainer className="j-c-b mb10">
          <Card row={9} className="relative">
            <h3 className="text-center">数据1</h3>
            <ChartCom id="chartDOM1" ref={e => this.chartDOM1 = e} data={mockData} type="bar" options={options} />
          </Card>
          <Card row={9} className="relative">
            <h3 className="text-center">数据2</h3>
            <ChartCom id="chartDOM2" ref={e => this.chartDOM2 = e} data={mockData} type="line" options={options} />
          </Card>
        </CardContainer>
        <CardContainer className="j-c-b">
          <Card row={9} className="relative">
            <h3 className="text-center">数据3</h3>
            <ChartCom id="chartDOM3" ref={e => this.chartDOM3 = e} data={mockData} type="bar" options={options} />
          </Card>
          <Card row={9} className="relative">
            <h3 className="text-center">数据4</h3>
            <ChartCom id="chartDOM4" ref={e => this.chartDOM4 = e} data={mockData} type="line" options={options} />
          </Card>
        </CardContainer>
      </div>
    );
  }
}