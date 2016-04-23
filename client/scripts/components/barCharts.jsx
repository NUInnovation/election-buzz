window.barCharts = React.createClass({

  render: function(){
    return (
      // <div>
        <HBar data={[
          {v: 30, label: 'Ted Cruz'},
          {v: 10, label: 'John Kasich'},
          {v: 5, label: 'Donald Trump'},
          {v: 15, label: 'Hillary Clinton'},
          {v: 30, label: 'Bernie Sanders'}
        ]}/>
      //   <HBar data={[
      //     {v: 30, label: 'Ted Cruz'},
      //     {v: 10, label: 'John Kasich'},
      //     {v: 5, label: 'Donald Trump'},
      //     {v: 15, label: 'Hillary Clinton'},
      //     {v: 30, label: 'Bernie Sanders'}
      //   ]}/>
      // </div>
    );
  }
});