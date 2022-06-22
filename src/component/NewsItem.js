let NewsItem =(props)=>{
  let {title,description,imgUrl,newsURl} = props;
  return (
    <div>
      <div className="card" style={{width: "18rem"}}>
      <img src={imgUrl} className="card-img-top" alt="..."  style={{height:"150px"}} />
      <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <a href={newsURl} target="_blank" className="btn btn-primary">Read More</a>
      </div>
      </div>
    </div>
  )
}

export default NewsItem;
