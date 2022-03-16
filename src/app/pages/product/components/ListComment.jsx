import { convertDate } from '../../../shared/helpers/utils/convertDate';

const ListComment = ({ data }) => {
  return (
    <div className='comment-product'>
      <ul className='list-comment'>
        {data &&
          data.map((item, index) => (
            <li className='item-comment' key={index}>
              <p className='comment-user'>{item.customer[0]?.name}</p>
              <div>
                {[...Array(item.rating)].map((item1, index1) => (
                  <i className='material-icons-outlined icon-star' key={index1}>
                    star
                  </i>
                ))}
              </div>
              <p className='comment'>{item.comment}</p>
              <p className='time'>{convertDate(item.createdAt)}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ListComment;
