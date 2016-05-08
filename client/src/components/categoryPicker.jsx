var React = require('react');

var Router = require('react-router');
var Navigation = Router.Navigation;
var Link = Router.Link;

var CategoryPicker=React.createClass({

  render:function(){
    return(
        <div>
          <form>
            <select name="Theme">
              <option value="Education">Education</option>
              <option value="Security">Security</option>
              <option value="Immigration">Immigration</option>
              <option value="Hillary">Hillary Clinton</option>
              <option value="Bernie">Bernie Sanders</option>
              <option value="Trump">Donald Trump</option>
              <option value="Cruz">Ted Cruz</option>
              <option value="Kasich">John Kasich</option>
              <option value="Women">Women</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Supreme Court">Supreme Court</option>
              <option value="Tax">Taxes</option>
            </select>
          </form>
        </div>
      )
  }

});

module.exports = CategoryPicker;