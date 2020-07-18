import React from 'react'
import {connect} from 'react-redux'
import {fetchBlocked, addBlocked, removeBlocked} from '../store/blocked'
import {Item, Button, Form, Input, Icon} from 'semantic-ui-react'
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
    this.isInvalidUrl = this.isInvalidUrl.bind(this)
    this.isOurUrl = this.isOurUrl.bind(this)
    this.alreadyBlocked = this.alreadyBlocked.bind(this)
    this.updateStorage = this.updateStorage.bind(this)
  }

  componentDidMount() {
    this.props.fetchBlocked(this.props.user.id)
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }

  isInvalidUrl(url) {
    const urlDivided = url.split('.')
    return urlDivided.length === 1
  }

  isOurUrl(url) {
    const ours = ['localhost:8080', 'markjoy.herokuapp.com']
    return ours.filter(ourUrl => url.indexOf(ourUrl) > -1).length > 0
  }

  alreadyBlocked(blocked, url) {
    const already = blocked.filter(block => block.url === url)
    return already.length > 0
  }

  updateStorage(url, type) {
    const currUrls = JSON.parse(window.localStorage.getItem('blockedUrls'))
    window.localStorage.removeItem('blockedUrls')
    let newUrls
    if (type === 'add') {
      currUrls.push(url)
      newUrls = currUrls
    } else {
      newUrls = currUrls.filter(block => block !== url)
    }
    window.localStorage.setItem('blockedUrls', JSON.stringify(newUrls))
  }

  render() {
    const {user, blocked, add, remove} = this.props
    const {url, error} = this.state

    return (
      <div>
        <Navbar />
        <div style={{display: 'flex', height: '100vh'}}>
          <div style={{flex: 1, padding: '50px'}}>
            <h1 className="title">My Blocked Urls</h1>
            <Form
              style={{margin: '55px 0'}}
              onSubmit={() => {
                if (this.isOurUrl(url)) {
                  this.setState({url: '', error: "You can't block us!"})
                }
                if (this.isInvalidUrl(url)) {
                  this.setState({url: '', error: 'Please type in correct url!'})
                }
                if (this.alreadyBlocked(blocked, url)) {
                  this.setState({url: '', error: 'The url is already blocked!'})
                } else {
                  add(user.id, {url: url})
                  this.updateStorage(url, 'add')
                  this.setState({url: ''})
                }
              }}
            >
              <Form.Field control={Input}>
                <Input name="url" value={url} onChange={this.handleChange} />
              </Form.Field>
              {error !== '' && (
                <div style={{color: 'red'}}>
                  <Icon name="warning circle" />
                  {error}
                </div>
              )}
              <Button
                floated="right"
                type="submit"
                content="Add Blocked Url"
                inverted
                style={{backgroundColor: '#DC267F'}}
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
                          onClick={() => {
                            this.updateStorage(block.url, 'remove')
                            remove(user.id, block.id)
                          }}
                          content="Remove"
                          color="black"
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
