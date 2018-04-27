import { connect } from 'react-redux'
import { setVisibilityFilter } from '@/redux/actions/todo'
import Link from '../_thumbs/Link'

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.todo.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink