// import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import BookmarkForm from './bookmark-form'
// import {addBookmark, updateBookmark} from '../store/bookmark'
// import {fetchGoals} from '../store/goal'

// export class AddBookmark extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       // title: this.props.bookmark.title || '',
//       // url: this.props.bookmark.url || '',
//       // categoryId: this.props.bookmark.categoryId || 6,
//       // goalId: this.props.bookmark.goalId || null,
//       success: false,
//       error: '',
//     }
//     this.handleChange = this.handleChange.bind(this)
//     // this.handleGoalChange = this.handleGoalChange.bind(this)
//     this.toggleSuccess = this.toggleSuccess.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   componentDidMount() {
//     this.props.fetchGoals()
//   }

//   handleChange(event) {
//     event.preventDefault()
//     this.setState({
//       [event.target.name]: event.target.value,
//       success: false,
//       error: '',
//     })
//   }

//   // handleGoalChange(e) {
//   //   e.persist()
//   //   const goalId = e._targetInst.return.key
//   //   this.setState({
//   //     goalId: goalId,
//   //   })
//   // }

//   toggleSuccess() {
//     this.setState({
//       success: false,
//     })
//   }

//   handleSubmit(event) {
//     event.preventDefault()
//     const {title, url, categoryId, goalId} = this.props.state
//     const bookmarksStr = JSON.stringify(this.props.bookmarks)
//     const {bookmark} = this.props

//     const bookmarkToAddOrUpdate = {
//       title: title,
//       url: url,
//       categoryId: categoryId,
//       goalId: goalId,
//       userId: this.props.user.id,
//     }
//     if (url === '') {
//       this.setState({
//         error: 'Url is a required field!',
//       })
//     } else if (!url.includes('.')) {
//       this.setState({
//         error: 'It must be a valid url!',
//       })
//     } else if (this.props.isUpdate) {
//       this.props.updateBookmark(bookmark.id, bookmarkToAddOrUpdate)
//     } else if (bookmarksStr.indexOf(url) > -1) {
//       this.setState({
//         error: 'This bookmark already exists!',
//       })
//     } else {

//         this.props.addBookmark(bookmarkToAddOrUpdate)
//       this.setState({
//         // title: '',
//         // url: '',
//         // categoryId: 6,
//         // goalId: null,
//         success: true,
//       })
//     }
//   }

//   render() {
//     let goalOptions = this.props.goals.map((goal) => ({
//       key: goal.id,
//       text: goal.detail,
//       value: goal.id,
//     }))
//     goalOptions.push({
//       key: 0,
//       text: 'Unassign',
//       value: null,
//     })

//     const {toggleModal, modalOpen, isUpdate, bookmarkInfo, handleGoalChange} = this.props

//     return (
//       <BookmarkForm
//         handleChange={this.handleChange}
//         handleGoalChange={this.props.handleGoalChange}
//         toggleSuccess={this.toggleSuccess}
//         handleSubmit={this.handleSubmit}
//         modalProps={this.props}
//         successOrError={this.state}
//         goalOptions={goalOptions}
//       />
//     )
//   }
// }

// const mapState = (state) => ({
//   user: state.user,
//   goals: state.goals.goals,
//   bookmark: state.bookmarks.selectedBookmark
// })

// const mapDispatch = (dispatch) => ({
//   addBookmark: (bookmarkInfo) => dispatch(addBookmark(bookmarkInfo)),
//   updateBookmark: (bookmarkId, updateInfo) =>
//     dispatch(updateBookmark(bookmarkId, updateInfo)),
//   fetchGoals: () => dispatch(fetchGoals()),
// })

// export default connect(mapState, mapDispatch)(AddBookmark)
