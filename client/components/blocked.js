import React from 'react'
import {connect} from 'react-redux'
import {fetchBlocked, addBlocked, removeBlocked} from '../store/blocked'
import {Item, Button, Form, Input} from 'semantic-ui-react'
import {Navbar} from './index'
import {CustomSidebar} from './sidemenu'

export class Blocked extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      error: ''
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
    const url = this.state.url
    const error = this.state.error

    function isInvalidUrl(url) {
      const invalid = ['localhost:8080', 'markjoy.herokuapp.com']
      return invalid.filter(invalidUrl => invalidUrl === url).length > 0
    }

    function alreadyBlocked(blocked, url) {
      const already = blocked.filter(blocked => blocked.url === url)
      return already.length > 0
    }

    return (
      <div>
        <Navbar />
        <div style={{display: 'flex', height: '100vh'}}>
          <div style={{flex: 1, padding: '50px'}}>
            <h1 className="title">My Blocked Urls</h1>
            <Form
              style={{margin: '55px 0'}}
              onSubmit={() => {
                if (isInvalidUrl(url)) {
                  this.setState({url: '', error: "You can't block us!"})
                }
                if (alreadyBlocked(blocked, url)) {
                  this.setState({url: '', error: 'The url is already blocked!'})
                } else {
                  add(user.id, {url})
                  this.setState({url: ''})
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
              {error !== '' && <div>{error}</div>}
              <Button
                floated="right"
                type="submit"
                content="Add Blocked Url"
                color="teal"
              />
            </Form>
            <Item.Group relaxed style={{width: '100%', marginTop: '100px'}}>
              {blocked && blocked.length > 0
                ? blocked.map(block => {
                    return (
                      <Item
                        className="column"
                        key={block.id}
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center'
                        }}
                      >
                        <Item.Content>{block.url}</Item.Content>
                        <Button
                          floated="right"
                          onClick={() => remove(user.id, block.id)}
                          content="Remove"
                          color="teal"
                        />
                      </Item>
                    )
                  })
                : 'No Blocked Urls'}
            </Item.Group>
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
