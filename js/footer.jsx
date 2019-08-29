/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React */
var app = app || {};

(function() {
  'use strict';

  app.TodoFooter = React.createClass({
    render: function() {
      var activeTodoWord = app.Utils.pluralize(this.props.count, 'item');
      var clearButton = null;

      if (this.props.completedCount > 0) {
        clearButton = (
          <button className="clear-completed" onClick={this.props.onClearCompleted}>
            Clear completed
          </button>
        );
      }

      var nowShowing = this.props.nowShowing;
      var updateNowShowing = this.props.updateNowShowing;
      function updateFilter(nowShowing) {
        return function eventHandler(event) {
          event.preventDefault();
          window.history.pushState({ nowShowing }, nowShowing, event.target.href);
          updateNowShowing(nowShowing);
        };
      }

      return (
        <footer className="footer">
          <span className="todo-count">
            <strong>{this.props.count}</strong> {activeTodoWord} left
          </span>
          <ul className="filters">
            <li>
              <a
                href="#/"
                onClick={updateFilter(app.ALL_TODOS)}
                className={classNames({ selected: nowShowing === app.ALL_TODOS })}
              >
                All
              </a>
            </li>{' '}
            <li>
              <a
                href="#/active"
                onClick={updateFilter(app.ACTIVE_TODOS)}
                className={classNames({ selected: nowShowing === app.ACTIVE_TODOS })}
              >
                Active
              </a>
            </li>{' '}
            <li>
              <a
                href="#/completed"
                onClick={() => this.props.updateNowShowing(app.COMPLETED_TODOS)}
                className={classNames({ selected: nowShowing === app.COMPLETED_TODOS })}
              >
                Completed
              </a>
            </li>
          </ul>
          {clearButton}
        </footer>
      );
    }
  });
})();
