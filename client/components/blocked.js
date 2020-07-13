/* eslint-disable no-alert */
import React from 'react'
import {connect} from 'react-redux'
import {fetchBlocked, addBlocked, removeBlocked} from '../store/blocked'
import {Grid, Button, Form, Input} from 'semantic-ui-react'
import {Navbar} from './index'
import {CustomSidebar} from './sidemenu'

export class Blocked extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      url: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchBlocked(this.props.user.id)
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const {user, blocked, add, remove} = this.props

    function alreadyBlocked(blocked, url) {
      const already = blocked.filter(blockedUrl => blockedUrl === url)
      return already.length > 0
    }

    return (
      <div>
        <Navbar />
        <div style={{display: 'flex', height: '100vh'}}>
          <div className="container" style={{padding: '50px'}}>
            <Form
              onSubmit={() => {
                if (!alreadyBlocked(blocked, this.state.url)) {
                  add(user.id, {url: this.state.url})
                  this.setState({url: ''})
                } else {
                  alert('The url is already blocked!')
                }
              }}
            >
              <Form.Field control={Input}>
                <Input
                  name="url"
                  value={this.state.url}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Button
                floated="right"
                type="submit"
                content="Add Blocked Url"
                color="teal"
              />
            </Form>
            <h1 className="title">Blocked Urls</h1>
            <div className="ui-grid">
              <Grid columns={4} relaxed="very" align="center">
                {blocked && blocked.length > 0
                  ? blocked.map(block => {
                      return (
                        <div className="column" key={block.id}>
                          {block.url}
                          <Button
                            floated="right"
                            onClick={() => remove(user.id, block.id)}
                            content="Remove Blocked Url"
                            color="teal"
                          />
                        </div>
                      )
                    })
                  : 'No Blocked Urls'}
              </Grid>
            </div>
          </div>
          <CustomSidebar />
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    blocked: state.blocked
  }
}

const mapDispatch = dispatch => {
  return {
    fetchBlocked: userId => dispatch(fetchBlocked(userId)),
    add: (userId, blockedInfo) => dispatch(addBlocked(userId, blockedInfo)),
    remove: (userId, blockedId) => dispatch(removeBlocked(userId, blockedId))
  }
}

export default connect(mapState, mapDispatch)(Blocked)
