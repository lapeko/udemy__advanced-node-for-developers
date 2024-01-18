import React, { Component } from 'react';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../../actions';

class BlogList extends Component {
  componentDidMount() {
    this.props.fetchBlogs();
  }

  renderBlogs() {
    return map(this.props.blogs, blog => {
      return (
        <div className="card darken-1 horizontal" key={blog._id}>
          <div className="card-stacked">
            {blog.image && <div className="card-image">
              <img src={`https://blog-images-jndflksdjf.s3.eu-central-1.amazonaws.com/${blog.image}`} alt=""/>
            </div>}
            <div className="card-content">
              <span className="card-title">{blog.title}</span>
              <p>{blog.content}</p>
            </div>
            <div className="card-action">
              <Link to={`/blogs/${blog._id}`}>Read</Link>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderBlogs()}</div>;
  }
}

function mapStateToProps({ blogs }) {
  return { blogs };
}

export default connect(mapStateToProps, { fetchBlogs })(BlogList);
