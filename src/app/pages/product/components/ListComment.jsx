const ListComment = ({ data }) => {
  return (
    <div className="comment-product">
      <ul className="list-comment">
        {data &&
          data.map((item, index) => (
            <li className="item-comment" key={index}>
              <p className="comment-user">{item.customerInfo?.name}</p>
              <div>
                {[...Array(item.rating)].map((item1, index1) => (
                  <i className="far fa-star active" key={index1}></i>
                ))}
              </div>
              <p className="comment">{item.comment}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ListComment;
