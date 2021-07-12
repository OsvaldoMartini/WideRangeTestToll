import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { MarcaFormValues } from '../../../app/models/marca';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import { category } from '../../../app/common/options/categoryOptions';
import { combineDateAndTime } from '../../../app/common/util/util';
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan
} from 'revalidate';
import { RootStoreContext } from '../../../app/stores/rootStore';

const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  category: isRequired('Category'),
  description: composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters'
    })
  )(),
  date: isRequired('Date'),
  expire: isRequired('Expire'),
  procurador: isRequired('Procurador'),
  processoNumber:isRequired('processoNumber'),
  proprietario:isRequired('Proprietario')
  
});

interface DetailParams {
  id: string;
}

const MarcaForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createMarca,
    editMarca,
    submitting,
    loadMarca
  } = rootStore.marcaStore;

  const [marca, setMarca] = useState(new MarcaFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadMarca(match.params.id)
        .then(marca => {
          setMarca(new MarcaFormValues(marca));
        })
        .finally(() => setLoading(false));
    }
  }, [loadMarca, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    //It sets midnight
    values.time = new Date();
    values.time.setHours(24,0,0,0); // next midnight
    
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const dateAndTimeExpire = combineDateAndTime(values.expire, values.time);
    
    const { date, expire, time, ...marca } = values;
    marca.date = dateAndTime;
    marca.expire = dateAndTimeExpire;
    
    if (!marca.id) {
      let newMarca = {
        ...marca,
        id: uuid()
      };
      createMarca(newMarca);
    } else {
      editMarca(marca);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={marca}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name='title'
                  placeholder='Title'
                  value={marca.title}
                  component={TextInput}
                />
                <Field
                  name='description'
                  placeholder='Description'
                  rows={3}
                  value={marca.description}
                  component={TextAreaInput}
                />
                <Field
                  component={SelectInput}
                  options={category}
                  name='category'
                  placeholder='Category'
                  value={marca.category}
                />
                <Form.Group widths='equal'>
                  <Field
                    component={DateInput}
                    name='date'
                    date={true}
                    placeholder='Date'
                    value={marca.date}
                  />
                      <Field
                    component={DateInput}
                    name='expire'
                    date={true}
                    placeholder='Vencimento'
                    value={marca.expire}
                  />
                </Form.Group>
                <Field
                  component={TextInput}
                  name='processoNumber'
                  placeholder='Numero do Processo'
                  value={marca.processoNumber}
                />
                <Field
                  component={TextInput}
                  name='procurador'
                  placeholder='Procurador'
                  value={marca.procurador}
                />
                <Field
                  component={TextInput}
                  name='proprietario'
                  placeholder='Proprietario'
                  value={marca.proprietario}
                />
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated='right'
                  positive
                  type='submit'
                  content='Submit'
                />
                <Button
                  onClick={
                    marca.id
                      ? () => history.push('/marcas')
                      :() => history.push(`/marcas/${marca.id}`)
                  }
                  disabled={loading}
                  floated='right'
                  type='button'
                  content='Cancel'
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(MarcaForm);
