import PropTypes from 'prop-types';

const currentUserType = PropTypes.shape({  
  email: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
});

export default currentUserType;
