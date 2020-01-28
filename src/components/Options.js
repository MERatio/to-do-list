import React from 'react';
import PropTypes from 'prop-types';

function Options(props) {
  const { filterType, changeFilterType, handleReset } = props;

  return (
    <div className="options">
      <button
        className={`btn btn-all option ${
          filterType === 'all' ? 'option-active' : ''
        }`}
        onClick={() => changeFilterType('all')}
      >
        All
      </button>
      <button
        className={`btn btn-complete option ${
          filterType === 'complete' ? 'option-active' : ''
        }`}
        onClick={() => changeFilterType('complete')}
      >
        Complete
      </button>
      <button
        className={`btn btn-incomplete option ${
          filterType === 'incomplete' ? 'option-active' : ''
        }`}
        onClick={() => changeFilterType('incomplete')}
      >
        Incomplete
      </button>
      <button className="btn btn-delete-all option" onClick={handleReset}>
        Delete All
      </button>
    </div>
  );
}

// type check props
Options.propTypes = {
  filterType: PropTypes.string.isRequired,
  changeFilterType: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired
};

export default Options;
