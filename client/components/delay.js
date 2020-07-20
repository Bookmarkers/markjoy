import React from 'react'

class Delay extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push('/home')
    }, 5000)
  }

  render() {
    return (
      <div style={{padding: '50px', textAlign: 'center', marginTop: '100px'}}>
        <h1>Looks like you've tried to visit one of your blocked urls!</h1>
        <h3 style={{margin: '30px 0'}}>
          Redirecting you to <span style={{fontSize: '50px'}}>bookmarq</span> in
          three seconds...
        </h3>
        <img src="landing.jpg" height="200" width="300" />
      </div>
    )
  }
}

export default Delay
