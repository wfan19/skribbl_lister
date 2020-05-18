import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Header, Input, Segment} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import { addWord } from '../../store/list/actions';

function List({dispatch}) {
  const [wordState, setWordState] = useState('');
  
  const onInput = (data) => {
    setWordState(data.target.value);
  }

  const onSubmit = () => {
    // console.log(wordState);
    dispatch(addWord(wordState));
  }
  
  return (
    <div>
      <Segment style={{ marginLeft: '10vw', marginRight: '10vw' }}>
        <Header as="h1">This is a list!!</Header>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <Input
              onChange={onInput}
              placeholder="Enter word here"
            />
          </Form.Field>
        </Form>
      </Segment>
    </div>
  );
}

List.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(List);
