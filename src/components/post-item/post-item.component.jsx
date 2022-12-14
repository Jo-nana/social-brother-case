import './post-item.styles.scss'

const PostItem = ( { post }) => {
  const { title, content, img_url, category } = post;


  // formating the date in the right format
  const createAtDate = post.created_at;
  const formattedDate = new Date(createAtDate).toLocaleDateString('nl-NL', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
  });



  return (
  <div className='post-card-container'>
    <div
      className='post-card-header'
      style={{
        backgroundImage: `url(${img_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <p>{formattedDate}</p>
      <p>{category.name}</p>
    </div>
    <div className='post-card-content'>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  </div>
  )
}

export default PostItem;
