import Footer from 'App/components/Footer';
import Header from 'App/components/Header';
import 'App/components/layout/layout.css';
import React from 'react';

const PageLayout = ({ hasError, children }) => {
  const content = hasError 
    ? (<h2 className='app-error'>Sorry! Something went wrong.</h2>)
    : children;

  return (
    <div className='layout'>
      <Header />
        { content }
      <Footer />
    </div>
  );
};

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }

  render() {
    return <PageLayout hasError={this.state.hasError} {...this.props} />
  }
};