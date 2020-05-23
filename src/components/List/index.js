import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  Header,
  Input,
  Segment,
  Grid,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import {
  addEntry,
  setEditing,
  inputEdited,
} from '../../store/list/actions';

import EntriesList from './EntriesList';

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
        <Segment style={{ marginRight: '1vw' }}>
            <Grid columns={2}>
              <Grid.Column>
                <Header as="h1">This is a list!!</Header>
              </Grid.Column>
              <Grid.Column>
                <Button
                toggle
                active={editing}
                floated="right"
                onClick={onSetEditing}
                icon="pencil alternate"
                />
              </Grid.Column>
          </Grid>
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

        <Segment style={{ marginRight: '1vw' }}>
          <EntriesList entries={listSelected.entries}/>
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
