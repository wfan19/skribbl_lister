import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form,
  Button,
  Modal,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import { changeName } from '../../store/list/actions';

const ListSettingsModal = ({ dispatch, listSelected }) => {

  const [show, setShow] = useState(false);
  const [name, setName] = useState(listSelected.name);

  const onSubmit = (event) => {
    dispatch(changeName(name));
    setShow(false);
  };

  return (
    <Modal
      size="small"  
      open={show}
      trigger={<Button floated="right" icon="settings" onClick={() => setShow(true)}/>}
    >
      <Modal.Header>List Settings</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            label="Name"
            placeholder={listSelected.name}
            value={name}
            onChange={(event) => setName(event.target.value)}
            width={8}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button icon="check" content="Finish" onClick={onSubmit}/>
      </Modal.Actions>
    </Modal>
  );
}

ListSettingsModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  listSelected: PropTypes.shape({
    _id: PropTypes.number,
    name: PropTypes.string,
  }),
};

ListSettingsModal.propTypes = {
  listSelected: {},
};

export default connect()(ListSettingsModal);
