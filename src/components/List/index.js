import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  Header,
  Input,
  Segment,
  Icon,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import {
  addEntry,
  setEditing,
  inputEdited,
} from '../../store/list/actions';

function List({ dispatch, listSelected, editing, formInput }) {
  const onInput = (event) => {
    dispatch(inputEdited(event.target.value));
  }

  const onSubmit = () => {
    dispatch(inputEdited(''));
    dispatch(addEntry(formInput));
  }
  
  const onSetEditing = () => {
    if (listSelected) {
      dispatch(setEditing(listSelected, !editing));
    }
  }

  if (!listSelected._id){
    return (
      <div style={{ textAlign: 'center'}}>
        <p>No list selected</p>
      </div>
    );
  } else {
    return (
      <div>
        <Segment style={{ marginLeft: '10vw', marginRight: '10vw' }}>
          <Button toggle active={editing} floated="right" onClick={onSetEditing}>
            <Icon fitted name="pencil alternate" />
          </Button>
          <Header as="h1">This is a list!!</Header>
          {editing && 
            <Form onSubmit={onSubmit}>
              <Form.Field>
                <Input
                  type="word"
                  value={formInput}
                  onChange={onInput}
                  placeholder="Enter word here"
                />
              </Form.Field>
            </Form>
          }
        </Segment>
      </div>
    );
  }
}

List.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editing: PropTypes.bool,
  listSelected: PropTypes.shape({
    _id: PropTypes.number,
    name: PropTypes.string,
  }),
  formInput: PropTypes.string,
};

List.defaultProps = {
  editing: false,
  listSelected: {},
  formInput: '',
};

const mapStateToProps = (state) => ({
  listSelected: state.list.listSelected,
  editing: state.list.editing,
  formInput: state.list.formInput,
});

export default connect(mapStateToProps)(List);
