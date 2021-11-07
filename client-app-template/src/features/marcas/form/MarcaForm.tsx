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
import { marcasOptions } from '../../../app/common/options/marcasOptions';
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
    values.time.setHours(0,0,0,0); // next midnight
    


    const dateAndTime = combineDateAndTime(values.date, values.time);
    const dateAndTimeExpire = combineDateAndTime(values.expire, values.time);
    
    console.log("Data: ",dateAndTime);
    console.log("Validade: ",dateAndTimeExpire);


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
      <Grid.Column width={12}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={marca}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
              <label>Nome Fantasia</label>
                <Field
                  name='title'
                  placeholder='Nome Fantasia'
                  value={marca.title}
                  component={TextInput}
                />
                <label>Marca</label>
                <Field
                  name='description'
                  placeholder='Marca'
                  value={marca.description}
                  component={TextInput}
                />
                <label>Tipo de Processo</label>
                <Field
                  component={SelectInput}
                  options={marcasOptions}
                  name='category'
                  placeholder='Tipo de Processo'
                  value={marca.category}
                />
                <Grid columns={2} divided>
                  <Grid.Row>
                    <Grid.Column>
                      <label>Data do Pedido</label>
                      <Field
                          component={DateInput}
                          name='date'
                          date={true}
                          placeholder='Data-Pedido'
                          value={marca.date}
                        />
                    </Grid.Column>
                    <Grid.Column>
                      <label>Validade</label>
                    <Field
                      component={DateInput}
                      name='expire'
                      date={true}
                      placeholder='Validade'
                      value={marca.expire}
                    />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <label>Numero do Processo</label>
                <Field
                  component={TextInput}
                  name='processoNumber'
                  placeholder='Numero do Processo'
                  value={marca.processoNumber}
                />
                <label>Procurador</label>
                <Field
                  component={TextInput}
                  name='procurador'
                  placeholder='Procurador'
                  value={marca.procurador}
                />
                <label>Proprietario</label>
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
