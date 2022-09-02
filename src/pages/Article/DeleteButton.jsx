import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import agent from '../../agent';
import { TrashIcon } from '../../components/ui-library/Icons';
import { deleteComment } from '../../services/reducers/article-reducer';

// TODO: думаю выносить кнопку удаления в отдельный компонент это избыточно
const DeleteButton = ({ slug, commentId, show }) => {
  const dispatch = useDispatch();
  const del = () => {
    const payload = agent.Comments.delete(slug, commentId);
    dispatch(deleteComment({ payload, commentId }));
  };

  if (show) {
    return <TrashIcon color='alert' onClick={del} size='small' />;
  }
  return null;
};

DeleteButton.propTypes = {
  commentId: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
};

export default DeleteButton;
