import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  Header,
  Input,
  Segment,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import {
  addEntry,
  selectList,
  setEditing,
  inputEdited,
} from '../../store/list/actions';

import EntriesList from './EntriesList';
import ListSettingsModal from './ListSettingsModal';


class List extends React.Component {
  constructor(props) {
    super(props);
    const {
      dispatch, match, listSelected, fetching,
    } = this.props;

    if (listSelected.name) {
      document.title = `${listSelected.name} - Skribbl.db`;
    }

    if(match.params.listId && !fetching) {
      dispatch(selectList(match.params.listId));
    }
  }

  onInput(event) {
    const { dispatch } = this.props;
    dispatch(inputEdited(event.target.value));
  }

  onSubmit() {
    const { dispatch, formInput } = this.props;
    dispatch(inputEdited(''));
    dispatch(addEntry(formInput));
  }

  onSetEditing() {
    const { dispatch, listSelected, editing } = this.props;
    if (listSelected) {
      dispatch(setEditing(listSelected, !editing));
    }
  }

  render() {
    const {
      listSelected, editing, formInput, fetching
    } = this.props;

    if (fetching) {
      return (
        <div>
          <Loader/>
        </div>
      );
    } else {
      return (
        <div>
          <Segment style={{ marginRight: '1vw' }}>
            <Header as="h1" style={{ display: 'inline' }}>{listSelected.name}</Header>
            <Button
              toggle
              active={editing}
              floated="right"
              onClick={() => { this.onSetEditing(); }}
              icon="pencil alternate"
            />
            {editing && <ListSettingsModal listSelected={listSelected}/>}
  
            {editing && 
                <Form style={{ marginTop: '1rem' }} onSubmit={() => { this.onSubmit(); }}>
                  <Form.Field>
                    <Input
                      type="word"
                      value={formInput}
                      onChange={(event) => { this.onInput(event); }}
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
}

List.propTypes = {
    dispatch: PropTypes.func.isRequired,
    editing: PropTypes.bool,
    listSelected: PropTypes.shape({
      _id: PropTypes.number,
      name: PropTypes.string,
    }),
    formInput: PropTypes.string,
    fetching: PropTypes.bool,
  };
  
  List.defaultProps = {
    editing: false,
    listSelected: {},
    formInput: '',
    fetching: false,
  };
  
  const mapStateToProps = (state) => ({
    listSelected: state.list.listSelected,
    editing: state.list.editing,
    formInput: state.list.formInput,
    fetching: state.list.fetching,
  });
  
  export default connect(mapStateToProps)(List);
