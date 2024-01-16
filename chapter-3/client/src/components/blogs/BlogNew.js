// BlogNew shows BlogForm and BlogFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import BlogForm from './BlogForm';
import BlogFormReview from './BlogFormReview';

class BlogNew extends Component {
  state = { showFormReview: false, image: null};

  onFileChange = (event) => {
    this.setState({image: event.target.files[0]});
  }

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <BlogFormReview
          onCancel={() => this.setState({ showFormReview: false })}
          image={this.state.image}
        />
      );
    }

    return (
      <BlogForm
        onBlogSubmit={() => this.setState({ showFormReview: true })}
        onFileChange={this.onFileChange}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  form: 'blogForm'
})(BlogNew);
