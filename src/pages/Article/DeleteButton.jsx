import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import agent from '../../agent';
import { TrashIcon } from '../../components/ui-library/Icons';
import { DELETE_COMMENT } from '../../constants/actionTypes';

const DeleteButton = ({ slug, commentId, show }) => {
  const dispatch = useDispatch();

  const onClick = (payload, commentIdGiven) =>
    dispatch({ type: DELETE_COMMENT, payload, commentIdGiven });

  const del = () => {
    const payload = agent.Comments.delete(slug, commentId);
    onClick(payload, commentId);
  };

  if (show) {
    return <TrashIcon color='alert' onClick={del} size='small' />;
  }
  return null;
};

DeleteButton.propTypes = {
  slug: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
};

export default DeleteButton;
